import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-ui',
  imports: [CommonModule],
  templateUrl: './product-ui.html',
  styleUrl: './product-ui.css'
})
export class ProductUi {  
  @Input() product!: Product;
}
