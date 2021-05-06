import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignInAlertService } from 'src/app/services/sign-in-alert.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navsubscription: Subscription;
  navOptionTitle: string = "Sign In";
  isSigned: boolean = false;

  constructor(private signInAlertService: SignInAlertService,private router: Router){
    this.navsubscription = signInAlertService.signinSuccess$.subscribe(
      mes => {
        console.log(mes);
        if(mes == "User is signed"){
          this.navOptionTitle = "Sign Out";
          this.isSigned = true;
        }
    });
  }

  goToSignIn(){
    this.navOptionTitle = "Sign In";
    this.isSigned = false;
    this.router.navigate(['']); 
  }

  ngOnInit(): void {
  }
}
