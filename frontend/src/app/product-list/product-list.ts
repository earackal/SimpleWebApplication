import { Component, Input } from '@angular/core';
import { ProductUi } from '../product-ui/product-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductUi, CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  @Input() products: any[] = [];
}
