import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css'
})
export class ProductView {
  @Input() product!: Product;
  quantity = 1;
}
