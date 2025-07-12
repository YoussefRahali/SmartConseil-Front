import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from './Utilisateur';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
   private baseURL="http://localhost:8088/auth";

  constructor(private httpClient:HttpClient, private authService: AuthService) { }

  login(user: { email: string; password: string }): Observable<any> {
    return this.authService.login(user);
  }
  

  register(user: Utilisateur): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/register`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }


  forgotPassword(email: string) {
    return this.httpClient.post(`${this.baseURL}/forgot-password`, { email }, { responseType: 'text' });
  }
  resetPassword(token: string, newPassword: string) {
    return this.httpClient.post(`${this.baseURL}/reset-password?token=${token}`, { password: newPassword }, { responseType: 'text' });
  }
  
  checkEmailAvailability(email: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}/check-email?email=${email}`);
  }



}
