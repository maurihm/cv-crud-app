import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interest } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {
  private apiUrl = '/api/interests';

  constructor(private http: HttpClient) {}

  getInterests(): Observable<Interest[]> {
    return this.http.get<Interest[]>(this.apiUrl);
  }

  getInterestById(id: number): Observable<Interest> {
    return this.http.get<Interest>(`${this.apiUrl}/${id}`);
  }

  createInterest(data: Interest): Observable<Interest> {
    return this.http.post<Interest>(this.apiUrl, data);
  }

  updateInterest(id: number, data: Interest): Observable<Interest> {
    return this.http.put<Interest>(`${this.apiUrl}/${id}`, data);
  }

  deleteInterest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
