import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Name } from '../../models/names/names.model';

@Injectable({
  providedIn: 'root'
})
export class NamesService {
  private apiUrl = '/api/headers';

  constructor(private http: HttpClient) {}

  getNames(): Observable<Name[]> {
    return this.http.get<Name[]>(this.apiUrl);
  }

  getNameById(id: number): Observable<Name> {
    return this.http.get<Name>(`${this.apiUrl}/${id}`);
  }

  createName(data: Name): Observable<Name> {
    return this.http.post<Name>(this.apiUrl, data);
  }

  updateName(id: number, data: Name): Observable<Name> {
    return this.http.put<Name>(`${this.apiUrl}/${id}`, data);
  }

  deleteName(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
