import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Certificate } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private dbPath = '/certificates';

  certificatesRef: AngularFirestoreCollection<Certificate>;

  constructor(private db: AngularFirestore) {
    this.certificatesRef = db.collection(this.dbPath);
  }

  getCertificates(): Observable<Certificate[]> {
    return this.certificatesRef.valueChanges({ idField: 'id' }) as Observable<Certificate[]>;
  }

  getCertificateById(id: string): Observable<Certificate | undefined> {
    return this.certificatesRef.doc(id).valueChanges({ idField: 'id' }) as Observable<Certificate | undefined>;
  }

  createCertificate(data: Certificate): Observable<any> {
    const { id, ...payload } = data;
    return from(this.certificatesRef.add(payload));
  }

  updateCertificate(id: string, data: Partial<Certificate>): Observable<void> {
    const { id: ignoredId, ...payload } = data as Certificate;
    return from(this.certificatesRef.doc(id).update(payload));
  }

  deleteCertificate(id: string): Observable<void> {
    return from(this.certificatesRef.doc(id).delete());
  }
}
