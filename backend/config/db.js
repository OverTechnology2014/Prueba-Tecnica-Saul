const sql = require('mssql');

const config = {
  server: 'localhost',
  port: 1433,
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'saul'
    }
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
    database: 'ticket'
  }
};

async function getConnection() {
  try {
    const pool = await sql.connect(config);
    console.log('Conexión exitosa a la base de datos');
    return pool;
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
}

module.exports = {
  sql,
  getConnection
};
