import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificate } from '../models/certificates/certificates.model';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.html',
  styleUrls: ['./certificates.scss'],
  standalone: false
})
export class CertificatesComponent implements OnInit {
  certificatesList: Certificate[] = [];
  certificatesForm!: FormGroup;
  showForm = false;
  editingId: string | null = null;
  loading = false;
  submitted = false;

  constructor(
    private certificatesService: CertificatesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCertificates();
  }

  initializeForm(): void {
    this.certificatesForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      organization: ['', [Validators.required, Validators.minLength(2)]],
      date: ['', Validators.required]
    });
  }

  loadCertificates(): void {
    this.certificatesService.getCertificates().subscribe({
      next: (data: Certificate[]) => {
        this.certificatesList = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('CertificatesComponent error retrieving data:', err)
    });
  }

  openForm(item?: Certificate): void {
    this.submitted = false;
    if (item) {
      this.editingId = item.id ?? null;
      this.certificatesForm.patchValue(item);
    } else {
      this.editingId = null;
      this.certificatesForm.reset();
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.certificatesForm.reset();
    this.editingId = null;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.certificatesForm.invalid) return;

    this.loading = true;
    const formData = this.certificatesForm.value;

    if (this.editingId) {
      this.certificatesService.updateCertificate(this.editingId, formData).subscribe({
        next: () => {
          this.loadCertificates();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error updating certificate:', err);
          this.loading = false;
        }
      });
    } else {
      this.certificatesService.createCertificate(formData).subscribe({
        next: () => {
          this.loadCertificates();
          this.closeForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error creating certificate:', err);
          this.loading = false;
        }
      });
    }
  }

  deleteCertificate(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este certificado?')) {
      this.loading = true;
      this.certificatesService.deleteCertificate(id).subscribe({
        next: () => {
          this.loadCertificates();
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error deleting certificate:', err);
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.certificatesForm.controls;
  }
}
