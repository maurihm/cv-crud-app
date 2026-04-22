import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Language } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.html',
  styleUrls: ['./languages.scss'],
  standalone: false
})
export class LanguagesComponent implements OnInit {
  languagesList: Language[] = [];

  constructor(private languagesService: LanguagesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('LanguagesComponent initialized');
    this.retrieveLanguages();
  }

  retrieveLanguages(): void {
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe({
      next: (data) => {
        console.log('LanguagesComponent data received:', data);
        this.languagesList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('LanguagesComponent error retrieving data:', err)
    });
  }
}
