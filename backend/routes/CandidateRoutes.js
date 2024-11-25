const express = require('express');
const { Candidate } = require('../models');

router = express.Router();

// Create a new Candidate
router.post('/', async (req, res) => {
    try {
        const { candidateName, PartyId, voted, voteCategoryId } = req.body;
        const newCandidate = await Candidate.create({ candidateName, PartyId, voted, voteCategoryId });
        res.status(201).json(newCandidate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
