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

  getByYear(user: number, year: number){
    return this.http.get(this.url + '/byyear/' + user + '/' + year);
  }
}
