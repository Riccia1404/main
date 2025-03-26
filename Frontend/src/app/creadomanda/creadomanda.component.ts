import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-creadomanda',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatSelectModule, FormsModule, MatCardModule],
  templateUrl: './creadomanda.component.html',
  styleUrl: './creadomanda.component.css'
})

export class CreadomandaComponent {
  
  domanda = {
    descrizione: '',
    risposte: [
      { descrizione: '', stato: 0 }
    ]
  };

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  // Aggiunge una nuova risposta vuota
  aggiungiRisposta() {
    this.domanda.risposte.push({ descrizione: '', stato: 0 });
  }

  // Rimuove una risposta in base all'indice
  rimuoviRisposta(index: number) {
    this.domanda.risposte.splice(index, 1);
  }


  creaNuovaDomanda() {
    // 'this.domanda' contiene i valori inseriti dall'utente nel form
    console.log('Valori della domanda:', this.domanda);
    this.quizService.creaDomanda(this.domanda).subscribe({
      next: (response) => {
        console.log('Risposta dal server:', response);
        // Puoi, ad esempio, reindirizzare l'utente dopo la creazione
        this.router.navigate(['/quiz']);
      },
      error: (err) => {
        console.error('Errore dal server:', err);
      },
    });
  }
  
}
