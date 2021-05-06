import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInAlertService {

  constructor() { }

  private userSignInSource = new Subject<string>();

  signinSuccess$ = this.userSignInSource.asObservable();

  confirmSignIn(signincommand: string) {
    this.userSignInSource.next(signincommand);
  }
}
