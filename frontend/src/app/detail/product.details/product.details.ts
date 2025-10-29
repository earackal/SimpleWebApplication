import { Component, Input } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Product } from '../../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm  } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product.detail',
  imports: [FormsModule, CommonModule],
  templateUrl: './product.detail.html',
  styleUrl: './product.detail.css'
})
export class ProductDetail {
  @Input() product!: Product;
  isOwner : boolean = false;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private service: ProductService){}

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProduct(id);
  }

  getProduct(id: Number){
    this.service.getProductById(id).subscribe({
      next: (response: Product) => {
        this.product = response;
        const currentUser = this.auth.getUser();
        console.log(currentUser?.username);
        console.log(this.product.user.username);
        this.isOwner = currentUser ? currentUser.username == this.product.user.username : false;
      },
      error: (error: HttpErrorResponse) => alert(error.message)
    });
  }

  onSubmit(form: NgForm){
    console.log("onSUbmit() 1");
    if(!this.isOwner) return;

    console.log("onSUbmit() 2");

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
    if (!this.isOwner) return;

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
