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
  isMentor: boolean = false;

  constructor(private certificateService: CertificateService, private userSkillService: UserSkillService) { }

  ngOnInit(): void {
    this.getCertificatesForMentor();
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

  printCertif(cer: CertificateDTO){
    this.certificateService.printCertificate(cer)
    .subscribe((data: boolean | any) => console.log(data));
  }
}
