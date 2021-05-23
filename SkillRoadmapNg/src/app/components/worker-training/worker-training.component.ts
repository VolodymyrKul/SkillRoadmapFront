import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-worker-training',
  templateUrl: './worker-training.component.html',
  styleUrls: ['./worker-training.component.css']
})
export class WorkerTrainingComponent implements OnInit {
  trainingDTOs: TrainingDTO[] = [];
  myTrainingDTOs: TrainingDTO[] = [];
  recommendationDTOs: RecommendationDTO[] = [];
  trainingMemberDTOs: TrainingMemberDTO[] = [];
  isEnded: boolean[] = [];
  trMembersTemplates: number[] = [];
  trmode1: boolean = false;
  trmode2: boolean = false;
  trmode3: boolean = false;
  trmode4: boolean = false;
  trmode5: boolean = false;
  trmode6: boolean = false;
  trmode7: boolean = false;
  trmode8: boolean = false;

  mytrmode1: boolean = false;
  mytrmode2: boolean = false;
  mytrmode3: boolean = false;
  mytrmode4: boolean = false;
  mytrmode5: boolean = false;
  mytrmode6: boolean = false;
  mytrmode7: boolean = false;
  mytrmode8: boolean = false;

  recmode1: boolean = false;
  recmode2: boolean = false;
  trainingMode: boolean[] = [];
  mytrainingMode: boolean[] = [];
  trTable: boolean = true;
  recTable: boolean = false;
  mytrTable: boolean = false;

  trLevels: string[] = [];
  mytrLevels: string[] = [];

  categoryDTOs: CategoryDTO[] = [];
  selectcategory: number = 1;
  employerDTOs: EmployerDTO[] = [];
  selectemployer: number = 1;
  filterSkillLevels: string[] = ["Beginner", "Elementary", "Intermediate", "Advanced", "Proficiency"];
  filterLevel: string = "Beginner";

  constructor(private trainingService: TrainingService, private recommendationService: RecommendationService, 
    private trainingMemberService: TrainingMemberService, private router: Router, private categoryService: CategoryService,
    private employerService: EmployerService) { }

  ngOnInit(): void {
    this.loadData();
    this.categoryService.getAll()
    .subscribe((data: CategoryDTO[] | any) => {
      this.categoryDTOs = data;
    });
    this.employerService.getAll()
    .subscribe((data: EmployerDTO[] | any) => {
      this.employerDTOs = data;
    })
  }

