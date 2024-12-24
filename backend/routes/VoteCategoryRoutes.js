const express = require('express');
const { VoteCategory } = require('../models');

const router = express.Router();

// Create a new vote category
router.post('/', async (req, res) => {
	try {
		const { name } = req.body;
		const newVoteCategory = await VoteCategory.create({ name });
		res.status(201).json(newVoteCategory);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get all vote categories
router.get('/', async (req, res) => {
	try {
		const voteCategories = await VoteCategory.findAll();
		res.status(200).json(voteCategories);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Get a vote category by id
router.get('/:id', async (req, res) => {
	try {
		const voteCategories = await VoteCategory.findByPk(req.params.id);
		if (!voteCategories) return res.status(401).json({ error: "Vote Category not found" });
		res.status(200).json(voteCategories);
	} catch (err) {
		res.status(500).json({ error: err.messge });
	}
});

// update a vote category
router.put('/:id', async (req, res) => {
	try {
		console.log("Request body:", req.body);
		const { id } = req.params;
		const { name } = req.body;
		const updatedName = await VoteCategory.findByPk(id);
		if (!updatedName) return res.status(401).json({ error: "Vote Category not found" });

		updatedName.name = name || updatedName.name;
		updatedName.save()
		res.status(200).json(updatedName);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// delete a vote category
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const delCategory = await VoteCategory.findByPk(id);
		if (!delCategory) return res.status(401).json({ error: "Vote Category not found" });
		delCategory.destroy()
		res.status(200).json({ message: "Vote Category deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
