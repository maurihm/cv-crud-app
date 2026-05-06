# 🎓 CV Musk Style - CRUD Edition

> Transformación de CV estático a aplicación CRUD completa con PostgreSQL y deployment en Render

## 📖 Resumen

Este proyecto ha sido **totalmente rediseñado** para ser un **CRUD completo** con:

- ✅ **Backend**: Express + Sequelize + PostgreSQL
- ✅ **Frontend**: Angular 21 con formularios reactivos
- ✅ **Base de Datos**: PostgreSQL alojada en Aiven (gratuito)
- ✅ **Hosting**: Render (gratuito)
- ✅ **Interfaz**: Minimalista, moderna y responsiva

---

## 🎯 Características

### Operaciones CRUD
- **CREATE**: Agregar nuevas entradas (Educación, Habilidades, Idiomas, etc.)
- **READ**: Ver todas las entradas en una interfaz limpia
- **UPDATE**: Editar entradas existentes
- **DELETE**: Eliminar entradas con confirmación

### Entidades
1. **Header** - Información personal (nombre, email, teléfono, ubicación, about)
2. **Education** - Educación universitaria
3. **WorkExperience** - Experiencia laboral
4. **Skills** - Habilidades técnicas y profesionales
5. **Languages** - Idiomas que hablas
6. **Interests** - Intereses personales
7. **Certificates** - Certificaciones profesionales

---

## 📁 Estructura del Proyecto

```
cv-musk-style-crud/
├── src/
│   ├── server/                          # Backend Express + Sequelize
│   │   ├── config/
│   │   │   └── database.ts              # Configuración de PostgreSQL
│   │   ├── models/                      # 7 modelos Sequelize
│   │   ├── controllers/                 # Lógica CRUD
│   │   └── routes/
│   │       └── apiRoutes.ts             # Rutas REST API
│   │
│   ├── app/
│   │   ├── education/                   # ✅ Componente CRUD completo
│   │   ├── skills/                      # ✅ Componente CRUD completo
│   │   ├── languages/                   # 🔄 Próximo
│   │   ├── work-experience/             # 🔄 Próximo
│   │   ├── interests/                   # 🔄 Próximo
│   │   ├── certificates/                # 🔄 Próximo
│   │   ├── names/                       # 🔄 Próximo
│   │   ├── services/                    # Servicios HTTP
│   │   └── models/                      # Modelos TypeScript
│   │
│   ├── server.ts                        # Servidor Express actualizado
│   └── main.ts                          # Entry point Angular
│
├── .env.example                         # Variables de entorno template
├── CRUD_SETUP_GUIDE.md                  # 📖 Guía completa de setup
├── CAMBIOS_REALIZADOS.md                # 📋 Resumen de cambios
├── COMPLETAR_COMPONENTES.md             # ⚡ Guía rápida para otros componentes
└── package.json                         # Dependencias actualizadas

```

---

## 🚀 Empezar Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Crear base de datos en Aiven (5 minutos)
- Ve a https://aiven.io
- Registrate
- Crea instancia PostgreSQL gratuita
- Copia las credenciales

### 3. Configurar .env
```bash
# Copia y edita
cp .env.example .env

# Edita con tus credenciales de Aiven:
DB_HOST=tu-host.aivencloud.com
DB_PORT=5432
DB_NAME=defaultdb
DB_USER=avnadmin
DB_PASSWORD=tu_contraseña
NODE_ENV=development
PORT=3000
```

### 4. Probar localmente
```bash
npm start
# Abre http://localhost:4200
```

### 5. Desplegar en Render (10 minutos)
- Sube a GitHub
- Conecta a Render
- Configura variables de entorno
- ¡Listo! 🎉

---

## 📚 Documentación Disponible

| Documento | Descripción |
|-----------|-------------|
| [CRUD_SETUP_GUIDE.md](./CRUD_SETUP_GUIDE.md) | Guía completa paso a paso (Aiven + Render) |
| [CAMBIOS_REALIZADOS.md](./CAMBIOS_REALIZADOS.md) | Resumen de todos los cambios implementados |
| [COMPLETAR_COMPONENTES.md](./COMPLETAR_COMPONENTES.md) | Guía rápida para completar 5 componentes faltantes |

---

## 🔧 Componentes Completados vs Pendientes

### ✅ Completados (2)
- **Education** - Componente CRUD completo con formulario modal
- **Skills** - Componente CRUD con grid de tarjetas

### 🔄 Pendientes (5) - Usa el template
- **Languages** - Usar template de Skills
- **WorkExperience** - Usar template de Education
- **Interests** - Usar template de Skills
- **Certificates** - Usar template de Education
- **Names/Header** - Usar template de Education

**Proceso**: Copia el archivo `.ts`, `.html` y `.scss` de un componente completado, adapta los campos y ¡listo!

---

## 📱 API REST Endpoints

Cada entidad tiene 5 endpoints CRUD:

```
GET     /api/headers              Obtener todos
POST    /api/headers              Crear nuevo
GET     /api/headers/:id          Obtener uno
PUT     /api/headers/:id          Actualizar
DELETE  /api/headers/:id          Eliminar

# Lo mismo para:
/api/education
/api/work-experience
/api/skills
/api/languages
/api/interests
/api/certificates
```

---

## 🎨 Diseño UI/UX

