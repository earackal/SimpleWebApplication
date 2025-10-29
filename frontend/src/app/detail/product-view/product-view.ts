import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-view',
  imports: [CommonModule],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css'
})
export class ProductView {
  @Input() product!: Product;
}
