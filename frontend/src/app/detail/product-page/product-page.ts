import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductEdit } from '../product-edit/product-edit';
import { ProductView } from '../product-view/product-view';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [ProductEdit, ProductView, CommonModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css'
})
export class ProductPage {
  @Input() product!: Product;
  isOwner: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(id);
  }

  getProduct(id: Number){
    this.productService.getProductById(id).subscribe({
      next: (response: Product) => {
        this.product = response;
        const currentUser = this.authService.getUser();
        this.isOwner = currentUser ? currentUser.username == this.product.user.username : false;
      },
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }
}
