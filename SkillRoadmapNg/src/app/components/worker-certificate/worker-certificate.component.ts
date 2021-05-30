import { Component, OnInit } from '@angular/core';
import { CertificateDTO } from 'src/app/models/certificate-dto';
import { CertificateService } from 'src/app/services/certificate.service';
import { UserSkillService } from 'src/app/services/user-skill.service';

@Component({
  selector: 'app-worker-certificate',
  templateUrl: './worker-certificate.component.html',
  styleUrls: ['./worker-certificate.component.css']
})
export class WorkerCertificateComponent implements OnInit {
  mycertificatesDTO: CertificateDTO[] = [];

  cerMode1: boolean = false;
  cerMode2: boolean = false;
  cerMode3: boolean = false;
  cerMode4: boolean = false;
  cerMode5: boolean = false;
  cerMode6: boolean = false;

  interfaceMode: boolean = true;
  interfaceTitle: string = "Grid";

  skillLevels: string[] = [];

  constructor(private certificateService: CertificateService, private userSkillService: UserSkillService) { }

  ngOnInit(): void {
    document.getElementById("PageNavigation").innerHTML = "Certificate";
    this.certificateService.getAll()
        .subscribe((data: CertificateDTO[] | any) => {
          this.mycertificatesDTO = data;
          this.mycertificatesDTO = this.mycertificatesDTO.filter(cer => cer.idRecipient == parseInt(localStorage.getItem('currentuserid'), 10))
          this.mycertificatesDTO = this.mycertificatesDTO.filter(cer => cer.certificateTitle != "");
          this.mycertificatesDTO.forEach(certificate => {
            certificate.dateOfIssue = new Date(certificate.dateOfIssue);
            certificate.expiryDate = new Date(certificate.expiryDate);
          });
          this.setSkillLevels();

          /*this.userSkillService.getOnlyId(parseInt(localStorage.getItem('currentuserid'), 10))
          .subscribe((data: UserSkillDTO[] | any) => {
            this.userSkillsDTO = data;
            this.ordercertificateDTO.skillName = this.userSkillsDTO[0].skillname;
            console.log(this.userSkillsDTO);
          });*/
        });
  }
  printCertif(cer: CertificateDTO){
    this.certificateService.printCertificate(cer)
    .subscribe((data: boolean | any) => console.log(data));
  }

  setSkillLevels(){
    this.skillLevels = [];
    this.mycertificatesDTO.forEach(cer => {
      switch (cer.skillLevel) {
        case 1:
            this.skillLevels.push("Beginner");
            break;
        case 2:
            this.skillLevels.push("Elementary");
            break;
        case 3:
            this.skillLevels.push("Intermediate");
            break;
        case 4:
            this.skillLevels.push("Advanced");
            break;
        case 5:
            this.skillLevels.push("Proficiency");
            break;
      }
    })
  }

  changeUIMode(){
    this.interfaceMode = !this.interfaceMode;
    if(this.interfaceMode){
      this.interfaceTitle = "Grid"
    }
    else{
      this.interfaceTitle = "Table";
    }
  }

  byCerMode1(){
    if(this.cerMode1){
      this.mycertificatesDTO.sort((a,b) => (a.skillName==undefined || b.skillName==undefined) ? 
      0 : (a.skillName > b.skillName) ? 1 : (b.skillName > a.skillName) ? -1 : 0);
    }
    else{
      this.mycertificatesDTO.sort((a,b) => (a.skillName==undefined || b.skillName==undefined) ? 
      0 : (a.skillName < b.skillName) ? 1 : (b.skillName < a.skillName) ? -1 : 0);
    }
    this.setSkillLevels();
    this.cerMode1=!this.cerMode1;
  }

  byCerMode2(){
    if(this.cerMode2){
      this.mycertificatesDTO.sort((a,b) => (a.skillLevel==undefined || b.skillLevel==undefined) ? 
      0 : (a.skillLevel > b.skillLevel) ? 1 : (b.skillLevel > a.skillLevel) ? -1 : 0);
    }
    else{
      this.mycertificatesDTO.sort((a,b) => (a.skillLevel==undefined || b.skillLevel==undefined) ? 
      0 : (a.skillLevel < b.skillLevel) ? 1 : (b.skillLevel < a.skillLevel) ? -1 : 0);
    }
    this.setSkillLevels();
    this.cerMode2=!this.cerMode2;
  }

  byCerMode3(){
    if(this.cerMode3){
      this.mycertificatesDTO.sort((a,b) => (a.dateOfIssue==undefined || b.dateOfIssue==undefined) ? 
      0 : (a.dateOfIssue > b.dateOfIssue) ? 1 : (b.dateOfIssue > a.dateOfIssue) ? -1 : 0);
    }
    else{
      this.mycertificatesDTO.sort((a,b) => (a.dateOfIssue==undefined || b.dateOfIssue==undefined) ? 
      0 : (a.dateOfIssue < b.dateOfIssue) ? 1 : (b.dateOfIssue < a.dateOfIssue) ? -1 : 0);
    }
    this.setSkillLevels();
    this.cerMode3=!this.cerMode3;
  }

  byCerMode4(){
    if(this.cerMode4){
      this.mycertificatesDTO.sort((a,b) => (a.expiryDate==undefined || b.expiryDate==undefined) ? 
      0 : (a.expiryDate > b.expiryDate) ? 1 : (b.expiryDate > a.expiryDate) ? -1 : 0);
    }
    else{
      this.mycertificatesDTO.sort((a,b) => (a.expiryDate==undefined || b.expiryDate==undefined) ? 
      0 : (a.expiryDate < b.expiryDate) ? 1 : (b.expiryDate < a.expiryDate) ? -1 : 0);
    }
    this.setSkillLevels();
    this.cerMode4=!this.cerMode4;
  }

  byCerMode5(){
    if(this.cerMode5){
      this.mycertificatesDTO.sort((a,b) => (a.publisherNSN==undefined || b.publisherNSN==undefined) ? 
      0 : (a.publisherNSN > b.publisherNSN) ? 1 : (b.publisherNSN > a.publisherNSN) ? -1 : 0);
    }
    else{
      this.mycertificatesDTO.sort((a,b) => (a.publisherNSN==undefined || b.publisherNSN==undefined) ? 
      0 : (a.publisherNSN < b.publisherNSN) ? 1 : (b.publisherNSN < a.publisherNSN) ? -1 : 0);
    }
    this.setSkillLevels();
    this.cerMode5=!this.cerMode5;
  }

  byCerMode6(){
    if(this.cerMode6){
      this.mycertificatesDTO.sort((a,b) => (a.recipientNSN==undefined || b.recipientNSN==undefined) ? 
      0 : (a.recipientNSN > b.recipientNSN) ? 1 : (b.recipientNSN > a.recipientNSN) ? -1 : 0);
    }
    else{
      this.mycertificatesDTO.sort((a,b) => (a.recipientNSN==undefined || b.recipientNSN==undefined) ? 
      0 : (a.recipientNSN < b.recipientNSN) ? 1 : (b.recipientNSN < a.recipientNSN) ? -1 : 0);
    }
    this.setSkillLevels();
    this.cerMode6=!this.cerMode6;
  }
}
