import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StatisticsDTO } from '../models/statistics-dto';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private url = `${environment.apiUrl}/api/statistics`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(statisticsDTO: StatisticsDTO){
    return this.http.post(this.url + '/pull', statisticsDTO);
  }

  update(statisticsDTO: StatisticsDTO){
    return this.http.put(this.url, statisticsDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  uptStats(emp: string, year: number){
    return this.http.get(this.url + "/uptstat/" + emp + "/" + year)
  }

  uptStatsid(empid: number, year: number){
    return this.http.get(this.url + "/uptstatid/" + empid + "/" + year)
  }
}
