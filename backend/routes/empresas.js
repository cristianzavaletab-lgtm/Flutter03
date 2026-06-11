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
    const { nombre, direccion, telefono } = req.body;
    const result = await db.query(
      'INSERT INTO empresas (nombre, direccion, telefono) VALUES ($1, $2, $3) RETURNING *',
      [nombre, direccion, telefono]
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
    const { nombre, direccion, telefono } = req.body;
    const result = await db.query(
      'UPDATE empresas SET nombre=$1, direccion=$2, telefono=$3 WHERE id=$4 RETURNING *',
      [nombre, direccion, telefono, id]
    );
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
