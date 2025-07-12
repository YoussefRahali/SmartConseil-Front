import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export interface Rectification {
  id?: number;
  etudiantNom: string;
  classe: string;
  option: string;
  ancienneNote: number;
  nouvelleNote: number;
  justification: string;
  status?: string;
  dateDemande?: string;
}

@Injectable({ providedIn: 'root' })
export class RectificationService {
  private baseUrl = 'http://localhost:8089/api/rectification';

  constructor(private http: HttpClient, private authService: AuthService) {}

  create(data: Rectification): Observable<Rectification> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Rectification>(this.baseUrl, data, { headers });
  }

  getAll(): Observable<Rectification[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Rectification[]>(this.baseUrl, { headers });
  }

  updateStatus(id: number, status: string): Observable<Rectification> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<Rectification>(`${this.baseUrl}/${id}/status?status=${status}`, {}, { headers });
  }
}
