import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/models/category-dto';
import { ComparationDTO } from 'src/app/models/comparation-dto';
import { RequirementDTO } from 'src/app/models/requirement-dto';
import { SkillTemplateDTO } from 'src/app/models/skill-template-dto';
import { CategoryService } from 'src/app/services/category.service';
import { ComparationService } from 'src/app/services/comparation.service';
import { RequirementService } from 'src/app/services/requirement.service';
import { SkillTemplateService } from 'src/app/services/skill-template.service';

@Component({
  selector: 'app-worker-skill-template',
  templateUrl: './worker-skill-template.component.html',
  styleUrls: ['./worker-skill-template.component.css']
})
export class WorkerSkillTemplateComponent implements OnInit {
  skillTemplateDTOs: SkillTemplateDTO[] = [];
  loadrequirementDTOs: RequirementDTO[] = [];
  requirementDTOs: RequirementDTO[] = [];
  comparationDTOs: ComparationDTO[] = [];
  isHaveReqs: boolean[] = [];
  isMeetReqs: boolean[] = [];

  stTable: boolean = true;
  reqTable: boolean = false;
  comTable: boolean = false;

  stmode1: boolean = false;
  stmode2: boolean = false;
  stmode3: boolean = false;

  reqmode1: boolean = false;
  reqmode2: boolean = false;
  reqmode3: boolean = false;

  constructor(private skillTemplateService: SkillTemplateService,
    private requirementService: RequirementService,
    private comparationService: ComparationService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.skillTemplateService.getAll()
    .subscribe((data: SkillTemplateDTO[] | any) => {
      this.skillTemplateDTOs = data;
      console.log(this.skillTemplateDTOs);
    });

    this.requirementService.getAll()
    .subscribe((data: RequirementDTO[] | any) => {
      this.loadrequirementDTOs = data;
      this.requirementDTOs = data;
      console.log(this.loadrequirementDTOs);

      this.comparationService.getByEmployeeId(parseInt(localStorage.getItem("currentuserid"), 10))
      .subscribe((data: ComparationDTO[] | any) => {
        this.comparationDTOs = data;
        console.log(this.comparationDTOs);

        this.isHaveReqs = [];
        this.isMeetReqs = [];
        this.loadrequirementDTOs.forEach(req => {
          if(this.comparationDTOs.find(com => com.idRequirement == req.id) != undefined){
            this.isHaveReqs.push(true);
            this.isMeetReqs.push(this.comparationDTOs.find(com => com.idRequirement == req.id).isMeetCriteria);
          }
          else{
            this.isHaveReqs.push(false);
            this.isMeetReqs.push(false);
          }
        });

      });

    });
  }

  showSelectedReqs(st: SkillTemplateDTO){
    this.requirementDTOs = this.loadrequirementDTOs.filter(req => req.idSkillTemplate == st.id);
    this.isHaveReqs = [];
        this.isMeetReqs = [];
        this.requirementDTOs.forEach(req => {
          if(this.comparationDTOs.find(com => com.idRequirement == req.id) != undefined){
            this.isHaveReqs.push(true);
            this.isMeetReqs.push(this.comparationDTOs.find(com => com.idRequirement == req.id).isMeetCriteria);
          }
          else{
            this.isHaveReqs.push(false);
            this.isMeetReqs.push(false);
          }
        });
        this.selectReqTable();
  }

  selectStTable(){
    this.stTable = true;
    this.reqTable = false;
    this.comTable = false;
  }

  selectReqTable(){
    this.stTable = false;
    this.reqTable = true;
    this.comTable = false;
  }

  selectComTable(){
    this.stTable = false;
    this.reqTable = false;
    this.comTable = true;
  }

  byStMode1(){
    if(this.stmode1){
      this.skillTemplateDTOs.sort((a,b) => (a.templateTitle==undefined || b.templateTitle==undefined) ? 
      0 : (a.templateTitle > b.templateTitle) ? 1 : (b.templateTitle > a.templateTitle) ? -1 : 0);
    }
    else{
      this.skillTemplateDTOs.sort((a,b) => (a.templateTitle==undefined || b.templateTitle==undefined) ? 
      0 : (a.templateTitle < b.templateTitle) ? 1 : (b.templateTitle < a.templateTitle) ? -1 : 0);
    }
    this.stmode1=!this.stmode1;
  }

