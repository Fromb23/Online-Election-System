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

// Get candidates
router.get('/', async (req, res) => {
	try {
		const candidates = await Candidate.findAll();
		res.status(200).json(candidates);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get a candidate
router.get('/:candidateId', async (req, res) => {
	try {
		const { candidateId } = req.params;
		const candidate = Candidate.findByPk(candidateId);
		if (!candidate) return res.status(401).json({ error: "Candidate not found" });
		res.status(200).json(candidate);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Update a candidate
router.put('/:candidateId', async (req, res) => {
	try {
		const { candidateId } = req.params;
		const candidate = await Candidate.findByPk(candidateId);
		if (!candidate) return res.status(401).json({ error: "Candidate not found" });
		const { candidateName, partyId, voted, voteCategoryId } = req.body;

		if (candidateName !== undefined) candidate.candidateName = candidateName;
		if (candidate.partyId !== undefined)  candidate.partyId = partyId;
		if (candidate.voted !== undefined)  candidate.voted = voted;
		if (candidate.voteCategoryId !== undefined) candidate.voteCategory = voteCategoryId;

		candidate.save();
		res.status(200).json(candidate);

	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Delete a candidate
router.delete('/:candidateId', async (req, res) => {
	try {
		const { candidateId } = req.params;
		const candidate = await Candidate.findByPk(candidateId);
		if (!candidate) return res.status(401).json({ error: "Candidate not found" });
		candidate.destroy();
		res.status(200).json({ "message": "Candidate deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
