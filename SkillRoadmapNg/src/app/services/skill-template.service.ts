import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SkillTemplateDTO } from '../models/skill-template-dto';

@Injectable({
  providedIn: 'root'
})
export class SkillTemplateService {
  private url = `${environment.apiUrl}/api/skilltemplates`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(skillTemplateDTO: SkillTemplateDTO){
    return this.http.post(this.url + '/pull', skillTemplateDTO);
  }

  update(skillTemplateDTO: SkillTemplateDTO){
    return this.http.put(this.url, skillTemplateDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }
}
