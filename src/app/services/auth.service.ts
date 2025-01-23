import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/login';

  constructor(private http: HttpClient) {}

  login(credentials: { Username: string; Password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}
