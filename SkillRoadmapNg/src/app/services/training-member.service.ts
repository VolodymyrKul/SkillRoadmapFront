import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TrainingMemberDTO } from '../models/training-member-dto';

@Injectable({
  providedIn: 'root'
})
export class TrainingMemberService {
  private url = `${environment.apiUrl}/api/trainingmembers`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(trainingMemberDTO: TrainingMemberDTO){
    return this.http.post(this.url + '/pull', trainingMemberDTO);
  }

  update(trainingMemberDTO: TrainingMemberDTO){
    return this.http.put(this.url, trainingMemberDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  getByTrainingId(id: number){
    return this.http.get(this.url + '/training/' + id);
  }

  getByMemberId(id: number){
    return this.http.get(this.url + '/member/' + id);
  }
}
