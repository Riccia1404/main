import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent implements OnInit {
  errorMessage = '';

  constructor(public route: ActivatedRoute, public router: Router, public authService: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['error'] === 'authorization') {
        // Rimuovi il parametro dall'URL
        this.router.navigate([], {
          queryParams: { error: null },
          queryParamsHandling: 'merge'
        });
      }
    });
  }
}