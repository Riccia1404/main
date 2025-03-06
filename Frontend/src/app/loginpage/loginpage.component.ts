import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, RouterModule, MatButtonModule, MatIconModule, MatCardModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})

export class LoginpageComponent {
  
  hide = signal(true);
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
    }

    loginForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

  onSubmit() {
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.http.post<any>('http://localhost:8000/login', payload, { withCredentials: true })
        .subscribe({
          next: (response) => {
            this.router.navigate(['/principal']);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 401) {
              alert('Credenziali errate!');
            } else {
              alert('Errore di connessione al server');
            }
          }
        });
    }
  }
}
