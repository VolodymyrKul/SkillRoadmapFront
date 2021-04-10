import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training';
import { ViewChild, TemplateRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  @ViewChild('trainingModal')
  private createRef: TemplateRef<any>;

  trainings: Training[] = [];
  userRole: string = "";
  categs: string[] = [];
  trainingMode: boolean[] = [];
  showTrainings: Training[] = [];
  tableMode: boolean = false;
  addedTraining: Training = new Training("","",new Date(),new Date(),1,0,localStorage.getItem("currentuser"),"");
  closeResult: string = "";

  constructor(private trainingService: TrainingService, private modalService: NgbModal) { }

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

  openCreateTrModal(){
    //console.log(this.createRef);
    this.modalService.open(this.createRef, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  saveTraining(){
    console.log(this.addedTraining);
  }
}
