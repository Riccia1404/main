import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment.component';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:3000/api';
  public currentCategory: string = 'Storia';  
  constructor(private http: HttpClient) {}

  setCategory(category: string) {
    this.currentCategory = category;
  }

  getDomandeByCategoria(categoria: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<any[]>(`${this.apiUrl}/domande/${categoria}`, { headers });
  }

  getDomande(searchTerm?: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    const params = searchTerm 
      ? { params: { search: searchTerm } } 
      : {};
  
    return this.http.get<any[]>(`${this.apiUrl}/domande`, { headers, ...params });
  }

  savePunteggio(score: number, category: string) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${environment.apiUrl}/punteggio`, { valore: score, categoria: category }, {headers});
  }

  getPunteggiUtente() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    
    return this.http.get<any[]>(`${environment.apiUrl}/punteggio`, {headers});
  }

  creaDomanda(nuovaDomanda: any) {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    const payload = {
      ...nuovaDomanda,
      risposte: nuovaDomanda.risposte.map((r: any) => ({
        descrizione: r.descrizione,
        stato: r.stato === 'corretta' ? 'corretta' : 'sbagliata'
      }))
    };

    return this.http.post(`${this.apiUrl}/creaDomande`, payload, { headers });
  }

  deleteDomanda(idDomanda: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.delete(`${this.apiUrl}/domande/${idDomanda}`, { headers });
  }
}