const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticketController');
const {
  validateCreateTicket,
  validateUpdateTicket,
  validateUpdateStatus,
  validateId
} = require('../middleware/validation');

// POST /tickets - Crear un nuevo ticket
router.post('/', validateCreateTicket, TicketController.createTicket);

// GET /tickets - Obtener todos los tickets
router.get('/', TicketController.getAllTickets);

// GET /tickets/:id - Obtener un ticket por ID
router.get('/:id', validateId, TicketController.getTicketById);

// PUT /tickets/:id - Actualizar un ticket completo
router.put('/:id', validateUpdateTicket, TicketController.updateTicket);

// PATCH /tickets/:id/estado - Actualizar solo el estado de un ticket
router.patch('/:id/estado', validateUpdateStatus, TicketController.updateTicketStatus);

// DELETE /tickets/:id - Eliminar un ticket
router.delete('/:id', validateId, TicketController.deleteTicket);

module.exports = router;
