import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResourceComponent } from './resource/resource.component';
import { ProjectComponent } from './project/project.component';
import { FormulaComponent } from './formula/formula.component';
import { TemplateComponent } from './template/template.component'
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {path:'',redirectTo:'signin',pathMatch:'full'},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'resource',component:ResourceComponent},
  {path:'project',component:ProjectComponent},
  {path:'formula',component:FormulaComponent},
  {path:'template',component:TemplateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
