import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AuthService } from '../auth/auth.service';
import { PageInfoService } from '../shared/page-info.service';
import { DataStorageService } from '../shared/data-storage.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  pageTitle:string = "";
  signState:boolean = false;
  username:string="";

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private pageInfoService: PageInfoService,
              private dsService: DataStorageService){}

  ngOnInit() {
    this.authService.userUpdate.subscribe(
      (username:string)=>{
        this.username=username;
      }
    );
    this.pageInfoService.pageTitleUpdate.subscribe(
      (pageTitle:string)=>{
        this.pageTitle=pageTitle;
      }
    );
  }

  onSignIn() {
    this.signState=this.authService.signState;
    if(!this.signState){
      this.router.navigate(['./signin']);
    }
  }

  onSignOut() {
    (<HTMLElement>document.getElementsByClassName("popover")[0]).style.display="none";
    this.authService.logout();
    this.signState=false;
    this.authService.signStateUpdate(this.signState);
    this.username="";
    this.authService.usernameUpdate(this.username);
    this.pageTitle="";
    this.pageInfoService.pageTitle="Project1";
    this.dsService.dataReset();
    this.router.navigate(['./signin']);
    this.pageInfoService.RSCHeader1Reset();
    this.pageInfoService.RSCHeader2Reset();

  }
}
