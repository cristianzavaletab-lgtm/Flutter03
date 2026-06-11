-- migration: create table empresas
CREATE TABLE IF NOT EXISTS empresas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  direccion TEXT,
  telefono VARCHAR(50),
  created_at TIMESTAMP DEFAULT now()
);
