import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css'
})
export class ProductEdit {
  @Input() product!: Product;

  constructor(private router: Router, private service: ProductService){}
  
  onSubmit(form: NgForm){
    const updatedProduct: Product = {
      ...this.product,
      ...form.value,
      price: Number(form.value.price),
      stockQuantity: Number(form.value.quantity),
      releaseDate: new Date(this.product.releaseDate)
    };
    this.service.updateProduct(this.product).subscribe({
      next: (response: Product) => alert("Produkt wurde angepasst"),
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  deleteProduct() {
    if (!confirm('Produkt wirklich löschen?')) return;

    this.service.deleteProduct(this.product.id!).subscribe({
      next: (response: Product) => {
        alert('Produkt wurde gelöscht: '+ response.name);
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  addToCart() {
  }
}
