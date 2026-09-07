# AguaFix API - Bruno Collection

Colección de requests para probar la API de AguaFix.

## Cómo usar

1. Abre Bruno
2. Importa esta carpeta como una colección
3. Selecciona el environment `local` (asegúrate de que la API esté corriendo en http://localhost:3000)
4. Ejecuta los requests en este orden:

### Flujo de Prueba

1. **Auth → Register**: Crea un nuevo usuario
2. **Auth → Login**: Inicia sesión y guarda el token (se hace automáticamente)
3. **Reports → Create Report**: Crea un nuevo reporte de fuga
4. **Reports → Get All Reports**: Lista todos los reportes

## Variables de Entorno

En el archivo `environments/local.bru` se definen:

- `base_url`: URL base de la API
- `token`: Token JWT (se llena automáticamente después de login)

## Ejemplos de Severidad

- `low`: Fuga pequeña, flujo lento
- `medium`: Fuga moderada, requiere atención
- `high`: Fuga importante, requiere atención urgente
