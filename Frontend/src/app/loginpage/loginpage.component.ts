import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, RouterModule, MatButtonModule, MatIconModule, MatCardModule, ReactiveFormsModule, CommonModule, HttpClientModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})

export class LoginpageComponent {

  hide = signal(true);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login({ 
        email: email!, 
        password: password! 
      }).subscribe({
        next: () => console.log('Login successful'),
        error: (err) => console.error('Login failed', err)
      });
    }
  }
}