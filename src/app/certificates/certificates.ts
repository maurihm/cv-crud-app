import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private certificatesService: CertificatesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCertificates();
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
}
