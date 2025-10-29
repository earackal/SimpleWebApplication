import { Component, Input } from '@angular/core';
import { Product } from '../../model/product';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-product-ui',
  imports: [],
  templateUrl: './product-ui.html',
  styleUrl: './product-ui.css'
})
export class ProductUi {  
  @Input() product!: Product;
}
