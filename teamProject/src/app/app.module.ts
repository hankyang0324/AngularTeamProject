import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion'; 
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResourceComponent } from './resource/resource.component';
import { ProjectComponent } from './project/project.component';
import { FormulaComponent } from './formula/formula.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { SliderbarComponent } from './sliderbar/sliderbar.component';
import { PageInfoService } from './shared/page-info.service'
import { DataStorageService } from './shared/data-storage.service';
import { TemplateComponent } from './template/template.component'

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ResourceComponent,
    ProjectComponent,
    FormulaComponent,
    HeaderComponent,
    SliderbarComponent,
    TemplateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AccordionModule,
    TableModule,
    DropdownModule,
    PopoverModule.forRoot()
  ],
  providers: [AuthService,AuthGuardService,PageInfoService,DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
