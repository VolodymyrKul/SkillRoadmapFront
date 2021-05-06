import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AccountComponent } from './components/account/account.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { GradematrixComponent } from './components/gradematrix/gradematrix.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentModalComponent } from './components/comment-modal/comment-modal.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ManagementComponent } from './components/management/management.component';
import { TrainingMemberComponent } from './components/training-member/training-member.component';
import { WorkerManagementComponent } from './components/worker-management/worker-management.component';
import { HrMentorManagementComponent } from './components/hr-mentor-management/hr-mentor-management.component';
import { WorkerTrainingComponent } from './components/worker-training/worker-training.component';
import { HrMentorTrainingComponent } from './components/hr-mentor-training/hr-mentor-training.component';
import { WorkerSkillMatrixComponent } from './components/worker-skill-matrix/worker-skill-matrix.component';
import { HrMentorSkillMatrixComponent } from './components/hr-mentor-skill-matrix/hr-mentor-skill-matrix.component';
import { WorkerSkillTemplateComponent } from './components/worker-skill-template/worker-skill-template.component';
import { HrMentorSkillTemplateComponent } from './components/hr-mentor-skill-template/hr-mentor-skill-template.component';
import { WorkerCertificateComponent } from './components/worker-certificate/worker-certificate.component';
import { HrMentorCertificateComponent } from './components/hr-mentor-certificate/hr-mentor-certificate.component';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    AccountComponent,
    RoadmapComponent,
    GradematrixComponent,
    NavbarComponent,
    CommentModalComponent,
    TrainingsComponent,
    CertificatesComponent,
    NotificationsComponent,
    ManagementComponent,
    TrainingMemberComponent,
    WorkerManagementComponent,
    HrMentorManagementComponent,
    WorkerTrainingComponent,
    HrMentorTrainingComponent,
    WorkerSkillMatrixComponent,
    HrMentorSkillMatrixComponent,
    WorkerSkillTemplateComponent,
    HrMentorSkillTemplateComponent,
    WorkerCertificateComponent,
    HrMentorCertificateComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
