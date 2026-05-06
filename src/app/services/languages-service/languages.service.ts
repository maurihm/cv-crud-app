import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Language } from '../../models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private dbPath = '/languages';

  languagesRef: AngularFirestoreCollection<Language>;

  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
  }

  getLanguages(): Observable<Language[]> {
    return this.languagesRef.valueChanges({ idField: 'id' }) as Observable<Language[]>;
  }

  getLanguageById(id: string): Observable<Language | undefined> {
    return this.languagesRef.doc(id).valueChanges({ idField: 'id' }) as Observable<Language | undefined>;
  }

  createLanguage(data: Language): Observable<any> {
    const { id, ...payload } = data;
    return from(this.languagesRef.add(payload));
  }

  updateLanguage(id: string, data: Partial<Language>): Observable<void> {
    const { id: ignoredId, ...payload } = data as Language;
    return from(this.languagesRef.doc(id).update(payload));
  }

  deleteLanguage(id: string): Observable<void> {
    return from(this.languagesRef.doc(id).delete());
  }
}
