import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/models/category-dto';
import { CompanyDTO } from 'src/app/models/company-dto';
import { EmployeeDTO } from 'src/app/models/employee-dto';
import { EmployerDTO } from 'src/app/models/employer-dto';
import { CategoryService } from 'src/app/services/category.service';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployerService } from 'src/app/services/employer.service';
import { ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NotificationDTO } from 'src/app/models/notification-dto';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-hr-mentor-management',
  templateUrl: './hr-mentor-management.component.html',
  styleUrls: ['./hr-mentor-management.component.css']
})
export class HrMentorManagementComponent implements OnInit {

  @ViewChild('comModal')
  private comRef: TemplateRef<any>;

  @ViewChild('catModal')
  private catRef: TemplateRef<any>;

  employeeDTOs: EmployeeDTO[] = [];
  employerDTOs: EmployerDTO[] = [];
  companyDTOs: CompanyDTO[] = [];
  categoryDTOs: CategoryDTO[] = [];
  newCompanyDTO: CompanyDTO = new CompanyDTO(0, '', 1000, '', '', '', '');
  newCategoryDTO: CategoryDTO = new CategoryDTO(0, '', '');

  eeTable: boolean = true;
  erTable: boolean = false;
  cmTable: boolean = false;
  ctTable: boolean = false;

  eemode1: boolean = false;
  eemode2: boolean = false;
  eemode3: boolean = false;
  eemode4: boolean = false;
  eemode5: boolean = false;
  eemode6: boolean = false;
  eemode7: boolean = false;

  ermode1: boolean = false;
  ermode2: boolean = false;
  ermode3: boolean = false;
  ermode4: boolean = false;
  ermode5: boolean = false;

  cmmode1: boolean = false;
  cmmode2: boolean = false;
  cmmode3: boolean = false;
  cmmode4: boolean = false;
  cmmode5: boolean = false;
  cmmode6: boolean = false;

  ctmode1: boolean = false;
  ctmode2: boolean = false;

  closeResult = '';

  constructor(private employeeService: EmployeeService,
    private employerService: EmployerService,
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.employeeService.getAll()
    .subscribe((data : EmployeeDTO[] | any) => {
      this.employeeDTOs = data;
    });

    this.employerService.getAll()
    .subscribe((data : EmployerDTO[] | any) => {
      this.employerDTOs = data;
    });

    this.companyService.getAll()
    .subscribe((data : CompanyDTO[] | any) => {
      this.companyDTOs = data;
    });

    this.categoryService.getAll()
    .subscribe((data : CategoryDTO[] | any) => {
      this.categoryDTOs = data;
    });
  }

