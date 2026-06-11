const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config({ path: 'D:\\Descargas\\crud_withnodejs\\backend\\.env' });

const connectionString = process.env.DATABASE_URL;
console.log('Connecting to:', connectionString);

const pool = new Pool({
  connectionString,
  ssl: connectionString ? { rejectUnauthorized: false } : false,
  family: 4, // Force IPv4
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
