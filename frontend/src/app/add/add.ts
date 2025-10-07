import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-add',
  imports: [FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add {

  constructor(private productService: ProductService){}

  onSubmit(addForm: NgForm){
    console.log('Hi ✅', addForm.value); // debug log
    if (addForm.valid) {
      console.log('Form submitted ✅', addForm.value); // debug log
      const formValue = addForm.value;

      const product: Product = {
        id: 0, // backend usually generates this
        name: formValue.name,
        description: formValue.description,
        brand: formValue.brand,
        price: Number(formValue.price),
        category: formValue.category,
        releaseDate: new Date(),
        productAvailable: formValue.available,
        stockQuantity: Number(formValue.quantity),
        imageUrl: formValue.imageUrl
      };

      this.productService.addProduct(product).subscribe({
        next: res => {
          console.log('Product added successfully:', res);
          addForm.resetForm({ available: true }); // reset with default
        },
        error: err => console.error('Error adding product:', err)
      });
    }
  }
}
