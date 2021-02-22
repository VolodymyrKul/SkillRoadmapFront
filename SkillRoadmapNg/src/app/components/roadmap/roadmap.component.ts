import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { UserSkillService } from '../../services/user-skill.service';
import { CommentService } from '../../services/comment.service';
import { UserSkill } from '../../models/user-skill';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit, AfterViewChecked {

  constructor(private userSkillService: UserSkillService, private commentService: CommentService) { }

  userSkills: UserSkill[] = [];
  categories: number[] = [];
  comments: Comment[] = [];
  ngOnInit(): void {
    this.userSkillService.getByYear('ilivocs@gmail.com',2021)
    .subscribe((data: UserSkill[] | any) => {
      console.log(data);
      this.userSkills = data;
      this.findDistCateg();
      //this.setDividers();
      //this.drawSvg();
    });
    this.commentService.getByUser('ilivocs@gmail.com')
    .subscribe((data: Comment[] | any) => {
      console.log(data);
      this.comments = data;
    });
  }

  ngAfterViewChecked(){
    //console.log("After check");
    this.setDividers();
    this.drawSvg();
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
    this.userSkills.forEach(skill => this.categories.push(skill?.categoryName));
    this.categories = this.categories.filter((x, i, a) => a.indexOf(x) === i);
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
      console.log(catskills.length);

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
        rect.setAttribute("style","fill:url(#solids)");
        //rect.setAttribute("style","fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)");
        rect.addEventListener("click", this.addComment);
        var res = this.comments.find(com => com.userSkillName == skill.skillname.toString());
        if(res != undefined){
          rect.innerHTML = "<title>" + 'User ' + res.employerEmail + ' leave this comment: ' + res.commentText + "</title>"
        }
        svgItem.appendChild(rect);

        const txt = document.createElementNS("http://www.w3.org/2000/svg","text");
        txt.setAttribute("name", "SkillText");
        txt.setAttribute("fill", "red");
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
}
