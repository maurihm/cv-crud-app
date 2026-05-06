import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  workExperienceForm!: FormGroup;
  showForm = false;
  editingId: number | null = null;
  loading = false;
  submitted = false;

  constructor(
    private workExperienceService: WorkExperienceService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadWorkExperience();
  }

  initializeForm(): void {
    this.workExperienceForm = this.fb.group({
      company: ['', [Validators.required, Validators.minLength(2)]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    });
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

  openForm(item?: WorkExperience): void {
    this.submitted = false;
    if (item) {
      this.editingId = item.id;
      this.workExperienceForm.patchValue(item);
    } else {
      this.editingId = null;
      this.workExperienceForm.reset();
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.workExperienceForm.reset();
    this.editingId = null;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.workExperienceForm.invalid) return;

    this.loading = true;

    if (this.editingId) {
      this.workExperienceService.updateWorkExperience(this.editingId, this.workExperienceForm.value).subscribe({
        next: () => {
          this.loadWorkExperience();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error updating work experience:', err);
          this.loading = false;
        }
      });
    } else {
      this.workExperienceService.createWorkExperience(this.workExperienceForm.value).subscribe({
        next: () => {
          this.loadWorkExperience();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error creating work experience:', err);
          this.loading = false;
        }
      });
    }
  }

  deleteWorkExperience(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta experiencia?')) {
      this.loading = true;
      this.workExperienceService.deleteWorkExperience(id).subscribe({
        next: () => {
          this.loadWorkExperience();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error deleting work experience:', err);
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.workExperienceForm.controls;
  }
}
