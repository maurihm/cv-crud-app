import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NamesService } from '../services/names-service/names.service';
import { Name } from '../models/names/names.model';

@Component({
  selector: 'app-names',
  templateUrl: './names.html',
  styleUrls: ['./names.scss'],
  standalone: false
})
export class NamesComponent implements OnInit {
  namesList: Name[] = [];
  namesForm!: FormGroup;
  showForm = false;
  editingId: string | null = null;
  loading = false;
  submitted = false;

  constructor(
    private namesService: NamesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadNames();
  }

  initializeForm(): void {
    this.namesForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      goalLife: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      location: ['', Validators.required],
      socialNetwork: [''],
      photoUrl: ['']
    });
  }

  loadNames(): void {
    this.namesService.getNames().subscribe({
      next: (data: Name[]) => {
        this.namesList = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('NamesComponent error retrieving data:', err)
    });
  }

  openForm(item?: Name): void {
    this.submitted = false;
    if (item) {
      this.editingId = item.id ?? null;
      this.namesForm.patchValue(item);
    } else {
      this.editingId = null;
      this.namesForm.reset();
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.namesForm.reset();
    this.editingId = null;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.namesForm.invalid) return;

    this.loading = true;
    const formData = this.namesForm.value;

    if (this.editingId) {
      this.namesService.updateName(this.editingId, formData).subscribe({
        next: () => {
          this.loadNames();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error updating profile:', err);
          this.loading = false;
        }
      });
    } else {
      this.namesService.createName(formData).subscribe({
        next: () => {
          this.loadNames();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error creating profile:', err);
          this.loading = false;
        }
      });
    }
  }

  deleteName(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este perfil?')) {
      this.loading = true;
      this.namesService.deleteName(id).subscribe({
        next: () => {
          this.loadNames();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error deleting profile:', err);
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.namesForm.controls;
  }
}
