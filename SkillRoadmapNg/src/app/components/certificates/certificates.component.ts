import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/models/certificate';
import { CertificateService } from '../../services/certificate.service';
import { OrderCertificate } from '../../models/order-certificate';
import { UserSkillService } from '../../services/user-skill.service';
import { UserSkill } from 'src/app/models/user-skill';
import { ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CertificateDTO } from 'src/app/models/certificate-dto';
import { UserSkillDTO } from 'src/app/models/user-skill-dto';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {

  @ViewChild('orderModal')
  private parentRef: TemplateRef<any>;

  @ViewChild('acceptModal')
  private acceptRef: TemplateRef<any>;

  mycertificates: Certificate[] = [];
  mycertificatesDTO: CertificateDTO[] = [];
  acceptCertificate: Certificate = new Certificate('', 'Some certificate title', 0, new Date(Date.now()), new Date(Date.now()), '', '');
  acceptCertificateDTO: CertificateDTO = new CertificateDTO(0,0,"Some certificate title",0,new Date(Date.now()),new Date(Date.now()),0,0,"","","","","");
  ordercertificate: OrderCertificate = new OrderCertificate('', localStorage.getItem('currentuser'));
  ordercertificateDTO: CertificateDTO = new CertificateDTO(0,0,"",0,new Date(Date.now()),new Date(Date.now()),0,0,"","","","","");
  userSkills: UserSkill[] = [];
  userSkillsDTO: UserSkillDTO[] = []; 
  closeResult = '';
  isOrdered: boolean = false;
  isMentor: boolean = false;

  constructor(private certificateService: CertificateService, private userSkillService: UserSkillService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentrole')=='Mentor'){
      this.isMentor = true;
      this.getCertificatesForMentor();
    }
    else{
      this.certificateService.getByUserId(parseInt(localStorage.getItem('currentuserid'), 10))
        .subscribe((data: CertificateDTO[] | any) => {
          this.mycertificatesDTO = data;
          this.mycertificatesDTO.forEach(certificate => {
            certificate.dateOfIssue = new Date(certificate.dateOfIssue);
            certificate.expiryDate = new Date(certificate.expiryDate);
          });

          this.userSkillService.getOnlyId(parseInt(localStorage.getItem('currentuserid'), 10))
          .subscribe((data: UserSkillDTO[] | any) => {
            this.userSkillsDTO = data;
            this.ordercertificateDTO.skillName = this.userSkillsDTO[0].skillname;
            console.log(this.userSkillsDTO);
          });
        });
    }
  }

  getCertificatesForMentor(){
    this.certificateService.getByMentorId(parseInt(localStorage.getItem('currentuserid'), 10))
    .subscribe((data: CertificateDTO[] | any) => {
      this.mycertificatesDTO = data;
      this.mycertificatesDTO.forEach(certificate => {
        certificate.dateOfIssue = new Date(certificate.dateOfIssue);
        certificate.expiryDate = new Date(certificate.expiryDate);
      });
    });
  }

  addUserSkill(){
    console.log(this.parentRef);
    this.modalService.open(this.parentRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAcceptModal(){
    console.log(this.acceptRef);
    this.modalService.open(this.acceptRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  orderCertificateFun(){
    console.log(this.ordercertificate.userSkillName);
    console.log(this.ordercertificateDTO.recipientEmail);
    this.certificateService.orderCertifNew(this.ordercertificateDTO)
    .subscribe((data: boolean | any) => {
      this.isOrdered = data;
      if(this.isOrdered){
        console.log('New order created');
      }
      else{
        console.log('New order was not created');
      }
    });
    this.modalService.dismissAll();
  }

  acceptCertificateFun(cer: CertificateDTO){
    this.openAcceptModal();
    console.log(cer);

    this.acceptCertificateDTO.skillName = cer.skillName;
    this.acceptCertificateDTO.publisherNSN = cer.publisherNSN;
    this.acceptCertificateDTO.recipientNSN = cer.recipientNSN;
    this.acceptCertificateDTO.expiryDate;
  }

  saveAcceptData(){
    console.log(this.acceptCertificate);
    this.certificateService.acceptCertif(this.acceptCertificate)
    .subscribe((data: boolean | any) => {
      console.log(data);
      this.getCertificatesForMentor();
    });

    this.certificateService.acceptCertifNew(this.acceptCertificateDTO)
    .subscribe((data: boolean | any) => {
      console.log(data);
      this.getCertificatesForMentor();
    });
    this.modalService.dismissAll();
  }

  printCertif(cer: CertificateDTO){
    this.certificateService.printCertificate(cer)
    .subscribe((data: boolean | any) => console.log(data));
  }
}
