import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.html',
  styleUrls: ['./work-experience.scss'],
  standalone: false
})
export class WorkExperienceComponent implements OnInit {
  workExperienceList: WorkExperience[] = [];

  constructor(private workExperienceService: WorkExperienceService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('WorkExperienceComponent initialized');
    this.retrieveWorkExperience();
  }

  retrieveWorkExperience(): void {
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        console.log('WorkExperienceComponent data received:', data);
        this.workExperienceList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('WorkExperienceComponent error retrieving data:', err)
    });
  }
}
