const { getConnection, sql } = require('../config/db');

class Ticket {
  constructor(data) {
    this.id = data.id;
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.prioridad = data.prioridad;
    this.estado = data.estado || 'abierto';
    this.fecha_creacion = data.fecha_creacion;
  }

  // Crear un nuevo ticket
  static async create(ticketData) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('titulo', sql.NVarChar(255), ticketData.titulo)
        .input('descripcion', sql.NVarChar(sql.MAX), ticketData.descripcion)
        .input('prioridad', sql.NVarChar(10), ticketData.prioridad)
        .input('estado', sql.NVarChar(20), ticketData.estado || 'abierto')
        .query(`
          INSERT INTO Tickets (Titulo, Descripcion, Prioridad, Estado)
          OUTPUT INSERTED.*
          VALUES (@titulo, @descripcion, @prioridad, @estado)
        `);
      
      return new Ticket(result.recordset[0]);
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los tickets
  static async findAll() {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM Tickets ORDER BY Fecha_Creacion DESC');
      return result.recordset.map(ticket => new Ticket(ticket));
    } catch (error) {
      throw error;
    }
  }

  // Obtener un ticket por ID
  static async findById(id) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Tickets WHERE Id = @id');
      
      if (result.recordset.length === 0) {
        return null;
      }
      
      return new Ticket(result.recordset[0]);
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un ticket
  static async update(id, ticketData) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('titulo', sql.NVarChar(255), ticketData.titulo)
        .input('descripcion', sql.NVarChar(sql.MAX), ticketData.descripcion)
        .input('prioridad', sql.NVarChar(10), ticketData.prioridad)
        .input('estado', sql.NVarChar(20), ticketData.estado)
        .query(`
          UPDATE Tickets 
          SET Titulo = @titulo, Descripcion = @descripcion, Prioridad = @prioridad, Estado = @estado
          OUTPUT INSERTED.*
          WHERE Id = @id
        `);
      
      if (result.recordset.length === 0) {
        return null;
      }
      
      return new Ticket(result.recordset[0]);
    } catch (error) {
      throw error;
    }
  }

  // Actualizar solo el estado de un ticket
  static async updateStatus(id, newStatus) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .input('estado', sql.NVarChar(20), newStatus)
        .query(`
          UPDATE Tickets 
          SET Estado = @estado
          OUTPUT INSERTED.*
          WHERE Id = @id
        `);
      
      if (result.recordset.length === 0) {
        return null;
      }
      
      return new Ticket(result.recordset[0]);
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un ticket
  static async delete(id) {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Tickets WHERE Id = @id');
      
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    }
  }

  // Validar transición de estado
  static validateStateTransition(currentState, newState) {
    const validTransitions = {
      'abierto': ['en_progreso'],
      'en_progreso': ['cerrado'],
      'cerrado': []
    };

    return validTransitions[currentState]?.includes(newState) || false;
  }
}

module.exports = Ticket;
