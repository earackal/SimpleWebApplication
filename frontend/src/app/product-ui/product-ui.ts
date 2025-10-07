import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-ui',
  imports: [],
  templateUrl: './product-ui.html',
  styleUrl: './product-ui.css'
})
export class ProductUi {  
  @Input() product!: {
    id: number;
    name: string;
    description: string;
    brand: string;
    price: number;
    category: string;
    releaseDate: Date;
    productAvailable: boolean;
    stockQuantity: number;
    imageUrl: string;
  }
  
}
