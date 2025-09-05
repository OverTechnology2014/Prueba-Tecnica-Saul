const { body, param, validationResult } = require('express-validator');

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array()
    });
  }
  next();
};

// Validaciones para crear ticket
const validateCreateTicket = [
  body('titulo')
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ min: 5 })
    .withMessage('El título debe tener al menos 5 caracteres'),
  
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .isLength({ min: 10 })
    .withMessage('La descripción debe tener al menos 10 caracteres'),
  
  body('prioridad')
    .isIn(['baja', 'media', 'alta'])
    .withMessage('La prioridad debe ser: baja, media o alta'),
  
  body('estado')
    .optional()
    .isIn(['abierto', 'en_progreso', 'cerrado'])
    .withMessage('El estado debe ser: abierto, en_progreso o cerrado'),
  
  handleValidationErrors
];

// Validaciones para actualizar ticket
const validateUpdateTicket = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo'),
  
  body('titulo')
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ min: 5 })
    .withMessage('El título debe tener al menos 5 caracteres'),
  
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .isLength({ min: 10 })
    .withMessage('La descripción debe tener al menos 10 caracteres'),
  
  body('prioridad')
    .isIn(['baja', 'media', 'alta'])
    .withMessage('La prioridad debe ser: baja, media o alta'),
  
  body('estado')
    .isIn(['abierto', 'en_progreso', 'cerrado'])
    .withMessage('El estado debe ser: abierto, en_progreso o cerrado'),
  
  handleValidationErrors
];

// Validaciones para actualizar estado
const validateUpdateStatus = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo'),
  
  body('estado')
    .isIn(['abierto', 'en_progreso', 'cerrado'])
    .withMessage('El estado debe ser: abierto, en_progreso o cerrado'),
  
  handleValidationErrors
];

// Validaciones para parámetros de ID
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero positivo'),
  
  handleValidationErrors
];

module.exports = {
  validateCreateTicket,
  validateUpdateTicket,
  validateUpdateStatus,
  validateId,
  handleValidationErrors
};
