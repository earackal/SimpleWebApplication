import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServerURL = "http://localhost:9090";

  constructor(private http: HttpClient){}

  public getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiServerURL}/api/products`);
  }

  public addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.apiServerURL}/api/product`, product);
  }

  public updateProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.apiServerURL}/api/product/${product.id}`, product);
  }

}
