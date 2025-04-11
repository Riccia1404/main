import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from '../environment/environment.component';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);
  private redirectUrl: string | null = null;

  isLoggedIn$ = this.loggedIn.asObservable();
  currentUser$ = this.currentUser.asObservable();
  constructor() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
  
    this.loggedIn.next(!!token);
  
    if (userData) {
      try {
        this.currentUser.next(JSON.parse(userData)); 
      } catch (error) {
        console.error('[AuthService] Errore nel parsing di userData:', error);
        localStorage.removeItem('userData'); 
        this.currentUser.next(null);
      }
    }
  }
  
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }


  register(userData: any) {
    return this.http.post(`${environment.apiUrl}/register`, userData).pipe(
      tap(() => {
        console.log('Registrazione avvenuta con successo');
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.error?.message || 'Errore sconosciuto');
      })
    );
  }
  
  login(credentials: { email: string; password: string }) {
    const headers = new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        });
    return this.http.post(`${environment.apiUrl}/login`, credentials,{ headers}).pipe(
      tap((response: any) => {
        console.log('[DEBUG] Login avvenuto:', response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userData', JSON.stringify(response.user)); // Salva i dati dell'utente
        }
        this.loggedIn.next(true);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('[DEBUG] Errore Login:', error);
        return throwError(() => error);
      })
    );
  }
  
  getUserInfo(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        this.loggedIn.next(false);
        this.currentUser.next(null);
      }),
      catchError(error => {
        console.error('Errore durante il logout:', error);
        return throwError(() => error);
      })
    );
  }

  logoutWithoutRequest() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.loggedIn.next(false);
    this.currentUser.next(null);
  }

  isAdmin(): boolean {
    const userData = this.getUserInfo();
    return userData?.ruolo === 'admin';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token'); 
    return !!token; 
  }

}
