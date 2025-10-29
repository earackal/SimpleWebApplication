import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../model/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router){}
  onSubmit(){
    this.authService.register(this.username, this.password).subscribe({
      next: (response: User) => {
          alert('Registration successful!');
          this.router.navigate(['/']); // navigate to home
      }, 
      error: (error: HttpErrorResponse) => {
        alert('Invalid Credentials')
        this.authService.logout();
      }
    });
  }
}
