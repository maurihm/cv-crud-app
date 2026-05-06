# ⚡ Guía Rápida: Completar los Otros Componentes

He completado **2 componentes como template**:
- ✅ **Education** (Educación)
- ✅ **Skills** (Habilidades)

Aquí está la guía rápida para **replicar a los otros 5 componentes**:

---

## 📋 Componentes Faltantes

1. **Languages** (Idiomas)
2. **WorkExperience** (Experiencia Laboral)
3. **Interests** (Intereses)
4. **Certificates** (Certificados)
5. **Names/Header** (Información Personal)

---

## 🔄 Patrón a Seguir

### Paso 1: Actualizar Componente TypeScript

**Template:** Copia la estructura de `skills.ts` y adapta según los campos del modelo.

```typescript
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Language } from '../models/languages/languages.model';

@Component({
  selector: 'app-languages',
  standalone: false,
  templateUrl: './languages.html',
  styleUrls: ['./languages.scss']
})
export class LanguagesComponent implements OnInit {
  languagesList: Language[] = [];
  languagesForm!: FormGroup;
  showForm = false;
  editingId: number | null = null;
  loading = false;
  submitted = false;

  proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Native'];

  constructor(
    private languagesService: LanguagesService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadLanguages();
  }

  initializeForm(): void {
    this.languagesForm = this.fb.group({
      name: ['', [Validators.required]],
      proficiency: ['', Validators.required]
    });
  }

  loadLanguages(): void {
    this.loading = true;
    this.languagesService.getLanguages().subscribe({
      next: (data) => {
        this.languagesList = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading languages:', err);
        this.loading = false;
      }
    });
  }

  openForm(item?: Language): void {
    this.submitted = false;
    if (item) {
      this.editingId = item.id;
      this.languagesForm.patchValue(item);
    } else {
      this.editingId = null;
      this.languagesForm.reset();
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.languagesForm.reset();
    this.editingId = null;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.languagesForm.invalid) return;

    this.loading = true;
    const formData = this.languagesForm.value;

    if (this.editingId) {
      this.languagesService.updateLanguage(this.editingId, formData).subscribe({
        next: () => {
          this.loadLanguages();
          this.closeForm();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error updating language:', err);
          this.loading = false;
        }
      });
    } else {
      this.languagesService.createLanguage(formData).subscribe({
        next: () => {
          this.loadLanguages();
          this.closeForm();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error creating language:', err);
          this.loading = false;
        }
      });
    }
  }

  deleteLanguage(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este idioma?')) {
      this.loading = true;
      this.languagesService.deleteLanguage(id).subscribe({
        next: () => {
          this.loadLanguages();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error deleting language:', err);
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.languagesForm.controls;
  }
}
```

### Paso 2: Actualizar Template HTML

**Template:** Copia `skills.html` y adapta los campos del formulario.

