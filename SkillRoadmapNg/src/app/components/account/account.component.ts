import { Component, OnInit } from '@angular/core';
import { EmployeeDTO } from 'src/app/models/employee-dto';
import { EmployeeInfo } from 'src/app/models/employee-info';
import { EmployerDTO } from 'src/app/models/employer-dto';
import { EmployerInfo } from 'src/app/models/employer-info';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployerService } from 'src/app/services/employer.service';
import { Router } from '@angular/router'
import { StatisticsDTO } from 'src/app/models/statistics-dto';
import { StatisticsService } from 'src/app/services/statistics.service';
import { RecommendationService } from 'src/app/services/recommendation.service';
import { RecommendationDTO } from 'src/app/models/recommendation-dto';

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
  statisticsDTOs: StatisticsDTO[] = [];
  recommendationDTOs: RecommendationDTO[] = [];
  showRecommendationDTOs: RecommendationDTO[] = [];

  constructor(private employeeService: EmployeeService, private employerService: EmployerService, private router: Router,
    private statisticsService: StatisticsService, private recommendationService: RecommendationService) { }

  ngOnInit(): void {
    document.getElementById("PageNavigation").innerHTML = "Account";
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
        localStorage.setItem("currentUserNSN", this.employerDTO.firstname + " " + this.employerDTO.lastname);
        console.log(this.employerDTO);
        document.getElementById("SignInRef").innerHTML = "<span><i [ngClass] = '{'fas' : true, 'fa-sign-in-alt' : !isSigned, 'fa-sign-out-alt' : isSigned}' class='fas fa-sign-in-alt'></i></span> " + this.employerDTO.firstname + " " + this.employerDTO.lastname;

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
        localStorage.setItem("currentUserNSN", this.employeeDTO.firstname + " " + this.employeeDTO.lastname);
        console.log(this.employeeDTO);
        document.getElementById("SignInRef").innerHTML = "<span><i [ngClass] = '{'fas' : true, 'fa-sign-in-alt' : !isSigned, 'fa-sign-out-alt' : isSigned}' class='fas fa-sign-in-alt'></i></span> " + this.employeeDTO.firstname + " " + this.employeeDTO.lastname;
        this.statisticsService.getAll()
        .subscribe((data: StatisticsDTO[] | any) => {
          this.statisticsDTOs = data;
          this.statisticsDTOs = this.statisticsDTOs.filter(st => st.idEmployee == this.employeeDTO.id);
          this.statisticsDTOs.forEach(st => {
            st.betterThanPercent = Math.round(st.betterThanPercent)
          });
          console.log(this.statisticsDTOs);
        });

        this.recommendationService.getEmployeeById(this.employeeDTO.id)
        .subscribe((data: RecommendationDTO[] | any) => {
          this.recommendationDTOs = data;
          //console.log(this.recommendationDTOs);
          var randInt = this.getRandomInt(1, this.recommendationDTOs.length-5);
          for(var i = randInt; i < randInt + 3; i++){
            this.showRecommendationDTOs.push(this.recommendationDTOs[i]);
          }
          console.log(this.showRecommendationDTOs);
        });
      });
    }
  }

  goToTraining(rec: RecommendationDTO){
    this.router.navigate(['trainings'], { queryParams: { trId: rec.idTraining.toString() } });  
  }

  getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
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
    localStorage.setItem("currentmatrixempNSN", this.selectedEmployee);
    localStorage.setItem("currentmatrixemp", this.employeeDTOs.find(emp => emp.firstname+" "+emp.lastname == this.selectedEmployee).id.toString());
    this.router.navigate(['hrmatrix']);  
  }
}
