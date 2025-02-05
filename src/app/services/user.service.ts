import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerOrderDto, SignUp } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:8080/auth/api';

  constructor(private http:HttpClient) { }

  register(request:SignUp): Observable<any> {
    const url = `${this.BASE_URL}/sign-up`;
    return this.http.post<any>(url, request);
  }

  placeOrder(order: CustomerOrderDto, id:any): Observable<any> {
    const url = `${this.BASE_URL}/place-order`;
  
    // Correctly set email as an HTTP parameter
    const params = new HttpParams().set('id', id);
  
    return this.http.post<any>(url, order, { params });
  }
  
}
