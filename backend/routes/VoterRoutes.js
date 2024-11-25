const express = require('express');
const { Voter } = require('../models');

const router = express.Router();

// create a new voter
router.post('/', async (req, res) => {
	try {
		const { voterId, fullName, constituency, voted } = req.body;
		const newVoter = await Voter.create({ voterId, fullName, constituency, voted });
		res.status(201).json(newVoter);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get all voters
router.get('/', async (req, res) => {
	try {
		const voters = await Voter.findAll();
		res.status(200).json(voters);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get voter by id
router.get('/:voterId', async (req, res) => {
	try {
		const { voterId } = req.params;
		const voter = await Voter.findByPk(voterId);
		if (!voter) return res.status(401).json({ error: 'Voter not found' });
		res.status(200).json(voter);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});


// update a voter
router.put('/:voterId', async (req, res) => {
	try {
		const { voterId } = req.params;
		const { fullName, constituency, voted } = req.body;
		const voter = await Voter.findByPk(voterId);
		if (!voter) return res.status(401).json({ error: 'Voter not found' });

		voter.fullName = fullName || voter.fullName;
		voter.constituency = constituency || voter.constituency;
		voter.voted = voted || voter.voted;
		voter.save();

		res.status(200).json(voter)
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Delete voter
router.delete('/:voterId', async (req, res) => {
	try {
		const { voterId} = req.params;
		const voter = await Voter.findByPk(voterId);
		if (!voter) return res.status(401).json({ error: 'Voter not found!' });

		voter.destroy();
		res.status(200).json({ message: 'Voter deleted successfully...' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
