import React, { useState } from 'react';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCreateNew = () => {
    setTicketToEdit(null);
    setShowForm(true);
  };

  const handleEditTicket = (ticket) => {
    setTicketToEdit(ticket);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setTicketToEdit(null);
    setRefreshTrigger(prev => prev + 1); // Trigger refresh
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setTicketToEdit(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>Sistema de Gestión de Tickets</h1>
          <button 
            className="btn btn-primary"
            onClick={handleCreateNew}
          >
            + Nuevo Ticket
          </button>
        </div>
      </header>

      <main className="App-main">
        <TicketList 
          onEditTicket={handleEditTicket}
          refreshTrigger={refreshTrigger}
        />
      </main>

      {showForm && (
        <TicketForm
          ticketToEdit={ticketToEdit}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}
    </div>
  );
}

export default App;