### Características de Interfaz
- ✨ **Minimalista**: Diseño limpio y despejado
- 🎨 **Gradientes modernos**: Purpura/Azul (#667eea → #764ba2)
- 📱 **Responsive**: Funciona en móvil, tablet y desktop
- ♿ **Accesible**: Labels, validaciones visuales
- ⚡ **Rápido**: Animaciones suaves (CSS transitions)
- 🎯 **Intuitivo**: Formularios modales, botones claros

### Componentes Visuales
- **Tarjetas de items**: Hover effects, editar/eliminar botones
- **Formularios modales**: Overlay oscuro, animación slide-in
- **Validaciones**: Bordes rojos, mensajes de error
- **Estados**: Loading spinners, placeholders

---

## 🔐 Seguridad

### Implemented
- ✅ CORS habilitado en Express
- ✅ Variables de entorno para credentials
- ✅ SSL/TLS en Aiven (incluido)
- ✅ Validaciones en frontend y backend

### Recomendaciones Futuras
- 🔒 Agregar JWT authentication
- 🔐 Hash de contraseñas
- 🛡️ Rate limiting
- 📝 Auditoría de cambios
- 🔑 Recuperación de contraseña

---

## 📊 Modelos de Base de Datos

### Header (Información Personal)
```
- fullName (string)
- email (string)
- phone (string)
- location (string)
- about (text)
```

### Education
```
- school (string)
- degree (string)
- fieldOfStudy (string)
- startDate (date)
- endDate (date)
- description (text)
```

### WorkExperience
```
- company (string)
- position (string)
- startDate (date)
- endDate (date)
- description (text)
```

### Skill
```
- name (string)
- level (string)
- category (string)
```

### Language
```
- name (string)
- proficiency (string)
```

### Interest
```
- name (string)
- description (text)
```

### Certificate
```
- name (string)
- issuer (string)
- issueDate (date)
- expiryDate (date)
- credentialUrl (string)
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **Angular 21** - Framework
- **Reactive Forms** - Validaciones
- **RxJS** - Async operations
- **SCSS** - Estilos

### Backend
- **Express 5** - Servidor
- **Sequelize 6** - ORM
- **PostgreSQL** - Base de datos
- **CORS** - Cross-origin requests
- **dotenv** - Variables de entorno

### Deployment
- **Aiven** - Base de datos (PostgreSQL)
- **Render** - Hosting (Node.js)
- **GitHub** - Repositorio

---

## 🧪 Testing

### Probar API con cURL
```bash
# Obtener todas educaciones
curl http://localhost:3000/api/education

# Crear educación
curl -X POST http://localhost:3000/api/education \
  -H "Content-Type: application/json" \
  -d '{
    "school": "Universidad X",
    "degree": "Licenciatura",
    "fieldOfStudy": "Informática",
    "startDate": "2020-01-01",
    "endDate": "2024-06-30"
  }'

# Actualizar
curl -X PUT http://localhost:3000/api/education/1 \
  -H "Content-Type: application/json" \
  -d '{"school": "Nueva Universidad"}'

# Eliminar
curl -X DELETE http://localhost:3000/api/education/1
```

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Error "Cannot connect to database" | Verifica .env y que Aiven esté activo |
| CORS error | Ya está configurado, si persiste revisa server.ts |
| Port 3000 en uso | `lsof -i :3000` y `kill -9 <PID>` |
| Build falla en Render | Verifica `npm run build` localmente |
| Estilos no cargan | Limpia cache: `Ctrl+Shift+R` |

---

## 📚 Aprendizaje

Este proyecto demuestra:
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Arquitectura cliente-servidor
- ✅ Bases de datos relacionales (PostgreSQL)
- ✅ API REST
- ✅ Formularios reactivos en Angular
- ✅ Deployment en producción
- ✅ Buenas prácticas de UI/UX

---

## 🚀 Próximas Mejoras

### Fase 1 (MVP)
- [ ] Completar 5 componentes pendientes
- [ ] Desplegar en Render
- [ ] Documentar proceso

### Fase 2 (Producción)
- [ ] Agregar autenticación JWT
- [ ] Encriptación de datos sensibles
- [ ] Backup automático
- [ ] Logging y monitoring

### Fase 3 (Avanzado)
- [ ] Exportar CV a PDF
- [ ] Compartir CV públicamente
- [ ] Historial de cambios
- [ ] Tema oscuro/claro
- [ ] Búsqueda y filtros
- [ ] Subida de imágenes/CV

---

## 📞 Soporte

### Si algo no funciona:
1. **Revisa consola del navegador**: F12 → Console
2. **Revisa logs de Render**: Dashboard → Logs
3. **Verifica variables de entorno**: .env tiene todos los datos correctos
4. **Prueba localmente primero**: Antes de desplegar

### Recursos útiles:
- [Documentación Aiven](https://aiven.io/docs)
- [Documentación Render](https://render.com/docs)
- [Sequelize Docs](https://sequelize.org/docs)
- [Angular Docs](https://angular.io/docs)

---

## 📄 Licencia

Este proyecto es para propósitos educativos.

---

## 🎉 ¡Gracias!

Si esta guía te fue útil, ¡cómpartela! 

**Próximos pasos:**
1. Lee [CRUD_SETUP_GUIDE.md](./CRUD_SETUP_GUIDE.md)
2. Completa los 5 componentes faltantes
3. Configura Aiven
4. Despliega en Render

¡Éxito con tu CV! 🚀
