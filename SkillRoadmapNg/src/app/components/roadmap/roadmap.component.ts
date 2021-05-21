import { Component, OnInit, AfterViewChecked, TemplateRef } from '@angular/core';
import { UserSkillService } from '../../services/user-skill.service';
import { CommentService } from '../../services/comment.service';
import { UserSkill } from '../../models/user-skill';
import { Comment } from '../../models/comment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { SkillUnit } from '../../models/skill-unit';
import { SkillMetric } from '../../models/skill-metric';
import { SkillMetricService } from '../../services/skill-metric.service';
import { SkillUnitService } from 'src/app/services/skill-unit.service';
import { SkillMetricDTO } from 'src/app/models/skill-metric-dto';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit, AfterViewChecked {
  @ViewChild('childModal')
  private childRef: TemplateRef<any>;

  @ViewChild('parentModal')
  private parentRef: TemplateRef<any>;

  constructor(private userSkillService: UserSkillService, 
    private commentService: CommentService, 
    private modalService: NgbModal,
    private skillMetricService: SkillMetricService,
    private skillUnitService: SkillUnitService) { }

  userSkills: UserSkill[] = [];
  modalUserSkills: UserSkill[] = [];
  categories: string[] = [];
  comments: Comment[] = [];
  allYears: number[] = [];
  currentYear: number = 0;
  addedComment: string = 'Leave comment';
  closeResult = '';
  isDelimDeleted: boolean = false;
  isEmptySkillArr: boolean = true;
  addedSkillUnits: SkillUnit[] = [
    new SkillUnit('Some interesting unit1', new Date(Date.now()), new Date(Date.now()), 0, ''),
    new SkillUnit('Some interesting unit2', new Date(Date.now()), new Date(Date.now()), 0, ''),
    new SkillUnit('Some interesting unit3', new Date(Date.now()), new Date(Date.now()), 0, '')
  ];
  addedSkillMetrics: SkillMetric[] = [
    new SkillMetric('Metric title1', 0, 0.1, ''),
    new SkillMetric('Metric title2', 0, 0.1, ''),
    new SkillMetric('Metric title3', 0, 0.1, '')
  ];
  //addedSkillUnit: SkillUnit = new SkillUnit('Some interesting unit', new Date(Date.now()), new Date(Date.now()), 0, '');
  addedUserSkill: UserSkill = new UserSkill('Some interesting skill', new Date(Date.now()), new Date(Date.now()), '', 0, localStorage.getItem('currentuser'), true);

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  metric2: boolean = false;
  metric3: boolean = false;
  unit2: boolean = false;
  unit3: boolean = false;
  currentStep: number = 1;
  userRole: string = '';
  skillMetricDTOs: SkillMetricDTO[] = []; 
  ngOnInit(): void {
    this.skillMetricService.getAll()
    .subscribe((data: SkillMetricDTO[] | any) => {
      this.skillMetricDTOs = data;
    });

    this.userRole = localStorage.getItem('currentrole');
    if(this.userRole == 'HR' || this.userRole == 'Mentor'){
      this.userSkillService.getYears(localStorage.getItem('currentroadmap'))
      .subscribe((data: number[] | any) => {
          console.log(data);
          this.allYears = data;
          console.log(this.allYears.length);
          if(this.allYears.length == 0){
            this.isEmptySkillArr = true;
          }
          else{
              this.isEmptySkillArr = false;
              this.currentYear = this.allYears[0];
              this.userSkillService.getByYear(localStorage.getItem('currentroadmap'), this.currentYear)
              .subscribe((data: UserSkill[] | any) => {
                console.log(data);
                this.userSkills = data;
                this.findDistCateg();
              });
          }
      });
      this.commentService.getByUser(localStorage.getItem('currentroadmap'))
      .subscribe((data: Comment[] | any) => {
        console.log(data);
        this.comments = data;
      });
    }
    else{
      this.userSkillService.getYears(localStorage.getItem('currentuser'))
      .subscribe((data: number[] | any) => {
          console.log(data);
          this.allYears = data;
          console.log(this.allYears.length);
          if(this.allYears.length == 0){
            this.isEmptySkillArr = true;
          }
          else{
              this.isEmptySkillArr = false;
              this.currentYear = this.allYears[0];
              this.userSkillService.getByYear(localStorage.getItem('currentuser'), this.currentYear)
              .subscribe((data: UserSkill[] | any) => {
                console.log(data);
                this.userSkills = data;
                this.findDistCateg();
              });
          }
      });
      this.commentService.getByUser(localStorage.getItem('currentuser'))
      .subscribe((data: Comment[] | any) => {
        console.log(data);
        this.comments = data;
      });
    }
  }

  ngAfterViewChecked(){
    //console.log("After check");
    this.setDividers();
    this.drawSvg();
    var delims = document.getElementsByName("delim");
    //console.log("Delims:" + delims.length);
    //console.log("Items:" + document.getElementsByName("tableBody").length);
    if(delims.length>0 && this.isDelimDeleted==false){
      document.getElementsByName("tableBody")[0].removeChild(delims[delims.length-1]);
      this.isDelimDeleted = true;
    }
  }

  setDividers(){
    const svg = document.getElementsByName("SkillSVG");
    svg.forEach(svgitem => {
      for(var i = 300; i < 3600; i+=300){
        const line = document.createElementNS("http://www.w3.org/2000/svg","line");
        line.setAttribute("x1", i.toString());
        line.setAttribute("y1", "0");
        line.setAttribute("x2", i.toString());
        line.setAttribute("y2", "1000");
        line.setAttribute("style","stroke:rgb(194, 194, 163);stroke-width:1");
        svgitem.appendChild(line);
      }
    });
  }

  findDistCateg(){
    this.categories = [];
    this.userSkills.forEach(skill => this.categories.push(skill?.categoryName));
    this.categories = this.categories.filter((x, i, a) => a.indexOf(x) === i);
    this.modalUserSkills = this.userSkills.filter(us => us?.categoryName === this.categories[0] && us.isUserSkill === true);
    this.addedSkillUnits.forEach(su=>{
      su.userSkillName = this.modalUserSkills[0].skillname;
    })
    //this.addedSkillUnit.userSkillName = this.modalUserSkills[0].skillname;
    this.addedUserSkill.categoryName = this.categories[0];
    console.log(this.categories);
    //this.categories.forEach(cat => console.log(cat));
  }

  drawSvg(){
    this.setDividers();
    const svg = document.getElementsByName("SkillSVG");
    svg.forEach((svgItem, index) => {
      const rects = svgItem.querySelectorAll('[name="SkillRect"]');
      rects.forEach(elm => svgItem.removeChild(elm));

      const txts = svgItem.querySelectorAll('[name="SkillText"]');
      txts.forEach(elm => svgItem.removeChild(elm));

      svgItem.setAttribute("height","20");
      const catskills: UserSkill[] = this.userSkills.filter(us => us?.categoryName === this.categories[index]);
      console.log(catskills);

      catskills.forEach(skill => {
        svgItem.setAttribute("height", (parseInt(svgItem.getAttribute("height"),10)+40).toString());
        const rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
        rect.setAttribute("name","SkillRect");

        const startMonth = new Date(skill.startDate).getMonth();
        const startDay = new Date(skill.startDate).getDate();
        const endMonth = new Date(skill.endDate).getMonth();
        const endDay = new Date(skill.endDate).getDate();
        const tmpyear = new Date(skill.startDate).getFullYear();

        const xpos = startMonth*300 + ((startDay-1)*1.0/this.daysInMonth(startMonth+1, tmpyear))*300;
        rect.setAttribute("x", xpos.toString());
        const ypos = parseInt(this.getYPos(index),10)+40;
        rect.setAttribute("y", ypos.toString());
        const elmwidth = (endMonth*300 + (endDay)*1.0/this.daysInMonth(endMonth+1, tmpyear)*300) - xpos;
        rect.setAttribute("width", elmwidth.toString());
        rect.setAttribute("height","10");
        //rect.setAttribute("style","fill:url(#solids)");
        if(skill.skillLevel == 1){
          rect.setAttribute("style","fill:rgb(230, 47, 44);stroke-width:3;stroke:rgb(0,0,0)");
        }
        else if(skill.skillLevel == 2){
          rect.setAttribute("style","fill:rgb(221, 230, 44);stroke-width:3;stroke:rgb(0,0,0)");
        }
        else if(skill.skillLevel == 3){
          rect.setAttribute("style","fill:rgb(91, 230, 44);stroke-width:3;stroke:rgb(0,0,0)");
        }
        else if(skill.skillLevel == 4){
          rect.setAttribute("style","fill:rgb(44, 230, 211);stroke-width:3;stroke:rgb(0,0,0)");
        }
        else {
          rect.setAttribute("style","fill:rgb(44, 103, 230);stroke-width:3;stroke:rgb(0,0,0)");
        }
        rect.addEventListener("click", () => {this.openCustomDialog()});
        var res = this.comments.filter(com => com.userSkillName == skill.skillname.toString());
        var smetrics = this.skillMetricDTOs.filter(sm => sm.skillName == skill.skillname.toString());
        var tmpcomments = "";
        var tmpmetrics = "\nThere are metrics for this skill:\n";
        if(res != undefined){
          res.forEach(r => {
            tmpcomments += 'User ' + r.employerEmail + ' leave this comment: ' + r.commentText + '\n';
          });
          console.log(tmpcomments);
        }
        if(smetrics != undefined){
          smetrics = smetrics.slice(0, 3);
          smetrics.forEach(sm => {
            tmpmetrics += sm.metricName + " : " + sm.metricValue.toString() + " : " + sm.metricInfluence.toString() + '\n';
          });
        }
        rect.innerHTML = "<title>" + tmpcomments + tmpmetrics + "</title>";
        /*if(res != undefined){
          rect.innerHTML = "<title>" + 'User ' + res.employerEmail + ' leave this comment: ' + res.commentText + "\n" + "Hello world" + "</title>";
        }*/
        svgItem.appendChild(rect);

        const txt = document.createElementNS("http://www.w3.org/2000/svg","text");
        txt.setAttribute("name", "SkillText");
        txt.setAttribute("fill", "black");
        txt.setAttribute("x", xpos.toString());
        txt.setAttribute("y", (ypos-10).toString());
        txt.innerHTML = skill.skillname.toString();
        svgItem.appendChild(txt);
      });
    });
  }
  getYPos(svgin : number) : string{
    var svg = document.getElementsByName("SkillSVG")[svgin];
    var skills = svg.querySelectorAll('[name="SkillRect"]');
    if(skills.length > 0){
      var lastElm = skills.item(skills.length-1).getAttribute("y");
      return lastElm;
    }
    else{
      return '0';
    }
  }

  daysInMonth (month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  getallDays(){
    for(let i=1;i<13;i++){
      console.log(this.daysInMonth(i,2021));
    }
  }

  addComment(event){
    console.log(event.target);
    //event.target.innerHTML = "<title>This is decription</title>";
  }

  addUserSkillWithUnit(){
    console.log(this.parentRef);
    this.modalService.open(this.parentRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCustomDialog() {
    console.log(this.childRef);
    this.modalService.open(this.childRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  selectCateg(selectCateg: any){
    //console.log(selectCateg);
    this.addedUserSkill.categoryName = selectCateg;
    console.log(this.addedUserSkill.categoryName);
    //this.modalUserSkills = this.userSkills.filter(us => us?.categoryName === selectCateg && us.isUserSkill === true);
  }

  addNewUserSkill(){
    if(this.currentStep == 1){
      this.currentStep++;
      this.step1=false;
      this.step2=true;
      this.addedSkillUnits.forEach(su => {
        su.userSkillName = this.addedUserSkill.skillname;
        su.startDate = this.addedUserSkill.startDate;
        su.endDate = this.addedUserSkill.endDate;
      });
      this.addedSkillMetrics.forEach(sm => {
        sm.skillname = this.addedUserSkill.skillname;
      });
      console.log(this.addedUserSkill.skillname);
      console.log(this.addedUserSkill.startDate);
      console.log(this.addedUserSkill.endDate);  
    }
    else if(this.currentStep == 2){
      this.currentStep++;
      this.step2=false;
      this.step3=true;
      //console.log(this.addedSkillUnit);
    }
    //console.log(this.addedUserSkill);
  }

  selectYear(selectYear: any){

    if(this.userRole == 'HR' || this.userRole == 'Mentor'){
      this.userSkillService.getByYear(localStorage.getItem('currentroadmap'), selectYear)
      .subscribe((data: UserSkill[] | any) => {
        console.log(data);
        this.userSkills = data;
        this.findDistCateg();
        this.drawSvg();
        this.currentYear = selectYear;
      });
    }
    else{
      this.userSkillService.getByYear(localStorage.getItem('currentuser'), selectYear)
      .subscribe((data: UserSkill[] | any) => {
        console.log(data);
        this.userSkills = data;
        this.findDistCateg();
        this.drawSvg();
        this.currentYear = selectYear;
      });
    }
  }

  addMetric(){
    if(this.metric2 == false){
      this.metric2=true;
      console.log("Metric2");
    }
    else{
      this.metric3=true;
      console.log("Metric3");
    }
  }

  addSkillUnit(){
    if(this.unit2 == false){
      this.unit2=true;
      console.log("Unit2");
    }
    else{
      this.unit3=true;
      console.log("Unit3");
    }
  }

  saveAllObjects(){
    console.log('------------');
    console.log('Save data');
    console.log(this.addedUserSkill);
    console.log(this.addedSkillMetrics);
    console.log(this.addedSkillUnits);
    /*this.userSkillService.addUserSkill(this.addedUserSkill)
    .subscribe((data: any) => {
      this.saveSkillMetrics();
      this.saveSkillUnits();
    });*/
  }
  saveSkillMetrics(){
    this.skillMetricService.addSkillMetric(this.addedSkillMetrics[0])
      .subscribe((data: any) => {
        if(this.metric2 == true){
          this.skillMetricService.addSkillMetric(this.addedSkillMetrics[1])
          .subscribe((data: any) => {
            if(this.metric3 == true){
              this.skillMetricService.addSkillMetric(this.addedSkillMetrics[2])
              .subscribe((data: any) => {});
            }
          });
        }
      });
  }

  saveSkillUnits(){
    this.skillUnitService.addSkillUnit(this.addedSkillUnits[0])
      .subscribe((data: any) => {
        if(this.unit2 == true){
          this.skillUnitService.addSkillUnit(this.addedSkillUnits[1])
          .subscribe((data: any) => {
            if(this.unit3 == true){
              this.skillUnitService.addSkillUnit(this.addedSkillUnits[2])
              .subscribe((data: any) => {});
            }
          });
        }
      });
  }
}
