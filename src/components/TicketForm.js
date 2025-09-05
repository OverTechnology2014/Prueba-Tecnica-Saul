import React, { useState, useEffect } from 'react';
import { ticketService } from '../services/api';
import './TicketForm.css';

const TicketForm = ({ ticketToEdit, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 'media',
    estado: 'abierto'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticketToEdit) {
      setFormData({
        titulo: ticketToEdit.Titulo || '',
        descripcion: ticketToEdit.Descripcion || '',
        prioridad: ticketToEdit.Prioridad || 'media',
        estado: ticketToEdit.Estado || 'abierto'
      });
    }
  }, [ticketToEdit]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido';
    } else if (formData.titulo.trim().length < 5) {
      newErrors.titulo = 'El título debe tener al menos 5 caracteres';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    } else if (formData.descripcion.trim().length < 10) {
      newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres';
    }

    if (!['baja', 'media', 'alta'].includes(formData.prioridad)) {
      newErrors.prioridad = 'Selecciona una prioridad válida';
    }

    if (!['abierto', 'en_progreso', 'cerrado'].includes(formData.estado)) {
      newErrors.estado = 'Selecciona un estado válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (ticketToEdit) {
        await ticketService.updateTicket(ticketToEdit.Id, formData);
      } else {
        await ticketService.createTicket(formData);
      }
      
      onSuccess();
      resetForm();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al procesar el ticket';
      setErrors({ submit: errorMessage });
      
      // Si hay errores de validación específicos del servidor
      if (error.response?.data?.errors) {
        const serverErrors = {};
        error.response.data.errors.forEach(err => {
          serverErrors[err.path] = err.msg;
        });
        setErrors(prev => ({ ...prev, ...serverErrors }));
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      prioridad: 'media',
      estado: 'abierto'
    });
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <div className="ticket-form-container">
      <div className="ticket-form">
        <h2>{ticketToEdit ? 'Editar Ticket' : 'Crear Nuevo Ticket'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título *</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className={errors.titulo ? 'error' : ''}
              placeholder="Ingresa el título del ticket (mínimo 5 caracteres)"
            />
            {errors.titulo && <span className="error-text">{errors.titulo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={errors.descripcion ? 'error' : ''}
              placeholder="Describe el problema o solicitud (mínimo 10 caracteres)"
              rows="4"
            />
            {errors.descripcion && <span className="error-text">{errors.descripcion}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prioridad">Prioridad *</label>
              <select
                id="prioridad"
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                className={errors.prioridad ? 'error' : ''}
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
              {errors.prioridad && <span className="error-text">{errors.prioridad}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="estado">Estado *</label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className={errors.estado ? 'error' : ''}
                disabled={!ticketToEdit} // Solo editable al actualizar
              >
                <option value="abierto">Abierto</option>
                <option value="en_progreso">En Progreso</option>
                <option value="cerrado">Cerrado</option>
              </select>
              {errors.estado && <span className="error-text">{errors.estado}</span>}
            </div>
          </div>

          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Procesando...' : (ticketToEdit ? 'Actualizar' : 'Crear Ticket')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
