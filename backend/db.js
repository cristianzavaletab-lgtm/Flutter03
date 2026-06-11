const dotenv = require('dotenv');
const path = require('path');
const { Pool } = require('pg');

dotenv.config({ path: path.join(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL;
if (process.env.NODE_ENV !== 'production') {
  console.log('Connecting to:', connectionString);
}

const pool = new Pool({
  connectionString,
  ssl: connectionString ? { rejectUnauthorized: false } : false,
  family: 4, // Force IPv4
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
