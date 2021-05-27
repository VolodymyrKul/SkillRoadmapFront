import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OrderCertificate } from '../models/order-certificate'; 
import { AcceptCertificate } from '../models/accept-certificate';
import { Certificate } from '../models/certificate';
import { CertificateDTO } from '../models/certificate-dto';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private url = `${environment.apiUrl}/api/certificates`;

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  getById(id: number){
    return this.http.get(this.url + '/' + id);
  }

  pull(certificateDTO: CertificateDTO){
    return this.http.post(this.url + '/pull', certificateDTO);
  }

  update(certificateDTO: CertificateDTO){
    return this.http.put(this.url + '/update', certificateDTO);
  }

  delete(id: number){
    return this.http.delete(this.url + "/" + id);
  }

  getByEmail(email: string){
    return this.http.get(this.url + '/byuser/' + email);
  }

  getByUserId(userid: number){
    return this.http.get(this.url + '/byuserid/' + userid);
  }

  orderCertif(order: OrderCertificate){
    return this.http.post(this.url + '/order', order);
  }

  orderCertifNew(order: CertificateDTO){
    return this.http.post(this.url + '/ordernew', order);
  }

  acceptCertif(accept: Certificate){
    return this.http.put(this.url + '/accept', accept);
  }

  acceptCertifNew(accept: CertificateDTO){
    return this.http.put(this.url + '/acceptnew', accept);
  }

  declineCertif(order: OrderCertificate){
    return this.http.post(this.url + '/decline', order);
  }

  declineCertifNew(order: CertificateDTO){
    return this.http.post(this.url + '/declinenew', order);
  }

  getByMentor(email: string){
    return this.http.get(this.url + '/bymentor/' + email);
  }

  getByMentorId(mentorid: number){
    return this.http.get(this.url + '/bymentor/' + mentorid);
  }

  printCertificate(order: CertificateDTO){
    return this.http.post(this.url + '/printcer', order);
  }
}
