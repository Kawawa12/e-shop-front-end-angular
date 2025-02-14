import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AdminRespDto, Category, CustomerOrderRespDto, ManagerProfileDto, Product, SalesDto, SalesRecord, StockResponseDto } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
   

  private BASE_URL = 'http://localhost:8080/auth/api';

  constructor(private http:HttpClient) { }

  getProduct(prodId: number, catId: number): Observable<any> {
    const params = { prodId: prodId.toString(), catId: catId.toString() };  
    const url = `${this.BASE_URL}/get-product`;
    return this.http.get<any>(url, { params });
  }

  addCategory(category: { categoryName: string }): Observable<any> {
    const url = `${this.BASE_URL}/add-category`;
    const params = new HttpParams().set('name', category.categoryName); // Use the 'categoryName' from the category object
    
    return this.http.post(url, null, { params });
  }

  getAdminProfileDetails(id: any): Observable<AdminRespDto>{
    const url = `${this.BASE_URL}/admin/${id}`;
    return this.http.get<AdminRespDto>(url);
  }

  updateAdminProf(id: any, profileDto: ManagerProfileDto): Observable<string> {
    const url = `${this.BASE_URL}/update-admin-prof/${id}`;
    return this.http.put(url, profileDto, { responseType: 'text' }).pipe(
      tap((response) => console.log('Update Response:', response)),
      catchError((error) => {
        console.error('Update Error:', error);
        return throwError(() => new Error('Failed to update profile.'));
      })
    );
  }

  getProfileImage(id: any): Observable<string> {
    const url = `${this.BASE_URL}/admin-img/${id}`;
    return this.http.get(url, { responseType: 'text' }); // Set responseType to 'text'
  }
  
  updateAdmnImg(id: any, image: FormData): Observable<String> {
    const url = `${this.BASE_URL}/update-admin-img/${id}`;  // Correct URL with id
    return this.http.put(url, image, { responseType: 'text' });  // Ensure you use the full URL
 }
 

  getCategories():Observable<Category[]>{
    const url = `${this.BASE_URL}/categories`;
    return this.http.get<Category[]>(url);
  }

  addProduct(productData: FormData): Observable<any> {
    // Log the form data before sending it to the backend
    for (let pair of productData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    const url = `${this.BASE_URL}/add-product`;
    return this.http.post<any>(url, productData);
  }
  

  getProducts(): Observable<Product[]> {
    const url = `${this.BASE_URL}/products`;   
    return this.http.get<Product[]>(url);
  }

  getActiveProducts(): Observable<Product[]> {
    const url = `${this.BASE_URL}/active-products`;   
    return this.http.get<Product[]>(url);
  }

  getDeactivatedProducts(): Observable<Product[]> {
    const url = `${this.BASE_URL}/deactivated-products`;   
    return this.http.get<Product[]>(url);
  }
  
  getAllOrders(): Observable<CustomerOrderRespDto[]> {
    const url = `${this.BASE_URL}/orders`;
    return this.http.get<CustomerOrderRespDto[]>(url);
  }

  getNewOrders(): Observable<CustomerOrderRespDto[]> {
    const url = `${this.BASE_URL}/new-orders`;
    return this.http.get<CustomerOrderRespDto[]>(url);
  }

  getConfirmedOrders(): Observable<CustomerOrderRespDto[]> {
    const url = `${this.BASE_URL}/confirmed-orders`;
    return this.http.get<CustomerOrderRespDto[]>(url);
  }

  getCompletedOrders(): Observable<CustomerOrderRespDto[]> {
    const url = `${this.BASE_URL}/completed-orders`;
    return this.http.get<CustomerOrderRespDto[]>(url);
  }

  getCanceledOrders(): Observable<CustomerOrderRespDto[]> {
    const url = `${this.BASE_URL}/canceled-orders`;
    return this.http.get<CustomerOrderRespDto[]>(url);
  }

  getAllStockProducts(): Observable<StockResponseDto[]> {
    const url = `${this.BASE_URL}/view-stock`;
    return this.http.get<StockResponseDto[]>(url);
  }

  addStock(stockValue: number, productId: number): Observable<any> {
    const url = `${this.BASE_URL}/add-stock`;
    const body = { stockValue, productId };
  
    // Set the responseType to 'text' to handle plain text responses
    return this.http.post(url, body, { responseType: 'text' }).pipe(
      map((response) => {
        // Convert the plain text response to a JSON object
        return { message: response };
      }),
      catchError((error) => {
        // Handle errors
        let errorMessage = 'An error occurred while updating stock. Please try again.';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.status === 404) {
          errorMessage = 'Product not found. Please check the product ID.';
        } else if (error.status === 400) {
          errorMessage = 'Invalid input. Please check the stock value and product ID.';
        } else if (error.status === 500) {
          errorMessage = 'A server error occurred. Please try again later.';
        }
  
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  confirmOrder(customerId: number, orderId: number): Observable<string> {
    const url = `${this.BASE_URL}/confirm-order`;
    const body = { customerId, orderId };
    return this.http.post(url, body, { responseType: 'text' }).pipe(
      map((response) => response.trim()), // Ensure only the message is returned
      catchError(this.handleError)
    );
  }
  
  cancelOrder(customerId: number, orderId: number): Observable<string> {
    const url = `${this.BASE_URL}/cancel-order`;
    const body = { customerId, orderId };
    return this.http.post(url, body, { responseType: 'text' }).pipe(
      map((response) => response.trim()), // Ensure only the message is returned
      catchError(this.handleError)
    );
  }
  

  completeOrder(customerId: number, orderId: number): Observable<any> {
    const url = `${this.BASE_URL}/complete-order`;
    const body = { customerId, orderId };
    return this.http.post(url, body, { responseType: 'text' }).pipe(
      map((response) => response.trim()), // Ensure only the message is returned
      catchError(this.handleError)
    );
  }

    // Centralized error handling
    private handleError(error: any): Observable<never> {
      let errorMessage = 'An error occurred while processing the order. Please try again.';
      
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (error.status === 404) {
        errorMessage = 'Order is not found. Please check the order verification.';
      } else if (error.status === 400) {
        errorMessage = 'Invalid input. Please check the Order value and order verification.';
      } else if (error.status === 500) {
        errorMessage = 'A server error occurred. Please try again later.';
      }
    
      return throwError(() => new Error(errorMessage));
    }
  
  //Activate product
  activateProduct(id: number): Observable<any>{
    const url = `${this.BASE_URL}/activate-product/${id}`;
    return this.http.post<any>(url, id);
  }

  //Deactivate product
  deActivateProduct(id: number): Observable<any>{
    const url = `${this.BASE_URL}/deactivate-product/${id}`;
    return this.http.post<any>(url, id);
  }

  //Sales Records

  addNewSales(salesData:SalesDto): Observable<any>{
  
    return this.http.post(`${this.BASE_URL}/add-sales`,salesData, { responseType: 'text' });
  }

  getDailySales(): Observable<SalesRecord>{
    return this.http.get<SalesRecord>(`${this.BASE_URL}/daily`);
  }

  
}
