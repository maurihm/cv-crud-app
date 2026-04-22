import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificate } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

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
    console.log('CertificatesComponent initialized');
    this.retrieveCertificates();
  }

  retrieveCertificates(): void {
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        console.log('CertificatesComponent data received:', data);
        this.certificatesList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('CertificatesComponent error retrieving data:', err)
    });
  }
}
