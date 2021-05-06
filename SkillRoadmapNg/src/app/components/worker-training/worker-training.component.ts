import { Component, OnInit } from '@angular/core';
import { RecommendationDTO } from 'src/app/models/recommendation-dto';
import { TrainingDTO } from 'src/app/models/training-dto';
import { RecommendationService } from 'src/app/services/recommendation.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-worker-training',
  templateUrl: './worker-training.component.html',
  styleUrls: ['./worker-training.component.css']
})
export class WorkerTrainingComponent implements OnInit {
  trainingDTOs: TrainingDTO[] = [];
  recommendationDTOs: RecommendationDTO[] = [];
  trmode1: boolean = false;
  trmode2: boolean = false;
  trmode3: boolean = false;
  trmode4: boolean = false;
  trmode5: boolean = false;
  trmode6: boolean = false;
  trmode7: boolean = false;

  recmode1: boolean = false;
  recmode2: boolean = false;
  trainingMode: boolean[] = [];
  trTable: boolean = true;
  recTable: boolean = false;

  constructor(private trainingService: TrainingService, private recommendationService: RecommendationService) { }

  ngOnInit(): void {
    this.trainingService.getAll()
    .subscribe((data: TrainingDTO[] | any) => {
      this.trainingDTOs = data;
      this.trainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.trainingMode.push(false);
      });
      console.log(this.trainingDTOs);
    });

    this.recommendationService.getEmployeeById(parseInt(localStorage.getItem("currentuserid"), 10))
    .subscribe((data: RecommendationDTO[] | any) => {
      this.recommendationDTOs = data;
      console.log(this.recommendationDTOs);
    });
  }

  selectTrTable(){
    this.trTable = true;
    this.recTable = false;
  }
  selectRecTable(){
    this.trTable = false;
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
}
