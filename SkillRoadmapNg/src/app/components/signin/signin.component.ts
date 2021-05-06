import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInfo } from 'src/app/models/login-info';
import { EmployerService } from 'src/app/services/employer.service';
/*import { UserServiceService } from '../../services/user-service.service';*/
import { SignInUser } from '../../models/sign-in-user';
import { SignInAlertService } from '../../services/sign-in-alert.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isLogged: boolean = true;
  isLoading: boolean = false;
  user: SignInUser = new SignInUser('ilivocs@gmail.com', '_Aa123456');
  tmp: string = 'tmp1';
  info: LoginInfo = new LoginInfo(false, '')
  

  constructor(private router: Router, private employerService: EmployerService, private signInAlertService: SignInAlertService) { }

  ngOnInit(): void {
  }

  signin() : void {
    this.isLoading = true;
    this.employerService.login(this.user)
    .subscribe((data: LoginInfo | any) => {
      this.info = data;
      this.isLogged=this.info.isLogged;
      console.log(this.isLogged);
      console.log(this.info.role);
      this.isLoading = false;
      if(this.isLogged){
        localStorage.setItem("currentuser", (this.user.email==undefined) ? "undefined" : this.user.email);
        localStorage.setItem("currentrole", (this.info.role==undefined) ? "undefined" : this.info.role);
        this.confirmSignIn();
        this.router.navigate(['account']);  
      }
      else{
        this.isLogged = false;
      }
    });
  }

  hideAlert(){
    this.isLogged = true;
  }

  confirmSignIn(){
    this.signInAlertService.confirmSignIn("User is signed");
  }
}
