# 🚀 Flutter CRUD con Supabase - Checklist Completado

Repositorio: https://github.com/cristianzavaletab-lgtm/Flutter03

## ✅ Tareas Completadas

### 1. **Backend Node.js + Express**
- ✅ `backend/index.js` - Servidor Express configurado
- ✅ `backend/db.js` - Conexión a Supabase con pg pool
- ✅ `backend/routes/empresas.js` - Rutas CRUD (GET, POST, PUT, DELETE)
- ✅ `backend/package.json` - Dependencias (express, cors, pg, dotenv)
- ✅ `backend/.env.example` - Plantilla de configuración
- ✅ `backend/.gitignore` - Excluye `.env` y `node_modules/`
- ✅ `backend/Procfile` - Configuración para Render
- ✅ `backend/Procfile` - Configuración para Render

### 2. **Base de Datos**
- ✅ Tabla `empresas` creada en Supabase (`id`, `nombre`, `direccion`, `telefono`, `created_at`)
- ✅ Migración SQL en `backend/migrations/create_empresas.sql`
- ✅ Script automático `backend/run_migrations.js` con comando `npm run migrate`

### 3. **Flutter**
- ✅ `lib/services/api_services.dart` - Actualizado para usar `--dart-define=API_BASE`
- ✅ Mantiene compatibilidad con `localhost:3000` como fallback
- ✅ Soporta URL dinámica para Render (ej: `https://mi-backend.onrender.com`)

### 4. **Documentación**
- ✅ `backend/SUPABASE_MIGRATION_GUIDE.md` - Guía completa paso a paso
- ✅ Instrucciones para Supabase, Render y Flutter web
- ✅ Ejemplos de curl y comandos útiles

### 5. **GitHub**
- ✅ Repositorio inicializado en https://github.com/cristianzavaletab-lgtm/Flutter03
- ✅ Primer commit con toda la estructura
- ✅ `.gitignore` configura para no subir `.env`

---

## 📋 Evidencias Requeridas (Check cuando completes)

### Supabase
- ☐ Captura: Proyecto creado en Supabase
- ☐ Captura: Tabla `empresas` en SQL Editor
- ☐ Captura: Datos insertados en tabla

### Backend Node.js
- ☐ `.env` configurado con `DATABASE_URL` (mantener privado)
- ☐ `npm install` ejecutado
- ☐ `npm run migrate` exitoso
- ☐ Captura: Servidor corriendo en puerto 3000

### Render (lo siguiente)
- ☐ Cuenta creada en https://render.com
- ☐ Web Service conectado al repo GitHub
- ☐ `DATABASE_URL` configurada en variables de entorno de Render
- ☐ Deploy exitoso
- ☐ Captura: URL pública del backend (ej: `https://flutter-crud-123.onrender.com`)
- ☐ Captura: `/api/empresas` respondiendo en Render

### Flutter Web
- ☐ Flutter web ejecutada con URL de Render:
  ```bash
  flutter run -d chrome --dart-define=API_BASE="https://tu-backend.onrender.com"
  ```
- ☐ Captura: Pantalla principal mostrando lista (vacía o con datos)
- ☐ Captura: Crear empresa exitosa
- ☐ Captura: Listar empresas en Flutter
- ☐ Captura: Editar empresa exitosa
- ☐ Captura: Eliminar empresa exitosa

---

## 🔧 Próximos Pasos (en orden)

### 1️⃣ Desplegar en Render
```bash
# 1. Ve a https://render.com y crea una cuenta
# 2. Crea un New Web Service
# 3. Conecta tu repo GitHub: cristianzavaletab-lgtm/Flutter03
# 4. Configuración:
#    - Root: backend
#    - Build: npm install
#    - Start: npm start
# 5. Environment Variables (en Render dashboard):
#    - DATABASE_URL=postgresql://postgres:60253405Cz%40@db.zcgcwtbjkvznduwmsakc.supabase.co:5432/postgres
# 6. Deploy y espera ~2-3 minutos
# 7. Copia la URL pública (algo como: https://flutter-crud.onrender.com)
```

### 2️⃣ Probar el backend públicamente
```bash
# Desde PowerShell/Terminal:
curl https://tu-backend-render.onrender.com/api/empresas

# Debería retornar: []  (array vacío)
```

### 3️⃣ Ejecutar Flutter web con URL de Render
```bash
cd D:\Descargas\crud_withnodejs
flutter run -d chrome --dart-define=API_BASE="https://tu-backend-render.onrender.com"
```

### 4️⃣ Probar CRUD en Flutter
- ✅ Listar empresas (GET)
- ✅ Crear empresa nueva (POST)
- ✅ Editar empresa (PUT)
- ✅ Eliminar empresa (DELETE)

---

## 📁 Estructura del Proyecto

```
Flutter03/
├── backend/
│   ├── .env                        (NO subirá a GitHub - mantener privado)
│   ├── .env.example                (Plantilla)
│   ├── .gitignore                  (Excluye .env y node_modules)
│   ├── index.js                    (Servidor Express)
│   ├── db.js                       (Conexión PostgreSQL)
│   ├── package.json                (Dependencias)
│   ├── Procfile                    (Para Render)
│   ├── run_migrations.js           (Script de migraciones)
│   ├── README.md                   (Instrucciones backend)
│   ├── SUPABASE_MIGRATION_GUIDE.md (Guía completa)
│   ├── migrations/
│   │   └── create_empresas.sql     (SQL de tabla)
│   └── routes/
│       └── empresas.js             (Endpoints CRUD)
├── lib/
│   ├── main.dart
│   ├── services/
│   │   └── api_services.dart       (ACTUALIZADO con --dart-define)
│   ├── providers/
│   │   └── empresa_provider.dart
│   ├── models/
│   │   └── empresa.dart
│   └── screens/
│       ├── list_screen.dart
│       ├── form_screen.dart
│       ├── detail_screen.dart
│       └── screens.dart
├── pubspec.yaml
└── ... (ios, android, windows, macos, etc.)
```

---

## 🎯 Comando Final para Flutter Web (cuando Render esté listo)

Reemplaza `https://tu-backend-render.onrender.com` con tu URL real de Render:

```bash
flutter run -d chrome --dart-define=API_BASE="https://tu-backend-render.onrender.com"
```

O para producción:

```bash
flutter build web --dart-define=API_BASE="https://tu-backend-render.onrender.com" --web-renderer html
```

---

## ❓ Preguntas Comunes

**P: ¿Dónde está mi `.env`?**  
R: En `backend/.env` (NO está en GitHub, protegido por `.gitignore`)

**P: ¿Cómo cambio la URL del backend?**  
R: Ejecuta Flutter con `--dart-define=API_BASE="tu_url_nueva"`

**P: ¿Falla la conexión en Render?**  
R: Revisa en Render dashboard → Logs. Asegúrate `DATABASE_URL` esté configurada correctamente.

**P: ¿Cómo insertar datos de prueba?**  
R: En Supabase SQL Editor, ejecuta:
```sql
INSERT INTO empresas (nombre, direccion, telefono) VALUES 
('Empresa 1', 'Calle 1', '123456789'),
('Empresa 2', 'Calle 2', '987654321');
```

---

## ✨ Resumen

- ✅ Backend Node.js listo para Render
- ✅ Flutter configurado para usar URL dinámica
- ✅ Migraciones automatizadas
- ✅ Todo en GitHub
- ⏳ Falta: Desplegar en Render y probar CRUD en Flutter web

**Tiempo estimado para completar:** ~10 minutos (Deploy en Render + testing)

