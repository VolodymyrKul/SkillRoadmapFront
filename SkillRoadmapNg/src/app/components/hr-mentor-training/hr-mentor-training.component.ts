import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/models/category-dto';
import { EmployerDTO } from 'src/app/models/employer-dto';
import { RecommendationDTO } from 'src/app/models/recommendation-dto';
import { TrainingDTO } from 'src/app/models/training-dto';
import { TrainingMemberDTO } from 'src/app/models/training-member-dto';
import { CategoryService } from 'src/app/services/category.service';
import { EmployerService } from 'src/app/services/employer.service';
import { RecommendationService } from 'src/app/services/recommendation.service';
import { TrainingMemberService } from 'src/app/services/training-member.service';
import { TrainingService } from 'src/app/services/training.service';
import { ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hr-mentor-training',
  templateUrl: './hr-mentor-training.component.html',
  styleUrls: ['./hr-mentor-training.component.css']
})
export class HrMentorTrainingComponent implements OnInit {

  @ViewChild('trModal')
  private trRef: TemplateRef<any>;

  @ViewChild('recModal')
  private recRef: TemplateRef<any>;

  trainingDTOs: TrainingDTO[] = [];
  recommendationDTOs: RecommendationDTO[] = [];
  trainingMemberDTOs: TrainingMemberDTO[] = [];
  categoryDTOs: CategoryDTO[] = [];
  employerDTOs: EmployerDTO[] = []; 
  newtrainingDTO: TrainingDTO = new TrainingDTO(0,"Training Title", "Description", new Date(), new Date(), 1, 0, 1, 1);
  newrecommendationDTO: RecommendationDTO = new RecommendationDTO(0,0,"Invitation", false, 1);

  trmode1: boolean = false;
  trmode2: boolean = false;
  trmode3: boolean = false;
  trmode4: boolean = false;
  trmode5: boolean = false;
  trmode6: boolean = false;
  trmode7: boolean = false;

  trainingMode: boolean[] = [];

  recmode1: boolean = false;
  recmode2: boolean = false;

  memmode1: boolean = false;
  memmode2: boolean = false;
  memmode3: boolean = false;

  trTable: boolean = true;
  trmemTable: boolean = false;
  recTable: boolean = false;

  closeResult = '';

  constructor(private trainingService: TrainingService, 
    private recommendationService: RecommendationService, 
    private trainingMemberService: TrainingMemberService,
    private categoryService: CategoryService,
    private employerService: EmployerService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.trainingService.getByCoachId(parseInt(localStorage.getItem("currentuserid"), 10))
    .subscribe((data: TrainingDTO[] | any) => {
      this.trainingDTOs = data;
      this.trainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);

        this.recommendationService.getTrainingsById(tr.id)
        .subscribe((data: RecommendationDTO[] | any) => {
          if(data != undefined && data != null && data.length > 1){
            this.recommendationDTOs.push(data[0]);
          }
        })

        this.trainingMemberService.getByTrainingId(tr.id)
        .subscribe((data: TrainingMemberDTO[] | any) => {
          data.forEach(el => {
            this.trainingMemberDTOs.push(el);
          });
        });
      });

      this.categoryService.getAll()
      .subscribe((data : CategoryDTO[] | any) => {
        this.categoryDTOs = data;
      });

