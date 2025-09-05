import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket, onEdit, onDelete, onUpdateStatus }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityClass = (prioridad) => {
    if (!prioridad) return 'priority-medium';
    switch (prioridad.toLowerCase()) {
      case 'alta': return 'priority-high';
      case 'media': return 'priority-medium';
      case 'baja': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getStatusClass = (estado) => {
    if (!estado) return 'status-open';
    switch (estado.toLowerCase()) {
      case 'abierto': return 'status-open';
      case 'en_progreso': return 'status-progress';
      case 'cerrado': return 'status-closed';
      default: return 'status-open';
    }
  };

  const getNextStatus = (currentStatus) => {
    if (!currentStatus) return null;
    switch (currentStatus.toLowerCase()) {
      case 'abierto': return 'en_progreso';
      case 'en_progreso': return 'cerrado';
      default: return null;
    }
  };

  const getStatusLabel = (status) => {
    if (!status) return 'Abierto';
    switch (status.toLowerCase()) {
      case 'abierto': return 'Abierto';
      case 'en_progreso': return 'En Progreso';
      case 'cerrado': return 'Cerrado';
      default: return status;
    }
  };

  const nextStatus = getNextStatus(ticket.Estado);

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className={`priority-badge ${getPriorityClass(ticket.Prioridad)}`}>
          {ticket.Prioridad ? ticket.Prioridad.toUpperCase() : 'MEDIA'}
        </div>
        <div className={`status-badge ${getStatusClass(ticket.Estado)}`}>
          {getStatusLabel(ticket.Estado)}
        </div>
      </div>

      <div className="ticket-content">
        <h3 className="ticket-title">{ticket.Titulo || 'Sin título'}</h3>
        <p className="ticket-description">{ticket.Descripcion || 'Sin descripción'}</p>
        <p className="ticket-date">
          Creado: {ticket.Fecha_Creacion ? formatDate(ticket.Fecha_Creacion) : 'Fecha no disponible'}
        </p>
      </div>

      <div className="ticket-actions">
        <button 
          className="btn btn-edit"
          onClick={() => onEdit(ticket)}
        >
          Editar
        </button>
        
        {nextStatus && (
          <button 
            className="btn btn-status"
            onClick={() => onUpdateStatus(ticket.Id, nextStatus)}
          >
            → {getStatusLabel(nextStatus)}
          </button>
        )}
        
        <button 
          className="btn btn-delete"
          onClick={() => onDelete(ticket.Id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
