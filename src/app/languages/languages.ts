import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Language } from '../models/languages/languages.model';

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
    this.loadLanguages();
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
}
