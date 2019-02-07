import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService:AuthService,
              private router:Router) { }
  
  isAuthenticated() {
    const myObservable = Observable.create((observer: Observer<boolean>)=>{ 
      observer.next( this.authService.signState );
      observer.complete();
    });
    return myObservable;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    this.isAuthenticated().subscribe(
      (authenticated: boolean) => {
        if (!authenticated) {
          this.router.navigate(['/signin']);
        }
      },
    )
    return this.isAuthenticated();
  }
}
