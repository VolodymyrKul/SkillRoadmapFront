import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../app/components/signin/signin.component';
import { SignupComponent } from '../app/components/signup/signup.component';
import { RoadmapComponent } from '../app/components/roadmap/roadmap.component';
import { AccountComponent } from './components/account/account.component';
import { GradematrixComponent } from './components/gradematrix/gradematrix.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ManagementComponent } from './components/management/management.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { TrainingMemberComponent } from './components/training-member/training-member.component';
import { WorkerTrainingComponent } from './components/worker-training/worker-training.component';
import { WorkerCertificateComponent } from './components/worker-certificate/worker-certificate.component';
import { WorkerSkillMatrixComponent } from './components/worker-skill-matrix/worker-skill-matrix.component';
import { WorkerSkillTemplateComponent } from './components/worker-skill-template/worker-skill-template.component';
import { WorkerManagementComponent } from './components/worker-management/worker-management.component';
import { HrMentorTrainingComponent } from './components/hr-mentor-training/hr-mentor-training.component';
import { HrMentorCertificateComponent } from './components/hr-mentor-certificate/hr-mentor-certificate.component';
import { HrMentorManagementComponent } from './components/hr-mentor-management/hr-mentor-management.component';
import { HrMentorSkillMatrixComponent } from './components/hr-mentor-skill-matrix/hr-mentor-skill-matrix.component';
import { HrMentorSkillTemplateComponent } from './components/hr-mentor-skill-template/hr-mentor-skill-template.component';

const routes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'roadmap', component: RoadmapComponent},
  {path: 'account', component: AccountComponent},
  {path: 'matrix', component: GradematrixComponent},
  {path: 'mycertif', component: CertificatesComponent},
  {path: 'notif', component: NotificationsComponent},
  {path: 'management', component: ManagementComponent},
  {path: 'trainings', component: TrainingsComponent},
  {path: 'trmembers', component: TrainingMemberComponent},
  {path: 'wtraining', component: WorkerTrainingComponent},
  {path: 'wcertif', component: WorkerCertificateComponent},
  {path: 'wmatrix', component: WorkerSkillMatrixComponent},
  {path: 'wtemplate', component: WorkerSkillTemplateComponent},
  {path: 'wmanagement', component: WorkerManagementComponent},
  {path: 'hrtraining', component: HrMentorTrainingComponent},
  {path: 'hrcertif', component: HrMentorCertificateComponent},
  {path: 'hrmanagement', component: HrMentorManagementComponent},
  {path: 'hrmatrix', component: HrMentorSkillMatrixComponent},
  {path: 'hrtemplate', component: HrMentorSkillTemplateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
