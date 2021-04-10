import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RecommendationDTO } from '../models/recommendation-dto';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private url = `${environment.apiUrl}/api/recommendations`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(recommendationDTO: RecommendationDTO){
    return this.http.post(this.url + '/pull', recommendationDTO);
  }

  update(recommendationDTO: RecommendationDTO){
    return this.http.put(this.url, recommendationDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }
}
