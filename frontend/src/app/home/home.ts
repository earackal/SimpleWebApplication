import { Component, OnInit } from '@angular/core';
import { ProductList } from '../product-list/product-list';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [ProductList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  products!: Product[];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(): void {
    // Since we don't know, when the server will reply
    // subscribe to getProducts() and act once it 
    // receives a response
    this.productService.getProducts().subscribe({
      next: (response: Product[]) => {
        console.log(response);
        this.products = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    }    
    )
  }
}
