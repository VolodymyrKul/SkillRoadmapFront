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

  constructor(private certificateService: CertificateService, private userSkillService: UserSkillService) { }

  ngOnInit(): void {
    this.certificateService.getAll()
        .subscribe((data: CertificateDTO[] | any) => {
          this.mycertificatesDTO = data;
          this.mycertificatesDTO = this.mycertificatesDTO.filter(cer => cer.idRecipient == parseInt(localStorage.getItem('currentuserid'), 10))
          this.mycertificatesDTO = this.mycertificatesDTO.filter(cer => cer.certificateTitle != "");
          this.mycertificatesDTO.forEach(certificate => {
            certificate.dateOfIssue = new Date(certificate.dateOfIssue);
            certificate.expiryDate = new Date(certificate.expiryDate);
          });

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

}
