# 📋 Guía Completa: CRUD CV + PostgreSQL (Aiven) + Render

## 🚀 Resumen del Proyecto

Tu proyecto CV ha sido transformado de una aplicación estática en **Firebase** a un **CRUD completo** con:

- ✅ **Backend**: Express + Sequelize + PostgreSQL
- ✅ **Frontend**: Angular con formularios reactivos
- ✅ **Base de Datos**: PostgreSQL en Aiven
- ✅ **Deployment**: Render (gratuito)

---

## 📦 Cambios Implementados

### 1. Backend (Express + Sequelize)
```
src/server/
├── config/
│   └── database.ts          # Configuración de PostgreSQL
├── models/                   # 7 modelos Sequelize
│   ├── Header.ts            # Información personal
│   ├── Education.ts         # Educación
│   ├── WorkExperience.ts    # Experiencia laboral
│   ├── Skill.ts             # Habilidades
│   ├── Language.ts          # Idiomas
│   ├── Interest.ts          # Intereses
│   └── Certificate.ts       # Certificados
├── controllers/             # Controladores CRUD
│   └── *.ts                 # Un controlador por entidad
├── routes/
│   └── apiRoutes.ts         # Rutas API REST
```

### 2. Frontend (Angular)
```
Servicios actualizados:
- names.service.ts
- education.service.ts
- work-experience.service.ts
- skills.service.ts
- languages.service.ts
- interests.service.ts
- certificates.service.ts

Componentes mejorados:
- education.ts / education.html / education.scss
  (Template CRUD reutilizable para las otras secciones)
```

### 3. API REST Endpoints

```
Cada entidad tiene 5 endpoints CRUD:

GET     /api/headers              # Obtener todos
POST    /api/headers              # Crear
GET     /api/headers/:id          # Obtener uno
PUT     /api/headers/:id          # Actualizar
DELETE  /api/headers/:id          # Eliminar

Lo mismo para:
/api/education
/api/work-experience
/api/skills
/api/languages
/api/interests
/api/certificates
```

---

## 🔧 Paso 1: Completar la Estructura de Componentes

### Aplicar Template a Otras Secciones

He creado el template completo para **Education**. Ahora necesitas aplicar la misma estructura a:
- `skills.ts` / `skills.html` / `skills.scss`
- `languages.ts` / `languages.html` / `languages.scss`
- `work-experience.ts` / `work-experience.html` / `work-experience.scss`
- `interests.ts` / `interests.html` / `interests.scss`
- `certificates.ts` / `certificates.html` / `certificates.scss`
- `names.ts` / `names.html` / `names.scss`

**Patrón a seguir:**

```typescript
// Componente TypeScript (skills.ts)
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skill } from '../models/skills/skills.model';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class SkillsComponent implements OnInit {
  skillsList: Skill[] = [];
  skillsForm!: FormGroup;
  showForm = false;
  editingId: number | null = null;
  loading = false;
  submitted = false;

  constructor(
    private skillsService: SkillsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSkills();
  }

  initializeForm(): void {
    this.skillsForm = this.fb.group({
      name: ['', [Validators.required]],
      level: ['', [Validators.required]],
      category: ['']
    });
  }

  loadSkills(): void {
    this.loading = true;
    this.skillsService.getSkills().subscribe({
      next: (data) => {
        this.skillsList = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading skills:', err);
        this.loading = false;
      }
    });
  }

  openForm(item?: Skill): void {
    this.submitted = false;
    if (item) {
      this.editingId = item.id;
      this.skillsForm.patchValue(item);
    } else {
      this.editingId = null;
      this.skillsForm.reset();
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.skillsForm.reset();
    this.editingId = null;
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.skillsForm.invalid) return;

    this.loading = true;
    const formData = this.skillsForm.value;

    if (this.editingId) {
      this.skillsService.updateSkill(this.editingId, formData).subscribe({
        next: () => {
          this.loadSkills();
          this.closeForm();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error updating skill:', err);
          this.loading = false;
        }
      });
    } else {
      this.skillsService.createSkill(formData).subscribe({
        next: () => {
          this.loadSkills();
          this.closeForm();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error creating skill:', err);
          this.loading = false;
        }
      });
    }
  }

  deleteSkill(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esto?')) {
      this.loading = true;
      this.skillsService.deleteSkill(id).subscribe({
        next: () => {
          this.loadSkills();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error deleting skill:', err);
          this.loading = false;
        }
      });
    }
  }

  get f() {
    return this.skillsForm.controls;
  }
}
```

**Adapta los campos según el modelo de cada servicio.**

---

## 🗄️ Paso 2: Configurar PostgreSQL en Aiven

### 2.1 Crear una Cuenta en Aiven

1. Ve a **https://aiven.io**
2. Regístrate con tu email
3. Verifica tu email

### 2.2 Crear una Instancia PostgreSQL

1. En el dashboard, haz clic en **"Create service"**
2. Selecciona **"PostgreSQL"**
3. Configura:
   - **Service name**: `cv-postgres`
   - **Cloud**: Selecciona la región más cercana (ej: `aws-us-east-1`)
   - **Plan**: Selecciona el plan gratuito (30 días)
4. Haz clic en **"Create service"**
5. Espera 2-3 minutos a que se inicialice

