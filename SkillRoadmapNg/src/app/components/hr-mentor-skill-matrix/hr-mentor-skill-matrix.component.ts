import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/models/category-dto';
import { CommentDTO } from 'src/app/models/comment-dto';
import { SkillMetricDTO } from 'src/app/models/skill-metric-dto';
import { SkillUnitDTO } from 'src/app/models/skill-unit-dto';
import { UserSkillDTO } from 'src/app/models/user-skill-dto';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { SkillMetricService } from 'src/app/services/skill-metric.service';
import { SkillUnitService } from 'src/app/services/skill-unit.service';
import { UserSkillService } from 'src/app/services/user-skill.service';
import { ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationDTO } from 'src/app/models/notification-dto';

@Component({
  selector: 'app-hr-mentor-skill-matrix',
  templateUrl: './hr-mentor-skill-matrix.component.html',
  styleUrls: ['./hr-mentor-skill-matrix.component.css']
})
export class HrMentorSkillMatrixComponent implements OnInit {

  @ViewChild('usModal')
  private usRef: TemplateRef<any>;

  @ViewChild('suModal')
  private suRef: TemplateRef<any>;

  @ViewChild('smModal')
  private smRef: TemplateRef<any>;

  @ViewChild('cmModal')
  private cmRef: TemplateRef<any>;

  closeResult = '';

  userSkillDTOs: UserSkillDTO[] = [];
  //showUserSkillDTOs: UserSkillDTO[] = [];
  //skillUnitDTOs: SkillUnitDTO[] = [];
  //showSkillUnitDTOs: SkillUnitDTO[] = [];
  //skillMetricDTOs: SkillMetricDTO[] = [];
  //showSkillMetricDTOs: SkillMetricDTO[] = [];
  loadskillUnitDTOs: SkillUnitDTO[] = [];
  skillUnitDTOs: SkillUnitDTO[] = [];
  loadskillMetricDTOs: SkillMetricDTO[] = [];
  skillMetricDTOs: SkillMetricDTO[] = [];
  allCommentDTOs: CommentDTO[] = [];
  commentDTOs: CommentDTO[] = [];
  showCommentDTOs: CommentDTO[] = []; 
  categoryDTOs: CategoryDTO[] = [];
  newuserSkillDTO: UserSkillDTO = new UserSkillDTO(0,"SkillName", new Date(), new Date(), 1, 1, parseInt(localStorage.getItem("currentmatrixemp"), 10));
  newskillUnitDTO: SkillUnitDTO = new SkillUnitDTO(0, "UnitName", new Date(), new Date(), 1, 1);
  newskillMetricDTO: SkillMetricDTO = new SkillMetricDTO(0, "MetricName", 1, 0.1, 1);
  newcommentDTO: CommentDTO = new CommentDTO(0, "CommentText", parseInt(localStorage.getItem("currentuserid"), 10), 1);

  filterSkillLevels: string[] = ["Beginner", "Elementary", "Intermediate", "Advanced", "Proficiency"];
  filterLevel: string = "Beginner";
  
  skillLevels: string[] = [];
  unitLevels: string[] = [];
  metricLevels: string[] = [];

  usTable: boolean = true;
  suTable: boolean = false;
  smTable: boolean = false;
  cmTable: boolean = false;

  usmode1: boolean = false;
  usmode2: boolean = false;
  usmode3: boolean = false;
  usmode4: boolean = false;
  usmode5: boolean = false;
  usmode6: boolean = false;

  sumode1: boolean = false;
  sumode2: boolean = false;
  sumode3: boolean = false;
  sumode4: boolean = false;
  sumode5: boolean = false;

  smmode1: boolean = false;
  smmode2: boolean = false;
  smmode3: boolean = false;
  smmode4: boolean = false;

  cmmode1: boolean = false;
  cmmode2: boolean = false;
  cmmode3: boolean = false;

