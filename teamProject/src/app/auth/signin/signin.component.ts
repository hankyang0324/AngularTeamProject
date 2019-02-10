import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AuthService,TokenPayload } from '../auth.service';
import { PageInfoService } from '../../shared/page-info.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  signinForm: FormGroup;
  nameWarn:boolean=false;
  pwdWarn:boolean=false;
  err:string="";
  credentials: TokenPayload = {
    name:'',
    password:''
  }

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private pageInfoService: PageInfoService) {}
  ngOnInit() {
    this.signinForm = new FormGroup({
      'userData': new FormGroup({ //userData对应formGroupName
        'username': new FormControl(null, [Validators.required]),//第一个参数是默认value，username对应formControlName,第一个this捆绑的不是这个class，是angular调用的时候捆绑的是触发这个event的element，第二个this捆绑的是这个class，function中this.forbiddenUsernames中的this要用到
        'password': new FormControl(null, [Validators.required]),//FormControl(defalut value,[validators,…])
      }),
    }); 
    this.signinForm.valueChanges.subscribe(()=>{ //检测表值变化
      if(this.signinForm.get('userData.username').valid){
        this.nameWarn=false;
        this.err="";
      }
      if(this.signinForm.get('userData.password').valid){
        this.pwdWarn=false;
        this.err="";
      }
    });
  }

  onSubmit(){
    if(!this.signinForm.get('userData.username').valid){
      this.nameWarn=true;
    }
    if(!this.signinForm.get('userData.password').valid){
      this.pwdWarn=true;
    }  
    if(this.signinForm.get('userData.username').valid && this.signinForm.get('userData.password').valid) {
      this.credentials.name=this.signinForm.get('userData.username').value;
      this.credentials.password=this.signinForm.get('userData.password').value;
      this.authService.login(this.credentials).subscribe(
        ()=>{
          this.authService.signState=true;
          this.authService.usernameUpdate(this.signinForm.get('userData.username').value);
          this.pageInfoService.pageTitleUpdate.next("Project1");
          this.err="";
          this.router.navigate(['./resource']);
        },
        err => {
          this.authService.signState=false;
          this.err=err.error;
          console.log(err.error);
        }
      );
    }
  }

  onSignUp(){
    this.router.navigate(['./signup']);
  }
}
