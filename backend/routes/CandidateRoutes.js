const express = require('express');
const { VoteCategory, Party,Candidate } = require('../models');

router = express.Router();

// Create a new Candidate
router.post('/', async (req, res) => {
    try {
		console.log("Request body backend: ", req.body);
        const { candidateName, partyName, voteCategoryId } = req.body;

        // Fetch the partyId using partyName
        const party = await Party.findOne({ where: { partyName: partyName} });
        if (!party) {
			console.error("Party not found: ", partyName);
            return res.status(404).json({ error: "Party not found" });
        }
        const partyId = party.partyId;

        const categoryId = voteCategoryId;

        // Create the candidate with the correct IDs
        const newCandidate = await Candidate.create({
            candidateName,
            PartyId: partyId,
            voteCategoryId: categoryId,
            voted: false,
        });

        res.status(201).json(newCandidate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Get candidates
router.get('/', async (req, res) => {
	try {
	  console.log("Request body: ", req.body);
  
	  // Fetch candidates with related party and vote category names
	  const candidates = await Candidate.findAll({
		include: [
		  {
			model: Party,
			as: 'party',
			attributes: ['partyName'], 
		  },
		  {
			model: VoteCategory,
			as: 'voteCategory',
			attributes: ['name'],
		  },
		],
	  });
  
	  // Map response to include relevant data only
	  const response = candidates.map((candidate) => ({
		candidateId: candidate.candidateId,
		candidateName: candidate.candidateName,
		partyName: candidate.party ? candidate.party.partyName : null,
		voteCategoryName: candidate.voteCategory ? candidate.voteCategory.name : null,
		voted: candidate.voted,
		createdAt: candidate.createdAt,
		updatedAt: candidate.updatedAt,
	  }));
  
	  res.status(200).json(response);
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
	  if (!candidate) {
		return res.status(404).json({ error: "Candidate not found" });
	  }

	  const { candidateName, PartyId, voteCategoryId, voted } = req.body;
  
	  if (PartyId) {
		const party = await Party.findOne({ where: { partyName: PartyId } });
  
		if (!party) {
		  return res.status(400).json({ error: "Party not found" });
		}
		candidate.PartyId = party.partyId;
	  }

	  if (candidateName !== undefined) {
		candidate.candidateName = candidateName;
	  }
  
	  if (voteCategoryId !== undefined) {
		candidate.voteCategoryId = voteCategoryId;
	  }
  
	  if (voted !== undefined) {
		candidate.voted = voted;
	  }
  
	  // Save the updated candidate
	  const savedCandidate = await candidate.save();
  
	  res.status(200).json(savedCandidate);
	} catch (err) {
	  console.error("Error updating candidate: ", err.message);
	  res.status(500).json({ error: err.message });
	}
  });
  
// Delete a candidate
router.delete('/:candidateId', async (req, res) => {
	try {
		console.log("Request body delete: ", req.body);
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
