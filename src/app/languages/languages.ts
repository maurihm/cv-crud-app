import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Language } from '../models/languages/languages.model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.html',
  styleUrls: ['./languages.scss'],
  standalone: false
})
export class LanguagesComponent implements OnInit {
  @Input() readOnly = false;
  languagesList: Language[] = [];
  languagesForm!: FormGroup;
  showForm = false;
  editingId: string | null = null;
  loading = false;
  submitted = false;

  constructor(
    private languagesService: LanguagesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadLanguages();
  }

  initializeForm(): void {
    this.languagesForm = this.fb.group({
      language: ['', [Validators.required, Validators.minLength(2)]],
      level: ['', Validators.required]
    });
  }

  loadLanguages(): void {
    this.languagesService.getLanguages().subscribe({
      next: (data: Language[]) => {
        this.languagesList = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('LanguagesComponent error retrieving data:', err)
    });
  }

  openForm(item?: Language): void {
    this.submitted = false;
    if (item) {
      this.editingId = item.id ?? null;
      this.languagesForm.patchValue(item);
    } else {
      this.editingId = null;
      this.languagesForm.reset();
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.languagesForm.reset();
    this.editingId = null;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.languagesForm.invalid) return;

    this.loading = true;
    const formData = this.languagesForm.value;

    if (this.editingId) {
      this.languagesService.updateLanguage(this.editingId, formData).subscribe({
        next: () => {
          this.loadLanguages();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error updating language:', err);
          this.loading = false;
        }
      });
    } else {
      this.languagesService.createLanguage(formData).subscribe({
        next: () => {
          this.loadLanguages();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error creating language:', err);
          this.loading = false;
        }
      });
    }
  }

  deleteLanguage(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este idioma?')) {
      this.loading = true;
      this.languagesService.deleteLanguage(id).subscribe({
        next: () => {
          this.loadLanguages();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error deleting language:', err);
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.languagesForm.controls;
  }
}
