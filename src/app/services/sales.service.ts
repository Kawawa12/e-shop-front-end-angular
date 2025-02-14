import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export interface SalesRecord {
  day: string;
  id: number;
  saleDate: string;
  productNames: string[];
  quantities: number[];
  prices: number[];
  descriptions: string[];
  totalAmount: number;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private apiUrl = 'http://localhost:8080/auth/api';

  constructor(private http: HttpClient) {}

  // Fetch sales for the last week
  getLastWeekSales(): Observable<ApiResponse<SalesRecord[]>> {
    return this.http
      .get<ApiResponse<SalesRecord[]>>(`${this.apiUrl}/last-week`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle 404 Not Found specifically
          if (error.status === 404) {
            // Extract the response body
            const responseBody = error.error as ApiResponse<SalesRecord[]>;
            return throwError(() => responseBody); // Re-throw the response body as an error
          }
          // Handle other errors
          return throwError(() => new Error('Failed to fetch last week sales.'));
        })
      );
  }

  getSalesByDate(date: string): Observable<ApiResponse<SalesRecord[]>> {
    return this.http.get<ApiResponse<SalesRecord[]>>(`${this.apiUrl}/date/${date}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the 404 error specifically and throw a user-friendly message
        if (error.status === 404) {
          return throwError(() => new Error('No sales records found for the selected date.'));
        }
        // Handle other errors
        return throwError(() => new Error('Failed to fetch sales records.'));
      })
    );
  }
  

}