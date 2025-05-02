import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Material Modules
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { TruncatePipe } from '../truncate.pipe';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';


@Component({
  selector: 'app-creadomanda',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatExpansionModule,
    TruncatePipe
    
    
],
  templateUrl: './creadomanda.component.html',
  styleUrls: ['./creadomanda.component.css']
})

export class CreadomandaComponent implements OnInit{
  
  tutteDomande: any[] = [];
  filtroRicerca: string = '';
  
  
  domanda = {
    descrizione: '',
    categoria: 'Storia',
    risposte: [
      { descrizione: '', stato: 'sbagliata' } // Usa stringhe invece di numeri
    ]
  };

  categorie: string[] = [
    'Storia', 
    'Geografia', 
    'Scienze', 
    'Sport', 
    'Letteratura Italiana'
  ];

  constructor(
    private quizService: QuizService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  private searchSubject = new Subject<string>();
  
  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.caricaDomande();
    });
  }

  isFormValid(): boolean {
    return this.domanda.descrizione?.trim().length > 0 &&
           this.categorie.includes(this.domanda.categoria) &&
           this.domanda.risposte.length >= 2 &&
           this.domanda.risposte.every(r => r.descrizione.trim().length > 0) &&
           this.domanda.risposte.some(r => r.stato === 'corretta');
  }

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filtroRicerca = value;
    this.searchSubject.next(value);
  }

  // Aggiunge una nuova risposta vuota
  aggiungiRisposta() {
    this.domanda.risposte.push({ descrizione: '', stato: 'sbagliata' });
  }

  // Rimuove una risposta in base all'indice
  rimuoviRisposta(index: number) {
    this.domanda.risposte.splice(index, 1);
  }


  creaNuovaDomanda() {
    // 'this.domanda' contiene i valori inseriti dall'utente nel form
      if (!this.domanda.descrizione || 
        !this.domanda.categoria || 
        !this.domanda.risposte || 
        this.domanda.risposte.length < 2) {
        this.snackBar.open('Compila tutti i campi obbligatori e inserisci almeno 2 risposte!', 'Chiudi', { duration: 3000 });
      return;
    }

    if (this.domanda.descrizione.trim().length < 10) {
      this.snackBar.open('La domanda deve contenere almeno 10 caratteri', 'Chiudi', { duration: 3000 });
      return;
    }

    if (!this.categorie.includes(this.domanda.categoria)) {
      this.snackBar.open('Seleziona una categoria valida', 'Chiudi', { duration: 3000 });
      return;
    }

    // Verifica che ci sia almeno una risposta corretta
    const hasCorrectAnswer = this.domanda.risposte.some((r: any) => r.stato === 'corretta');
    if (!hasCorrectAnswer) {
      this.snackBar.open('Devi inserire almeno una risposta corretta!', 'Chiudi', { duration: 3000 });
      return;
    }

    // Verifica che tutte le risposte abbiano una descrizione
    const hasEmptyAnswers = this.domanda.risposte.some((r: any) => !r.descrizione.trim());
    if (hasEmptyAnswers) {
      this.snackBar.open('Tutte le risposte devono avere un testo!', 'Chiudi', { duration: 3000 });
      return;
    }

    const isDuplicate = this.tutteDomande.some(d => 
      d.descrizione.toLowerCase() === this.domanda.descrizione.toLowerCase()
    );
    if (isDuplicate) {
      this.snackBar.open('Esiste già una domanda identica', 'Chiudi', { duration: 3000 });
      return;
    }

    // Se tutti i controlli passano, procedi
    this.quizService.creaDomanda(this.domanda).subscribe({
      next: (response) => {
        console.log('Risposta dal server:', response);
        this.snackBar.open('Domanda creata con successo!', 'Chiudi', { duration: 3000 });
        this.domanda = { descrizione: '', categoria: '', risposte: [] }; // Resetta il form
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Errore durante il salvataggio';
        this.snackBar.open(errorMessage, 'Chiudi', { duration: 3000 });
      },
    });
  }

  caricaDomande() {
    this.quizService.getDomande(this.filtroRicerca).subscribe({
        next: (domande) => {
          this.tutteDomande = domande;
        },
        error: (err) => {
          this.snackBar.open('Errore nel caricamento delle domande', 'Chiudi', { duration: 3000 });
        }
    });
  }

  eliminaDomanda(idDomanda: number, event: Event) {
      event.stopPropagation();
      
      const dialogRef = this.dialog.open(ConfirmdialogComponent, {
          data: {
              title: 'Conferma eliminazione',
              message: 'Questa azione eliminerà definitivamente la domanda e tutte le sue risposte!'
          }
      });

      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.quizService.deleteDomanda(idDomanda).subscribe({
                  next: () => {
                      this.tutteDomande = this.tutteDomande.filter(d => d.id_domanda !== idDomanda);
                      this.snackBar.open('Domanda eliminata con successo', 'Chiudi', { duration: 3000 });
                  },
                  error: (err) => {
                      this.snackBar.open('Errore durante l\'eliminazione', 'Chiudi', { duration: 3000 });
                  }
              });
          }
      });
  }
  
}
