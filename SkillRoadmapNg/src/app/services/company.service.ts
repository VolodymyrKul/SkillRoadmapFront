import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CompanyDTO } from '../models/company-dto';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private url = `${environment.apiUrl}/api/companies`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(companyDTO: CompanyDTO){
    return this.http.post(this.url + '/pull', companyDTO);
  }

  update(companyDTO: CompanyDTO){
    return this.http.put(this.url, companyDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }
}
