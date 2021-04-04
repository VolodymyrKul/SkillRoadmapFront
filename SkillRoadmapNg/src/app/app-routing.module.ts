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

const routes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'roadmap', component: RoadmapComponent},
  {path: 'account', component: AccountComponent},
  {path: 'matrix', component: GradematrixComponent},
  {path: 'mycertif', component: CertificatesComponent},
  {path: 'notif', component: NotificationsComponent},
  {path: 'management', component: ManagementComponent},
  {path: 'trainings', component: TrainingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