  filterByCategory(id: number){
    this.trainingService.getAll()
    .subscribe((data: TrainingDTO[] | any) => {
      this.trainingDTOs = data;
      this.myTrainingDTOs = data;
      //console.log(this.trainingDTOs);

      this.trainingMemberService.getByMemberId(parseInt(localStorage.getItem("currentuserid"), 10))
      .subscribe((data: TrainingMemberDTO[] | any) => {
        this.trainingMemberDTOs = data;

        this.trainingMemberDTOs.forEach(tm => {
          this.trMembersTemplates.push(tm.idTraining);
        });
        this.trMembersTemplates = this.trMembersTemplates.filter((v, i, a) => a.indexOf(v) === i);
        
        this.myTrainingDTOs = [];
        this.isEnded = [];
        this.trMembersTemplates.forEach(tm => {
          this.myTrainingDTOs.push(this.trainingDTOs.find(mt => mt.id == tm));
          this.isEnded.push(this.trainingMemberDTOs.find(trm => trm.idTraining == tm).isEnded);
        });
        console.log(this.isEnded);
        this.trMembersTemplates.forEach(tm => {
          this.trainingDTOs = this.trainingDTOs.filter(tr => tr.id != tm)
        }); 

        this.trainingDTOs = this.trainingDTOs.filter(tr => tr.idCategory == id);
        this.myTrainingDTOs = this.myTrainingDTOs.filter(tr => tr.idCategory == id);

        this.updateTrLevels();
        this.updateMyTrLevels();
      });

      this.trainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.trainingMode.push(false);
      });

      this.isEnded = [];
      this.myTrainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.mytrainingMode.push(false);
      });
    });

    this.recommendationService.getEmployeeById(parseInt(localStorage.getItem("currentuserid"), 10))
    .subscribe((data: RecommendationDTO[] | any) => {
      this.recommendationDTOs = data;
    });

  }

  filterByEmployer(id: number){
    this.trainingService.getAll()
    .subscribe((data: TrainingDTO[] | any) => {
      this.trainingDTOs = data;
      this.myTrainingDTOs = data;
      //console.log(this.trainingDTOs);

      this.trainingMemberService.getByMemberId(parseInt(localStorage.getItem("currentuserid"), 10))
      .subscribe((data: TrainingMemberDTO[] | any) => {
        this.trainingMemberDTOs = data;

        this.trainingMemberDTOs.forEach(tm => {
          this.trMembersTemplates.push(tm.idTraining);
        });
        this.trMembersTemplates = this.trMembersTemplates.filter((v, i, a) => a.indexOf(v) === i);
        
        this.myTrainingDTOs = [];
        this.isEnded = [];
        this.trMembersTemplates.forEach(tm => {
          this.myTrainingDTOs.push(this.trainingDTOs.find(mt => mt.id == tm));
          this.isEnded.push(this.trainingMemberDTOs.find(trm => trm.idTraining == tm).isEnded);
        });
        console.log(this.isEnded);
        this.trMembersTemplates.forEach(tm => {
          this.trainingDTOs = this.trainingDTOs.filter(tr => tr.id != tm)
        }); 

        this.trainingDTOs = this.trainingDTOs.filter(tr => tr.idCoach == id);
        this.myTrainingDTOs = this.myTrainingDTOs.filter(tr => tr.idCoach == id);

        this.updateTrLevels();
        this.updateMyTrLevels();
      });

      this.trainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.trainingMode.push(false);
      });

      this.isEnded = [];
      this.myTrainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.mytrainingMode.push(false);
      });
    });

    this.recommendationService.getEmployeeById(parseInt(localStorage.getItem("currentuserid"), 10))
    .subscribe((data: RecommendationDTO[] | any) => {
      this.recommendationDTOs = data;
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

    this.trainingService.getAll()
    .subscribe((data: TrainingDTO[] | any) => {
      this.trainingDTOs = data;
      this.myTrainingDTOs = data;
      //console.log(this.trainingDTOs);

      this.trainingMemberService.getByMemberId(parseInt(localStorage.getItem("currentuserid"), 10))
      .subscribe((data: TrainingMemberDTO[] | any) => {
        this.trainingMemberDTOs = data;

        this.trainingMemberDTOs.forEach(tm => {
          this.trMembersTemplates.push(tm.idTraining);
        });
        this.trMembersTemplates = this.trMembersTemplates.filter((v, i, a) => a.indexOf(v) === i);
        
        this.myTrainingDTOs = [];
        this.isEnded = [];
        this.trMembersTemplates.forEach(tm => {
          this.myTrainingDTOs.push(this.trainingDTOs.find(mt => mt.id == tm));
          this.isEnded.push(this.trainingMemberDTOs.find(trm => trm.idTraining == tm).isEnded);
        });
        console.log(this.isEnded);
        this.trMembersTemplates.forEach(tm => {
          this.trainingDTOs = this.trainingDTOs.filter(tr => tr.id != tm)
        }); 

        this.trainingDTOs = this.trainingDTOs.filter(tr => tr.trainingLevel == selectedLevel);
        this.myTrainingDTOs = this.myTrainingDTOs.filter(tr => tr.trainingLevel == selectedLevel);

        this.updateTrLevels();
        this.updateMyTrLevels();
      });

      this.trainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.trainingMode.push(false);
      });

      this.isEnded = [];
      this.myTrainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.mytrainingMode.push(false);
      });
    });

    /*this.recommendationService.getEmployeeById(parseInt(localStorage.getItem("currentuserid"), 10))
    .subscribe((data: RecommendationDTO[] | any) => {
      this.recommendationDTOs = data;
    });*/
  }

  filterByMySkillLevel(level: string){
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

    this.trainingService.getAll()
    .subscribe((data: TrainingDTO[] | any) => {
      this.trainingDTOs = data;
      this.myTrainingDTOs = data;
      //console.log(this.trainingDTOs);

      this.trainingMemberService.getByMemberId(parseInt(localStorage.getItem("currentuserid"), 10))
      .subscribe((data: TrainingMemberDTO[] | any) => {
        this.trainingMemberDTOs = data;

        this.trainingMemberDTOs.forEach(tm => {
          this.trMembersTemplates.push(tm.idTraining);
        });
        this.trMembersTemplates = this.trMembersTemplates.filter((v, i, a) => a.indexOf(v) === i);
        
        this.myTrainingDTOs = [];
        this.isEnded = [];
        this.trMembersTemplates.forEach(tm => {
          this.myTrainingDTOs.push(this.trainingDTOs.find(mt => mt.id == tm));
          this.isEnded.push(this.trainingMemberDTOs.find(trm => trm.idTraining == tm).isEnded);
        });
        console.log(this.isEnded);
        this.trMembersTemplates.forEach(tm => {
          this.trainingDTOs = this.trainingDTOs.filter(tr => tr.id != tm)
        }); 

        this.updateTrLevels();
        this.updateMyTrLevels();
      });

      this.trainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.trainingMode.push(false);
      });

      this.isEnded = [];
      this.myTrainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.mytrainingMode.push(false);
      });
    });

    /*this.recommendationService.getEmployeeById(parseInt(localStorage.getItem("currentuserid"), 10))
    .subscribe((data: RecommendationDTO[] | any) => {
      this.recommendationDTOs = data;
    });*/

    this.myTrainingDTOs = this.myTrainingDTOs.filter(tr => tr.trainingLevel == selectedLevel);
  }

  updateTrLevels(){
    this.trLevels = [];
    this.trainingDTOs.forEach(us => {
      switch (us.trainingLevel) {
        case 1:
            this.trLevels.push("Beginner");
            break;
        case 2:
            this.trLevels.push("Elementary");
            break;
        case 3:
            this.trLevels.push("Intermediate");
            break;
        case 4:
            this.trLevels.push("Advanced");
            break;
        case 5:
            this.trLevels.push("Proficiency");
            break;
      }
    })
  }

  updateMyTrLevels(){
    this.mytrLevels = [];
    this.myTrainingDTOs.forEach(us => {
      switch (us.trainingLevel) {
        case 1:
            this.mytrLevels.push("Beginner");
            break;
        case 2:
            this.mytrLevels.push("Elementary");
            break;
        case 3:
            this.mytrLevels.push("Intermediate");
            break;
        case 4:
            this.mytrLevels.push("Advanced");
            break;
        case 5:
            this.mytrLevels.push("Proficiency");
            break;
      }
    })
  }

  loadData(){
    this.trainingService.getAll()
    .subscribe((data: TrainingDTO[] | any) => {
      this.trainingDTOs = data;
      this.myTrainingDTOs = data;
      //console.log(this.trainingDTOs);

      this.trainingMemberService.getByMemberId(parseInt(localStorage.getItem("currentuserid"), 10))
      .subscribe((data: TrainingMemberDTO[] | any) => {
        this.trainingMemberDTOs = data;

        this.trainingMemberDTOs.forEach(tm => {
          this.trMembersTemplates.push(tm.idTraining);
        });
        this.trMembersTemplates = this.trMembersTemplates.filter((v, i, a) => a.indexOf(v) === i);
        
        this.myTrainingDTOs = [];
        this.isEnded = [];
        this.trMembersTemplates.forEach(tm => {
          this.myTrainingDTOs.push(this.trainingDTOs.find(mt => mt.id == tm));
          this.isEnded.push(this.trainingMemberDTOs.find(trm => trm.idTraining == tm).isEnded);
        });
        console.log(this.isEnded);
        this.trMembersTemplates.forEach(tm => {
          this.trainingDTOs = this.trainingDTOs.filter(tr => tr.id != tm)
        }); 

        this.updateTrLevels();
        this.updateMyTrLevels();
      });

      this.trainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.trainingMode.push(false);
      });

      this.isEnded = [];
      this.myTrainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);
        this.mytrainingMode.push(false);
      });
    });

    this.recommendationService.getEmployeeById(parseInt(localStorage.getItem("currentuserid"), 10))
    .subscribe((data: RecommendationDTO[] | any) => {
      this.recommendationDTOs = data;
    });
  }

  selectTrTable(){
    this.loadData();
    this.trTable = true;
    this.recTable = false;
    this.mytrTable = false;
  }
  selectRecTable(){
    this.loadData();
    this.trTable = false;
    this.recTable = true;
    this.mytrTable = false;
  }

  selectMyRecTable(){
    this.loadData();
    this.trTable = false;
    this.recTable = false;
    this.mytrTable = true;
  }

  goToTraining(tr: TrainingDTO){
    this.router.navigate(['trainings'], { queryParams: { trId: tr.id.toString() } });  
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
    this.updateTrLevels();
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
    this.updateTrLevels();
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
    this.updateTrLevels();
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
    this.updateTrLevels();
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
    this.updateTrLevels();
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
    this.updateTrLevels();
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
    this.updateTrLevels();
    this.trmode7=!this.trmode7;
  }
  byTrMode8(){
    if(this.trmode8){
      this.trainingDTOs.sort((a,b) => (a.description==undefined || b.description==undefined) ? 
      0 : (a.description > b.description) ? 1 : (b.description > a.description) ? -1 : 0);
    }
    else{
      this.trainingDTOs.sort((a,b) => (a.description==undefined || b.description==undefined) ? 
      0 : (a.description < b.description) ? 1 : (b.description < a.description) ? -1 : 0);
    }
    this.updateTrLevels();
    this.trmode8=!this.trmode8;
  }

  byMyTrMode1(){
    if(this.mytrmode1){
      this.myTrainingDTOs.sort((a,b) => (a.trainingTitle==undefined || b.trainingTitle==undefined) ? 
      0 : (a.trainingTitle > b.trainingTitle) ? 1 : (b.trainingTitle > a.trainingTitle) ? -1 : 0);
    }
    else{
      this.myTrainingDTOs.sort((a,b) => (a.trainingTitle==undefined || b.trainingTitle==undefined) ? 
      0 : (a.trainingTitle < b.trainingTitle) ? 1 : (b.trainingTitle < a.trainingTitle) ? -1 : 0);
    }
    this.updateMyTrLevels();
    this.mytrmode1=!this.mytrmode1;
  }
  byMyTrMode2(){
    if(this.mytrmode2){
      this.myTrainingDTOs.sort((a,b) => (a.trainingLevel==undefined || b.trainingLevel==undefined) ? 
      0 : (a.trainingLevel > b.trainingLevel) ? 1 : (b.trainingLevel > a.trainingLevel) ? -1 : 0);
    }
    else{
      this.myTrainingDTOs.sort((a,b) => (a.trainingLevel==undefined || b.trainingLevel==undefined) ? 
      0 : (a.trainingLevel < b.trainingLevel) ? 1 : (b.trainingLevel < a.trainingLevel) ? -1 : 0);
    }
    this.updateMyTrLevels();
    this.mytrmode2=!this.mytrmode2;
  }
  byMyTrMode3(){
    if(this.mytrmode3){
      this.myTrainingDTOs.sort((a,b) => (a.startDate==undefined || b.startDate==undefined) ? 
      0 : (a.startDate > b.startDate) ? 1 : (b.startDate > a.startDate) ? -1 : 0);
    }
    else{
      this.myTrainingDTOs.sort((a,b) => (a.startDate==undefined || b.startDate==undefined) ? 
      0 : (a.startDate < b.startDate) ? 1 : (b.startDate < a.startDate) ? -1 : 0);
    }
    this.updateMyTrLevels();
    this.mytrmode3=!this.mytrmode3;
  }
  byMyTrMode4(){
    if(this.mytrmode4){
      this.myTrainingDTOs.sort((a,b) => (a.endDate==undefined || b.endDate==undefined) ? 
      0 : (a.endDate > b.endDate) ? 1 : (b.endDate > a.endDate) ? -1 : 0);
    }
    else{
      this.myTrainingDTOs.sort((a,b) => (a.endDate==undefined || b.endDate==undefined) ? 
      0 : (a.endDate < b.endDate) ? 1 : (b.endDate < a.endDate) ? -1 : 0);
    }
    this.updateMyTrLevels();
    this.mytrmode4=!this.mytrmode4;
  }
  byMyTrMode5(){
    if(this.mytrmode5){
      this.myTrainingDTOs.sort((a,b) => (a.payment==undefined || b.payment==undefined) ? 
      0 : (a.payment > b.payment) ? 1 : (b.payment > a.payment) ? -1 : 0);
    }
    else{
      this.myTrainingDTOs.sort((a,b) => (a.payment==undefined || b.payment==undefined) ? 
      0 : (a.payment < b.payment) ? 1 : (b.payment < a.payment) ? -1 : 0);
    }
    this.updateMyTrLevels();
    this.mytrmode5=!this.mytrmode5;
  }
  byMyTrMode6(){
    if(this.mytrmode6){
      this.myTrainingDTOs.sort((a,b) => (a.coachNSN==undefined || b.coachNSN==undefined) ? 
      0 : (a.coachNSN > b.coachNSN) ? 1 : (b.coachNSN > a.coachNSN) ? -1 : 0);
    }
    else{
      this.myTrainingDTOs.sort((a,b) => (a.coachNSN==undefined || b.coachNSN==undefined) ? 
      0 : (a.coachNSN < b.coachNSN) ? 1 : (b.coachNSN < a.coachNSN) ? -1 : 0);
    }
    this.updateMyTrLevels();
    this.mytrmode6=!this.mytrmode6;
  }
  byMyTrMode7(){
    if(this.mytrmode7){
      this.myTrainingDTOs.sort((a,b) => (a.categoryTitle==undefined || b.categoryTitle==undefined) ? 
      0 : (a.categoryTitle > b.categoryTitle) ? 1 : (b.categoryTitle > a.categoryTitle) ? -1 : 0);
    }
    else{
      this.myTrainingDTOs.sort((a,b) => (a.categoryTitle==undefined || b.categoryTitle==undefined) ? 
      0 : (a.categoryTitle < b.categoryTitle) ? 1 : (b.categoryTitle < a.categoryTitle) ? -1 : 0);
    }
    this.updateMyTrLevels();
    this.mytrmode7=!this.mytrmode7;
  }
  byMyTrMode8(){
    if(this.mytrmode8){
      this.myTrainingDTOs.sort((a,b) => (a.description==undefined || b.description==undefined) ? 
      0 : (a.description > b.description) ? 1 : (b.description > a.description) ? -1 : 0);
    }
    else{
      this.myTrainingDTOs.sort((a,b) => (a.description==undefined || b.description==undefined) ? 
      0 : (a.description < b.description) ? 1 : (b.description < a.description) ? -1 : 0);
    }
    this.updateTrLevels();
    this.mytrmode8=!this.mytrmode8;
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
