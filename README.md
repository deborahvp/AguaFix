# AguaFix API

API para reportar fugas de agua en vías públicas del municipio.

## Requisitos

- Node.js v18+
- Docker y Docker Compose
- PostgreSQL 16+ (si no usas Docker)

## Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/deborahvp/AguaFix.git
cd AguaFix
```

2. Instalar dependencias
```bash
npm install
```

3. Crear archivo `.env` (copia `.env.local` o `.env.example`)
```bash
cp .env.local .env
```

4. Levantar la base de datos con Docker
```bash
docker-compose up -d
```

5. Compilar y ejecutar el proyecto en desarrollo
```bash
npm run build
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
src/
├── config/           # Configuración (env, database)
├── auth/             # Módulo de autenticación
│   ├── controllers/
│   ├── services/
│   └── dtos/
├── users/            # Módulo de usuarios
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   └── entities/
├── reports/          # Módulo de reportes
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── entities/
│   ├── dtos/
│   └── templates/
├── email/            # Servicio de correos
│   ├── services/
│   └── email.module.ts
├── app.module.ts
└── main.ts
```

## Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Reportes
- `POST /api/reports` - Crear nuevo reporte de fuga
- `GET /api/reports` - Obtener todos los reportes

## Variables de Entorno

```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aguafix_db
DB_USER=postgres
DB_PASSWORD=postgres

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_FROM=your_email@gmail.com
MAINTENANCE_EMAIL=mantenimiento@municipio.gov.mx

# JWT
JWT_SECRET=tu_clave_secreta

# App
PORT=3000
NODE_ENV=development
```

## Migraciones

Crear migraciones:
```bash
npm run migration:generate -- -n NombreMigracion
```

Ejecutar migraciones:
```bash
npm run migration:run
```

Revertir última migración:
```bash
npm run migration:revert
```

## Testing con Bruno

Importa la colección de Bruno desde `bruno/` para probar los endpoints.

## Licencia

MIT
