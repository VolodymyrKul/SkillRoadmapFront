import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/*import { UserServiceService } from '../../services/user-service.service';*/
import { SignInUser } from '../../models/sign-in-user'

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

  constructor(private router: Router/*, private userService: UserServiceService*/) { }

  ngOnInit(): void {
  }

  signin() : void {
    /*this.isLoading = true;
    this.userService.login(this.user)
    .subscribe((data: boolean | any) => {
      this.isLogged=data;
      console.log(this.isLogged);
      this.isLoading = false;
      if(this.isLogged){
        localStorage.setItem("currentuser", (this.user.email==undefined) ? "undefined" : this.user.email);
        this.router.navigate(['account']);  
      }
      else{
        this.isLogged = false;
      }
    });*/
  }

  hideAlert(){
    this.isLogged = true;
  }

}
