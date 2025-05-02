import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { QuizService } from '../services/quiz.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, CommonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
  
})
export class PrincipalComponent implements OnInit {
  selectedCategory: string = '';
  categorie: string[] = [
    'Storia', 
    'Geografia', 
    'Scienze', 
    'Sport', 
    'Letteratura Italiana'
  ];

  constructor(
    public router: Router,
    public authService: AuthService,
    private quizService: QuizService
  ) {}

  ngOnInit() { }

  startQuiz() {
    this.router.navigate(['/quiz', this.selectedCategory]);
  }
}
