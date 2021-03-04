import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SkillUnit } from '../models/skill-unit';

@Injectable({
  providedIn: 'root'
})
export class SkillUnitService {
  private url = `${environment.apiUrl}/api/skillunits`;

  constructor(private http: HttpClient) {}

  addSkillUnit(skillUnit: SkillUnit){
    return this.http.post(this.url + '/pull', skillUnit);
  }
}
