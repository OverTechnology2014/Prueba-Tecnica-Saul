import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Configurar axios con base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Servicios para tickets
export const ticketService = {
  // Obtener todos los tickets
  getAllTickets: async () => {
    try {
      const response = await api.get('/tickets');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un ticket por ID
  getTicketById: async (id) => {
    try {
      const response = await api.get(`/tickets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo ticket
  createTicket: async (ticketData) => {
    try {
      const response = await api.post('/tickets', ticketData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un ticket completo
  updateTicket: async (id, ticketData) => {
    try {
      const response = await api.put(`/tickets/${id}`, ticketData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar solo el estado de un ticket
  updateTicketStatus: async (id, estado) => {
    try {
      const response = await api.patch(`/tickets/${id}/estado`, { estado });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un ticket
  deleteTicket: async (id) => {
    try {
      const response = await api.delete(`/tickets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
