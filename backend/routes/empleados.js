const express = require('express');
const db = require('../db');
const router = express.Router({ mergeParams: true });

// Obtener todos los empleados de una empresa
router.get('/', async (req, res) => {
  try {
    const { empresaId } = req.params;
    const result = await db.query('SELECT * FROM empleados WHERE empresa_id = $1 ORDER BY id', [empresaId]);
    res.json(result.rows);
  } catch (err) {
    console.error('GET empleados error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Crear un empleado para una empresa
router.post('/', async (req, res) => {
  try {
    const { empresaId } = req.params;
    const { nombre, puesto } = req.body;
    if (!nombre || !puesto) {
      return res.status(400).json({ error: 'Nombre y Puesto son obligatorios.' });
    }
    const result = await db.query(
      'INSERT INTO empleados (nombre, puesto, empresa_id) VALUES ($1, $2, $3) RETURNING *',
      [nombre, puesto, empresaId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear empleado' });
  }
});

// Eliminar un empleado
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM empleados WHERE id=$1', [id]);
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
});

module.exports = router;
