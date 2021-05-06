import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SkillUnit } from '../models/skill-unit';
import { SkillUnitDTO } from '../models/skill-unit-dto';

@Injectable({
  providedIn: 'root'
})
export class SkillUnitService {
  private url = `${environment.apiUrl}/api/skillunits`;

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(skillUnitDTO: SkillUnitDTO){
    return this.http.post(this.url + '/pull', skillUnitDTO);
  }

  update(skillUnitDTO: SkillUnitDTO){
    return this.http.put(this.url, skillUnitDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  addSkillUnit(skillUnit: SkillUnit){
    return this.http.post(this.url + '/pull', skillUnit);
  }

  getByUserSkillId(id: number){
    return this.http.get(this.url + '/userskill/' + id);
  }
}
