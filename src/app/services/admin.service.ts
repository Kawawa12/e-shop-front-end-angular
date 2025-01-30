import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CustomerOrderRespDto, Product } from '../model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  deleteCategory(categoryId: number) {
     
  }
  updateCategory(updatedCategory: { catName: string; id: number; }) {
   
  }

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
  
  getAllOrders(): Observable<CustomerOrderRespDto[]> {
    const url = `${this.BASE_URL}/orders`;
    return this.http.get<CustomerOrderRespDto[]>(url);
  }


}
