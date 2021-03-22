import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserSkill } from '../models/user-skill';

@Injectable({
  providedIn: 'root'
})
export class UserSkillService {
  private url = `${environment.apiUrl}/api/userskills`;

  constructor(private http: HttpClient) { }

  getByYear(user: string, year: number){
    return this.http.get(this.url + '/byyear/' + user + '/' + year);
  }

  addUserSkill(userSkill: UserSkill){
    return this.http.post(this.url + '/pull', userSkill);
  }

  getYears(user: string){
    return this.http.get(this.url + '/getyears/' + user);
  }

  getOnly(user: string){
    return this.http.get(this.url + '/getonly/' + user);
  }
}
