import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/models/certificate';
import { CertificateService } from '../../services/certificate.service';
import { OrderCertificate } from '../../models/order-certificate';
import { UserSkillService } from '../../services/user-skill.service';
import { UserSkill } from 'src/app/models/user-skill';
import { ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  acceptCertificate: Certificate = new Certificate('', 'Some certificate title', 0, new Date(Date.now()), new Date(Date.now()), '', '');
  ordercertificate: OrderCertificate = new OrderCertificate('', localStorage.getItem('currentuser'));
  userSkills: UserSkill[] = [];
  closeResult = '';
  isOrdered: boolean = false;
  isMentor: boolean = false;

  constructor(private certificateService: CertificateService, private userSkillService: UserSkillService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentrole')=='Mentor'){
      this.isMentor = true;
      this.certificateService.getByMentor(localStorage.getItem('currentuser'))
      .subscribe((data: Certificate[] | any) => {
        this.mycertificates = data;
        this.mycertificates.forEach(certificate => {
          certificate.dateOfIssue = new Date(certificate.dateOfIssue);
          certificate.expiryDate = new Date(certificate.expiryDate);
        });
      });
    }
    else{
      this.certificateService.getByEmail(localStorage.getItem('currentuser'))
      .subscribe((data: Certificate[] | any) => {
        this.mycertificates = data;
        this.mycertificates.forEach(certificate => {
          certificate.dateOfIssue = new Date(certificate.dateOfIssue);
          certificate.expiryDate = new Date(certificate.expiryDate);
        });

        this.userSkillService.getOnly(localStorage.getItem('currentuser'))
        .subscribe((data: UserSkill[] | any) => {
          this.userSkills = data;
          this.ordercertificate.userSkillName = this.userSkills[0].skillname;
          console.log(this.userSkills);
        });
      });
    }
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
    console.log(this.ordercertificate.recipientEmail);
    this.certificateService.orderCertif(this.ordercertificate)
    .subscribe((data: boolean | any) => {
      this.isOrdered = data;
      if(this.isOrdered){
        console.log('New order created');
      }
      else{
        console.log('New order was not created');
      }
    })
    this.modalService.dismissAll();
  }

  acceptCertificateFun(cer: Certificate){
    this.openAcceptModal();
    console.log(cer);
    this.acceptCertificate.userSkill = cer.userSkill;
    this.acceptCertificate.publisherNSN = cer.publisherNSN;
    this.acceptCertificate.recipientNSN = cer.recipientNSN;
    this.acceptCertificate.expiryDate
  }

  saveAcceptData(){
    console.log(this.acceptCertificate);
    /*this.certificateService.acceptCertif(this.acceptCertificate)
    .subscribe((data: any) => {

    });*/
    this.modalService.dismissAll();
  }
}
