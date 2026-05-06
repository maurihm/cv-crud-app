import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkExperience } from '../../models/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private apiUrl = '/api/work-experience';

  constructor(private http: HttpClient) {}

  getWorkExperience(): Observable<WorkExperience[]> {
    return this.http.get<WorkExperience[]>(this.apiUrl);
  }

  getWorkExperienceById(id: number): Observable<WorkExperience> {
    return this.http.get<WorkExperience>(`${this.apiUrl}/${id}`);
  }

  createWorkExperience(data: WorkExperience): Observable<WorkExperience> {
    return this.http.post<WorkExperience>(this.apiUrl, data);
  }

  updateWorkExperience(id: number, data: WorkExperience): Observable<WorkExperience> {
    return this.http.put<WorkExperience>(`${this.apiUrl}/${id}`, data);
  }

  deleteWorkExperience(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