```html
<div class="languages-section">
  <div class="section-header">
    <h2>Idiomas</h2>
    <button class="btn-add" (click)="openForm()" *ngIf="!showForm">
      <span class="icon">+</span> Agregar
    </button>
  </div>

  <!-- Formulario CRUD -->
  <div class="form-container" *ngIf="showForm">
    <div class="form-overlay" (click)="closeForm()"></div>
    <form [formGroup]="languagesForm" (ngSubmit)="onSubmit()" class="form-modal">
      <div class="form-header">
        <h3>{{ editingId ? 'Editar' : 'Agregar' }} Idioma</h3>
        <button type="button" class="btn-close" (click)="closeForm()">✕</button>
      </div>

      <div class="form-body">
        <div class="form-group">
          <label for="name">Idioma</label>
          <input
            type="text"
            id="name"
            formControlName="name"
            placeholder="Ej: Español, Inglés, Francés"
            class="form-input"
            [class.is-invalid]="submitted && f['name'].errors"
          />
          <small class="error" *ngIf="submitted && f['name'].errors">
            Campo requerido
          </small>
        </div>

        <div class="form-group">
          <label for="proficiency">Nivel de Dominio</label>
          <select
            id="proficiency"
            formControlName="proficiency"
            class="form-input"
            [class.is-invalid]="submitted && f['proficiency'].errors"
          >
            <option value="">Selecciona un nivel</option>
            <option *ngFor="let level of proficiencyLevels" [value]="level">
              {{ level }}
            </option>
          </select>
          <small class="error" *ngIf="submitted && f['proficiency'].errors">
            Campo requerido
          </small>
        </div>
      </div>

      <div class="form-footer">
        <button type="button" class="btn btn-secondary" (click)="closeForm()">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary" [disabled]="loading">
          {{ loading ? 'Guardando...' : editingId ? 'Actualizar' : 'Agregar' }}
        </button>
      </div>
    </form>
  </div>

  <!-- Lista de Idiomas -->
  <div class="items-list" *ngIf="!showForm">
    <div *ngIf="loading && languagesList.length === 0" class="loading">
      Cargando...
    </div>

    <div *ngIf="languagesList.length > 0; else noData" class="languages-grid">
      <div *ngFor="let item of languagesList" class="language-card">
        <div class="language-badge">{{ item.proficiency }}</div>
        <h3>{{ item.name }}</h3>
        <div class="language-actions">
          <button class="btn-icon edit" (click)="openForm(item)" title="Editar">
            ✎
          </button>
          <button class="btn-icon delete" (click)="deleteLanguage(item.id)" title="Eliminar">
            ✕
          </button>
        </div>
      </div>
    </div>

    <ng-template #noData>
      <p class="no-data">Sin idiomas agregados. ¡Añade tu primer idioma!</p>
    </ng-template>
  </div>
</div>
```

### Paso 3: Actualizar Estilos SCSS

**Template:** Copia `skills.scss` y personaliza los colores si deseas.

```scss
// Solo cambia el nombre de la clase y personaliza colores si quieres
.languages-section {
  // ... (mismo contenido que skills.scss)
  // Puedes personalizar colores:
  // $primary: #667eea;  ->  $primary: #00a8a8;
  // Etc.
}
```

---

## 🎯 Resumen de Campos por Componente

### Languages
- `name` (string)
- `proficiency` (string)

### WorkExperience
- `company` (string)
- `position` (string)
- `startDate` (string)
- `endDate` (string)
- `description` (string)

### Interests
- `name` (string)
- `description` (string)

### Certificates
- `name` (string)
- `issuer` (string)
- `issueDate` (string)
- `expiryDate` (string)
- `credentialUrl` (string)

### Names/Header
- `fullName` (string)
- `email` (string)
- `phone` (string)
- `location` (string)
- `about` (string)

---

## ✅ Checklist de Finalización

- [ ] **Languages** completado
- [ ] **WorkExperience** completado
- [ ] **Interests** completado
- [ ] **Certificates** completado
- [ ] **Names** completado
- [ ] Instalar dependencias: `npm install`
- [ ] Probar localmente: `npm start`
- [ ] Crear cuenta Aiven
- [ ] Configurar .env
- [ ] Subir a GitHub
- [ ] Desplegar en Render

---

## 🚀 Una Vez Completes Todo

1. Instala dependencias:
   ```bash
   npm install
   ```

2. Prueba localmente:
   ```bash
   npm start
   ```

3. Crea credenciales en Aiven (ver CRUD_SETUP_GUIDE.md)

4. Configura `.env`

5. Sube a GitHub

6. Despliega en Render

---

## 💡 Pro Tips

- **Reutiliza los estilos**: Los SCSS son muy similares entre componentes
- **Adapta solo los campos**: El 90% del código es igual
- **Prueba uno a uno**: Antes de pasar al siguiente, verifica que funcione
- **Usa Postman**: Para probar endpoints antes de completar el frontend

---

¡Vamos! Tienes todo lo que necesitas. 🚀
