import { Component, ViewEncapsulation,ChangeDetectorRef, AfterViewChecked, } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class AppComponent implements AfterViewChecked{
  title = 'teamProject';
  sliderOpen:boolean=false;

  constructor(private cd:ChangeDetectorRef,
              private authService: AuthService){}

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  sliderToggle(sliderState:boolean){
    this.sliderOpen=sliderState;
    this.authService.signUpdate.subscribe(
      (signIn:boolean) => {
        if(!signIn){
          this.sliderOpen=false;
        }       
      }
    );
  }
}
