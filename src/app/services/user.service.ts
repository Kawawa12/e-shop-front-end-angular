import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BSE_URL = 'http://localhost:8080/auth/api';

  constructor(private http:HttpClient) { }

  register(request:SignUp): Observable<any> {
    const url = `${this.BSE_URL}/sign-up`;
    return this.http.post<any>(url, request);
  }
}
