import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TrainingDTO } from '../models/training-dto';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private url = `${environment.apiUrl}/api/trainings`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(trainingDTO: TrainingDTO){
    return this.http.post(this.url + '/pull', trainingDTO);
  }

  update(trainingDTO: TrainingDTO){
    return this.http.put(this.url, trainingDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  getByCoach(coach: string){
    return this.http.get(this.url + "/bycoach/" + coach);
  }

  getByCoachId(coachid: number){
    return this.http.get(this.url + "/bycoachid/" + coachid);
  }

  getByCateg(categ: string){
    return this.http.get(this.url + "/bycateg/" + categ);
  }

  getByCategId(categid: number){
    return this.http.get(this.url + "/bycategid/" + categid);
  }

  getWithCategs(){
    return this.http.get(this.url + "/withcategs");
  }
}
