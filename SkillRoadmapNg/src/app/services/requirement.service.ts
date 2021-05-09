import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequirementDTO } from '../models/requirement-dto';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private url = `${environment.apiUrl}/api/requirements`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(requirementDTO: RequirementDTO){
    return this.http.post(this.url + '/pull', requirementDTO);
  }

  update(requirementDTO: RequirementDTO){
    return this.http.put(this.url, requirementDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  getBySkillTemplateId(id: number){
    return this.http.get(this.url + '/skilltemplate/' + id);
  }
}
