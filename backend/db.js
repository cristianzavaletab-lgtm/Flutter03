const dotenv = require('dotenv');
const path = require('path');
const { Pool } = require('pg');

dotenv.config({ path: path.join(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL;

function createPoolFromConnectionString(connStr) {
  if (!connStr) return new Pool();
  try {
    const url = new URL(connStr);
    const config = {
      host: url.hostname,
      port: Number(url.port) || 5432,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname ? url.pathname.slice(1) : undefined,
      ssl: { rejectUnauthorized: false },
      family: 4, // Force IPv4
    };
    if (process.env.NODE_ENV !== 'production') {
      console.log('DB config:', {
        host: config.host,
        port: config.port,
        database: config.database,
      });
    }
    return new Pool(config);
  } catch (err) {
    console.error('Invalid DATABASE_URL, falling back to default Pool', err.message);
    return new Pool({ connectionString: connStr, ssl: connStr ? { rejectUnauthorized: false } : false, family: 4 });
  }
}

const pool = createPoolFromConnectionString(connectionString);

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
