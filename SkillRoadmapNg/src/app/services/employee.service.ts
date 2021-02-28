import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = `${environment.apiUrl}/api/employees`;

  constructor(private http: HttpClient) { }

  getEmpInfo(email: string){
    return this.http.get(this.url + "/getinfo/" + email);
  }
}