  byStMode2(){
    if(this.stmode2){
      this.skillTemplateDTOs.sort((a,b) => (a.description==undefined || b.description==undefined) ? 
      0 : (a.description > b.description) ? 1 : (b.description > a.description) ? -1 : 0);
    }
    else{
      this.skillTemplateDTOs.sort((a,b) => (a.description==undefined || b.description==undefined) ? 
      0 : (a.description < b.description) ? 1 : (b.description < a.description) ? -1 : 0);
    }
    this.stmode2=!this.stmode2;
  }

  byStMode3(){
    if(this.stmode3){
      this.skillTemplateDTOs.sort((a,b) => (a.averageSalary==undefined || b.averageSalary==undefined) ? 
      0 : (a.averageSalary > b.averageSalary) ? 1 : (b.averageSalary > a.averageSalary) ? -1 : 0);
    }
    else{
      this.skillTemplateDTOs.sort((a,b) => (a.averageSalary==undefined || b.averageSalary==undefined) ? 
      0 : (a.averageSalary < b.averageSalary) ? 1 : (b.averageSalary < a.averageSalary) ? -1 : 0);
    }
    this.stmode3=!this.stmode3;
  }

  byReqMode1(){
    if(this.reqmode1){
      this.requirementDTOs.sort((a,b) => (a.reqTitle==undefined || b.reqTitle==undefined) ? 
      0 : (a.reqTitle > b.reqTitle) ? 1 : (b.reqTitle > a.reqTitle) ? -1 : 0);
    }
    else{
      this.requirementDTOs.sort((a,b) => (a.reqTitle==undefined || b.reqTitle==undefined) ? 
      0 : (a.reqTitle < b.reqTitle) ? 1 : (b.reqTitle < a.reqTitle) ? -1 : 0);
    }

        this.isHaveReqs = [];
        this.isMeetReqs = [];
        this.requirementDTOs.forEach(req => {
          if(this.comparationDTOs.find(com => com.idRequirement == req.id) != undefined){
            this.isHaveReqs.push(true);
            this.isMeetReqs.push(this.comparationDTOs.find(com => com.idRequirement == req.id).isMeetCriteria);
          }
          else{
            this.isHaveReqs.push(false);
            this.isMeetReqs.push(false);
          }
        });

    this.reqmode1=!this.reqmode1;
  }

  byReqMode2(){
    if(this.reqmode2){
      this.requirementDTOs.sort((a,b) => (a.reqLevel==undefined || b.reqLevel==undefined) ? 
      0 : (a.reqLevel > b.reqLevel) ? 1 : (b.reqLevel > a.reqLevel) ? -1 : 0);
    }
    else{
      this.requirementDTOs.sort((a,b) => (a.reqLevel==undefined || b.reqLevel==undefined) ? 
      0 : (a.reqLevel < b.reqLevel) ? 1 : (b.reqLevel < a.reqLevel) ? -1 : 0);
    }

        this.isHaveReqs = [];
        this.isMeetReqs = [];
        this.requirementDTOs.forEach(req => {
          if(this.comparationDTOs.find(com => com.idRequirement == req.id) != undefined){
            this.isHaveReqs.push(true);
            this.isMeetReqs.push(this.comparationDTOs.find(com => com.idRequirement == req.id).isMeetCriteria);
          }
          else{
            this.isHaveReqs.push(false);
            this.isMeetReqs.push(false);
          }
        });

    this.reqmode2=!this.reqmode2;
  }

  byReqMode3(){
    if(this.reqmode3){
      this.requirementDTOs.sort((a,b) => (a.templateTitle==undefined || b.templateTitle==undefined) ? 
      0 : (a.templateTitle > b.templateTitle) ? 1 : (b.templateTitle > a.templateTitle) ? -1 : 0);
    }
    else{
      this.requirementDTOs.sort((a,b) => (a.templateTitle==undefined || b.templateTitle==undefined) ? 
      0 : (a.templateTitle < b.templateTitle) ? 1 : (b.templateTitle < a.templateTitle) ? -1 : 0);
    }

        this.isHaveReqs = [];
        this.isMeetReqs = [];
        this.requirementDTOs.forEach(req => {
          if(this.comparationDTOs.find(com => com.idRequirement == req.id) != undefined){
            this.isHaveReqs.push(true);
            this.isMeetReqs.push(this.comparationDTOs.find(com => com.idRequirement == req.id).isMeetCriteria);
          }
          else{
            this.isHaveReqs.push(false);
            this.isMeetReqs.push(false);
          }
        });

    this.reqmode3=!this.reqmode3;
  }
}
