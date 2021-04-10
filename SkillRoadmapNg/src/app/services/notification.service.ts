import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Notification } from '../models/notification';
import { NotificationDTO } from '../models/notification-dto';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = `${environment.apiUrl}/api/notifications`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(notificationDTO: NotificationDTO){
    return this.http.post(this.url + '/pull', notificationDTO);
  }

  update(notificationDTO: NotificationDTO){
    return this.http.put(this.url, notificationDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  getByEmpployee(email: string){
    return this.http.get(this.url + '/byemployee/' + email);
  }

  getByEmpployer(email: string){
    return this.http.get(this.url + '/byemployer/' + email);
  }
}
