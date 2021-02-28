import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SignInUser } from '../models/sign-in-user';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private url = `${environment.apiUrl}/api/employers`;

  constructor(private http: HttpClient) { }

  getEmpInfo(email: string){
    return this.http.get(this.url + "/getinfo/" + email);
  }

  login(signin: SignInUser){
    return this.http.post(this.url + '/login', signin);
  }
}
