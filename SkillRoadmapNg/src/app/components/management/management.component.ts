import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployerService } from '../../services/employer.service';
import { EmployeeInfo } from '../../models/employee-info';
import { EmployerInfo } from '../../models/employer-info';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  usercompany: string = "";
  employees: EmployeeInfo[] = [];
  employers: EmployerInfo[] = [];
  tablemode: boolean = true;
  userRole: string = "";

  constructor(private employeeService: EmployeeService, private employerService: EmployerService) { }

  ngOnInit(): void {
    this.usercompany = localStorage.getItem("currentcompany");
    this.employeeService.getAllInfo(this.usercompany)
    .subscribe((data: EmployeeInfo[] | any) => {
      this.employees = data;
    });
    this.employerService.getAllInfo(this.usercompany)
    .subscribe((data: EmployerInfo[] | any) => {
      this.employers = data;
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
}
