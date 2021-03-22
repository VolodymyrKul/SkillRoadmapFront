import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = `${environment.apiUrl}/api/notifications`;

  constructor(private http: HttpClient) { }

  getByEmpployee(email: string){
    return this.http.get(this.url + '/byemployee/' + email);
  }

  getByEmpployer(email: string){
    return this.http.get(this.url + '/byemployer/' + email);
  }
}
