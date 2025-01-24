const express = require("express");
const router = express.Router();
const { Vote, VoteCategory } = require("../models");

// Get votes for a specific voter
router.get("/", async (req, res) => {

  //if (!voterId) {
   // return res.status(400).json({ error: "Voter ID is required" });
 // }

  try {
    const votes = await Vote.findAll();
    res.status(200).json(votes);
  } catch (error) {
    console.error("Error fetching votes:", error);
    res.status(500).json({ error: "Failed to fetch votes." });
  }
});

router.get("/status/:voterId", async (req, res) => {
  const { voterId } = req.params;

  if (!voterId) {
    return res.status(400).json({ error: "Voter ID is required" });
  }

  try {
    const votes = await Vote.findAll({
      where: { voterId }, 
      include: [{ model: VoteCategory, as: "voteCategory" }],
    });

    if (votes.length === 0) {
      return
    }

    res.status(200).json(votes);
  } catch (error) {
    console.error("Error fetching vote status:", error);
    res.status(500).json({ error: "Failed to fetch vote status." });
  }
});

// Save a new vote
router.post("/", async (req, res) => {
  console.log("Request body votes post method:", req.body);
  const { voterId, candidateId, voteCategoryName } = req.body;

  // Validate request body
  if (!voterId || !candidateId || !voteCategoryName) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Find voteCategoryId by name
    const voteCategory = await VoteCategory.findOne({
      where: { name: voteCategoryName },
    });

    if (!voteCategory) {
      return res.status(404).json({ error: "Vote category not found." });
    }

    const voteCategoryId = voteCategory.voteCategoryId;

    // Create a new vote
    const vote = await Vote.create({
      voterId: voterId,
      CandidateId: candidateId,
      VoteCategoryId: voteCategoryId,
      status: true,
    });

    res.status(201).json(vote);
  } catch (error) {
    console.error("Error saving vote:", error);
    res.status(500).json({ error: "Failed to save vote." });
  }
});

// Update an existing vote
router.put("/:voteId", async (req, res) => {
  const { voteId } = req.params;
  const { candidateId, voteCategoryId, status } = req.body;

  if (!voteId) {
    return res.status(400).json({ error: "Vote ID is required." });
  }

  try {
    const vote = await Vote.findByPk(voteId);

    if (!vote) {
      return res.status(404).json({ error: "Vote not found." });
    }

    vote.CandidateId = candidateId || vote.CandidateId;
    vote.VoteCategoryId = voteCategoryId || vote.VoteCategoryId;
    vote.status = status !== undefined ? status : vote.status;

    await vote.save();

    res.status(200).json(vote);
  } catch (error) {
    console.error("Error updating vote:", error);
    res.status(500).json({ error: "Failed to update vote." });
  }
});

// Delete a vote
router.delete("/:voteId", async (req, res) => {
  const { voteId } = req.params;

  if (!voteId) {
    return res.status(400).json({ error: "Vote ID is required." });
  }

  try {
    const vote = await Vote.findByPk(voteId);

    if (!vote) {
      return res.status(404).json({ error: "Vote not found." });
    }

    await vote.destroy();
    res.status(200).json({ message: "Vote deleted successfully." });
  } catch (error) {
    console.error("Error deleting vote:", error);
    res.status(500).json({ error: "Failed to delete vote." });
  }
});

module.exports = router;