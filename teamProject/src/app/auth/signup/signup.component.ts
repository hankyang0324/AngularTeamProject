import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { AuthService ,TokenPayload } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  nameWarn:boolean=false;
  pwdWarn:boolean=false;
  credentials: TokenPayload = {
    _id:'',
    name:'',
    password:''
  }

  constructor(private activatedRoute: ActivatedRoute,private router: Router,private authService: AuthService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({ //userData对应formGroupName
        'username': new FormControl(null, [Validators.required]),//第一个参数是默认value，username对应formControlName,第一个this捆绑的不是这个class，是angular调用的时候捆绑的是触发这个event的element，第二个this捆绑的是这个class，function中this.forbiddenUsernames中的this要用到
        'password': new FormControl(null, [Validators.required]),//FormControl(defalut value,[validators,…])
      }),
    });
    this.signupForm.valueChanges.subscribe(()=>{ //检测表值变化
      if(this.signupForm.get('userData.username').valid){
        this.nameWarn=false;
      }
      if(this.signupForm.get('userData.password').valid){
        this.pwdWarn=false;
      }
    });
  }

  onSubmit(){
    if(!this.signupForm.get('userData.username').valid){
      this.nameWarn=true;
    }
    if(!this.signupForm.get('userData.password').valid){
      this.pwdWarn=true;
    }
    if(this.signupForm.get('userData.username').valid && this.signupForm.get('userData.password').valid) {
      this.credentials.name=this.signupForm.get('userData.username').value;
      this.credentials.password=this.signupForm.get('userData.password').value;
      this.authService.register(this.credentials).subscribe(
        (response)=>{
          console.log(response);
          this.router.navigate(['./signin']);
        },
        err => {
          console.log('err');
          console.log(err.error);
        }
      );
      // this.router.navigate(['./signin']);
    }
  }
}
