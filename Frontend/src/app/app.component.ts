import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Trivia';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/loginpage']);
      },
      error: (err) => {
        console.error('Errore logout:', err);
        // Forza il logout comunque
        this.authService.logoutWithoutRequest();
        this.router.navigate(['/loginpage']);
      }
    });
  }
}
