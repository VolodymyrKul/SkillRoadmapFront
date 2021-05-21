import { Component, OnInit } from '@angular/core';
import { CompanyDTO } from 'src/app/models/company-dto';
import { EmployeeDTO } from 'src/app/models/employee-dto';
import { EmployerDTO } from 'src/app/models/employer-dto';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployerService } from 'src/app/services/employer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  companyDTOs: CompanyDTO[] = [];
  employerDTOs: EmployerDTO[] = [];
  employeeDTO : EmployeeDTO = new EmployeeDTO(0, "Firstname", "Lastname", "email@gmail.com", "_Aa123456", "User", "Trainee C#", 2, 1, 1);

  constructor(private employerService: EmployerService, private companyService: CompanyService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.companyService.getAll()
    .subscribe((data : CompanyDTO[] | any) => {
      this.companyDTOs = data;
    });

    this.employerService.getAll()
    .subscribe((data : EmployerDTO[] | any) => {
      this.employerDTOs = data;
      this.employerDTOs = this.employerDTOs.filter(emp => emp.role == "Mentor");
    });
  }

  signup(){
    console.log(this.employeeDTO);
    //this.employeeService.pull(this.employeeDTO);    
  }

}
