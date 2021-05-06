import { Component } from '@angular/core';
import { SignInAlertService } from './services/sign-in-alert.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SignInAlertService]
})
export class AppComponent {
  title = 'SkillRoadmapNg';
  subscription: Subscription;

  constructor(private signInAlertService: SignInAlertService){
    this.subscription = signInAlertService.signinSuccess$.subscribe(
      mes => {
        //console.log(mes);
    });
  }
}
