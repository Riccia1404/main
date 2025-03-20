import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDomande(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/domande`);
  }

  savePunteggio(valore: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/punteggio`, { valore });
  }
}