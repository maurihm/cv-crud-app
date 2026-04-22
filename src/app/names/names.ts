import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NamesService } from '../services/names-service/names.service';
import { Name } from '../models/names/names.model';
import { map } from 'rxjs/operators';

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
    console.log('NamesComponent initialized');
    this.retrieveNames();
  }

  retrieveNames(): void {
    this.namesService.getNames().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        console.log('NamesComponent data received:', data);
        this.namesList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('NamesComponent error retrieving data:', err)
    });
  }
}
