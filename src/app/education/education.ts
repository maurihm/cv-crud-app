import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EducationService } from '../services/header-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.html',
  styleUrls: ['./education.scss']
})
export class EducationComponent implements OnInit {
  educationList: Education[] = [];

  constructor(private educationService: EducationService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('EducationComponent initialized');
    this.retrieveEducation();
  }

  retrieveEducation(): void {
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        console.log('EducationComponent data received:', data);
        this.educationList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('EducationComponent error retrieving data:', err)
    });
  }
}