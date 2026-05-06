import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certificate } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private apiUrl = '/api/certificates';

  constructor(private http: HttpClient) {}

  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.apiUrl);
  }

  getCertificateById(id: number): Observable<Certificate> {
    return this.http.get<Certificate>(`${this.apiUrl}/${id}`);
  }

  createCertificate(data: Certificate): Observable<Certificate> {
    return this.http.post<Certificate>(this.apiUrl, data);
  }

  updateCertificate(id: number, data: Certificate): Observable<Certificate> {
    return this.http.put<Certificate>(`${this.apiUrl}/${id}`, data);
  }

  deleteCertificate(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
