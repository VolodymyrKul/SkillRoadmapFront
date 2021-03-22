import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SkillMetric } from '../models/skill-metric';

@Injectable({
  providedIn: 'root'
})
export class SkillMetricService {
  private url = `${environment.apiUrl}/api/skillmetrics`;

  constructor(private http: HttpClient) {}

  addSkillMetric(skillMetric: SkillMetric){
    return this.http.post(this.url + '/pull', skillMetric);
  }
}
