const express = require('express');
const router = express.Router();
const pool = require('../db');
const { body, query, validationResult } = require('express-validator');

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

router.post(
  '/addSchool',
  [
    body('name').isString().trim().notEmpty(),
    body('address').isString().trim().notEmpty(),
    body('latitude').isFloat({ min: -90, max: 90 }),
    body('longitude').isFloat({ min: -180, max: 180 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

    const { name, address, latitude, longitude } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
        [name, address, latitude, longitude]
      );
      const [school] = await pool.query('SELECT * FROM schools WHERE id = ?', [result.insertId]);
      res.status(201).json({ ok: true, school: school[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, message: 'Database error', error: err.message });
    }
  }
);

router.get(
  '/listSchools',
  [
    query('latitude').isFloat({ min: -90, max: 90 }),
    query('longitude').isFloat({ min: -180, max: 180 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });

    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    try {
      const [schools] = await pool.query('SELECT * FROM schools');
      const withDistance = schools.map(s => ({
        ...s,
        distance_km: parseFloat(haversineDistance(userLat, userLon, s.latitude, s.longitude).toFixed(4))
      }));
      withDistance.sort((a, b) => a.distance_km - b.distance_km);
      res.json({ ok: true, count: withDistance.length, schools: withDistance });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, message: 'Database error', error: err.message });
    }
  }
);

module.exports = router;
