import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

 
   private BASE_URL = 'http://localhost:8080/auth/api';
 
  constructor(private http: HttpClient) { }
  
  addAdmin(formData: FormData): Observable<any> {
    //const headers = new HttpHeaders();
    const url = `${this.BASE_URL}/add-admin`
    return this.http.post<any>(url, formData);
  }


}
