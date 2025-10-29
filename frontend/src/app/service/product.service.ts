import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServerURL = "http://localhost:9090";

  constructor(private http: HttpClient, private authService: AuthService){}

  public getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiServerURL}/api/products`);
  }

  public getProductById(id: Number): Observable<Product>{
    return this.http.get<Product>(`${this.apiServerURL}/api/product/${id}`);
  }

  public addProduct(product: Product): Observable<Product>{
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Product>(`${this.apiServerURL}/api/product`, product, {headers});
  }

  public updateProduct(product: Product): Observable<Product>{
    const headers = this.authService.getAuthHeaders();
    return this.http.put<Product>(`${this.apiServerURL}/api/product/${product.id}`, product, {headers});
  }

  public deleteProduct(id: number): Observable<Product>{
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<Product>(`${this.apiServerURL}/api/product/${id}`, {headers});
  }
}
