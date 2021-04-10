import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SkillMetric } from '../models/skill-metric';
import { SkillMetricDTO } from '../models/skill-metric-dto';

@Injectable({
  providedIn: 'root'
})
export class SkillMetricService {
  private url = `${environment.apiUrl}/api/skillmetrics`;

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(skillMetricDTO: SkillMetricDTO){
    return this.http.post(this.url + '/pull', skillMetricDTO);
  }

  update(skillMetricDTO: SkillMetricDTO){
    return this.http.put(this.url, skillMetricDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  addSkillMetric(skillMetric: SkillMetric){
    return this.http.post(this.url + '/pull', skillMetric);
  }
}
