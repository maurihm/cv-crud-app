import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Language } from '../../models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private apiUrl = '/api/languages';

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.apiUrl);
  }

  getLanguageById(id: number): Observable<Language> {
    return this.http.get<Language>(`${this.apiUrl}/${id}`);
  }

  createLanguage(data: Language): Observable<Language> {
    return this.http.post<Language>(this.apiUrl, data);
  }

  updateLanguage(id: number, data: Language): Observable<Language> {
    return this.http.put<Language>(`${this.apiUrl}/${id}`, data);
  }

  deleteLanguage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
