import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8000';  // URL del backend FastAPI
  
  constructor(private http: HttpClient) { }

  getHello() {
    return this.http.get(`${this.apiUrl}/api/hello`);
  }

  sendData(data: any) {
    return this.http.post<any>('/api/login', data, { withCredentials: true });
    
  }
}