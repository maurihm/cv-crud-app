import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app';
import { EducationComponent } from './education/education';
import { SkillsComponent } from './skills/skills';
import { HeaderComponent } from './header/header';
import { NamesComponent } from './names/names';
import { WorkExperienceComponent } from './work-experience/work-experience';
import { CertificatesComponent } from './certificates/certificates';
import { LanguagesComponent } from './languages/languages';
import { InterestsComponent } from './interests/interests';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NamesComponent,
    EducationComponent,
    SkillsComponent,
    WorkExperienceComponent,
    CertificatesComponent,
    LanguagesComponent,
    InterestsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }