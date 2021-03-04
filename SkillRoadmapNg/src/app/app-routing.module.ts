import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../app/components/signin/signin.component';
import { SignupComponent } from '../app/components/signup/signup.component';
import { RoadmapComponent } from '../app/components/roadmap/roadmap.component';
import { AccountComponent } from './components/account/account.component';
import { GradematrixComponent } from './components/gradematrix/gradematrix.component';

const routes: Routes = [
  {path: '', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'roadmap', component: RoadmapComponent},
  {path: 'account', component: AccountComponent},
  {path: 'matrix', component: GradematrixComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
