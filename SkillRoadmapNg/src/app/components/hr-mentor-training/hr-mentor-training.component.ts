import { Component, OnInit } from '@angular/core';
import { RecommendationDTO } from 'src/app/models/recommendation-dto';
import { TrainingDTO } from 'src/app/models/training-dto';
import { TrainingMemberDTO } from 'src/app/models/training-member-dto';
import { RecommendationService } from 'src/app/services/recommendation.service';
import { TrainingMemberService } from 'src/app/services/training-member.service';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-hr-mentor-training',
  templateUrl: './hr-mentor-training.component.html',
  styleUrls: ['./hr-mentor-training.component.css']
})
export class HrMentorTrainingComponent implements OnInit {
  trainingDTOs: TrainingDTO[] = [];
  recommendationDTOs: RecommendationDTO[] = [];
  trainingMemberDTOs: TrainingMemberDTO[] = [];

  constructor(private trainingService: TrainingService, private recommendationService: RecommendationService, private trainingMemberService: TrainingMemberService) { }

  ngOnInit(): void {
    this.trainingService.getByCoachId(parseInt(localStorage.getItem("currentuserid"), 10))
    .subscribe((data: TrainingDTO[] | any) => {
      this.trainingDTOs = data;
      this.trainingDTOs.forEach(tr => {
        tr.startDate = new Date(tr.startDate);
        tr.endDate = new Date(tr.endDate);

        this.recommendationService.getTrainingsById(tr.id)
        .subscribe((data: RecommendationDTO[] | any) => {
          data.forEach(el => {
            this.recommendationDTOs.push(el);
          }); 
        })

        this.trainingMemberService.getByTrainingId(tr.id)
        .subscribe((data: TrainingMemberDTO[] | any) => {
          data.forEach(el => {
            this.trainingMemberDTOs.push(el);
          });
        });
      });
      console.log(this.trainingDTOs);
      console.log(this.recommendationDTOs);
      console.log(this.trainingMemberDTOs);
    });

  }

}
