import { Component, OnInit } from '@angular/core';
import { EmployeeInfo } from 'src/app/models/employee-info';
import { EmployerInfo } from 'src/app/models/employer-info';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployerService } from 'src/app/services/employer.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  achievMode: boolean = false;
  userRole: string = '';
  roleMode: boolean = false;
  employerInfo: EmployerInfo = new EmployerInfo();
  employeeInfo: EmployeeInfo = new EmployeeInfo();
  constructor(private employeeService: EmployeeService, private employerService: EmployerService) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  changeachievMode(){
    this.achievMode = !this.achievMode;
  }

  loadUserInfo(){
    this.userRole = localStorage.getItem('currentrole');
    if(this.userRole == 'HR' || this.userRole == 'Mentor'){
      this.employerService.getEmpInfo(localStorage.getItem('currentuser'))
      .subscribe((data: EmployerInfo) => {
        this.roleMode = true;
        this.employerInfo = data;
        localStorage.setItem("currentcompany", this.employerInfo.companyName);
      });
    }
    else{
      this.employeeService.getEmpInfo(localStorage.getItem('currentuser'))
      .subscribe((data: EmployeeInfo) => {
        this.roleMode = false;
        this.employeeInfo = data;
        localStorage.setItem("currentcompany", this.employeeInfo.companyName);
      });
    }
  }
}
