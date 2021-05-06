import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserSkill } from '../models/user-skill';
import { UserSkillDTO } from '../models/user-skill-dto';

@Injectable({
  providedIn: 'root'
})
export class UserSkillService {
  private url = `${environment.apiUrl}/api/userskills`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(userSkillDTO: UserSkillDTO){
    return this.http.post(this.url + '/pull', userSkillDTO);
  }

  update(userSkillDTO: UserSkillDTO){
    return this.http.put(this.url, userSkillDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  getByYear(user: string, year: number){
    return this.http.get(this.url + '/byyear/' + user + '/' + year);
  }

  getByYearId(userid: number, year: number){
    return this.http.get(this.url + '/byyearid/' + userid + '/' + year);
  }

  addUserSkill(userSkill: UserSkill){
    return this.http.post(this.url + '/pull', userSkill);
  }

  getYears(user: string){
    return this.http.get(this.url + '/getyears/' + user);
  }

  getYearsId(userid: number){
    return this.http.get(this.url + '/getyearsid/' + userid);
  }

  getOnly(user: string){
    return this.http.get(this.url + '/getonly/' + user);
  }

  getOnlyId(userid: number){
    return this.http.get(this.url + '/getonlyid/' + userid);
  }
}
