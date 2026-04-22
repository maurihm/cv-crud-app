import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NamesComponent,
    EducationComponent, // <-- 1. AQUÍ VA EDUCACIÓN
    SkillsComponent, // <-- 2. AQUÍ VA SKILLS
    WorkExperienceComponent, // <-- 3. AQUÍ VA WORK EXPERIENCE
    CertificatesComponent, // <-- 4. AQUÍ VA CERTIFICADOS
    LanguagesComponent, // <-- 5. AQUÍ VA IDIOMAS
    InterestsComponent, // <-- 6. AQUÍ VA INTERESES
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // Aquí van tus imports de Firebase (AngularFireModule.initializeApp...)
    // ¡Asegúrate de que EducationComponent NO esté en esta lista!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }