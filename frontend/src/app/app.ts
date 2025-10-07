import { Component, HostListener} from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductList } from './product-list/product-list';
import { Home } from './home/home';
import { Add } from './add/add';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, ProductList, Home, Add],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 100) {
      header?.classList.add('shrink');
    } else {
      header?.classList.remove('shrink');
    }
  }
}
