import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

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

  getDomande(searchTerm?: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
  
    // Se c'è un termine di ricerca, aggiungi come parametro
    const params = searchTerm 
      ? { params: { search: searchTerm } } 
      : {};
  
    return this.http.get<any[]>(`${this.apiUrl}/domande`, { headers, ...params });
  }

  savePunteggio(valore: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/punteggio`, { valore },{ headers});
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