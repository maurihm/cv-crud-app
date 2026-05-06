import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { WorkExperience } from '../../models/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private dbPath = '/work-experience';

  workExperienceRef: AngularFirestoreCollection<WorkExperience>;

  constructor(private db: AngularFirestore) {
    this.workExperienceRef = db.collection(this.dbPath);
  }

  getWorkExperience(): Observable<WorkExperience[]> {
    return this.workExperienceRef.valueChanges({ idField: 'id' }) as Observable<WorkExperience[]>;
  }

  getWorkExperienceById(id: string): Observable<WorkExperience | undefined> {
    return this.workExperienceRef.doc(id).valueChanges({ idField: 'id' }) as Observable<WorkExperience | undefined>;
  }

  createWorkExperience(data: WorkExperience): Observable<any> {
    const { id, ...payload } = data;
    return from(this.workExperienceRef.add(payload));
  }

  updateWorkExperience(id: string, data: Partial<WorkExperience>): Observable<void> {
    const { id: ignoredId, ...payload } = data as WorkExperience;
    return from(this.workExperienceRef.doc(id).update(payload));
  }

  deleteWorkExperience(id: string): Observable<void> {
    return from(this.workExperienceRef.doc(id).delete());
  }
}