### 2.3 Obtener Credenciales

Una vez creado el servicio:

1. Ve a la pestaña **"Overview"**
2. Busca **"Connection information"**
3. Copia estos datos:
   - **Host**: `host` (ej: `cv-postgres.a.aivencloud.com`)
   - **Port**: `5432`
   - **Database**: `defaultdb`
   - **User**: `avnadmin`
   - **Password**: Tu contraseña de Aiven

### 2.4 Actualizar `.env`

Crea un archivo `.env` en la raíz del proyecto:

```bash
# Base de Datos PostgreSQL (Aiven)
DB_HOST=cv-postgres.a.aivencloud.com
DB_PORT=5432
DB_NAME=defaultdb
DB_USER=avnadmin
DB_PASSWORD=tu_contraseña_aqui

# Node Environment
NODE_ENV=production
PORT=3000

# API
API_URL=https://tu-app.onrender.com
```

**⚠️ Importante**: Nunca commits `.env` a Git. Está en `.gitignore`

---

## 🚀 Paso 3: Desplegar en Render

### 3.1 Preparar Proyecto para Render

1. Instala las dependencias:
```bash
npm install
```

2. Construye el proyecto:
```bash
npm run build
```

### 3.2 Crear Repositorio en GitHub

1. Inicializa Git:
```bash
git init
git add .
git commit -m "Initial commit: CV CRUD with PostgreSQL"
```

2. Crea un repositorio en **https://github.com/new**
3. Sube el código:
```bash
git remote add origin https://github.com/tu-usuario/cv-musk-crud.git
git branch -M main
git push -u origin main
```

### 3.3 Crear Aplicación en Render

1. Ve a **https://render.com**
2. Registrate con GitHub
3. Haz clic en **"New +"** → **"Web Service"**
4. Conecta tu repositorio de GitHub
5. Configura:
   - **Name**: `cv-musk-crud`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/cv-musk-style/server/server.mjs`
   - **Plan**: Free

6. Haz clic en **"Advanced"** y agrega variables de entorno:
   ```
   DB_HOST=cv-postgres.a.aivencloud.com
   DB_PORT=5432
   DB_NAME=defaultdb
   DB_USER=avnadmin
   DB_PASSWORD=tu_contraseña
   NODE_ENV=production
   ```

7. Haz clic en **"Create Web Service"**

### 3.4 Esperar Deployment

- Render construirá e desplegará tu aplicación (2-5 minutos)
- Una vez listo, verás la URL: `https://cv-musk-crud.onrender.com`

---

## 🧪 Paso 4: Probar Aplicación Localmente

### 4.1 Ejecutar en Desarrollo

```bash
# Terminal 1: Inicia el dev server
npm start

# La app estará en http://localhost:4200
```

### 4.2 Probar API

Abre **Thunder Client**, **Postman** o **curl**:

```bash
# Obtener todas las educaciones
curl http://localhost:4200/api/education

# Crear una educación
curl -X POST http://localhost:4200/api/education \
  -H "Content-Type: application/json" \
  -d '{
    "school": "Universidad X",
    "degree": "Licenciatura",
    "fieldOfStudy": "Informática",
    "startDate": "2020-01-01",
    "endDate": "2024-06-30",
    "description": "Mi experiencia..."
  }'
```

---

## 🎨 Paso 5: Personalizar Interfaz

El componente **Education** tiene estilos minimalistas. Puedes:

1. Cambiar colores en `education.scss`:
   ```scss
   $primary: #667eea;      // Azul
   $secondary: #764ba2;    // Morado
   $danger: #e74c3c;       // Rojo
   ```

2. Adaptar campos según tus necesidades
3. Agregar más campos en formularios

---

## 🔐 Seguridad

### Recomendaciones:

1. **No hagas commits de `.env`**
2. **Usa variables de entorno en producción**
3. **Agrega autenticación** (próxima fase):
   ```typescript
   // Agregar middleware de autenticación en server.ts
   import auth from './server/middleware/auth';
   app.use('/api', auth);
   ```

4. **Valida datos en backend**:
   ```typescript
   // En controllers
   if (!req.body.school) {
     return res.status(400).json({ error: 'School is required' });
   }
   ```

---

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
- Verifica credenciales en `.env`
- Asegúrate que Aiven está activo
- Comprueba firewall/VPN

### Error: "Port 3000 already in use"
```bash
# Encuentra el proceso
lsof -i :3000
# Mata el proceso
kill -9 <PID>
```

### Error: "CORS error"
- Ya está configurado en `server.ts`
- Si persiste, verifica que `cors()` está antes de rutas

### Build falló en Render
- Verifica `npm run build` funciona localmente
- Revisa logs en Render dashboard

---

## 📝 Próximas Mejoras

- [ ] Agregar autenticación (JWT)
- [ ] Subir archivos (foto perfil, CV PDF)
- [ ] Exportar CV a PDF
- [ ] Búsqueda y filtros
- [ ] Historial de cambios
- [ ] Temas oscuro/claro
- [ ] Compartir CV públicamente

---

## 📞 Soporte

Si algo no funciona:
1. Revisa consola del navegador (F12)
2. Revisa logs de Render
3. Verifica que todas las dependencias están instaladas

¡Éxito con tu CV! 🎉
