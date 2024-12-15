const express = require('express');
const { County, Constituency } = require('../models');
const router = express.Router();

// GET all constituencies by county name
router.get('/:countyName', async (req, res) => {
  try {
    const { countyName } = req.params;

    // Fetch the county ID using the county name
    const county = await County.findOne({ where: { name: countyName } });

    if (!county) {
      return res.status(404).json({ message: 'County not found' });
    }

    const countyId = county.countyId;
    console.log(`Resolved County Name "${countyName}" to ID: ${countyId}`);

    // Fetch constituencies using the resolved county ID
    const constituencies = await Constituency.findAll({ where: { countyId } });

    if (constituencies.length === 0) {
      return res.status(404).json({ message: 'No constituencies found for this county.' });
    }

    res.status(200).json(constituencies);
  } catch (error) {
    console.error('Error fetching constituencies:', error);
    res.status(500).json({ error: 'Failed to fetch constituencies' });
  }
});

module.exports = router;