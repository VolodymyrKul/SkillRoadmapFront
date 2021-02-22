import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = `${environment.apiUrl}/api/comments`;

  constructor(private http: HttpClient) { }

  getByUser(user: string){
    return this.http.get(this.url + '/byskill/' + user);
  }
}
