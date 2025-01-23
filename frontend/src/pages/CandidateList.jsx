import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitVote } from "../redux/actions/createVoteActions";
import { fetchCandidateCategories } from "../redux/actions/createCandidateActions";
import { updateVotedStatus } from "../redux/actions/voterLoginActions";
import "../styles/CandidateList.css";

const CandidateList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [votes, setVotes] = useState({});
  const [hasVotedInCategory, setHasVotedInCategory] = useState(false);
  const category = location.state?.category;

  const { loading, candidates, error } = useSelector((state) => state.candidate);

  useEffect(() => {
    if (!category) {
      console.error("Category is undefined. Redirecting to dashboard.");
      navigate("/voter-dashboard");
      return;
    }

    // Fetch saved votes from localStorage
    const savedData = JSON.parse(localStorage.getItem("fetchedVotes")) || {};
    const savedVotes = savedData.fetchedVotes || [];

    // Check if the voter has voted in the current category (status is true)
    const votedInCategory = savedVotes.find(
      (vote) => vote.voteCategory.name === category.name && vote.status === true
    );

    if (votedInCategory) {
      setHasVotedInCategory(true); // Update the hasVotedInCategory state
    }
  }, [category, navigate]);

  useEffect(() => {
    if (category) {
      const savedData = JSON.parse(localStorage.getItem("votes")) || {};
      const voterId = localStorage.getItem("voterId") || generateUniqueId();

      if (!localStorage.getItem("voterId")) {
        localStorage.setItem("voterId", voterId);
      }

      const categoryVotes = savedData.votes?.[category.name] || {
        status: "not_voted",
        candidateId: null,
      };

      setVotes(categoryVotes);
      dispatch(fetchCandidateCategories(category.name));
    }
  }, [category, dispatch]);

  const generateUniqueId = () => `voter_${Date.now()}`;

  const handleVoteToggle = (candidateId) => {
    if (!category?.name || hasVotedInCategory) return;

    const savedData = JSON.parse(localStorage.getItem("votes")) || {};
    const voterId = localStorage.getItem("voterId");

    const updatedVotes = savedData.votes || {};
    const categoryVotes = updatedVotes[category.name] || { status: "not_voted", candidateId: null };

    // If the same candidate is clicked again, deselect them
    if (categoryVotes.candidateId === candidateId) {
      categoryVotes.candidateId = null; // Deselect the candidate
    } else {
      categoryVotes.candidateId = candidateId; // Select the new candidate
    }

    updatedVotes[category.name] = categoryVotes;
    localStorage.setItem("votes", JSON.stringify({ voterId, votes: updatedVotes }));
    setVotes(categoryVotes);
  };

  const handleConfirmVote = async () => {
    const savedData = JSON.parse(localStorage.getItem("votes")) || {};
    const voterId = localStorage.getItem("voterId");

    const categoryVotes = savedData.votes?.[category.name];

    if (!categoryVotes?.candidateId) {
      alert("Please select a candidate before confirming your vote.");
      return;
    }

    try {
      dispatch(
        submitVote({
          voterId,
          candidateId: categoryVotes.candidateId,
          voteCategoryName: category.name,
        })
      );

      // Update vote status in local storage and state
      savedData.votes[category.name] = {
        ...categoryVotes,
        status: "voted",
      };

      localStorage.setItem("votes", JSON.stringify(savedData));
      setHasVotedInCategory(true);

      // Update fetchedVotes in localStorage
      const fetchedData = JSON.parse(localStorage.getItem("fetchedVotes")) || {};
      const fetchedVotes = fetchedData.fetchedVotes || [];

      // Add the new vote to fetchedVotes
      const newVote = {
        voteId: Date.now(),
        voterId,
        CandidateId: categoryVotes.candidateId,
        VoteCategoryId: category.id,
        status: true,
        voteCategory: {
          name: category.name,
        },
      };

      fetchedVotes.push(newVote);
      localStorage.setItem("fetchedVotes", JSON.stringify({ fetchedVotes }));

      // Updating voters table to voted
      dispatch(updateVotedStatus({ voterId, voted: true }));

      alert(`Your vote for ${category.name} has been recorded!`);
    } catch (err) {
      console.error("Failed to submit vote:", err);
      alert("Failed to submit your vote. Please try again.");
    }
  };

  const isVoted = (candidateId) => {
    // Fetch saved votes from localStorage
    const savedData = JSON.parse(localStorage.getItem("fetchedVotes")) || {};
    const savedVotes = savedData.fetchedVotes || [];

    const votedInCategory = savedVotes.find(
      (vote) => vote.voteCategory.name === category.name && vote.CandidateId === candidateId && vote.status === true
    );

    // Check if the candidate is currently selected in the votes state
    const isSelected = votes.candidateId === candidateId;

    return !!votedInCategory || isSelected;
  };

  if (!category) {
    return (
      <div className="candidate-list">
        <p>No category selected. Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="candidate-list">
      <h1>{category.name} Category</h1>
      {loading && <p>Loading candidates...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && candidates && candidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Party</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.candidateId}>
                <td>
                  <img
                    src={candidate.image || "https://via.placeholder.com/100"}
                    alt={`Candidate ${candidate.name}`}
                    className="candidate-image"
                  />
                  {candidate.candidateName}
                </td>
                <td>
                  <img
                    src={candidate.partyLogo || "https://via.placeholder.com/50"}
                    alt={`${candidate.party} logo`}
                    className="party-logo"
                  />
                  {candidate.partyName}
                </td>
                <td>
                  <button
                    className={`vote-button ${isVoted(candidate.candidateId) ? "voted" : ""}`}
                    onClick={() => handleVoteToggle(candidate.candidateId)}
                    disabled={hasVotedInCategory} // Disable if the voter has voted
                  >
                    {isVoted(candidate.candidateId) ? "Voted" : "Vote"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates found for this category.</p>
      )}
      {votes.candidateId && !hasVotedInCategory && (
        <button className="confirm-button" onClick={handleConfirmVote}>
          Confirm Vote
        </button>
      )}
      <button className="back-button" onClick={() => navigate("/voter-dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default CandidateList;