import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from 'src/app/models/employee-dto';
import { EmployeeInfo } from 'src/app/models/employee-info';
import { EmployerDTO } from 'src/app/models/employer-dto';
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
  employerDTO: EmployerDTO = new EmployerDTO();
  employeeInfo: EmployeeInfo = new EmployeeInfo();
  employeeDTO: EmployeeDTO = new EmployeeDTO();

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
      /*this.employerService.getEmpInfo(localStorage.getItem('currentuser'))
      .subscribe((data: EmployerInfo) => {
        this.roleMode = true;
        this.employerInfo = data;
        localStorage.setItem("currentcompany", this.employerInfo.companyName);
      });*/

      this.employerService.getEmpInfoFull(localStorage.getItem('currentuser'))
      .subscribe((data: EmployerDTO) => {
        this.roleMode = true;
        this.employerDTO = data;
        localStorage.setItem("currentuserid", this.employerDTO.id.toString());
        localStorage.setItem("currentcompany", this.employerDTO.companyName);
        localStorage.setItem("currentcompanyid", this.employerDTO.idCompany.toString());
        console.log(this.employerDTO);
      });
    }
    else{
      /*this.employeeService.getEmpInfo(localStorage.getItem('currentuser'))
      .subscribe((data: EmployeeInfo) => {
        this.roleMode = false;
        this.employeeInfo = data;
        localStorage.setItem("currentcompany", this.employeeInfo.companyName);
      });*/

      this.employeeService.getEmpInfoFull(localStorage.getItem('currentuser'))
      .subscribe((data: EmployeeDTO) => {
        this.employeeDTO = data;
        this.roleMode = false;
        localStorage.setItem("currentuserid", this.employeeDTO.id.toString());
        localStorage.setItem("currentcompany", this.employeeDTO.companyName);
        localStorage.setItem("currentcompanyid", this.employeeDTO.idCompany.toString());
        console.log(this.employeeDTO);
      });
    }
  }
}
