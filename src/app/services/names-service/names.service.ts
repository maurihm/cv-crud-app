import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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

  getNames(): AngularFirestoreCollection<Name> {
    return this.namesRef;
  }
}
