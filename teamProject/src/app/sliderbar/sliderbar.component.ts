import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PageInfoService } from '../shared/page-info.service'

@Component({
  selector: 'app-sliderbar',
  templateUrl: './sliderbar.component.html',
  styleUrls: ['./sliderbar.component.css']
})

export class SliderbarComponent implements OnInit {
  @Output()ifSliderOpen = new EventEmitter<boolean>();
  sliderOpen:boolean = false;
  pageName:string="";

  constructor(private authService:AuthService,
              private pageInfoService:PageInfoService) { }

  ngOnInit() {
    this.pageInfoService.pageNameUpdate.subscribe(
      (pageName:string)=>{
        if(this.pageName!==pageName) {
          this.pageName = pageName;
          this.sliderOpen = false;
          this.ifSliderOpen.emit(this.sliderOpen);
        }
      }
    );
  }

  sliderToggle() {
    if(this.authService.signState){
      this.sliderOpen=!this.sliderOpen;
      this.ifSliderOpen.emit(this.sliderOpen);
    }
    this.authService.signUpdate.subscribe(
      (sign:boolean)=>{
        if(!sign){
          this.sliderOpen=false;
        }
      }
    )
  }
}
