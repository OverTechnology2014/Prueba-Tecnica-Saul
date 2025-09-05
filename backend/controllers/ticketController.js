const Ticket = require('../models/Ticket');

class TicketController {
  // Crear un nuevo ticket
  static async createTicket(req, res) {
    try {
      const ticketData = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        prioridad: req.body.prioridad,
        estado: req.body.estado || 'abierto'
      };

      const newTicket = await Ticket.create(ticketData);
      
      res.status(201).json({
        success: true,
        message: 'Ticket creado exitosamente',
        data: newTicket
      });
    } catch (error) {
      console.error('Error al crear ticket:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al crear el ticket',
        error: error.message
      });
    }
  }

  // Obtener todos los tickets
  static async getAllTickets(req, res) {
    try {
      const tickets = await Ticket.findAll();
      
      res.status(200).json({
        success: true,
        message: 'Tickets obtenidos exitosamente',
        data: tickets,
        count: tickets.length
      });
    } catch (error) {
      console.error('Error al obtener tickets:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al obtener los tickets',
        error: error.message
      });
    }
  }

  // Obtener un ticket por ID
  static async getTicketById(req, res) {
    try {
      const { id } = req.params;
      const ticket = await Ticket.findById(parseInt(id));
      
      if (!ticket) {
        return res.status(404).json({
          success: false,
          message: 'Ticket no encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Ticket obtenido exitosamente',
        data: ticket
      });
    } catch (error) {
      console.error('Error al obtener ticket:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al obtener el ticket',
        error: error.message
      });
    }
  }

  // Actualizar un ticket completo
  static async updateTicket(req, res) {
    try {
      const { id } = req.params;
      const ticketData = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        prioridad: req.body.prioridad,
        estado: req.body.estado
      };

      const updatedTicket = await Ticket.update(parseInt(id), ticketData);
      
      if (!updatedTicket) {
        return res.status(404).json({
          success: false,
          message: 'Ticket no encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Ticket actualizado exitosamente',
        data: updatedTicket
      });
    } catch (error) {
      console.error('Error al actualizar ticket:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al actualizar el ticket',
        error: error.message
      });
    }
  }

  // Actualizar solo el estado de un ticket
  static async updateTicketStatus(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;

      // Verificar que el ticket existe y obtener el estado actual
      const currentTicket = await Ticket.findById(parseInt(id));
      if (!currentTicket) {
        return res.status(404).json({
          success: false,
          message: 'Ticket no encontrado'
        });
      }

      // Validar la transición de estado
      if (!Ticket.validateStateTransition(currentTicket.estado, estado)) {
        return res.status(400).json({
          success: false,
          message: `Transición de estado inválida. No se puede cambiar de '${currentTicket.estado}' a '${estado}'`,
          validTransitions: {
            'abierto': ['en_progreso'],
            'en_progreso': ['cerrado'],
            'cerrado': []
          }
        });
      }

      const updatedTicket = await Ticket.updateStatus(parseInt(id), estado);
      
      res.status(200).json({
        success: true,
        message: 'Estado del ticket actualizado exitosamente',
        data: updatedTicket
      });
    } catch (error) {
      console.error('Error al actualizar estado del ticket:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al actualizar el estado del ticket',
        error: error.message
      });
    }
  }

  // Eliminar un ticket
  static async deleteTicket(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await Ticket.delete(parseInt(id));
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Ticket no encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Ticket eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error al eliminar ticket:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al eliminar el ticket',
        error: error.message
      });
    }
  }
}

module.exports = TicketController;
