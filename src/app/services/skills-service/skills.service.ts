import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skill } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  // Esta ruta DEBE llamarse exactamente igual que tu colección en Firebase
  private dbPath = '/skills';
  
  skillsRef: AngularFirestoreCollection<Skill>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills(): AngularFirestoreCollection<Skill> {
    return this.skillsRef;
  }
}
