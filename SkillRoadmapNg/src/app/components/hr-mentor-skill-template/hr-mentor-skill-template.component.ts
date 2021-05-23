import { Component, OnInit } from '@angular/core';
import { ComparationDTO } from 'src/app/models/comparation-dto';
import { RequirementDTO } from 'src/app/models/requirement-dto';
import { SkillTemplateDTO } from 'src/app/models/skill-template-dto';
import { ComparationService } from 'src/app/services/comparation.service';
import { RequirementService } from 'src/app/services/requirement.service';
import { SkillTemplateService } from 'src/app/services/skill-template.service';
import { ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TrainingDTO } from 'src/app/models/training-dto';

@Component({
  selector: 'app-hr-mentor-skill-template',
  templateUrl: './hr-mentor-skill-template.component.html',
  styleUrls: ['./hr-mentor-skill-template.component.css']
})
export class HrMentorSkillTemplateComponent implements OnInit {

  @ViewChild('templateModal')
  private templateRef: TemplateRef<any>;
  
  @ViewChild('reqModal')
  private reqRef: TemplateRef<any>;

  skillTemplateDTOs: SkillTemplateDTO[] = [];
  requirementDTOs: RequirementDTO[] = [];
  comparationDTOs: ComparationDTO[] = [];
  showSkillTemplateDTOs: SkillTemplateDTO[] = [];
  showRequirementDTOs: RequirementDTO[] = [];
  showComparationDTOs: ComparationDTO[] = [];
  isHaveReqs: boolean[] = [];
  isMeetReqs: boolean[] = [];
  newskillTemplateDTO: SkillTemplateDTO = new SkillTemplateDTO(0, "Title", "Description", 5000);
  newrequirementDTO: RequirementDTO = new RequirementDTO(0, "Req Title", 1, 1, '');

  stTable: boolean = true;
  reqTable: boolean = false;
  comTable: boolean = false;

  stmode1: boolean = false;
  stmode2: boolean = false;
  stmode3: boolean = false;

  reqmode1: boolean = false;
  reqmode2: boolean = false;
  reqmode3: boolean = false;

  closeResult = '';

  constructor(private skillTemplateService: SkillTemplateService,
    private requirementService: RequirementService,
    private comparationService: ComparationService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.skillTemplateService.getAll()
    .subscribe((data: SkillTemplateDTO[] | any) => {
      this.skillTemplateDTOs = data;
      this.showSkillTemplateDTOs = data;
      console.log(this.skillTemplateDTOs);
    });

    this.requirementService.getAll()
    .subscribe((data: RequirementDTO[] | any) => {
      this.requirementDTOs = data;
      this.showRequirementDTOs = data;
      console.log(this.requirementDTOs);
    });
  }

  openCreateTemplModal(){
    this.modalService.open(this.templateRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCreateReqModal(){
    this.modalService.open(this.reqRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  deleteSkillTemplate(st: SkillTemplateDTO){
    this.skillTemplateService.delete(st.id)
    .subscribe(() => this.loadData());
  }

  deleteRequirement(req: RequirementDTO){
    this.requirementService.delete(req.id)
    .subscribe(() => this.loadData());
  }

  deleteComparation(com: ComparationDTO){
    this.comparationService.delete(com.id)
    .subscribe(() => this.loadData());
  }

  createTemplate(){
    console.log(this.newskillTemplateDTO);
    this.skillTemplateService.pull(this.newskillTemplateDTO)
    .subscribe(() => {
      this.loadData();
    });
    this.modalService.dismissAll();
  }

  createRequirement(){
    this.newrequirementDTO.idSkillTemplate = parseInt(this.newrequirementDTO.idSkillTemplate.toString(), 10);
    /*this.requirementService.pull(this.newrequirementDTO)
    .subscribe(() => {
      this.loadData();
    });*/
    console.log(this.newrequirementDTO);
    this.modalService.dismissAll();
  }

  showSelectedReqs(st: SkillTemplateDTO){
    this.showRequirementDTOs = this.requirementDTOs.filter(req => req.idSkillTemplate == st.id);
    this.newrequirementDTO.idSkillTemplate = st.id;
    this.newrequirementDTO.templateTitle = st.templateTitle;
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
      this.showRequirementDTOs.sort((a,b) => (a.reqTitle==undefined || b.reqTitle==undefined) ? 
      0 : (a.reqTitle > b.reqTitle) ? 1 : (b.reqTitle > a.reqTitle) ? -1 : 0);
    }
    else{
      this.showRequirementDTOs.sort((a,b) => (a.reqTitle==undefined || b.reqTitle==undefined) ? 
      0 : (a.reqTitle < b.reqTitle) ? 1 : (b.reqTitle < a.reqTitle) ? -1 : 0);
    }
    this.reqmode1=!this.reqmode1;
  }

  byReqMode2(){
    if(this.reqmode2){
      this.showRequirementDTOs.sort((a,b) => (a.reqLevel==undefined || b.reqLevel==undefined) ? 
      0 : (a.reqLevel > b.reqLevel) ? 1 : (b.reqLevel > a.reqLevel) ? -1 : 0);
    }
    else{
      this.showRequirementDTOs.sort((a,b) => (a.reqLevel==undefined || b.reqLevel==undefined) ? 
      0 : (a.reqLevel < b.reqLevel) ? 1 : (b.reqLevel < a.reqLevel) ? -1 : 0);
    }
    this.reqmode2=!this.reqmode2;
  }

  byReqMode3(){
    if(this.reqmode3){
      this.showRequirementDTOs.sort((a,b) => (a.templateTitle==undefined || b.templateTitle==undefined) ? 
      0 : (a.templateTitle > b.templateTitle) ? 1 : (b.templateTitle > a.templateTitle) ? -1 : 0);
    }
    else{
      this.showRequirementDTOs.sort((a,b) => (a.templateTitle==undefined || b.templateTitle==undefined) ? 
      0 : (a.templateTitle < b.templateTitle) ? 1 : (b.templateTitle < a.templateTitle) ? -1 : 0);
    }
    this.reqmode3=!this.reqmode3;
  }

}
