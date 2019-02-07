import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject,Observable,of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  _id:string, //what's this for?
  name:string,
  password:string,
  exp:number, //what's this for?
  iat: number //what's this for?
}

// interface TokenResponse {
//   token: string;
// }

export interface TokenPayload {
  _id: string,
  name: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signState:boolean=false;
  username:string="";
  signUpdate=new Subject();
  userUpdate=new Subject();
  private token: string;

  constructor(private http:HttpClient, private router: Router) { }

  private saveToken (token:string):void {
    localStorage.setItem('userToken',token);
    this.token = token;
  }

  private getToken():string {
    if(!this.token) {
      this.token = localStorage.getItem('userToken');
    }
    return this.token;
  }

  getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if(token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if(user) {
      this.signState=true;//自己加的
      return user.exp > Date.now()/1000;
    } else {
      this.signState=false; //自己加的
      return false;
    }
  }

  register(user: TokenPayload) :Observable<any> {
    return this.http.post('/users/register',user);
    // const request = base.pipe(
    //   map((data:TokenResponse)=>{
    //     if(data.token){
    //       this.saveToken(data.token);
    //     }
    //     return data;
    //   })
    // );
  }

  login(user: TokenPayload) :Observable<any> {
    const base = this.http.post('/users/login',user);
    console.log(base);
    const request = base.pipe(
      map((token)=>{
        // if(data.token){
        //   console.log('loginsave');//
          console.log(JSON.stringify(token));
          this.saveToken(JSON.stringify(token));
        }
      //   console.log('logindata');//
      //   return data;
      // })
    ));
    return request;
  }

  resource():Observable<any> {
    return this.http.get('/users/profile',{
      headers:{Authorization:'$(this.getToken())'}
    })
  }

  logout():void {
    this.token = '';
    this.signState=false; //自己加的
    window.localStorage.removeItem('userToken');
  }

  signStateUpdate(sign:boolean) {
    this.signState=sign;
    this.signUpdate.next(sign);
  }

  usernameUpdate(name:string) {
    this.username=name;
    this.userUpdate.next(name);
  }
}
