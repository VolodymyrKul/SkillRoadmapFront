import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { TrainingDTO } from 'src/app/models/training-dto';
import { TrainingMemberDTO } from 'src/app/models/training-member-dto';
import { TrainingMemberService } from 'src/app/services/training-member.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training-member',
  templateUrl: './training-member.component.html',
  styleUrls: ['./training-member.component.css']
})
export class TrainingMemberComponent implements OnInit {
  membersDTO: TrainingMemberDTO[] = [];
  trainingsDTO: TrainingDTO[] = [];
  selTraining: TrainingDTO = new TrainingDTO();
  selectMembersDTO: TrainingMemberDTO[] = [];

  constructor(private trainingService: TrainingService, private trainingMemberService: TrainingMemberService) { }

  ngOnInit(): void {
    this.trainingService.getByCoachId(parseInt(localStorage.getItem("currentuserid"),10))
    .subscribe((data: TrainingDTO[] | any) => {
      this.trainingsDTO = data;
      this.selTraining.trainingTitle = this.trainingsDTO[0].trainingTitle;
      this.trainingMemberService.getAll()
        .subscribe((data: TrainingMemberDTO[] | any) => {
          this.membersDTO = data;
          this.selectMembersDTO = this.membersDTO.filter(tm => tm.idTraining == this.trainingsDTO[0].id);
        })
    })
  }

  selectTraining() {  
    console.log(this.selTraining.trainingTitle);  
    this.selectMembersDTO = this.membersDTO.filter(tm => tm.idTraining == this.trainingsDTO.find(train => train.trainingTitle == this.selTraining.trainingTitle).id);
  }
}
