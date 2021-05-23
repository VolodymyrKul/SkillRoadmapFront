import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmployeeDTO } from 'src/app/models/employee-dto';
import { EmployerDTO } from 'src/app/models/employer-dto';
import { Notification } from 'src/app/models/notification';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployerService } from 'src/app/services/employer.service';
import { NotificationService } from 'src/app/services/notification.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserSkillDTO } from 'src/app/models/user-skill-dto';
import { UserSkillService } from 'src/app/services/user-skill.service';
import { NotificationDTO } from 'src/app/models/notification-dto';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  @ViewChild('notificationModal')
  private notifRef: TemplateRef<any>;

  mynotifications: Notification[] = [];
  employers: EmployerDTO[] = [];
  employersNSN: string[] = [];
  employees: EmployeeDTO[] = [];
  employeesNSN: string[] = [];
  selEmployer: string;
  selEmployee: string;
  userSkills: UserSkillDTO[] = [];
  userSkill: UserSkillDTO;
  notifDesc: string = "";
  closeResult = '';
  currentUser: string;
  userMode: false;
  addedNotif: NotificationDTO = new NotificationDTO(0,"",new Date(),false,0,0,0,"","","","","");

  constructor(private notificationService: NotificationService, 
    private employeeService: EmployeeService, 
    private employerService: EmployerService,
    private userSkillService: UserSkillService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    var userRole = localStorage.getItem('currentrole');
    if(userRole == 'HR' || userRole == 'Mentor'){
      this.notificationService.getByEmpployer(localStorage.getItem('currentuser'))
      .subscribe((data: Notification[] | any) => {
        this.mynotifications = data;
        this.mynotifications.forEach(n => {
          n.sendingDate = new Date(n.sendingDate);
        });
      });
    }
    else{
      this.notificationService.getByEmpployee(localStorage.getItem('currentuser'))
      .subscribe((data: Notification[] | any) => {
        this.mynotifications = data;
        this.mynotifications.forEach(n => {
          n.sendingDate = new Date(n.sendingDate);
        });
      });
    }
    this.employerService.getAll()
    .subscribe((data: EmployerDTO[] | any) => {
      this.employers = data;
      this.employers.filter(emp => emp.idCompany == parseInt(localStorage.getItem("currentcompanyid"), 10));
      this.employers.forEach(emp => this.employersNSN.push(emp.firstname + " " + emp.lastname));
      this.selEmployer = this.employersNSN[0];
    });
    this.employeeService.getAll()
    .subscribe((data: EmployeeDTO[] | any) => {
      this.employees = data;
      this.employees.filter(emp => emp.idCompany == parseInt(localStorage.getItem("currentcompanyid"), 10));
      this.employees.forEach(emp => this.employeesNSN.push(emp.firstname + " " + emp.lastname));
      this.selEmployee = this.employeesNSN[0];
    });
    this.userSkillService.getAll()
    .subscribe((data: UserSkillDTO[] | any) => {
      this.userSkills = data;
      this.userSkills.filter(us => us.idEmployee == parseInt(localStorage.getItem("currentuserid"),10));
      this.userSkill = this.userSkills[0];
    });
  }

  openNotifModal(){
    this.modalService.open(this.notifRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  createNotif(){
    this.addedNotif.notificationText = this.notifDesc;
    const employeeNSN: string[] = this.selEmployee.split(' ');
    this.addedNotif.idEmployee = this.employees.find(emp => emp.firstname == employeeNSN[0] && emp.lastname == employeeNSN[1]).id;
    const employerNSN: string[] = this.selEmployer.split(' ');
    this.addedNotif.idEmployee = this.employees.find(emp => emp.firstname == employerNSN[0] && emp.lastname == employerNSN[1]).id;
    this.addedNotif.idUserSkill = this.userSkill.id;
    this.addedNotif.sendingDate = new Date();

    this.notificationService.pull(this.addedNotif);
  }
}
