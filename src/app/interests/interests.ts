import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private interestsService: InterestsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadInterests();
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
}
