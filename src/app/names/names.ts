import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private namesService: NamesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadNames();
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
}
