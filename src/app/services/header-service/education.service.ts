import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Education } from '../../models/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private dbPath = '/education';
  educationRef: AngularFirestoreCollection<Education>;

  constructor(private db: AngularFirestore) {
    this.educationRef = db.collection(this.dbPath);
  }

  getEducation(): Observable<Education[]> {
    return this.educationRef.valueChanges({ idField: 'id' }) as Observable<Education[]>;
  }

  getEducationById(id: string): Observable<Education | undefined> {
    return this.educationRef.doc(id).valueChanges({ idField: 'id' }) as Observable<Education | undefined>;
  }

  createEducation(data: Education): Observable<any> {
    const { id, ...payload } = data;
    return from(this.educationRef.add(payload));
  }

  updateEducation(id: string, data: Partial<Education>): Observable<void> {
    const { id: ignoredId, ...payload } = data as Education;
    return from(this.educationRef.doc(id).update(payload));
  }

  deleteEducation(id: string): Observable<void> {
    return from(this.educationRef.doc(id).delete());
  }
}