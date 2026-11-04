# ShipNow Backend - Pre-entregas Módulo 1, 2, 3, 4 y 5

API REST desarrollada para "ShipNow", construida bajo una arquitectura profesional por capas (Controller ➔ Service ➔ Repository), con validación estricta de variables de entorno, un sistema completo de Mocking y Carga de Datos de Prueba (Seed), y una capa centralizada de manejo profesional de errores.

# Tecnologías Utilizadas
1. Node.js (Soporte de módulos ES import/export)
2. Express (Framework web y gestión de rutas/middlewares)
3. Mongoose (ODM para MongoDB)
4. Dotenv (Gestión segura de variables de entorno)
5. @faker-js/faker (Generación de datos falsos realistas)
6. Nodemon (Desarrollo en tiempo real)

# Instrucciones para Correr el Proyecto Localmente
Sigue estos pasos en tu terminal para clonar y poner en marcha el proyecto en tu máquina:

1. Clonar el repositorio:
    git clone https://github.com/AndresLovos/shipnow-api.git
    cd shipnow-api
2. Instalar las dependencias:
    npm install
3. Configurar las variables de entorno:
    Duplica el archivo .env.example y renómbralo a .env.
    Completa los valores requeridos (puerto y MONGODB_URI).
4. Iniciar el servidor en modo desarrollo:
    npm run dev

# Documentación de Endpoints y Pruebas
1. Módulo de Mocking (Datos en memoria sin persistencia)
Genera datos simulados mediante @faker-js/faker validando los parámetros recibidos.
Generar usuarios: GET http://localhost:8080/api/mocks/users?qty=3
Generar productos: GET http://localhost:8080/api/mocks/products?qty=3

2. Módulo de Carga Controlada (Seed en MongoDB)
Inserta registros de forma masiva manteniendo relaciones coherentes entre colecciones (Usuarios, Productos, Pedidos con prioridades y Entregas asignadas).
Ejecutar Seed masivo: POST http://localhost:8080/api/mocks/seed?qty=5

# Manejo Profesional de Errores (Módulo 3)
La aplicación centraliza la gestión de excepciones eliminando bloques dispersos en los controladores:

1. Clases Personalizadas (CustomError): Permiten lanzar errores descriptivos con un código HTTP asociado y causas técnicas.
2. Middleware Global (errorHandler): Ubicado al final del pipeline de Express, intercepta cualquier excepción del dominio y devuelve una estructura JSON uniforme:
{
  "status": "error",
  "error": "InvalidQuantityError",
  "message": "La cantidad solicitada para la generacion de datos es invalida.",
  "cause": "El parametro 'qty' recibido ('0') no es valido. Debe ser un numero mayor a 0."
}
3. Validación en Mocks: Ante casos inválidos (como qty=0 o valores negativos), el servicio intercepta el error y responde de forma controlada a través del middleware.

## Logging y Monitoreo (Módulo 4)

La aplicación utiliza Winston para un logging estructurado y profesional, reemplazando los console.log tradicionales.

### Niveles de Log Configurados
- fatal: Fallas críticas del sistema que impiden la ejecución.
- error: Errores de cliente o excepciones operativas.
- warning: Advertencias de negocio o situaciones atípicas (ej. stock bajo).
- info: Eventos importantes (ej. servidor iniciado, conexión a BD).
- http: Peticiones HTTP entrantes.
- debug: Información técnica detallada (activa principalmente en desarrollo).

### Endpoint de Prueba del Logger
Puedes verificar el funcionamiento de todos los niveles ejecutando:
- GET http://localhost:8080/api/test-logger

### Persistencia y Rotación
Los logs de nivel error y fatal se almacenan automáticamente en la carpeta logs/ mediante winston-daily-rotate-file, asegurando la rotación diaria y evitando la saturación del disco. Esta carpeta se encuentra excluida en el .gitignore.

## Documentación con Swagger (Módulo 5)

La API expone una interfaz interactiva donde están documentados todos los endpoints reales del proyecto, conectando las respuestas directamente con nuestro middleware global de errores.

# Ruta de acceso: http://localhost:8080/api/docs

### ¿Cómo probarlo?
1. Iniciá el servidor con npm run dev.
2. Ingresá en el navegador a http://localhost:8080/api/docs.
3. Desde la interfaz vas a ver los siguientes módulos operativos:
   * Users y Products: CRUD inicial (GET y POST) con esquemas reales.
   * Orders y Deliveries: Endpoints para gestión de pedidos y entregas.
   * Mocks: Generación de datos falsos en memoria y Seed en MongoDB.
   * Logger: Endpoint de diagnóstico para disparar eventos en Winston.


## Testing Funcional - pre entrega 6

La suite de tests funcionales automatizados está desarrollada con **Mocha**, **Chai** y **Supertest**, permitiendo validar la integración de los endpoints principales sin abrir un puerto activo.

### Herramientas utilizadas
- **Mocha**: Runner y estructura de las suites de prueba.
- **Chai**: Librería de aserciones (`expect`).
- **Supertest**: Simulación de peticiones HTTP a la instancia de Express.
- **cross-env**: Manejo multiplataforma (Windows/Linux/macOS) de variables de entorno.

### Módulos Cubiertos
- **Usuarios (`GET /api/users`)**: Obtención de listado de usuarios y manejo de rutas inexistentes (404).
- **Pedidos (`GET /api/orders`)**: Consulta de listado de pedidos y validación de subrutas 404.
- **Mocks (`POST /api/mocks/seed`)**: Inserción masiva de datos con parámetros válidos (200/201) e invalidados (400).
- **Logger (`GET /api/test-logger`)**: Verificación de emisión de logs en todos los niveles.
- **Swagger (`GET /api/docs/`)**: Disponibilidad de la interfaz de documentación.

### Variables de Entorno Requeridas
Se requiere configurar la variable de entorno `NODE_ENV=test`. En caso de usar una base de datos exclusiva para pruebas, podés definir `MONGO_URI_TEST` en el archivo `.env`.

### Cómo ejecutar los tests
Ejecutá el siguiente comando desde la raíz del proyecto:

# bash
npm test