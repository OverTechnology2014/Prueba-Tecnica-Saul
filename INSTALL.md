# Guía de Instalación Rápida

## Pasos para ejecutar el proyecto

### 1. Configurar Base de Datos
Ejecuta el script SQL en `scripts/setup-database.sql` en tu SQL Server para crear la base de datos y tabla.

### 2. Instalar dependencias del Backend
```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend
```bash
# Desde la raíz del proyecto
npm install
```

### 4. Ejecutar el proyecto

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
El backend estará en http://localhost:3001

**Terminal 2 - Frontend:**
```bash
npm start
```
El frontend estará en http://localhost:3000

### 5. Verificar funcionamiento
- Visita http://localhost:3000 para ver la aplicación
- Visita http://localhost:3001/api/health para verificar la API

## Estructura de carpetas creada:

```
ticket-instalacion/
├── backend/                 # API Node.js/Express con MVC
│   ├── config/db.js        # Configuración de base de datos
│   ├── controllers/        # Controladores (lógica de negocio)
│   ├── middleware/         # Validaciones y manejo de errores
│   ├── models/            # Modelos de datos
│   ├── routes/            # Rutas de la API
│   ├── tests/             # Tests unitarios
│   └── server.js          # Servidor principal
├── src/                   # Frontend React
│   ├── components/        # Componentes React
│   │   ├── TicketList.js  # Lista de tickets
│   │   ├── TicketCard.js  # Tarjeta individual
│   │   └── TicketForm.js  # Formulario crear/editar
│   └── services/api.js    # Servicios para API
├── scripts/               # Scripts de base de datos
└── README.md             # Documentación completa
```

## Funcionalidades implementadas:
✅ CRUD completo de tickets  
✅ Validaciones frontend y backend  
✅ Transiciones de estado controladas  
✅ Interfaz moderna y responsiva  
✅ Arquitectura MVC  
✅ Principios SOLID aplicados
