
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
// Aggiungi ReactiveFormsModule agli imports

@Component({
  selector: 'app-registerpage',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, RouterModule],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css'
})

export class RegisterpageComponent {
  
  hide = signal(true);
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.fb.group({
    nome: ['', [Validators.required]],
    cognome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // Aggiungi queste proprietà
loading = false;
errorMessage = signal<string | null>(null);

submit() {
  if (this.registerForm.valid) {
    this.loading = true;
    this.errorMessage.set(null);
    
    this.authService.register(this.registerForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/loginpage']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage.set(err?.error?.message || 'Registrazione fallita');
        }
      });
  }
}
  
}