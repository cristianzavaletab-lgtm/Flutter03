const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM empresas ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('GET error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, direccion, ruc, rubro, esactivo } = req.body;
    if (!nombre || !ruc) {
      return res.status(400).json({ error: 'Nombre y RUC son obligatorios.' });
    }
    const result = await db.query(
      'INSERT INTO empresas (nombre, direccion, ruc, rubro, esactivo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, direccion, ruc, rubro, esactivo ?? true]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear empresa' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, ruc, rubro, esactivo } = req.body;
    if (!nombre || !ruc) {
      return res.status(400).json({ error: 'Nombre y RUC son obligatorios.' });
    }
    const result = await db.query(
      'UPDATE empresas SET nombre=$1, direccion=$2, ruc=$3, rubro=$4, esactivo=$5, updated_at=now() WHERE id=$6 RETURNING *',
      [nombre, direccion, ruc, rubro, esactivo ?? true, id]
    );
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Empresa no encontrada.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar empresa' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM empresas WHERE id=$1', [id]);
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar empresa' });
  }
});

module.exports = router;
