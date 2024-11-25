const express = require('express');
const { Candidate } = require('../candidate');

router = express.Router();

// Create a new Candidate
router.post('/',  async (req, res) => {
	try {
		const { candidateId, party, voted, voteCategoryId } = req.body;
		const newCandidate = await Candidate.create({ candidateId, party, voted, voteCategoryId });
		res.status(201).json(newCandidate);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});
