import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Name } from '../../models/names/names.model';

@Injectable({
  providedIn: 'root'
})
export class NamesService {
  private dbPath = '/header';

  namesRef: AngularFirestoreCollection<Name>;

  constructor(private db: AngularFirestore) {
    this.namesRef = db.collection(this.dbPath);
  }

  getNames(): Observable<Name[]> {
    return this.namesRef.valueChanges({ idField: 'id' }) as Observable<Name[]>;
  }

  getNameById(id: string): Observable<Name | undefined> {
    return this.namesRef.doc(id).valueChanges({ idField: 'id' }) as Observable<Name | undefined>;
  }

  createName(data: Name): Observable<any> {
    const { id, ...payload } = data;
    return from(this.namesRef.add(payload));
  }

  updateName(id: string, data: Partial<Name>): Observable<void> {
    const { id: ignoredId, ...payload } = data as Name;
    return from(this.namesRef.doc(id).update(payload));
  }

  deleteName(id: string): Observable<void> {
    return from(this.namesRef.doc(id).delete());
  }
}