      this.employerService.getAll()
      .subscribe((data : EmployerDTO[] | any) => {
        this.employerDTOs = data;
      });
      console.log(this.trainingDTOs);
      console.log(this.recommendationDTOs);
      console.log(this.trainingMemberDTOs);
    });
  }

  openCreateModal(){
    console.log(this.trRef);
    this.modalService.open(this.trRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCreateRecModal(){
    console.log(this.trRef);
    this.modalService.open(this.recRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  createTraining(){
    this.newtrainingDTO.idCategory = parseInt(this.newtrainingDTO.idCategory.toString(), 10);
    this.newtrainingDTO.idCoach = parseInt(localStorage.getItem("currentuserid"), 10);
    console.log(this.newtrainingDTO);
    //this.trainingService.pull(this.newtrainingDTO);
    this.modalService.dismissAll();
  }

  createRecommendation(){
    console.log(this.newrecommendationDTO);
    this.newrecommendationDTO.idTraining = parseInt(this.newrecommendationDTO.idTraining.toString(), 10);
    //this.recommendationService.pull(this.newrecommendationDTO);
    this.modalService.dismissAll();
  }

  selectTrTable(){
    this.trTable = true;
    this.trmemTable = false;
    this.recTable = false;
  }
  selectTrMemTable(){
    this.trTable = false;
    this.trmemTable = true;
    this.recTable = false;
  }
  selectRecTable(){
    this.trTable = false;
    this.trmemTable = false;
    this.recTable = true;
  }

  changemodearr(d: TrainingDTO){
    this.trainingMode[this.trainingDTOs.indexOf(d)] = !this.trainingMode[this.trainingDTOs.indexOf(d)];
  }

  byTrMode1(){
    if(this.trmode1){
      this.trainingDTOs.sort((a,b) => (a.trainingTitle==undefined || b.trainingTitle==undefined) ? 
      0 : (a.trainingTitle > b.trainingTitle) ? 1 : (b.trainingTitle > a.trainingTitle) ? -1 : 0);
    }
    else{
      this.trainingDTOs.sort((a,b) => (a.trainingTitle==undefined || b.trainingTitle==undefined) ? 
      0 : (a.trainingTitle < b.trainingTitle) ? 1 : (b.trainingTitle < a.trainingTitle) ? -1 : 0);
    }
    this.trmode1=!this.trmode1;
  }
  byTrMode2(){
    if(this.trmode2){
      this.trainingDTOs.sort((a,b) => (a.trainingLevel==undefined || b.trainingLevel==undefined) ? 
      0 : (a.trainingLevel > b.trainingLevel) ? 1 : (b.trainingLevel > a.trainingLevel) ? -1 : 0);
    }
    else{
      this.trainingDTOs.sort((a,b) => (a.trainingLevel==undefined || b.trainingLevel==undefined) ? 
      0 : (a.trainingLevel < b.trainingLevel) ? 1 : (b.trainingLevel < a.trainingLevel) ? -1 : 0);
    }
    this.trmode2=!this.trmode2;
  }
  byTrMode3(){
    if(this.trmode3){
      this.trainingDTOs.sort((a,b) => (a.startDate==undefined || b.startDate==undefined) ? 
      0 : (a.startDate > b.startDate) ? 1 : (b.startDate > a.startDate) ? -1 : 0);
    }
    else{
      this.trainingDTOs.sort((a,b) => (a.startDate==undefined || b.startDate==undefined) ? 
      0 : (a.startDate < b.startDate) ? 1 : (b.startDate < a.startDate) ? -1 : 0);
    }
    this.trmode3=!this.trmode3;
  }
  byTrMode4(){
    if(this.trmode4){
      this.trainingDTOs.sort((a,b) => (a.endDate==undefined || b.endDate==undefined) ? 
      0 : (a.endDate > b.endDate) ? 1 : (b.endDate > a.endDate) ? -1 : 0);
    }
    else{
      this.trainingDTOs.sort((a,b) => (a.endDate==undefined || b.endDate==undefined) ? 
      0 : (a.endDate < b.endDate) ? 1 : (b.endDate < a.endDate) ? -1 : 0);
    }
    this.trmode4=!this.trmode4;
  }
  byTrMode5(){
    if(this.trmode5){
      this.trainingDTOs.sort((a,b) => (a.payment==undefined || b.payment==undefined) ? 
      0 : (a.payment > b.payment) ? 1 : (b.payment > a.payment) ? -1 : 0);
    }
    else{
      this.trainingDTOs.sort((a,b) => (a.payment==undefined || b.payment==undefined) ? 
      0 : (a.payment < b.payment) ? 1 : (b.payment < a.payment) ? -1 : 0);
    }
    this.trmode5=!this.trmode5;
  }
  byTrMode6(){
    if(this.trmode6){
      this.trainingDTOs.sort((a,b) => (a.coachNSN==undefined || b.coachNSN==undefined) ? 
      0 : (a.coachNSN > b.coachNSN) ? 1 : (b.coachNSN > a.coachNSN) ? -1 : 0);
    }
    else{
      this.trainingDTOs.sort((a,b) => (a.coachNSN==undefined || b.coachNSN==undefined) ? 
      0 : (a.coachNSN < b.coachNSN) ? 1 : (b.coachNSN < a.coachNSN) ? -1 : 0);
    }
    this.trmode6=!this.trmode6;
  }
  byTrMode7(){
    if(this.trmode7){
      this.trainingDTOs.sort((a,b) => (a.categoryTitle==undefined || b.categoryTitle==undefined) ? 
      0 : (a.categoryTitle > b.categoryTitle) ? 1 : (b.categoryTitle > a.categoryTitle) ? -1 : 0);
    }
    else{
      this.trainingDTOs.sort((a,b) => (a.categoryTitle==undefined || b.categoryTitle==undefined) ? 
      0 : (a.categoryTitle < b.categoryTitle) ? 1 : (b.categoryTitle < a.categoryTitle) ? -1 : 0);
    }
    this.trmode7=!this.trmode7;
  }

  byRecMode1(){
    if(this.recmode1){
      this.recommendationDTOs.sort((a,b) => (a.trainingTitle==undefined || b.trainingTitle==undefined) ? 
      0 : (a.trainingTitle > b.trainingTitle) ? 1 : (b.trainingTitle > a.trainingTitle) ? -1 : 0);
    }
    else{
      this.recommendationDTOs.sort((a,b) => (a.trainingTitle==undefined || b.trainingTitle==undefined) ? 
      0 : (a.trainingTitle < b.trainingTitle) ? 1 : (b.trainingTitle < a.trainingTitle) ? -1 : 0);
    }
    this.recmode1=!this.recmode1;
  }

  byRecMode2(){
    if(this.recmode2){
      this.recommendationDTOs.sort((a,b) => (a.invitation==undefined || b.invitation==undefined) ? 
      0 : (a.invitation > b.invitation) ? 1 : (b.invitation > a.invitation) ? -1 : 0);
    }
    else{
      this.recommendationDTOs.sort((a,b) => (a.invitation==undefined || b.invitation==undefined) ? 
      0 : (a.invitation < b.invitation) ? 1 : (b.invitation < a.invitation) ? -1 : 0);
    }
    this.recmode2=!this.recmode2;
  }

  byMemMode1(){
    if(this.memmode1){
      this.trainingMemberDTOs.sort((a,b) => (a.trainingTitle==undefined || b.trainingTitle==undefined) ? 
      0 : (a.trainingTitle > b.trainingTitle) ? 1 : (b.trainingTitle > a.trainingTitle) ? -1 : 0);
    }
    else{
      this.trainingMemberDTOs.sort((a,b) => (a.trainingTitle==undefined || b.trainingTitle==undefined) ? 
      0 : (a.trainingTitle < b.trainingTitle) ? 1 : (b.trainingTitle < a.trainingTitle) ? -1 : 0);
    }
    this.memmode1=!this.memmode1;
  }

  byMemMode2(){
    if(this.memmode2){
      this.trainingMemberDTOs.sort((a,b) => (a.memberNSN==undefined || b.memberNSN==undefined) ? 
      0 : (a.memberNSN > b.memberNSN) ? 1 : (b.memberNSN > a.memberNSN) ? -1 : 0);
    }
    else{
      this.trainingMemberDTOs.sort((a,b) => (a.memberNSN==undefined || b.memberNSN==undefined) ? 
      0 : (a.memberNSN < b.memberNSN) ? 1 : (b.memberNSN < a.memberNSN) ? -1 : 0);
    }
    this.memmode2=!this.memmode2;
  }

  byMemMode3(){
    if(this.memmode3){
      this.trainingMemberDTOs.sort((a,b) => (a.isEnded==undefined || b.isEnded==undefined) ? 
      0 : (a.isEnded > b.isEnded) ? 1 : (b.isEnded > a.isEnded) ? -1 : 0);
    }
    else{
      this.trainingMemberDTOs.sort((a,b) => (a.isEnded==undefined || b.isEnded==undefined) ? 
      0 : (a.isEnded < b.isEnded) ? 1 : (b.isEnded < a.isEnded) ? -1 : 0);
    }
    this.memmode3=!this.memmode3;
  }
}
