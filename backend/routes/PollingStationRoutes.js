const express = require('express');
const { Constituency, PollingStation } = require('../models');
const router = express.Router();

// GET all polling stations by constituency name
router.get('/:constituencyName', async (req, res) => {
  try {
    const { constituencyName } = req.params;

    // Find constituency by name
    const constituency = await Constituency.findOne({ where: { name: constituencyName } });
    if (!constituency) {
      return res.status(404).json({ message: 'Constituency not found' });
    }

    const constituencyId = constituency.constituencyId;

    // Find polling stations by constituency ID
    const pollingStations = await PollingStation.findAll({ where: { constituencyId } });
    if (pollingStations.length === 0) {
      return res.status(404).json({ message: 'No polling stations found for this constituency.' });
    }

    res.status(200).json(pollingStations);
  } catch (error) {
    console.error('Error fetching polling stations:', error);
    res.status(500).json({ error: 'Failed to fetch polling stations' });
  }
});

module.exports = router;