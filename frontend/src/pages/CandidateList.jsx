import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitVote } from "../redux/actions/createVoteActions";
import { fetchCandidateCategories } from "../redux/actions/createCandidateActions";
import "../styles/CandidateList.css";

const CandidateList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [votes, setVotes] = useState({});
  const [isVoteConfirmed, setIsVoteConfirmed] = useState(false);
  const category = location.state?.category;

  const { loading, candidates, error } = useSelector((state) => state.candidate);

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
      setIsVoteConfirmed(categoryVotes.status === "voted");
      dispatch(fetchCandidateCategories(category.name));
    }
  }, [category, dispatch]);

  const generateUniqueId = () => `voter_${Date.now()}`;

  const handleVoteToggle = (candidateId) => {
    if (!category?.name || isVoteConfirmed) return;

    const savedData = JSON.parse(localStorage.getItem("votes")) || {};
    const voterId = localStorage.getItem("voterId");

    const updatedVotes = savedData.votes || {};
    const categoryVotes = updatedVotes[category.name] || { status: "not_voted", candidateId: null };

    if (categoryVotes.candidateId === candidateId) {
      categoryVotes.candidateId = null;
    } else {
      categoryVotes.candidateId = candidateId;
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
      await dispatch(
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
      setIsVoteConfirmed(true);

      alert(`Your vote for ${category.name} has been recorded!`);
    } catch (err) {
      console.error("Failed to submit vote:", err);
      alert("Failed to submit your vote. Please try again.");
    }
  };

  const isVoted = (candidateId) => votes.candidateId === candidateId;

  return (
    <div className="candidate-list">
      <h1>{category?.name} Category</h1>
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
                    disabled={votes.status === "voted" || isVoteConfirmed}
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
      {votes.candidateId && votes.status !== "voted" && (
        <button className="confirm-button" onClick={handleConfirmVote}>
          Confirm Vote
        </button>
      )}
      <button className="back-button" onClick={() => navigate("/voter-dashboard")}>
        Back to Voter Dashboard
      </button>
    </div>
  );
};

export default CandidateList;