import { Component, OnInit } from '@angular/core';
import { CertificateDTO } from 'src/app/models/certificate-dto';
import { CertificateService } from 'src/app/services/certificate.service';
import { UserSkillService } from 'src/app/services/user-skill.service';

@Component({
  selector: 'app-hr-mentor-certificate',
  templateUrl: './hr-mentor-certificate.component.html',
  styleUrls: ['./hr-mentor-certificate.component.css']
})
export class HrMentorCertificateComponent implements OnInit {
  mycertificatesDTO: CertificateDTO[] = [];
  confCertificatesDTO: CertificateDTO[] = [];
  isMentor: boolean = false;
  isNotConfirmed: boolean[] = [];

  constructor(private certificateService: CertificateService, private userSkillService: UserSkillService) { }

  ngOnInit(): void {
    this.getCertificatesForMentor();
  }

  getCertificatesForMentor(){
    this.isNotConfirmed = [];
    this.certificateService.getAll()
    .subscribe((data: CertificateDTO[] | any) => {
      this.mycertificatesDTO = data;
      this.mycertificatesDTO = this.mycertificatesDTO.filter(cer => cer.idPublisher == (parseInt(localStorage.getItem('currentuserid'), 10)));
      this.mycertificatesDTO.forEach(certificate => {
        certificate.dateOfIssue = new Date(certificate.dateOfIssue);
        certificate.expiryDate = new Date(certificate.expiryDate);
        if(certificate.certificateTitle == ""){
          this.isNotConfirmed.push(true);
        }
        else{
          this.isNotConfirmed.push(false);
        }
      });
    });
  }

  confirmCertif(cer: CertificateDTO, index: number){
    /*this.certificateService.getAll()
    .subscribe((data: CertificateDTO[] | any) => {
      this.confCertificatesDTO = data;
      var tmp = this.confCertificatesDTO.find(cert => cert.id == cer.id);
      if(tmp != undefined){
        tmp.certificateTitle="We confirmed certificate";
        this.certificateService.update(tmp)
        .subscribe((data: any) => {
          this.isNotConfirmed[index] = false;
        });  
      }
      else{
        console.log("Not find");
      }
    })*/
    cer.certificateTitle="We confirmed certificate";
    this.certificateService.update(cer)
    .subscribe((data: any) => {
      this.isNotConfirmed[index] = false;
    })
    //cer.certificateTitle="We confirmed certificate";
    console.log(cer);
  }

  printCertif(cer: CertificateDTO){
    this.certificateService.printCertificate(cer)
    .subscribe((data: boolean | any) => console.log(data));
  }
}
