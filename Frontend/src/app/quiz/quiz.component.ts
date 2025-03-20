import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { QuizService } from '../services/quiz.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  domande: any[] = [];
  selectedAnswers: { [key: number]: number } = {};
  finalScore: number = 0;
  showScore: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getDomande().subscribe({
      next: (data) => this.domande = data,
      error: (err) => console.error(err)
    });
  }

  onAnswerSelected(domandaId: number, rispostaId: number): void {
    this.selectedAnswers[domandaId] = rispostaId;
  }

  calculateScore(): void {
    let wrongCount = 0;
    this.domande.forEach(domanda => {
      const selectedRispostaId = this.selectedAnswers[domanda.id_domanda];
      if (selectedRispostaId) {
        const risposta = domanda.risposte.find((r: any) => r.id_risposta === selectedRispostaId);
        if (risposta.stato === 'sbagliata') wrongCount++;
      }
    });
    this.finalScore = 100 - wrongCount;
    this.quizService.savePunteggio(this.finalScore).subscribe({
      next: () => this.showScore = true,
      error: (err) => console.error(err)
    });
  }
}
