import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployerService } from '../../services/employer.service';
import { EmployeeInfo } from '../../models/employee-info';
import { EmployerInfo } from '../../models/employer-info';
import { EmployeeDTO } from 'src/app/models/employee-dto';
import { EmployerDTO } from 'src/app/models/employer-dto';
import { CompanyDTO } from 'src/app/models/company-dto';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  usercompany: string = "";
  usercompanyid: number = 0;
  employees: EmployeeInfo[] = [];
  employers: EmployerInfo[] = [];
  employeesDTO: EmployeeDTO[] = [];
  employersDTO: EmployerDTO[] = [];
  companiesDTO: CompanyDTO[] = [];
  tablemode: boolean = true;
  userRole: string = "";

  constructor(private employeeService: EmployeeService, private employerService: EmployerService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.usercompany = localStorage.getItem("currentcompany");
    this.usercompanyid = parseInt(localStorage.getItem("currentcompanyid"), 10);

    this.employeeService.getAllInfo(this.usercompany)
    .subscribe((data: EmployeeInfo[] | any) => {
      this.employees = data;
    });

    this.employeeService.getAllInfoId(this.usercompanyid)
    .subscribe((data: EmployeeDTO[] | any) => {
      this.employeesDTO = data;
      console.log(this.employeesDTO);
    });

    this.employerService.getAllInfo(this.usercompany)
    .subscribe((data: EmployerInfo[] | any) => {
      this.employers = data;
    });

    this.employerService.getAllInfoId(this.usercompanyid)
    .subscribe((data: EmployerDTO[] | any) => {
      this.employersDTO = data;
      console.log(this.employersDTO);
    });

    this.companyService.getAll()
    .subscribe((data: CompanyDTO[] | any) => {
      this.companiesDTO = data;
    });

    this.userRole = localStorage.getItem('currentrole');
    if(this.userRole == 'HR' || this.userRole == 'Mentor'){
      this.tablemode = true;
    }
    else{
      this.tablemode = false;
    }
  }

  setEmployersMode(){
    this.tablemode = true;
  }
  setEmployeesMode(){
    this.tablemode = false;
  }

  setEmployeeHr(emp: EmployeeDTO){
    this.employerService.setHrId(emp.id);
  }
  setEmployeeMentor(emp: EmployeeDTO){
    this.employerService.setMentorId(emp.id);
  }
  deleteEmployee(emp: EmployeeDTO){
    this.employeeService.delete(emp.id);
  }
  deleteEmployer(emp: EmployerDTO){
    this.employerService.delete(emp.id);
  }
}