  openCreateComModal(){
    console.log(this.comRef);
    this.modalService.open(this.comRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openCreateCatModal(){
    console.log(this.catRef);
    this.modalService.open(this.catRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  createCompany(){
    this.companyService.pull(this.newCompanyDTO)
    .subscribe((data: any) => {
      var notifText: string = `User ${localStorage.getItem("currentUserNSN")} add new company ${this.newCompanyDTO.name}`;
      this.employeeDTOs.forEach(emp => {
        var notif: NotificationDTO = new NotificationDTO(0, notifText, new Date(), false, emp.id, parseInt(localStorage.getItem("currentuserid"), 10), "", "", "", "");
        this.notificationService.pull(notif);
      });
      this.loadData();
    });
    this.modalService.dismissAll();
  }

  createCategory(){
    this.categoryService.pull(this.newCategoryDTO)
    .subscribe((data: any) => {
      var notifText: string = `User ${localStorage.getItem("currentUserNSN")} add new company ${this.newCompanyDTO.name}`;
      this.employeeDTOs.forEach(emp => {
        var notif: NotificationDTO = new NotificationDTO(0, notifText, new Date(), false, emp.id, parseInt(localStorage.getItem("currentuserid"), 10), "", "", "", "");
        this.notificationService.pull(notif);
      });
      this.loadData();
    });
    this.modalService.dismissAll();
  }

  selectEeTable(){
    this.eeTable = true;
    this.erTable = false;
    this.cmTable = false;
    this.ctTable = false;
  }

  selectErTable(){
    this.eeTable = false;
    this.erTable = true;
    this.cmTable = false;
    this.ctTable = false;
  }

  selectCmTable(){
    this.eeTable = false;
    this.erTable = false;
    this.cmTable = true;
    this.ctTable = false;
  }

  selectCtTable(){
    this.eeTable = false;
    this.erTable = false;
    this.cmTable = false;
    this.ctTable = true;
  }

  setEmployeeHr(emp: EmployeeDTO){
    this.employerService.setHrId(emp.id);
    this.loadData();
  }
  setEmployeeMentor(emp: EmployeeDTO){
    this.employerService.setMentorId(emp.id);
    this.loadData();
  }
  deleteEmployee(emp: EmployeeDTO){
    this.employeeService.delete(emp.id)
    .subscribe(() => {
      this.loadData();
    });
  }
  deleteEmployer(emp: EmployerDTO){
    this.employerService.delete(emp.id)
    .subscribe(() => {
      this.loadData();
    });
  }

  byEeMode1(){
    if(this.eemode1){
      this.employeeDTOs.sort((a,b) => (a.firstname==undefined || b.firstname==undefined) ? 
      0 : (a.firstname > b.firstname) ? 1 : (b.firstname > a.firstname) ? -1 : 0);
    }
    else{
      this.employeeDTOs.sort((a,b) => (a.firstname==undefined || b.firstname==undefined) ? 
      0 : (a.firstname < b.firstname) ? 1 : (b.firstname < a.firstname) ? -1 : 0);
    }
    this.eemode1=!this.eemode1;
  }

  byEeMode2(){
    if(this.eemode2){
      this.employeeDTOs.sort((a,b) => (a.lastname==undefined || b.lastname==undefined) ? 
      0 : (a.lastname > b.lastname) ? 1 : (b.lastname > a.lastname) ? -1 : 0);
    }
    else{
      this.employeeDTOs.sort((a,b) => (a.lastname==undefined || b.lastname==undefined) ? 
      0 : (a.lastname < b.lastname) ? 1 : (b.lastname < a.lastname) ? -1 : 0);
    }
    this.eemode2=!this.eemode2;
  }

  byEeMode3(){
    if(this.eemode3){
      this.employeeDTOs.sort((a,b) => (a.email==undefined || b.email==undefined) ? 
      0 : (a.email > b.email) ? 1 : (b.email > a.email) ? -1 : 0);
    }
    else{
      this.employeeDTOs.sort((a,b) => (a.email==undefined || b.email==undefined) ? 
      0 : (a.email < b.email) ? 1 : (b.email < a.email) ? -1 : 0);
    }
    this.eemode3=!this.eemode3;
  }

  byEeMode4(){
    if(this.eemode4){
      this.employeeDTOs.sort((a,b) => (a.devLevel==undefined || b.devLevel==undefined) ? 
      0 : (a.devLevel > b.devLevel) ? 1 : (b.devLevel > a.devLevel) ? -1 : 0);
    }
    else{
      this.employeeDTOs.sort((a,b) => (a.devLevel==undefined || b.devLevel==undefined) ? 
      0 : (a.devLevel < b.devLevel) ? 1 : (b.devLevel < a.devLevel) ? -1 : 0);
    }
    this.eemode4=!this.eemode4;
  }

  byEeMode5(){
    if(this.eemode5){
      this.employeeDTOs.sort((a,b) => (a.experience==undefined || b.experience==undefined) ? 
      0 : (a.experience > b.experience) ? 1 : (b.experience > a.experience) ? -1 : 0);
    }
    else{
      this.employeeDTOs.sort((a,b) => (a.experience==undefined || b.experience==undefined) ? 
      0 : (a.experience < b.experience) ? 1 : (b.experience < a.experience) ? -1 : 0);
    }
    this.eemode5=!this.eemode5;
  }

  byEeMode6(){
    if(this.eemode6){
      this.employeeDTOs.sort((a,b) => (a.mentorNSN==undefined || b.mentorNSN==undefined) ? 
      0 : (a.mentorNSN > b.mentorNSN) ? 1 : (b.mentorNSN > a.mentorNSN) ? -1 : 0);
    }
    else{
      this.employeeDTOs.sort((a,b) => (a.mentorNSN==undefined || b.mentorNSN==undefined) ? 
      0 : (a.mentorNSN < b.mentorNSN) ? 1 : (b.mentorNSN < a.mentorNSN) ? -1 : 0);
    }
    this.eemode6=!this.eemode6;
  }

  byEeMode7(){
    if(this.eemode7){
      this.employeeDTOs.sort((a,b) => (a.companyName==undefined || b.companyName==undefined) ? 
      0 : (a.companyName > b.companyName) ? 1 : (b.companyName > a.companyName) ? -1 : 0);
    }
    else{
      this.employeeDTOs.sort((a,b) => (a.companyName==undefined || b.companyName==undefined) ? 
      0 : (a.companyName < b.companyName) ? 1 : (b.companyName < a.companyName) ? -1 : 0);
    }
    this.eemode7=!this.eemode7;
  }

  byErMode1(){
    if(this.ermode1){
      this.employerDTOs.sort((a,b) => (a.firstname==undefined || b.firstname==undefined) ? 
      0 : (a.firstname > b.firstname) ? 1 : (b.firstname > a.firstname) ? -1 : 0);
    }
    else{
      this.employerDTOs.sort((a,b) => (a.firstname==undefined || b.firstname==undefined) ? 
      0 : (a.firstname < b.firstname) ? 1 : (b.firstname < a.firstname) ? -1 : 0);
    }
    this.ermode1=!this.ermode1;
  }

  byErMode2(){
    if(this.ermode2){
      this.employerDTOs.sort((a,b) => (a.lastname==undefined || b.lastname==undefined) ? 
      0 : (a.lastname > b.lastname) ? 1 : (b.lastname > a.lastname) ? -1 : 0);
    }
    else{
      this.employerDTOs.sort((a,b) => (a.lastname==undefined || b.lastname==undefined) ? 
      0 : (a.lastname < b.lastname) ? 1 : (b.lastname < a.lastname) ? -1 : 0);
    }
    this.ermode2=!this.ermode2;
  }

  byErMode3(){
    if(this.ermode3){
      this.employerDTOs.sort((a,b) => (a.email==undefined || b.email==undefined) ? 
      0 : (a.email > b.email) ? 1 : (b.email > a.email) ? -1 : 0);
    }
    else{
      this.employerDTOs.sort((a,b) => (a.email==undefined || b.email==undefined) ? 
      0 : (a.email < b.email) ? 1 : (b.email < a.email) ? -1 : 0);
    }
    this.ermode3=!this.ermode3;
  }

  byErMode4(){
    if(this.ermode4){
      this.employerDTOs.sort((a,b) => (a.role==undefined || b.role==undefined) ? 
      0 : (a.role > b.role) ? 1 : (b.role > a.role) ? -1 : 0);
    }
    else{
      this.employerDTOs.sort((a,b) => (a.role==undefined || b.role==undefined) ? 
      0 : (a.role < b.role) ? 1 : (b.role < a.role) ? -1 : 0);
    }
    this.ermode4=!this.ermode4;
  }

  byErMode5(){
    if(this.ermode5){
      this.employerDTOs.sort((a,b) => (a.companyName==undefined || b.companyName==undefined) ? 
      0 : (a.companyName > b.companyName) ? 1 : (b.companyName > a.companyName) ? -1 : 0);
    }
    else{
      this.employerDTOs.sort((a,b) => (a.companyName==undefined || b.companyName==undefined) ? 
      0 : (a.companyName < b.companyName) ? 1 : (b.companyName < a.companyName) ? -1 : 0);
    }
    this.ermode5=!this.ermode5;
  }

  byCmMode1(){
    if(this.cmmode1){
      this.companyDTOs.sort((a,b) => (a.name==undefined || b.name==undefined) ? 
      0 : (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
    }
    else{
      this.companyDTOs.sort((a,b) => (a.name==undefined || b.name==undefined) ? 
      0 : (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
    }
    this.cmmode1=!this.cmmode1;
  }

  byCmMode2(){
    if(this.cmmode2){
      this.companyDTOs.sort((a,b) => (a.employeesCount==undefined || b.employeesCount==undefined) ? 
      0 : (a.employeesCount > b.employeesCount) ? 1 : (b.employeesCount > a.employeesCount) ? -1 : 0);
    }
    else{
      this.companyDTOs.sort((a,b) => (a.employeesCount==undefined || b.employeesCount==undefined) ? 
      0 : (a.employeesCount < b.employeesCount) ? 1 : (b.employeesCount < a.employeesCount) ? -1 : 0);
    }
    this.cmmode2=!this.cmmode2;
  }

  byCmMode3(){
    if(this.cmmode3){
      this.companyDTOs.sort((a,b) => (a.description==undefined || b.description==undefined) ? 
      0 : (a.description > b.description) ? 1 : (b.description > a.description) ? -1 : 0);
    }
    else{
      this.companyDTOs.sort((a,b) => (a.description==undefined || b.description==undefined) ? 
      0 : (a.description < b.description) ? 1 : (b.description < a.description) ? -1 : 0);
    }
    this.cmmode3=!this.cmmode3;
  }

  byCmMode4(){
    if(this.cmmode4){
      this.companyDTOs.sort((a,b) => (a.specialization==undefined || b.specialization==undefined) ? 
      0 : (a.specialization > b.specialization) ? 1 : (b.specialization > a.specialization) ? -1 : 0);
    }
    else{
      this.companyDTOs.sort((a,b) => (a.specialization==undefined || b.specialization==undefined) ? 
      0 : (a.specialization < b.specialization) ? 1 : (b.specialization < a.specialization) ? -1 : 0);
    }
    this.cmmode4=!this.cmmode4;
  }

  byCmMode5(){
    if(this.cmmode5){
      this.companyDTOs.sort((a,b) => (a.address==undefined || b.address==undefined) ? 
      0 : (a.address > b.address) ? 1 : (b.address > a.address) ? -1 : 0);
    }
    else{
      this.companyDTOs.sort((a,b) => (a.address==undefined || b.address==undefined) ? 
      0 : (a.address < b.address) ? 1 : (b.address < a.address) ? -1 : 0);
    }
    this.cmmode5=!this.cmmode5;
  }

  byCmMode6(){
    if(this.cmmode6){
      this.companyDTOs.sort((a,b) => (a.contactPhone==undefined || b.contactPhone==undefined) ? 
      0 : (a.contactPhone > b.contactPhone) ? 1 : (b.contactPhone > a.contactPhone) ? -1 : 0);
    }
    else{
      this.companyDTOs.sort((a,b) => (a.contactPhone==undefined || b.contactPhone==undefined) ? 
      0 : (a.contactPhone < b.contactPhone) ? 1 : (b.contactPhone < a.contactPhone) ? -1 : 0);
    }
    this.cmmode6=!this.cmmode6;
  }

  byCtMode1(){
    if(this.eemode1){
      this.categoryDTOs.sort((a,b) => (a.title==undefined || b.title==undefined) ? 
      0 : (a.title > b.title) ? 1 : (b.title > a.title) ? -1 : 0);
    }
    else{
      this.categoryDTOs.sort((a,b) => (a.title==undefined || b.title==undefined) ? 
      0 : (a.title < b.title) ? 1 : (b.title < a.title) ? -1 : 0);
    }
    this.eemode1=!this.eemode1;
  }

  byCtMode2(){
    if(this.eemode2){
      this.categoryDTOs.sort((a,b) => (a.description==undefined || b.description==undefined) ? 
      0 : (a.description > b.description) ? 1 : (b.description > a.description) ? -1 : 0);
    }
    else{
      this.categoryDTOs.sort((a,b) => (a.description==undefined || b.description==undefined) ? 
      0 : (a.description < b.description) ? 1 : (b.description < a.description) ? -1 : 0);
    }
    this.eemode2=!this.eemode2;
  }
}
