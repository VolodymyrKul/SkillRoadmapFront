import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EmployerDTO } from '../models/employer-dto';
import { SignInUser } from '../models/sign-in-user';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  private url = `${environment.apiUrl}/api/employers`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(employerDTO: EmployerDTO){
    return this.http.post(this.url + '/pull', employerDTO);
  }

  update(employerDTO: EmployerDTO){
    return this.http.put(this.url, employerDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  getEmpInfo(email: string){
    return this.http.get(this.url + "/getinfo/" + email);
  }

  login(signin: SignInUser){
    return this.http.post(this.url + '/login', signin);
  }

  getAllInfo(company: string){
    return this.http.get(this.url + "/getallinfo/" + company);
  }
}