  constructor(private userSkillService: UserSkillService, 
    private skillUnitService: SkillUnitService, 
    private skillMetricService: SkillMetricService,
    private commentService: CommentService,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadData();
    this.categoryService.getAll()
    .subscribe((data : CategoryDTO[] | any) => {
      this.categoryDTOs = data;
    });
  }

  openCreateUsModal(){
    this.modalService.open(this.usRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCreateSuModal(){
    this.modalService.open(this.suRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCreateSmModal(){
    this.modalService.open(this.smRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCreateCmModal(){
    this.modalService.open(this.cmRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  deleteUserSkill(us: UserSkillDTO){
    this.userSkillService.delete(us.id)
    .subscribe(() => this.loadData());
  }

  deleteSkillUnit(su: SkillUnitDTO){
    this.skillUnitService.delete(su.id)
    .subscribe(() => this.loadData());
  }

  deleteSkillMetric(sm: SkillMetricDTO){
    this.skillUnitService.delete(sm.id)
    .subscribe(() => this.loadData());
  }

  deleteComment(cm: CommentDTO){
    this.skillUnitService.delete(cm.id)
    .subscribe(() => this.loadData());
  }

  filterByCategs(id: number){
    this.loadskillUnitDTOs = [];
    this.loadskillMetricDTOs = [];
    this.allCommentDTOs = [];
    this.commentDTOs = [];
    this.showCommentDTOs = [];
    this.userSkillService.getAll()
    .subscribe((data: UserSkillDTO[] | any) => {
      this.userSkillDTOs = data;

      this.userSkillDTOs = this.userSkillDTOs.filter(us => us.idEmployee == parseInt(localStorage.getItem("currentmatrixemp"), 10));

      this.userSkillDTOs.forEach(us => {
        us.startDate = new Date(us.startDate);
        us.endDate = new Date(us.endDate);
      });

      this.userSkillDTOs = this.userSkillDTOs.filter(us => us.idCategory == id);
      this.updateUserSkillLevels();

      this.commentService.getAll()
        .subscribe((data: CommentDTO[] | any) => {
          this.allCommentDTOs = data;
        
          this.userSkillDTOs.forEach(us => {

            this.skillUnitService.getByUserSkillId(us.id)
            .subscribe((data: SkillUnitDTO[] | any) => {
              data.forEach(element => {
                this.loadskillUnitDTOs.push(element);
                this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].startDate = new Date(this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].startDate);
                this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].endDate = new Date(this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].endDate);
              });
              this.skillUnitDTOs = this.loadskillUnitDTOs.slice();
            });
    
            this.skillMetricService.getByUserSkillId(us.id)
            .subscribe((data: SkillMetricDTO[] | any) => {
              data.forEach(element => {
                this.loadskillMetricDTOs.push(element);  
              });
              this.skillMetricDTOs = this.loadskillMetricDTOs.slice();
            });
    
            this.commentDTOs = this.commentDTOs.concat(this.allCommentDTOs.filter(com => com.idUserSkill == us.id));
          });
          this.showCommentDTOs = this.commentDTOs.slice();
        });
    });
  }

  filterBySkillLevel(level: string){
    var selectedLevel: number = 1;
    switch (level) {
      case "Beginner":
          selectedLevel = 1;
          break;
      case "Elementary":
          selectedLevel = 2;
          break;
      case "Intermediate":
          selectedLevel = 3;
          break;
      case "Advanced":
          selectedLevel = 4;
          break;
      case "Proficiency":
          selectedLevel = 5;
          break;
    }

    this.loadskillUnitDTOs = [];
    this.loadskillMetricDTOs = [];
    this.allCommentDTOs = [];
    this.commentDTOs = [];
    this.showCommentDTOs = [];
    this.userSkillService.getAll()
    .subscribe((data: UserSkillDTO[] | any) => {
      this.userSkillDTOs = data;

      this.userSkillDTOs = this.userSkillDTOs.filter(us => us.idEmployee == parseInt(localStorage.getItem("currentmatrixemp"), 10));

      this.userSkillDTOs.forEach(us => {
        us.startDate = new Date(us.startDate);
        us.endDate = new Date(us.endDate);
      });

      this.userSkillDTOs = this.userSkillDTOs.filter(us => us.skillLevel == selectedLevel);
      this.updateUserSkillLevels();

      this.commentService.getAll()
        .subscribe((data: CommentDTO[] | any) => {
          this.allCommentDTOs = data;
        
          this.userSkillDTOs.forEach(us => {

            this.skillUnitService.getByUserSkillId(us.id)
            .subscribe((data: SkillUnitDTO[] | any) => {
              data.forEach(element => {
                this.loadskillUnitDTOs.push(element);
                this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].startDate = new Date(this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].startDate);
                this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].endDate = new Date(this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].endDate);
              });
              this.skillUnitDTOs = this.loadskillUnitDTOs.slice();
            });
    
            this.skillMetricService.getByUserSkillId(us.id)
            .subscribe((data: SkillMetricDTO[] | any) => {
              data.forEach(element => {
                this.loadskillMetricDTOs.push(element);  
              });
              this.skillMetricDTOs = this.loadskillMetricDTOs.slice();
            });
    
            this.commentDTOs = this.commentDTOs.concat(this.allCommentDTOs.filter(com => com.idUserSkill == us.id));
          });
          this.showCommentDTOs = this.commentDTOs.slice();
        });
    });
  }

