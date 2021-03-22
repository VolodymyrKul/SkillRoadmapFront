import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OrderCertificate } from '../models/order-certificate'; 
import { AcceptCertificate } from '../models/accept-certificate';
import { Certificate } from '../models/certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private url = `${environment.apiUrl}/api/certificates`;

  constructor(private http: HttpClient) { }

  getByEmail(email: string){
    return this.http.get(this.url + '/byuser/' + email);
  }

  orderCertif(order: OrderCertificate){
    return this.http.post(this.url + '/order', order);
  }

  acceptCertif(accept: Certificate){
    return this.http.put(this.url + '/accept', accept);
  }

  declineCertif(order: OrderCertificate){
    return this.http.post(this.url + '/decline', order);
  }

  getByMentor(email: string){
    return this.http.get(this.url + '/bymentor/' + email);
  }
}
