# Sistema de Gestión de Tickets

Un sistema completo de gestión de incidencias (tickets) desarrollado con arquitectura MVC, utilizando React para el frontend y Node.js/Express para el backend, con base de datos SQL Server.

## 📋 Características

- **CRUD completo de tickets**: Crear, leer, actualizar y eliminar tickets
- **Gestión de estados**: Transiciones controladas (abierto → en_progreso → cerrado)
- **Validaciones robustas**: Tanto en frontend como backend
- **Interfaz moderna**: UI responsiva con React
- **API RESTful**: Endpoints bien estructurados
- **Arquitectura MVC**: Código organizado y mantenible

## 🏗️ Arquitectura del Proyecto

```
ticket-instalacion/
├── backend/                 # API Node.js/Express
│   ├── config/             # Configuración de base de datos
│   ├── controllers/        # Lógica de negocio
│   ├── middleware/         # Validaciones y middleware
│   ├── models/            # Modelos de datos
│   ├── routes/            # Definición de rutas
│   ├── package.json       # Dependencias del backend
│   └── server.js          # Servidor principal
├── src/                   # Frontend React
│   ├── components/        # Componentes React
│   ├── services/         # Servicios API
│   ├── App.js           # Componente principal
│   └── ...
├── public/              # Archivos estáticos
└── package.json        # Dependencias del frontend
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (v14 o superior)
- SQL Server
- npm o yarn

### 1. Configurar la Base de Datos

Ejecuta el siguiente script SQL en tu servidor SQL Server:

```sql
CREATE DATABASE ticket;
GO

USE ticket;
GO

CREATE TABLE Tickets (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Titulo NVARCHAR(255) NOT NULL,
    Descripcion NVARCHAR(MAX) NOT NULL,
    Prioridad NVARCHAR(10) NOT NULL CHECK (Prioridad IN ('baja', 'media', 'alta')),
    Estado NVARCHAR(20) NOT NULL CHECK (Estado IN ('abierto', 'en_progreso', 'cerrado')) DEFAULT 'abierto',
    Fecha_Creacion DATETIME DEFAULT GETDATE() NOT NULL
);
```

### 2. Configurar el Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El servidor backend estará disponible en `http://localhost:3001`

### 3. Configurar el Frontend

```bash
# Desde el directorio raíz del proyecto
npm install

# Iniciar la aplicación React
npm start
```

La aplicación frontend estará disponible en `http://localhost:3000`

## 📡 API Endpoints

### Base URL: `http://localhost:3001/api`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/tickets` | Obtener todos los tickets |
| GET | `/tickets/:id` | Obtener un ticket por ID |
| POST | `/tickets` | Crear un nuevo ticket |
| PUT | `/tickets/:id` | Actualizar un ticket completo |
| PATCH | `/tickets/:id/estado` | Actualizar solo el estado |
| DELETE | `/tickets/:id` | Eliminar un ticket |
| GET | `/health` | Health check de la API |

### Ejemplos de Uso

#### Crear un ticket
```bash
curl -X POST http://localhost:3001/api/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Error en el sistema de login",
    "descripcion": "Los usuarios no pueden iniciar sesión correctamente",
    "prioridad": "alta"
  }'
```

#### Actualizar estado de un ticket
```bash
curl -X PATCH http://localhost:3001/api/tickets/1/estado \
  -H "Content-Type: application/json" \
  -d '{"estado": "en_progreso"}'
```

## 🎯 Funcionalidades de la Interfaz

### Lista de Tickets
- Visualización en tarjetas con información clave
- Filtros por estado (Todos, Abiertos, En Progreso, Cerrados)
- Contadores por estado
- Acciones rápidas (Editar, Cambiar Estado, Eliminar)

### Formulario de Tickets
- Validación en tiempo real
- Campos requeridos con mensajes de error claros
- Modal overlay para mejor UX
- Soporte para crear y editar tickets

### Gestión de Estados
- Transiciones controladas: abierto → en_progreso → cerrado
- Botones dinámicos según el estado actual
- Validación de transiciones en backend

## ✅ Validaciones Implementadas

### Frontend (React)
- Título: mínimo 5 caracteres, requerido
- Descripción: mínimo 10 caracteres, requerido
- Prioridad: valores permitidos (baja, media, alta)
- Estado: valores permitidos (abierto, en_progreso, cerrado)

### Backend (Express + express-validator)
- Validaciones idénticas al frontend
- Sanitización de datos
- Mensajes de error descriptivos
- Validación de transiciones de estado

## 🛡️ Principios SOLID Aplicados

### Single Responsibility Principle (SRP)
- **Controladores**: Cada método maneja una sola operación
- **Componentes React**: Cada componente tiene una responsabilidad específica
- **Servicios**: Separación clara entre lógica de API y componentes

### Open/Closed Principle (OCP)
- **Middleware de validación**: Extensible para nuevos campos sin modificar código existente
- **Componentes React**: Uso de props para personalización

### Liskov Substitution Principle (LSP)
- **Modelos**: Métodos estáticos que pueden ser extendidos
- **Componentes**: Props tipadas y comportamiento consistente

### Interface Segregation Principle (ISP)
- **API**: Endpoints específicos para cada operación
- **Props de componentes**: Solo las propiedades necesarias

### Dependency Inversion Principle (DIP)
- **Inyección de dependencias**: Configuración de base de datos separada
- **Servicios API**: Abstracción de llamadas HTTP

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
npm test
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno (Opcional)
Crea un archivo `.env` en el directorio backend:

```env
PORT=3001
DB_SERVER=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=saul
DB_NAME=ticket
```

### Scripts Disponibles

#### Backend
- `npm start`: Iniciar servidor en producción
- `npm run dev`: Iniciar servidor con nodemon
- `npm test`: Ejecutar tests

#### Frontend
- `npm start`: Iniciar aplicación en desarrollo
- `npm run build`: Construir para producción
- `npm test`: Ejecutar tests
- `npm run eject`: Exponer configuración de webpack

## 🚀 Despliegue

### Backend
1. Configurar variables de entorno de producción
2. Instalar dependencias: `npm install --production`
3. Iniciar servidor: `npm start`

### Frontend
1. Construir aplicación: `npm run build`
2. Servir archivos estáticos desde el directorio `build/`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Desarrollado como parte de una prueba técnica para demostrar habilidades en:
- Arquitectura MVC
- Desarrollo Full Stack
- Principios SOLID
- Validaciones robustas
- UI/UX moderno
