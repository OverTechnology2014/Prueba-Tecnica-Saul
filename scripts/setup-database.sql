-- Script para configurar la base de datos del sistema de tickets
-- Ejecutar este script en SQL Server Management Studio o Azure Data Studio

-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ticket')
BEGIN
    CREATE DATABASE ticket;
END
GO

-- Usar la base de datos
USE ticket;
GO

-- Crear la tabla Tickets si no existe
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Tickets' AND xtype='U')
BEGIN
    CREATE TABLE Tickets (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Titulo NVARCHAR(255) NOT NULL,
        Descripcion NVARCHAR(MAX) NOT NULL,
        Prioridad NVARCHAR(10) NOT NULL CHECK (Prioridad IN ('baja', 'media', 'alta')),
        Estado NVARCHAR(20) NOT NULL CHECK (Estado IN ('abierto', 'en_progreso', 'cerrado')) DEFAULT 'abierto',
        Fecha_Creacion DATETIME DEFAULT GETDATE() NOT NULL
    );
END
GO

-- Insertar datos de ejemplo (opcional)
IF NOT EXISTS (SELECT * FROM Tickets)
BEGIN
    INSERT INTO Tickets (Titulo, Descripcion, Prioridad, Estado) VALUES
    ('Error en el sistema de login', 'Los usuarios no pueden iniciar sesión correctamente desde la página principal', 'alta', 'abierto'),
    ('Actualizar documentación', 'La documentación de la API necesita ser actualizada con los nuevos endpoints', 'media', 'abierto'),
    ('Optimizar consultas de base de datos', 'Las consultas de reportes están tardando demasiado tiempo en ejecutarse', 'media', 'en_progreso'),
    ('Bug en el formulario de contacto', 'El formulario de contacto no está enviando los emails correctamente', 'alta', 'abierto'),
    ('Implementar cache en Redis', 'Agregar sistema de cache para mejorar el rendimiento de la aplicación', 'baja', 'cerrado');
END
GO

-- Verificar que la tabla se creó correctamente
SELECT 'Tabla Tickets creada exitosamente' AS Mensaje;
SELECT COUNT(*) AS 'Total de tickets' FROM Tickets;
GO
