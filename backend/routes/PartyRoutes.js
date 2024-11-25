const express = require('express');
const { Party } = require('../models');

const router = express.Router();

// Create a new party
router.post('/', async (req, res) => {
	try {
		const { partyName } = req.body;
		const newParty = await Party.create({ partyName });
		res.status(201).json(newParty);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get a party(ies)
router.get('/', async (req, res) => {
	try {
		const parties = await Party.findAll();
		res.status(200).json(parties);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get('/:partyId', async (req, res) => {
	try {
		const { partyId } = req.params;
		const getName = await Party.findByPk(partyId);
		if (!getName) return res.status(401).json({ error: "Party not found" });
		res.status(200).json(getName);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Update a party
router.put('/:partyId', async (req, res) => {
	try {
		const { partyId } = req.params;
		const { partyName } = req.body;
		const newParty = await Party.findByPk(partyId);
		if (!newParty) return res.status(401).json({ error: "Party not found" });
		newParty.partyName = partyName || voter.partyName;
		newParty.save();
		res.status(200).json(newParty);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Delete a party
router.delete('/:partyId', async (req, res) => {
	try {
		const { partyId } = req.params;
		const delName = await Party.findByPk(partyId);
		if (!delName) return res.status(401).json({ error: "party not found" });
		delName.destroy();
		res.status(200).json({ message: "Party deleted successfully..." });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
