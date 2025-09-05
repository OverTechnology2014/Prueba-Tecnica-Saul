// Middleware global para manejo de errores
const errorHandler = (error, req, res, next) => {
  console.error('Error no manejado:', error);

  // Error de validación de base de datos
  if (error.code === 'EREQUEST') {
    return res.status(400).json({
      success: false,
      message: 'Error en la consulta a la base de datos',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error de base de datos'
    });
  }

  // Error de conexión a la base de datos
  if (error.code === 'ELOGIN' || error.code === 'ESOCKET') {
    return res.status(503).json({
      success: false,
      message: 'Error de conexión a la base de datos',
      error: 'Servicio temporalmente no disponible'
    });
  }

  // Error de validación
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      error: error.message
    });
  }

  // Error por defecto
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
  });
};

module.exports = errorHandler;
