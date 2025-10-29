import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router){}
  onSubmit(){
    this.authService.login(this.username, this.password).subscribe({
      next: (response: User) => {
          alert('Login successful!');
          this.router.navigate(['/']); // navigate to home
      }, 
      error: (error: HttpErrorResponse) => {
        alert('Invalid Credentials')
        this.authService.logout();
      }
    });
  }
}
