import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private url = `${environment.apiUrl}/api/trainings`;

  constructor(private http: HttpClient) { }

  getByCoach(coach: string){
    return this.http.get(this.url + "/bycoach/" + coach);
  }

  getByCateg(categ: string){
    return this.http.get(this.url + "/bycateg/" + categ);
  }

  getWithCategs(){
    return this.http.get(this.url + "/withcategs");
  }
}
