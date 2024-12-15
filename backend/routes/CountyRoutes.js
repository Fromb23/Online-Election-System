const express = require('express');
const { County } = require('../models'); 
const router = express.Router();

// GET all counties by name
router.get('/', async (req, res) => {
  try {
    const counties = await County.findAll();
    res.status(200).json(counties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch counties' });
  }
});

module.exports = router;
