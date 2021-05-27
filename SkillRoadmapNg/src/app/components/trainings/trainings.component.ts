import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training';
import { ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TrainingDTO } from 'src/app/models/training-dto';
import { RecommendationDTO } from 'src/app/models/recommendation-dto';
import { EmployeeDTO } from 'src/app/models/employee-dto';
import { EmployeeService } from 'src/app/services/employee.service';
import { RecommendationService } from 'src/app/services/recommendation.service';
import { ActivatedRoute } from '@angular/router';
import { TrainingMemberService } from 'src/app/services/training-member.service';
import { TrainingMemberDTO } from 'src/app/models/training-member-dto';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  /*@ViewChild('trainingModal')
  private createRef: TemplateRef<any>;

  trainings: Training[] = [];
  trainingsDTO: TrainingDTO[] = [];
  userRole: string = "";
  categs: string[] = [];
  trainingMode: boolean[] = [];
  showTrainings: Training[] = [];
  showTrainingsDTO: TrainingDTO[] = [];
  tableMode: boolean = false;
  addedTraining: Training = new Training("","",new Date(),new Date(),1,0,localStorage.getItem("currentuser"),"");
  closeResult: string = "";
  addedRecommend: RecommendationDTO = new RecommendationDTO(0,0,"",false,0,"","","");
  recInvitation: string = "";
  employees: EmployeeDTO[] = [];*/
  trainingDTO: TrainingDTO = new TrainingDTO();
  newTrainingMemberDTO: TrainingMemberDTO = new TrainingMemberDTO(0, 1, 1, false, '', '', '');

  constructor(private trainingService: TrainingService, private modalService: NgbModal, 
    private employeeService: EmployeeService, private recommendationService: RecommendationService, private route: ActivatedRoute,
    private trainingMemberService: TrainingMemberService) { }

  createTrainingMember(){
    var employeeId: number = parseInt(localStorage.getItem("currentuserid"), 10);
    this.newTrainingMemberDTO.idTraining = this.trainingDTO.id;
    this.newTrainingMemberDTO.idMember = employeeId;
    console.log(this.newTrainingMemberDTO);
    this.trainingMemberService.pull(this.newTrainingMemberDTO)
    .subscribe((data: any) => {
      alert("You connected successful");
    });
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParamMap.get('trId'));
    this.trainingService.getById(parseInt(this.route.snapshot.queryParamMap.get('trId'), 10))
    .subscribe((data: TrainingDTO | any) => {
      this.trainingDTO = data;
      this.trainingDTO.startDate = new Date(this.trainingDTO.startDate);
      this.trainingDTO.endDate = new Date(this.trainingDTO.endDate);
    });

    /*this.userRole = localStorage.getItem('currentrole');
    if(this.userRole == 'HR' || this.userRole == 'Mentor'){
      this.tableMode = true;
      this.trainingService.getByCoachId(parseInt(localStorage.getItem("currentuserid"), 10))
      .subscribe((data: TrainingDTO[] | any) => {
        this.showTrainingsDTO = data;
        this.trainingMode = [];
        this.showTrainingsDTO.forEach(tr => {
          this.trainingMode.push(false);
          tr.startDate = new Date(tr.startDate);
          tr.endDate = new Date(tr.endDate);
        })
      });
      this.employeeService.getAll()
      .subscribe((data: EmployeeDTO[] | any) => {
        this.employees = data;
      })
    }
    else{
      this.tableMode = false;
      this.trainingService.getAll()
      .subscribe((data : TrainingDTO[] | any) => {
        this.trainingsDTO = data;
        this.trainingMode = [];
        this.trainingsDTO.forEach(tr => {
          this.categs.push(tr.categoryTitle);
          tr.startDate = new Date(tr.startDate);
          tr.endDate = new Date(tr.endDate);
        });
        this.categs = this.categs.filter((x, i, a) => a.indexOf(x) === i);
        this.showTrainingsDTO = this.trainingsDTO.filter(tr => tr.categoryTitle == this.categs[0]);
        this.showTrainingsDTO.forEach(tr => this.trainingMode.push(false));
      });
    }*/
  }

  /*selectCateg(categ: string){
    this.showTrainings = this.trainings.filter(tr => tr.categoryName == categ);
    this.trainingMode = [];
    this.showTrainings.forEach(tr => this.trainingMode.push(false));
  }

  changemodearr(d: TrainingDTO){
    this.trainingMode[this.trainingsDTO.indexOf(d)] = !this.trainingMode[this.trainingsDTO.indexOf(d)];
  }

  openCreateTrModal(){
    this.modalService.open(this.createRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  saveTraining(){
    console.log(this.addedTraining);
  }
  
  createRecommend(training: TrainingDTO){
    this.employees.forEach(emp => {
      this.addedRecommend.idEmployee = emp.id;
      this.addedRecommend.invitation = this.recInvitation;
      this.addedRecommend.idTraining = training.id;
      this.recommendationService.pull(this.addedRecommend);
    })    
  }*/
}
