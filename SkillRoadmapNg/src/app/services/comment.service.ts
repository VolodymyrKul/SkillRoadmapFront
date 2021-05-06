import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommentDTO } from '../models/comment-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = `${environment.apiUrl}/api/comments`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(commentDTO: CommentDTO){
    return this.http.post(this.url + '/pull', commentDTO);
  }

  update(commentDTO: CommentDTO){
    return this.http.put(this.url, commentDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  getByUser(user: string){
    return this.http.get(this.url + '/byskill/' + user);
  }

  getByUserId(userid: number){
    return this.http.get(this.url + '/byskillid/' + userid);
  }
}
