import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from 'src/app/models/employee-dto';
import { EmployeeInfo } from 'src/app/models/employee-info';
import { EmployerDTO } from 'src/app/models/employer-dto';
import { EmployerInfo } from 'src/app/models/employer-info';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployerService } from 'src/app/services/employer.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  achievMode: boolean = false;
  userRole: string = '';
  roleMode: boolean = false;
  empSelectMode: boolean = false;
  empMatrixSelectMode: boolean = false;
  employerInfo: EmployerInfo = new EmployerInfo();
  employerDTO: EmployerDTO = new EmployerDTO();
  employeeInfo: EmployeeInfo = new EmployeeInfo();
  employeeDTO: EmployeeDTO = new EmployeeDTO();
  employeeDTOs: EmployeeDTO[] = [];
  employeeNSNs: string[] = [];
  selectedEmployee: string = "";

  constructor(private employeeService: EmployeeService, private employerService: EmployerService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  changeachievMode(){
    this.achievMode = !this.achievMode;
  }

  loadUserInfo(){
    this.userRole = localStorage.getItem('currentrole');
    if(this.userRole == 'HR' || this.userRole == 'Mentor'){

      this.employerService.getEmpInfoFull(localStorage.getItem('currentuser'))
      .subscribe((data: EmployerDTO) => {
        this.roleMode = true;
        this.employerDTO = data;
        localStorage.setItem("currentuserid", this.employerDTO.id.toString());
        localStorage.setItem("currentcompany", this.employerDTO.companyName);
        localStorage.setItem("currentcompanyid", this.employerDTO.idCompany.toString());
        console.log(this.employerDTO);

          this.employeeService.getAll()
          .subscribe((data: EmployeeDTO[] | any) => {
              this.employeeDTOs = data;
              if(this.userRole == 'Mentor'){
                this.employeeDTOs = this.employeeDTOs.filter(emp => emp.idMentor == this.employerDTO.id);
              }
              this.employeeDTOs.forEach(emp => {
                this.employeeNSNs.push(emp.firstname+" "+emp.lastname);
              });      
              this.selectedEmployee = this.employeeNSNs[0];        
          });
      });
    }
    else{
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

  selectEmpRoadMap(){
    console.log(this.selectedEmployee);
    console.log(this.employeeDTOs.find(emp => emp.firstname+" "+emp.lastname == this.selectedEmployee).id);
    localStorage.setItem("currentroadmap", this.employeeDTOs.find(emp => emp.firstname+" "+emp.lastname == this.selectedEmployee).email);
    this.router.navigate(['roadmap']);  
  }

  openCloseSelect(){
    this.empSelectMode = !this.empSelectMode;
  }

  openCloseMatrixSelect(){
    this.empMatrixSelectMode = !this.empMatrixSelectMode;
  }

  selectMatrixEmp(){
    console.log(this.selectedEmployee);
    console.log(this.employeeDTOs.find(emp => emp.firstname+" "+emp.lastname == this.selectedEmployee).id);
    localStorage.setItem("currentmatrixemp", this.employeeDTOs.find(emp => emp.firstname+" "+emp.lastname == this.selectedEmployee).id.toString());
    this.router.navigate(['hrmatrix']);  
  }
}