  updateUserSkillLevels(){
    this.skillLevels = [];
    this.userSkillDTOs.forEach(us => {
      switch (us.skillLevel) {
        case 1:
            this.skillLevels.push("Beginner");
            break;
        case 2:
            this.skillLevels.push("Elementary");
            break;
        case 3:
            this.skillLevels.push("Intermediate");
            break;
        case 4:
            this.skillLevels.push("Advanced");
            break;
        case 5:
            this.skillLevels.push("Proficiency");
            break;
      }
    });
  }

  updateSkillUnitLevels(){
    this.unitLevels = [];
    this.skillUnitDTOs.forEach(us => {
      switch (us.unitLevel) {
        case 1:
            this.unitLevels.push("Beginner");
            break;
        case 2:
            this.unitLevels.push("Elementary");
            break;
        case 3:
            this.unitLevels.push("Intermediate");
            break;
        case 4:
            this.unitLevels.push("Advanced");
            break;
        case 5:
            this.unitLevels.push("Proficiency");
            break;
      }
    });
  }

  updateSkillMettricLevels(){
    this.metricLevels = [];
    this.skillMetricDTOs.forEach(us => {
      switch (us.metricValue) {
        case 1:
            this.metricLevels.push("Beginner");
            break;
        case 2:
            this.metricLevels.push("Elementary");
            break;
        case 3:
            this.metricLevels.push("Intermediate");
            break;
        case 4:
            this.metricLevels.push("Advanced");
            break;
        case 5:
            this.metricLevels.push("Proficiency");
            break;
      }
    });
  }

