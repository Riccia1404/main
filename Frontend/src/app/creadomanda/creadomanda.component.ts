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


// Components

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
