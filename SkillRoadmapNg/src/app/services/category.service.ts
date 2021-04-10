import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CategoryDTO } from '../models/category-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = `${environment.apiUrl}/api/categories`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(categoryDTO: CategoryDTO){
    return this.http.post(this.url + '/pull', categoryDTO);
  }

  update(categoryDTO: CategoryDTO){
    return this.http.put(this.url, categoryDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }
}