  loadData(){
    this.loadskillUnitDTOs = [];
    this.loadskillMetricDTOs = [];
    this.allCommentDTOs = [];
    this.commentDTOs = [];
    this.showCommentDTOs = [];
    this.userSkillService.getAll()
    .subscribe((data: UserSkillDTO[] | any) => {
      this.userSkillDTOs = data;

      this.userSkillDTOs = this.userSkillDTOs.filter(us => us.idEmployee == parseInt(localStorage.getItem("currentmatrixemp"), 10));

      this.userSkillDTOs.forEach(us => {
        us.startDate = new Date(us.startDate);
        us.endDate = new Date(us.endDate);
      });

      this.updateUserSkillLevels();

      this.commentService.getAll()
        .subscribe((data: CommentDTO[] | any) => {
          this.allCommentDTOs = data;
        
          this.userSkillDTOs.forEach(us => {

            this.skillUnitService.getByUserSkillId(us.id)
            .subscribe((data: SkillUnitDTO[] | any) => {
              data.forEach(element => {
                this.loadskillUnitDTOs.push(element);
                this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].startDate = new Date(this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].startDate);
                this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].endDate = new Date(this.loadskillUnitDTOs[this.loadskillUnitDTOs.length-1].endDate);
              });
              this.skillUnitDTOs = this.loadskillUnitDTOs.slice();
            });
    
            this.skillMetricService.getByUserSkillId(us.id)
            .subscribe((data: SkillMetricDTO[] | any) => {
              data.forEach(element => {
                this.loadskillMetricDTOs.push(element);  
              });
              this.skillMetricDTOs = this.loadskillMetricDTOs.slice();
            });
    
            this.commentDTOs = this.commentDTOs.concat(this.allCommentDTOs.filter(com => com.idUserSkill == us.id));
          });
          this.showCommentDTOs = this.commentDTOs.slice();
        });
    });
  }

  /*loadData(){
    this.userSkillService.getAll()
    .subscribe((data: UserSkillDTO[] | any) => {
      this.userSkillDTOs = data;

      this.userSkillDTOs = this.userSkillDTOs.filter(us => us.idEmployee == parseInt(localStorage.getItem("currentmatrixemp"), 10));

      this.userSkillDTOs.forEach(us => {
        us.startDate = new Date(us.startDate);
        us.endDate = new Date(us.endDate);
      });

      this.showUserSkillDTOs = this.userSkillDTOs.slice();

      this.commentService.getAll()
        .subscribe((data: CommentDTO[] | any) => {
          this.allCommentDTOs = data;
        
          this.userSkillDTOs.forEach(us => {

            this.skillUnitService.getByUserSkillId(us.id)
            .subscribe((data: SkillUnitDTO[] | any) => {
              data.forEach(element => {
                this.skillUnitDTOs.push(element);
                this.skillUnitDTOs[this.skillUnitDTOs.length-1].startDate = new Date(this.skillUnitDTOs[this.skillUnitDTOs.length-1].startDate);
                this.skillUnitDTOs[this.skillUnitDTOs.length-1].endDate = new Date(this.skillUnitDTOs[this.skillUnitDTOs.length-1].endDate);
              });
              this.showSkillUnitDTOs = this.skillUnitDTOs.slice();
            });
    
            this.skillMetricService.getByUserSkillId(us.id)
            .subscribe((data: SkillMetricDTO[] | any) => {
              data.forEach(element => {
                this.skillMetricDTOs.push(element);  
              });
              this.showSkillMetricDTOs = this.skillMetricDTOs.slice();
            });
    
            this.commentDTOs = this.commentDTOs.concat(this.allCommentDTOs.filter(com => com.idUserSkill == us.id));
          });

          this.showCommentDTOs = this.commentDTOs.slice();
        });
    });
  }*/

  createUserSkill(){
    this.newuserSkillDTO.idCategory = parseInt(this.newuserSkillDTO.idCategory.toString(), 10);
    this.userSkillService.pull(this.newuserSkillDTO)
    .subscribe(() => {
      this.loadData();
      var notifText: string = `User ${localStorage.getItem("currentUserNSN")} add new skill ${this.newuserSkillDTO.skillname} for employee ${localStorage.getItem("currentmatrixempNSN")}`;
      var notif: NotificationDTO = new NotificationDTO(0, notifText, new Date(), false, parseInt(localStorage.getItem("currentmatrixemp"), 10), parseInt(localStorage.getItem("currentuserid"), 10), "", "", "", "");
      this.notificationService.pull(notif);
    });
    console.log(this.newuserSkillDTO);
    this.modalService.dismissAll();
  }

  createSkillUnit(){
    this.newskillUnitDTO.idUserSkill = parseInt(this.newskillUnitDTO.idUserSkill.toString(), 10);
    this.skillUnitService.pull(this.newskillUnitDTO)
    .subscribe(() => {
      this.loadData();
      var notifText: string = `User ${localStorage.getItem("currentUserNSN")} add new skill unit ${this.newuserSkillDTO.skillname} for employee ${localStorage.getItem("currentmatrixempNSN")}`;
      var notif: NotificationDTO = new NotificationDTO(0, notifText, new Date(), false, parseInt(localStorage.getItem("currentmatrixemp"), 10), parseInt(localStorage.getItem("currentuserid"), 10), "", "", "", "");
      this.notificationService.pull(notif);
    });
    console.log(this.newskillUnitDTO);
    this.modalService.dismissAll();
  }

  createSkillMetric(){
    this.newskillMetricDTO.idUserSkill = parseInt(this.newskillMetricDTO.idUserSkill.toString(), 10);
    this.skillMetricService.pull(this.newskillMetricDTO)
    .subscribe(() => {
      this.loadData();
      var notifText: string = `User ${localStorage.getItem("currentUserNSN")} add new skill metric ${this.newuserSkillDTO.skillname} for employee ${localStorage.getItem("currentmatrixempNSN")}`;
      var notif: NotificationDTO = new NotificationDTO(0, notifText, new Date(), false, parseInt(localStorage.getItem("currentmatrixemp"), 10), parseInt(localStorage.getItem("currentuserid"), 10), "", "", "", "");
      this.notificationService.pull(notif);
    });
    console.log(this.newskillMetricDTO);
    this.modalService.dismissAll();
  }

  createComment(){
    this.newcommentDTO.idUserSkill = parseInt(this.newcommentDTO.idUserSkill.toString(), 10);
    this.commentService.pull(this.newcommentDTO)
    .subscribe(() => {
      this.loadData();
      var notifText: string = `User ${localStorage.getItem("currentUserNSN")} add new comment ${this.newuserSkillDTO.skillname} for employee ${localStorage.getItem("currentmatrixempNSN")}`;
      var notif: NotificationDTO = new NotificationDTO(0, notifText, new Date(), false, parseInt(localStorage.getItem("currentmatrixemp"), 10), parseInt(localStorage.getItem("currentuserid"), 10), "", "", "", "");
      this.notificationService.pull(notif);
    });
    console.log(this.newcommentDTO);
    this.modalService.dismissAll();
  }

  /*filterByCategs(id: number){
    this.showUserSkillDTOs = this.userSkillDTOs.filter(us => us.idCategory == id);
  }*/

  selectUsTable(){
    this.usTable = true;
    this.suTable = false;
    this.smTable = false;
    this.cmTable = false;
  }

  selectSuTable(){
    this.usTable = false;
    this.suTable = true;
    this.smTable = false;
    this.cmTable = false;
  }

  /*showSelectSkillUnits(us: UserSkillDTO){
    this.showSkillUnitDTOs = this.skillUnitDTOs.filter(su => su.idUserSkill == us.id);
    this.selectSuTable();
  }*/
  showSelectSkillUnits(us: UserSkillDTO){
    this.skillUnitDTOs = this.loadskillUnitDTOs.filter(su => su.idUserSkill == us.id);
    this.newskillUnitDTO.idUserSkill = us.id;
    this.newskillUnitDTO.skillName = us.skillname;
    this.updateSkillUnitLevels();
    this.selectSuTable();
  }

  selectSmTable(){
    this.usTable = false;
    this.suTable = false;
    this.smTable = true;
    this.cmTable = false;
  }

  /*showSelectSkillMetrics(us: UserSkillDTO){
    this.showSkillMetricDTOs = this.skillMetricDTOs.filter(sm => sm.idUserSkill == us.id);
    this.selectSmTable();
  }*/
  showSelectSkillMetrics(us: UserSkillDTO){
    this.skillMetricDTOs = this.loadskillMetricDTOs.filter(sm => sm.idUserSkill == us.id);
    this.newskillMetricDTO.idUserSkill = us.id;
    this.newskillMetricDTO.skillName = us.skillname;
    this.updateSkillMettricLevels();
    this.selectSmTable();
  }

  selectCmTable(){
    this.usTable = false;
    this.suTable = false;
    this.smTable = false;
    this.cmTable = true;
  }

  /*showSelectComments(us: UserSkillDTO){
    this.showCommentDTOs = this.commentDTOs.filter(cm => cm.idUserSkill == us.id);
    this.selectCmTable();
  }*/
  showSelectComments(us: UserSkillDTO){
    this.showCommentDTOs = this.commentDTOs.filter(cm => cm.idUserSkill == us.id);
    this.newcommentDTO.idUserSkill = us.id;
    this.newcommentDTO.skillName = us.skillname;
    this.selectCmTable();
  }

  byUsMode1(){
    if(this.usmode1){
      this.userSkillDTOs.sort((a,b) => (a.skillname==undefined || b.skillname==undefined) ? 
      0 : (a.skillname > b.skillname) ? 1 : (b.skillname > a.skillname) ? -1 : 0);
    }
    else{
      this.userSkillDTOs.sort((a,b) => (a.skillname==undefined || b.skillname==undefined) ? 
      0 : (a.skillname < b.skillname) ? 1 : (b.skillname < a.skillname) ? -1 : 0);
    }
    this.updateUserSkillLevels();
    this.usmode1=!this.usmode1;
  }

  byUsMode2(){
    if(this.usmode2){
      this.userSkillDTOs.sort((a,b) => (a.startDate==undefined || b.startDate==undefined) ? 
      0 : (a.startDate > b.startDate) ? 1 : (b.startDate > a.startDate) ? -1 : 0);
    }
    else{
      this.userSkillDTOs.sort((a,b) => (a.startDate==undefined || b.startDate==undefined) ? 
      0 : (a.startDate < b.startDate) ? 1 : (b.startDate < a.startDate) ? -1 : 0);
    }
    this.updateUserSkillLevels();
    this.usmode2=!this.usmode2;
  }

  byUsMode3(){
    if(this.usmode3){
      this.userSkillDTOs.sort((a,b) => (a.endDate==undefined || b.endDate==undefined) ? 
      0 : (a.endDate > b.endDate) ? 1 : (b.endDate > a.endDate) ? -1 : 0);
    }
    else{
      this.userSkillDTOs.sort((a,b) => (a.endDate==undefined || b.endDate==undefined) ? 
      0 : (a.endDate < b.endDate) ? 1 : (b.endDate < a.endDate) ? -1 : 0);
    }
    this.updateUserSkillLevels();
    this.usmode3=!this.usmode3;
  }

  byUsMode4(){
    if(this.usmode4){
      this.userSkillDTOs.sort((a,b) => (a.skillLevel==undefined || b.skillLevel==undefined) ? 
      0 : (a.skillLevel > b.skillLevel) ? 1 : (b.skillLevel > a.skillLevel) ? -1 : 0);
    }
    else{
      this.userSkillDTOs.sort((a,b) => (a.skillLevel==undefined || b.skillLevel==undefined) ? 
      0 : (a.skillLevel < b.skillLevel) ? 1 : (b.skillLevel < a.skillLevel) ? -1 : 0);
    }
    this.updateUserSkillLevels();
    this.usmode4=!this.usmode4;
  }

  byUsMode5(){
    if(this.usmode5){
      this.userSkillDTOs.sort((a,b) => (a.categoryTitle==undefined || b.categoryTitle==undefined) ? 
      0 : (a.categoryTitle > b.categoryTitle) ? 1 : (b.categoryTitle > a.categoryTitle) ? -1 : 0);
    }
    else{
      this.userSkillDTOs.sort((a,b) => (a.categoryTitle==undefined || b.categoryTitle==undefined) ? 
      0 : (a.categoryTitle < b.categoryTitle) ? 1 : (b.categoryTitle < a.categoryTitle) ? -1 : 0);
    }
    this.updateUserSkillLevels();
    this.usmode5=!this.usmode5;
  }

  byUsMode6(){
    if(this.usmode6){
      this.userSkillDTOs.sort((a,b) => (a.employeeNSN==undefined || b.employeeNSN==undefined) ? 
      0 : (a.employeeNSN > b.employeeNSN) ? 1 : (b.employeeNSN > a.employeeNSN) ? -1 : 0);
    }
    else{
      this.userSkillDTOs.sort((a,b) => (a.employeeNSN==undefined || b.employeeNSN==undefined) ? 
      0 : (a.employeeNSN < b.employeeNSN) ? 1 : (b.employeeNSN < a.employeeNSN) ? -1 : 0);
    }
    this.updateUserSkillLevels();
    this.usmode6=!this.usmode6;
  }

  bySuMode1(){
    if(this.sumode1){
      this.skillUnitDTOs.sort((a,b) => (a.unitname==undefined || b.unitname==undefined) ? 
      0 : (a.unitname > b.unitname) ? 1 : (b.unitname > a.unitname) ? -1 : 0);
    }
    else{
      this.skillUnitDTOs.sort((a,b) => (a.unitname==undefined || b.unitname==undefined) ? 
      0 : (a.unitname < b.unitname) ? 1 : (b.unitname < a.unitname) ? -1 : 0);
    }
    this.updateSkillUnitLevels();
    this.sumode1=!this.sumode1;
  }

  bySuMode2(){
    if(this.sumode2){
      this.skillUnitDTOs.sort((a,b) => (a.startDate==undefined || b.startDate==undefined) ? 
      0 : (a.startDate > b.startDate) ? 1 : (b.startDate > a.startDate) ? -1 : 0);
    }
    else{
      this.skillUnitDTOs.sort((a,b) => (a.startDate==undefined || b.startDate==undefined) ? 
      0 : (a.startDate < b.startDate) ? 1 : (b.startDate < a.startDate) ? -1 : 0);
    }
    this.updateSkillUnitLevels();
    this.sumode2=!this.sumode2;
  }

  bySuMode3(){
    if(this.sumode3){
      this.skillUnitDTOs.sort((a,b) => (a.endDate==undefined || b.endDate==undefined) ? 
      0 : (a.endDate > b.endDate) ? 1 : (b.endDate > a.endDate) ? -1 : 0);
    }
    else{
      this.skillUnitDTOs.sort((a,b) => (a.endDate==undefined || b.endDate==undefined) ? 
      0 : (a.endDate < b.endDate) ? 1 : (b.endDate < a.endDate) ? -1 : 0);
    }
    this.updateSkillUnitLevels();
    this.sumode3=!this.sumode3;
  }

  bySuMode4(){
    if(this.sumode4){
      this.skillUnitDTOs.sort((a,b) => (a.unitLevel==undefined || b.unitLevel==undefined) ? 
      0 : (a.unitLevel > b.unitLevel) ? 1 : (b.unitLevel > a.unitLevel) ? -1 : 0);
    }
    else{
      this.skillUnitDTOs.sort((a,b) => (a.unitLevel==undefined || b.unitLevel==undefined) ? 
      0 : (a.unitLevel < b.unitLevel) ? 1 : (b.unitLevel < a.unitLevel) ? -1 : 0);
    }
    this.updateSkillUnitLevels();
    this.sumode4=!this.sumode4;
  }

  bySuMode5(){
    if(this.sumode5){
      this.skillUnitDTOs.sort((a,b) => (a.skillName==undefined || b.skillName==undefined) ? 
      0 : (a.skillName > b.skillName) ? 1 : (b.skillName > a.skillName) ? -1 : 0);
    }
    else{
      this.skillUnitDTOs.sort((a,b) => (a.skillName==undefined || b.skillName==undefined) ? 
      0 : (a.skillName < b.skillName) ? 1 : (b.skillName < a.skillName) ? -1 : 0);
    }
    this.updateSkillUnitLevels();
    this.sumode5=!this.sumode5;
  }

  bySmMode1(){
    if(this.smmode1){
      this.skillMetricDTOs.sort((a,b) => (a.metricName==undefined || b.metricName==undefined) ? 
      0 : (a.metricName > b.metricName) ? 1 : (b.metricName > a.metricName) ? -1 : 0);
    }
    else{
      this.skillMetricDTOs.sort((a,b) => (a.metricName==undefined || b.metricName==undefined) ? 
      0 : (a.metricName < b.metricName) ? 1 : (b.metricName < a.metricName) ? -1 : 0);
    }
    this.updateSkillMettricLevels();
    this.smmode1=!this.smmode1;
  }

  bySmMode2(){
    if(this.smmode2){
      this.skillMetricDTOs.sort((a,b) => (a.metricValue==undefined || b.metricValue==undefined) ? 
      0 : (a.metricValue > b.metricValue) ? 1 : (b.metricValue > a.metricValue) ? -1 : 0);
    }
    else{
      this.skillMetricDTOs.sort((a,b) => (a.metricValue==undefined || b.metricValue==undefined) ? 
      0 : (a.metricValue < b.metricValue) ? 1 : (b.metricValue < a.metricValue) ? -1 : 0);
    }
    this.updateSkillMettricLevels();
    this.smmode2=!this.smmode2;
  }

  bySmMode3(){
    if(this.smmode3){
      this.skillMetricDTOs.sort((a,b) => (a.metricInfluence==undefined || b.metricInfluence==undefined) ? 
      0 : (a.metricInfluence > b.metricInfluence) ? 1 : (b.metricInfluence > a.metricInfluence) ? -1 : 0);
    }
    else{
      this.skillMetricDTOs.sort((a,b) => (a.metricInfluence==undefined || b.metricInfluence==undefined) ? 
      0 : (a.metricInfluence < b.metricInfluence) ? 1 : (b.metricInfluence < a.metricInfluence) ? -1 : 0);
    }
    this.updateSkillMettricLevels();
    this.smmode3=!this.smmode3;
  }

  bySmMode4(){
    if(this.smmode4){
      this.skillMetricDTOs.sort((a,b) => (a.skillName==undefined || b.skillName==undefined) ? 
      0 : (a.skillName > b.skillName) ? 1 : (b.skillName > a.skillName) ? -1 : 0);
    }
    else{
      this.skillMetricDTOs.sort((a,b) => (a.skillName==undefined || b.skillName==undefined) ? 
      0 : (a.skillName < b.skillName) ? 1 : (b.skillName < a.skillName) ? -1 : 0);
    }
    this.updateSkillMettricLevels();
    this.smmode4=!this.smmode4;
  }

  byCmMode1(){
    if(this.cmmode1){
      this.commentDTOs.sort((a,b) => (a.commentText==undefined || b.commentText==undefined) ? 
      0 : (a.commentText > b.commentText) ? 1 : (b.commentText > a.commentText) ? -1 : 0);
    }
    else{
      this.commentDTOs.sort((a,b) => (a.commentText==undefined || b.commentText==undefined) ? 
      0 : (a.commentText < b.commentText) ? 1 : (b.commentText < a.commentText) ? -1 : 0);
    }
    this.cmmode1=!this.cmmode1;
  }

  byCmMode2(){
    if(this.cmmode2){
      this.commentDTOs.sort((a,b) => (a.employerNSN==undefined || b.employerNSN==undefined) ? 
      0 : (a.employerNSN > b.employerNSN) ? 1 : (b.employerNSN > a.employerNSN) ? -1 : 0);
    }
    else{
      this.commentDTOs.sort((a,b) => (a.employerNSN==undefined || b.employerNSN==undefined) ? 
      0 : (a.employerNSN < b.employerNSN) ? 1 : (b.employerNSN < a.employerNSN) ? -1 : 0);
    }
    this.cmmode2=!this.cmmode2;
  }

  byCmMode3(){
    if(this.cmmode3){
      this.commentDTOs.sort((a,b) => (a.skillName==undefined || b.skillName==undefined) ? 
      0 : (a.skillName > b.skillName) ? 1 : (b.skillName > a.skillName) ? -1 : 0);
    }
    else{
      this.commentDTOs.sort((a,b) => (a.skillName==undefined || b.skillName==undefined) ? 
      0 : (a.skillName < b.skillName) ? 1 : (b.skillName < a.skillName) ? -1 : 0);
    }
    this.cmmode3=!this.cmmode3;
  }
}
