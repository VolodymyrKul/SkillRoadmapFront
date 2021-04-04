import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  trainings: Training[] = [];
  userRole: string = "";
  categs: string[] = [];
  trainingMode: boolean[] = [];
  showTrainings: Training[] = [];
  tableMode: boolean = false;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('currentrole');
    if(this.userRole == 'HR' || this.userRole == 'Mentor'){
      this.tableMode = true;
      this.trainingService.getByCoach(localStorage.getItem("currentuser"))
      .subscribe((data : Training[] | any) => {
        this.showTrainings = data;
        this.trainingMode = [];
        this.showTrainings.forEach(tr => {
          this.trainingMode.push(false);
          tr.startDate = new Date(tr.startDate);
          tr.endDate = new Date(tr.endDate);
        })
      });
    }
    else{
      this.tableMode = false;
      this.trainingService.getWithCategs()
      .subscribe((data : Training[] | any) => {
        this.trainings = data;
        this.trainingMode = [];
        this.trainings.forEach(tr => {
          this.categs.push(tr.categoryName);
          tr.startDate = new Date(tr.startDate);
          tr.endDate = new Date(tr.endDate);
        });
        this.categs = this.categs.filter((x, i, a) => a.indexOf(x) === i);
        this.showTrainings = this.trainings.filter(tr => tr.categoryName == this.categs[0]);
        this.showTrainings.forEach(tr => this.trainingMode.push(false));
      })
    }
  }

  selectCateg(categ: string){
    this.showTrainings = this.trainings.filter(tr => tr.categoryName == categ);
    this.trainingMode = [];
    this.showTrainings.forEach(tr => this.trainingMode.push(false));
  }

  changemodearr(d: Training){
    this.trainingMode[this.trainings.indexOf(d)] = !this.trainingMode[this.trainings.indexOf(d)];
  }
}
