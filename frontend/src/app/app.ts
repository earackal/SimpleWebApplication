import { Component, HostListener} from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App{
  constructor(public authService: AuthService){}

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
