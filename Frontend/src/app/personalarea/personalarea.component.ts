import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personalarea',
  standalone: true,
  imports:[MatCardModule, CommonModule],
  templateUrl: './personalarea.component.html',
  styleUrls: ['./personalarea.component.css']
})
export class PersonalareaComponent implements OnInit {
  punteggi: any[] = [];
  userData: any;

  constructor(
    private quizService: QuizService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserInfo();
    this.loadPunteggi();
  }

  loadPunteggi() {
    this.quizService.getPunteggiUtente().subscribe({
      next: (data) => this.punteggi = data,
      error: (err) => console.error(err)
    });
  }
}