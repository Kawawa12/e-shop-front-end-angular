import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ManagerProfileDto } from '../model';
import { AdminImageDto } from '../manager/manage-admins/manage-admins.component';

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

  getProfileImage(id: any): Observable<string> {
    const url = `${this.BASE_URL}/manager-img/${id}`;
    return this.http.get(url, { responseType: 'text' }); // Set responseType to 'text'
  }

  updateManagerProfImg(id: any, image: FormData): Observable<String> {
    const url = `${this.BASE_URL}/update-prof-img/${id}`;  // Correct URL with id
    return this.http.put(url, image, { responseType: 'text' });  // Ensure you use the full URL
  }
  
  managerProf(id: any): Observable<ManagerProfileDto>{
    return this.http.get<ManagerProfileDto>(`${this.BASE_URL}/manager-prof/${id}`);
  }

  updateManagerProf(id: any, profileDto: ManagerProfileDto): Observable<string> {
    const url = `${this.BASE_URL}/update-manager-prof/${id}`;
    return this.http.put(url, profileDto, { responseType: 'text' }).pipe(
      tap((response) => console.log('Update Response:', response)),
      catchError((error) => {
        console.error('Update Error:', error);
        return throwError(() => new Error('Failed to update profile.'));
      })
    );
  }
  
  //Admins
  getAdmins(): Observable<AdminImageDto[]> {
    return this.http.get<AdminImageDto[]>(`${this.BASE_URL}/admins-images`);
  }

  //Activate or deactivate admin
  changeAdminStatus(id: number): Observable<string> {
    return this.http.put(`${this.BASE_URL}/activate-or-deactivate-admin/${id}`, {}, { responseType: 'text' });
  }
  

}
