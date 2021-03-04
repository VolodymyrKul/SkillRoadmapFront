import { Component, OnInit } from '@angular/core';
import { UserSkillService } from '../../services/user-skill.service';
import { CommentService } from '../../services/comment.service';
import { UserSkill } from '../../models/user-skill';

@Component({
  selector: 'app-gradematrix',
  templateUrl: './gradematrix.component.html',
  styleUrls: ['./gradematrix.component.css']
})
export class GradematrixComponent implements OnInit {
  userSkills: UserSkill[] = [];
  comments: Comment[] = [];

  constructor(private userSkillService: UserSkillService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.userSkillService.getByYear('ilivocs@gmail.com',2021)
    .subscribe((data: UserSkill[] | any) => {
      console.log(data);
      this.userSkills = data;
      this.userSkills.forEach(skill => {
        skill.startDate=new Date(skill.startDate);
        skill.endDate=new Date(skill.endDate);
      });
    });
    this.commentService.getByUser('ilivocs@gmail.com')
    .subscribe((data: Comment[] | any) => {
      console.log(data);
      this.comments = data;
    });
  }

}
