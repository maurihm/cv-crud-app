import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skill } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class SkillsComponent implements OnInit {
  skillsList: Skill[] = [];

  constructor(private skillsService: SkillsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('SkillsComponent initialized');
    this.retrieveSkills();
  }

  retrieveSkills(): void {
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        console.log('SkillsComponent data received:', data);
        this.skillsList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('SkillsComponent error retrieving data:', err)
    });
  }
}
