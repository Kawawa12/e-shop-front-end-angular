import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SignIn } from '../model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  private BASE_URL = 'http://localhost:8080/auth/api';

  constructor(private http:HttpClient, private router:Router) { }


  signIn(signData:SignIn): Observable<any> {
    const url = `${this.BASE_URL}/sign-in`;
    return this.http.post<any>(url, signData).pipe(
      tap(resp => {
        localStorage.setItem('id', resp.id);
        localStorage.setItem('role', resp.role);
        localStorage.setItem('jwtToken', resp.jwtToken);
      })
    );
       
  }


  //Navigator method
  goToPlaceOrder(){
    this.router.navigate(['/place-order']);
  }

  goToLoginPage(){
    this.router.navigate(['/sign-in']);
  }

  goToSignUpPage(){
    this.router.navigate(['/sign-up']);
  }

  goToHome() {
     this.router.navigate(['/home'])
  }

  goToAdmin(){
    this.router.navigate(['/admin']);
  }

  logoutToHome(){
    localStorage.clear();
    this.router.navigate(['home']);
  }

}
