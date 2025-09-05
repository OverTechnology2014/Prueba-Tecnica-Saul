const request = require('supertest');
const app = require('../server');

describe('Ticket API Tests', () => {
  let createdTicketId;

  // Test para health check
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('API funcionando correctamente');
    });
  });

  // Test para crear ticket
  describe('POST /api/tickets', () => {
    it('should create a new ticket with valid data', async () => {
      const ticketData = {
        titulo: 'Test Ticket Title',
        descripcion: 'This is a test ticket description with more than 10 characters',
        prioridad: 'media'
      };

      const response = await request(app)
        .post('/api/tickets')
        .send(ticketData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.Titulo).toBe(ticketData.titulo);
      expect(response.body.data.Estado).toBe('abierto');
      
      createdTicketId = response.body.data.Id;
    });

    it('should return validation error for invalid data', async () => {
      const invalidData = {
        titulo: 'Test', // Menos de 5 caracteres
        descripcion: 'Short', // Menos de 10 caracteres
        prioridad: 'invalid'
      };

      const response = await request(app)
        .post('/api/tickets')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  // Test para obtener todos los tickets
  describe('GET /api/tickets', () => {
    it('should return all tickets', async () => {
      const response = await request(app)
        .get('/api/tickets')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  // Test para obtener ticket por ID
  describe('GET /api/tickets/:id', () => {
    it('should return a specific ticket', async () => {
      if (!createdTicketId) return;

      const response = await request(app)
        .get(`/api/tickets/${createdTicketId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.Id).toBe(createdTicketId);
    });

    it('should return 404 for non-existent ticket', async () => {
      const response = await request(app)
        .get('/api/tickets/99999')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  // Test para actualizar estado
  describe('PATCH /api/tickets/:id/estado', () => {
    it('should update ticket status with valid transition', async () => {
      if (!createdTicketId) return;

      const response = await request(app)
        .patch(`/api/tickets/${createdTicketId}/estado`)
        .send({ estado: 'en_progreso' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.Estado).toBe('en_progreso');
    });

    it('should reject invalid state transition', async () => {
      if (!createdTicketId) return;

      const response = await request(app)
        .patch(`/api/tickets/${createdTicketId}/estado`)
        .send({ estado: 'abierto' })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  // Test para eliminar ticket
  describe('DELETE /api/tickets/:id', () => {
    it('should delete a ticket', async () => {
      if (!createdTicketId) return;

      const response = await request(app)
        .delete(`/api/tickets/${createdTicketId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });
});
