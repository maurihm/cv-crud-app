import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { AppComponent } from './app';
import { EducationComponent } from './education/education';
import { SkillsComponent } from './skills/skills';
import { HeaderComponent } from './header/header';
import { NamesComponent } from './names/names';
import { WorkExperienceComponent } from './work-experience/work-experience';
import { CertificatesComponent } from './certificates/certificates';
import { LanguagesComponent } from './languages/languages';
import { InterestsComponent } from './interests/interests';
import { AppRoutingModule } from './app-routing-module';
import { PublicCvComponent } from './public-cv/public-cv';
import { DashboardComponent } from './dashboard/dashboard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PublicCvComponent,
    DashboardComponent,
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
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }