import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCandidateCategories } from "../redux/actions/createCandidateActions";
import "../styles/CandidateList.css";

const CandidateList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [votes, setVotes] = useState({});
  const [isVoteConfirmed, setIsVoteConfirmed] = useState(false); // New state
  const category = location.state?.category;

  const { loading, candidates, error } = useSelector((state) => state.candidate);

  useEffect(() => {
    if (category) {
      const savedData = JSON.parse(localStorage.getItem("votes")) || {};
      const voterId = localStorage.getItem("voterId") || generateUniqueId();

      // Ensure a voterId exists in localStorage
      if (!localStorage.getItem("voterId")) {
        localStorage.setItem("voterId", voterId);
      }

      const categoryVotes = savedData.votes?.[category.name] || {
        status: "not_voted",
        candidateId: null,
      };

      setVotes(categoryVotes);
      setIsVoteConfirmed(categoryVotes.status === "voted"); // Update confirmation state
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

    // Toggle candidate selection
    if (categoryVotes.candidateId === candidateId) {
      categoryVotes.candidateId = null; // Deselect candidate
    } else {
      categoryVotes.candidateId = candidateId; // Select candidate
    }

    updatedVotes[category.name] = categoryVotes;
    localStorage.setItem("votes", JSON.stringify({ voterId, votes: updatedVotes }));
    setVotes(categoryVotes);
  };

  const handleConfirmVote = () => {
    const savedData = JSON.parse(localStorage.getItem("votes")) || {};
    const voterId = localStorage.getItem("voterId");

    const categoryVotes = savedData.votes?.[category.name];

    if (!categoryVotes?.candidateId) {
      alert("Please select a candidate before confirming your vote.");
      return;
    }

    // Update vote status to 'voted'
    savedData.votes[category.name] = {
      ...categoryVotes,
      status: "voted",
    };

    localStorage.setItem("votes", JSON.stringify(savedData));
    alert(`Your vote for ${category.name} has been recorded!`);
    setIsVoteConfirmed(true); // Update state
    //navigate("/voter-dashboard");
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
                    disabled={votes.status === "voted" || isVoteConfirmed} // Disable when vote confirmed
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