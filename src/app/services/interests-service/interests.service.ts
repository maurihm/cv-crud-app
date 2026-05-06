import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Interest } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {
  private dbPath = '/interests';

  interestsRef: AngularFirestoreCollection<Interest>;

  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }

  getInterests(): Observable<Interest[]> {
    return this.interestsRef.valueChanges({ idField: 'id' }) as Observable<Interest[]>;
  }

  getInterestById(id: string): Observable<Interest | undefined> {
    return this.interestsRef.doc(id).valueChanges({ idField: 'id' }) as Observable<Interest | undefined>;
  }

  createInterest(data: Interest): Observable<any> {
    const { id, ...payload } = data;
    return from(this.interestsRef.add(payload));
  }

  updateInterest(id: string, data: Partial<Interest>): Observable<void> {
    const { id: ignoredId, ...payload } = data as Interest;
    return from(this.interestsRef.doc(id).update(payload));
  }

  deleteInterest(id: string): Observable<void> {
    return from(this.interestsRef.doc(id).delete());
  }
}
