const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
if(!connectionString){
  console.error('DATABASE_URL no está definida en .env');
  process.exit(1);
}

const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

async function run() {
  try {
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));
    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      console.log('Ejecutando:', file);
      await pool.query(sql);
    }
    console.log('Migraciones ejecutadas correctamente');
    await pool.end();
  } catch (err) {
    console.error('Error en migraciones:', err);
    process.exit(1);
  }
}

run();
