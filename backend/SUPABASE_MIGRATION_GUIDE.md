# Guía: Migrar a Supabase y desplegar backend

Esta guía explica paso a paso cómo crear el proyecto en Supabase, ejecutar la migración de la tabla `empresas`, configurar el backend Node.js y desplegarlo en Render, además de cómo actualizar la app Flutter.

## Resumen de archivos añadidos
- `backend/` — servidor Node.js (Express + pg)
- `backend/migrations/create_empresas.sql` — SQL para crear la tabla `empresas`
- `backend/run_migrations.js` — script para ejecutar todas las migraciones `.sql`
- `backend/.env.example` — ejemplo de `DATABASE_URL`
- `lib/services/api_services.dart` — actualizado para usar `--dart-define API_BASE`

---

## 1) Crear proyecto en Supabase
1. Regístrate en https://supabase.com/ e inicia sesión.
2. Crea un nuevo proyecto: elige nombre, contraseña y región.
3. En el panel del proyecto, ve a `Settings -> Database` y copia la `Connection string` (Postgres) o la URL `Connection string (URI)`.
   - La forma típica es: `postgres://user:password@db.host:5432/database`
4. Abre `SQL Editor` en Supabase para ejecutar consultas manualmente si deseas.

## 2) Configurar `.env` en el backend
1. En el directorio `backend/` crea un archivo `.env` (no subirlo a GitHub).
2. Añade la variable:

```
DATABASE_URL=postgres://user:password@db.host:5432/database
```

3. Opcional: si tu conexión requiere SSL y rechaza certificados no válidos, el `db.js` ya configura `rejectUnauthorized:false`.

## 3) Ejecutar migraciones
Desde tu máquina local (con Node.js instalado):

```bash
cd backend
npm install
npm run migrate
```

- `npm run migrate` ejecutará `backend/run_migrations.js` y aplicará todos los `.sql` en `backend/migrations/` (incluye `create_empresas.sql`).
- También puedes copiar el contenido de `migrations/create_empresas.sql` y pegarlo manualmente en el editor SQL de Supabase.

## 4) Probar backend localmente

**Nota:** Si tu red/ISP bloquea conexiones a Supabase desde tu máquina local, este paso puede fallar (error `ENOTFOUND`). En ese caso, salta directamente al paso 5 (Desplegar en Render) — Render puede conectarse a Supabase sin problemas.

1. Asegúrate de que `.env` contiene `DATABASE_URL` correcto.
2. Inicia el servidor:

```bash
npm run start
```

3. Prueba las rutas:
- `GET http://localhost:3000/api/empresas` — listar
- `POST http://localhost:3000/api/empresas` — crear (body JSON con `nombre`, `direccion`, `telefono`)
- `PUT http://localhost:3000/api/empresas/:id` — actualizar
- `DELETE http://localhost:3000/api/empresas/:id` — eliminar

Puedes usar `curl` o Postman.

**Si falla por `ENOTFOUND`:** Es normal si tu ISP/firewall bloquea. Procede al despliegue en Render.

## 5) Desplegar en Render

1. **Crea una cuenta en Render:** https://render.com/ e inicia sesión.
2. **Sube tu proyecto a GitHub:**
   - Crea un repo público o privado con tu código.
   - Incluye `backend/` con todo el contenido (package.json, .gitignore, etc.).
   - **NO subs el .env** — está en .gitignore.

3. **En Render, crea un nuevo Web Service:**
   - Conecta tu repo de GitHub.
   - Selecciona la rama `main` (o tu rama default).
   - **Root directory:** `backend/` (o deja vacío si el repo root es el backend).
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment variables:** Añade `DATABASE_URL` con la cadena de conexión de Supabase (la misma del .env local).

4. **Despliega.** Render construirá y lanzará tu servidor. Te dará una URL pública como:
   ```
   https://mi-backend.onrender.com
   ```

5. **Prueba la URL pública:**
   ```
   curl https://mi-backend.onrender.com/api/empresas
   ```
   Debería retornar un array JSON vacío `[]` (si la tabla está vacía) o un error 500 (si hay problema con Supabase).

## 6) Configurar Supabase (CORS / RLS opcional)
- Para llamadas desde la app Flutter web, normalmente no necesitas configurar CORS en Supabase porque el backend hace las consultas. Asegúrate de que la URL pública del backend esté disponible.
- Si usas Supabase directamente desde el cliente, habilita las políticas de acceso (RLS) según tus necesidades.

## 7) Actualizar Flutter para usar la URL pública
`lib/services/api_services.dart` ahora usa la variable de entorno `API_BASE`. Ejecuta Flutter con:

```bash
flutter run -d chrome --dart-define=API_BASE="https://mi-backend.onrender.com"
```

O para producción web:

```bash
flutter build web --dart-define=API_BASE="https://mi-backend.onrender.com"
```

## 8) Evidencias que debes recopilar
- Captura de pantalla del proyecto Supabase creado.
- Captura del SQL editor con `create_empresas.sql` ejecutado y datos insertados.
- Archivo `.env` (no subir; mantener privado) con `DATABASE_URL` configurado.
- URL pública del backend desplegado (captura de la página de Render + prueba de endpoint funcional).
- Captura de la app Flutter en Chrome mostrando lista/creación/edición/eliminación funcionando.
- Logs de backend mostrando peticiones y respuestas (opcional).

## 9) Problemas comunes y soluciones
- Error de SSL: si la conexión falla por certificado, el `db.js` utiliza `rejectUnauthorized:false` para permitir conexiones a Supabase en algunos entornos. Revisa tu política de seguridad.
- Credenciales incorrectas: revisa `DATABASE_URL` y que la base de datos esté en la misma región y en estado `healthy`.
- Render failing build: revisa logs, instala `nodemon` como devDependency si usas `dev`.

## 10) Comandos útiles
```bash
# instalar dependencias
cd backend
npm install

# ejecutar migraciones
npm run migrate

# correr servidor
npm run start

# probar API con curl
curl http://localhost:3000/api/empresas

# correr Flutter web con URL del backend
flutter run -d chrome --dart-define=API_BASE="https://mi-backend.onrender.com"
```

---

Si quieres, puedo:
- (1) añadir un script para crear automáticamente el repo y push (requiere tu token),
- (2) preparar un PR con estos cambios, o
- (3) ayudarte a ejecutar las migraciones si me compartes (temporalmente) `DATABASE_URL` aquí — en ese caso no lo guardaré en el repo y te daré instrucciones para eliminarlo después.

Dime qué prefieres y avanzo.
