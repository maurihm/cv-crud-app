import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Skill } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dbPath = '/skills';
  
  skillsRef: AngularFirestoreCollection<Skill>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills(): Observable<Skill[]> {
    return this.skillsRef.valueChanges({ idField: 'id' }) as Observable<Skill[]>;
  }

  getSkillById(id: string): Observable<Skill | undefined> {
    return this.skillsRef.doc(id).valueChanges({ idField: 'id' }) as Observable<Skill | undefined>;
  }

  createSkill(data: Skill): Observable<any> {
    const { id, ...payload } = data;
    return from(this.skillsRef.add(payload));
  }

  updateSkill(id: string, data: Partial<Skill>): Observable<void> {
    const { id: ignoredId, ...payload } = data as Skill;
    return from(this.skillsRef.doc(id).update(payload));
  }

  deleteSkill(id: string): Observable<void> {
    return from(this.skillsRef.doc(id).delete());
  }
}
