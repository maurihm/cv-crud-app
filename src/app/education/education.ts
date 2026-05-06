import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationService } from '../services/header-service/education.service';
import { Education } from '../models/education/education.model';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.html',
  styleUrls: ['./education.scss']
})
export class EducationComponent implements OnInit {
  educationList: Education[] = [];
  educationForm!: FormGroup;
  showForm = false;
  editingId: string | null = null;
  loading = false;
  submitted = false;

  constructor(
    private educationService: EducationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadEducation();
  }

  initializeForm(): void {
    this.educationForm = this.fb.group({
      school: ['', [Validators.required, Validators.minLength(2)]],
      degree: ['', [Validators.required, Validators.minLength(2)]],
      fieldOfStudy: ['', [Validators.required, Validators.minLength(2)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    });
  }

  loadEducation(): void {
    this.loading = true;
    this.educationService.getEducation().subscribe({
      next: (data: Education[]) => {
        this.educationList = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error loading education:', err);
        this.loading = false;
      }
    });
  }

  openForm(item?: Education): void {
    this.submitted = false;
    if (item) {
      this.editingId = item.id ?? null;
      this.educationForm.patchValue(item);
    } else {
      this.editingId = null;
      this.educationForm.reset();
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.educationForm.reset();
    this.editingId = null;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.educationForm.invalid) return;

    this.loading = true;
    const formData = this.educationForm.value;

    if (this.editingId) {
      this.educationService.updateEducation(this.editingId, formData).subscribe({
        next: () => {
          this.loadEducation();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error updating education:', err);
          this.loading = false;
        }
      });
    } else {
      this.educationService.createEducation(formData).subscribe({
        next: () => {
          this.loadEducation();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error creating education:', err);
          this.loading = false;
        }
      });
    }
  }

  deleteEducation(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta entrada?')) {
      this.loading = true;
      this.educationService.deleteEducation(id).subscribe({
        next: () => {
          this.loadEducation();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error deleting education:', err);
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.educationForm.controls;
  }
}