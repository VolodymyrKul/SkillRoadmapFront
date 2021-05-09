import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ComparationDTO } from '../models/comparation-dto';

@Injectable({
  providedIn: 'root'
})
export class ComparationService {
  private url = `${environment.apiUrl}/api/comparations`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(comparationDTO: ComparationDTO){
    return this.http.post(this.url + '/pull', comparationDTO);
  }

  update(comparationDTO: ComparationDTO){
    return this.http.put(this.url, comparationDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  getByRequirementId(id: number){
    return this.http.get(this.url + '/requirement/' + id);
  }

  getByEmployeeId(id: number){
    return this.http.get(this.url + '/employee/' + id);
  }
}
