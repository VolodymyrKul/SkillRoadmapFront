import { Component, OnInit } from '@angular/core';
import { CommentDTO } from 'src/app/models/comment-dto';
import { SkillMetricDTO } from 'src/app/models/skill-metric-dto';
import { SkillUnitDTO } from 'src/app/models/skill-unit-dto';
import { UserSkillDTO } from 'src/app/models/user-skill-dto';
import { CommentService } from 'src/app/services/comment.service';
import { SkillMetricService } from 'src/app/services/skill-metric.service';
import { SkillUnitService } from 'src/app/services/skill-unit.service';
import { UserSkillService } from 'src/app/services/user-skill.service';

@Component({
  selector: 'app-hr-mentor-skill-matrix',
  templateUrl: './hr-mentor-skill-matrix.component.html',
  styleUrls: ['./hr-mentor-skill-matrix.component.css']
})
export class HrMentorSkillMatrixComponent implements OnInit {
  userSkillDTOs: UserSkillDTO[] = [];
  skillUnitDTOs: SkillUnitDTO[] = [];
  skillMetricDTOs: SkillMetricDTO[] = [];
  commentDTOs: CommentDTO[] = [];

  constructor(private userSkillService: UserSkillService, 
    private skillUnitService: SkillUnitService, 
    private skillMetricService: SkillMetricService,
    private commentService: CommentService) { }

  ngOnInit(): void {
    this.userSkillService.getOnlyId(parseInt(localStorage.getItem("currentuserid"), 10))
    .subscribe((data: UserSkillDTO[] | any) => {
      this.userSkillDTOs = data;

      this.userSkillDTOs.forEach(us => {
        this.skillUnitService.getByUserSkillId(us.id)
        .subscribe((data: SkillUnitDTO[] | any) => {
          data.forEach(element => {
            this.skillUnitDTOs.push(element);
          });
        });

        this.skillMetricService.getByUserSkillId(us.id)
        .subscribe((data: SkillMetricDTO[] | any) => {
          data.forEach(element => {
            this.skillMetricDTOs.push(element);
          });
        });

        this.commentService.getByUserId(us.id)
        .subscribe((data: CommentDTO[] | any) => {
          data.forEach(element => {
            this.commentDTOs.push(element);
          });
        });
      });

      console.log(this.userSkillDTOs);
        console.log(this.skillUnitDTOs);
        console.log(this.skillMetricDTOs);
        console.log(this.commentDTOs);
    })

  }

}
