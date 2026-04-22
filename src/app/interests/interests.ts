import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interest } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.html',
  styleUrls: ['./interests.scss'],
  standalone: false
})
export class InterestsComponent implements OnInit {
  interestsList: Interest[] = [];

  constructor(private interestsService: InterestsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('InterestsComponent initialized');
    this.retrieveInterests();
  }

  retrieveInterests(): void {
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        console.log('InterestsComponent data received:', data);
        this.interestsList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('InterestsComponent error retrieving data:', err)
    });
  }
}
