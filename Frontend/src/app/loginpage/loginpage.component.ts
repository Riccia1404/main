import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, RouterLink],
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  loading = false;
  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const formValues = this.loginForm.getRawValue();

      this.authService.login({
        email: formValues.email!,
        password: formValues.password!
      }).subscribe({
        next: () => {
          this.errorMessage.set('');
          const redirectUrl = this.authService.getRedirectUrl() || '/';
          this.router.navigate([redirectUrl]);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Credenziali non valide');
          setTimeout(() => {
            this.loading = false;
          }, 1500);
        },
        complete: () => {
          this.loading = false;
          const token = localStorage.getItem('token');
          console.log("Token JWT:", token);
        }
      });
    }
  }
  
}
