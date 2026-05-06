import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.html',
  styleUrls: ['./work-experience.scss'],
  standalone: false
})
export class WorkExperienceComponent implements OnInit {
  workExperienceList: WorkExperience[] = [];
  loading = false;

  constructor(
    private workExperienceService: WorkExperienceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadWorkExperience();
  }

  loadWorkExperience(): void {
    this.loading = true;
    this.workExperienceService.getWorkExperience().subscribe({
      next: (data: WorkExperience[]) => {
        this.workExperienceList = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error loading work experience:', err);
        this.loading = false;
      }
    });
  }
}
