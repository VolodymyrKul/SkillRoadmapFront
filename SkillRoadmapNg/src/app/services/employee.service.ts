import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EmployeeDTO } from '../models/employee-dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = `${environment.apiUrl}/api/employees`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(employeeDTO: EmployeeDTO){
    return this.http.post(this.url + '/pull', employeeDTO);
  }

  update(employeeDTO: EmployeeDTO){
    return this.http.put(this.url, employeeDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  getEmpInfo(email: string){
    return this.http.get(this.url + "/getinfo/" + email);
  }

  getEmpInfoFull(email: string){
    return this.http.get(this.url + "/getinfofull/" + email);
  }

  getAllInfo(company: string){
    return this.http.get(this.url + "/getallinfo/" + company);
  }

  getAllInfoId(companyid: number){
    return this.http.get(this.url + "/getallinfoid/" + companyid);
  }

  getByTraining(training: string){
    return this.http.get(this.url + "/getbytraining/" + training);
  }

  getByTrainingId(trainingid: number){
    return this.http.get(this.url + "/getbytrainingid/" + trainingid);
  }
}
