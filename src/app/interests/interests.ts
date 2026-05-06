import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interest } from '../models/interests/interests.model';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.html',
  styleUrls: ['./interests.scss'],
  standalone: false
})
export class InterestsComponent implements OnInit {
  interestsList: Interest[] = [];
  interestsForm!: FormGroup;
  showForm = false;
  editingId: string | null = null;
  loading = false;
  submitted = false;

  constructor(
    private interestsService: InterestsService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadInterests();
  }

  initializeForm(): void {
    this.interestsForm = this.fb.group({
      interests: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  loadInterests(): void {
    this.interestsService.getInterests().subscribe({
      next: (data: Interest[]) => {
        this.interestsList = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('InterestsComponent error retrieving data:', err)
    });
  }

  openForm(item?: Interest): void {
    this.submitted = false;
    if (item) {
      this.editingId = item.id ?? null;
      this.interestsForm.patchValue(item);
    } else {
      this.editingId = null;
      this.interestsForm.reset();
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.interestsForm.reset();
    this.editingId = null;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.interestsForm.invalid) return;

    this.loading = true;
    const formData = this.interestsForm.value;

    if (this.editingId) {
      this.interestsService.updateInterest(this.editingId, formData).subscribe({
        next: () => {
          this.loadInterests();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error updating interest:', err);
          this.loading = false;
        }
      });
    } else {
      this.interestsService.createInterest(formData).subscribe({
        next: () => {
          this.loadInterests();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error creating interest:', err);
          this.loading = false;
        }
      });
    }
  }

  deleteInterest(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este interés?')) {
      this.loading = true;
      this.interestsService.deleteInterest(id).subscribe({
        next: () => {
          this.loadInterests();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error deleting interest:', err);
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.interestsForm.controls;
  }
}
