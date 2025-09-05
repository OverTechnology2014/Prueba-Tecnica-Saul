import React, { useState, useEffect } from 'react';
import { ticketService } from '../services/api';
import TicketCard from './TicketCard';
import './TicketList.css';

const TicketList = ({ onEditTicket, refreshTrigger }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    loadTickets();
  }, [refreshTrigger]);

  const loadTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ticketService.getAllTickets();
      setTickets(response.data || []);
    } catch (error) {
      setError('Error al cargar los tickets');
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTicket = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este ticket?')) {
      try {
        await ticketService.deleteTicket(id);
        setTickets(tickets.filter(ticket => ticket.Id !== id));
      } catch (error) {
        setError('Error al eliminar el ticket');
        console.error('Error deleting ticket:', error);
      }
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await ticketService.updateTicketStatus(id, newStatus);
      if (response.success) {
        setTickets(tickets.map(ticket => 
          ticket.Id === id ? { ...ticket, Estado: newStatus } : ticket
        ));
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error al actualizar el estado');
      console.error('Error updating status:', error);
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'todos') return true;
    return ticket.Estado === filter;
  });

  const getStatusCount = (status) => {
    return tickets.filter(ticket => ticket.Estado === status).length;
  };

  if (loading) {
    return (
      <div className="ticket-list">
        <div className="loading">Cargando tickets...</div>
      </div>
    );
  }

  return (
    <div className="ticket-list">
      <div className="ticket-list-header">
        <h2>Lista de Tickets ({filteredTickets.length})</h2>
        
        <div className="filter-buttons">
          <button 
            className={filter === 'todos' ? 'active' : ''}
            onClick={() => setFilter('todos')}
          >
            Todos ({tickets.length})
          </button>
          <button 
            className={filter === 'abierto' ? 'active' : ''}
            onClick={() => setFilter('abierto')}
          >
            Abiertos ({getStatusCount('abierto')})
          </button>
          <button 
            className={filter === 'en_progreso' ? 'active' : ''}
            onClick={() => setFilter('en_progreso')}
          >
            En Progreso ({getStatusCount('en_progreso')})
          </button>
          <button 
            className={filter === 'cerrado' ? 'active' : ''}
            onClick={() => setFilter('cerrado')}
          >
            Cerrados ({getStatusCount('cerrado')})
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="tickets-grid">
        {filteredTickets.length === 0 ? (
          <div className="no-tickets">
            {filter === 'todos' 
              ? 'No hay tickets disponibles. ¡Crea tu primer ticket!' 
              : `No hay tickets con estado "${filter}"`
            }
          </div>
        ) : (
          filteredTickets.map(ticket => (
            <TicketCard
              key={ticket.Id}
              ticket={ticket}
              onEdit={onEditTicket}
              onDelete={handleDeleteTicket}
              onUpdateStatus={handleUpdateStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TicketList;
