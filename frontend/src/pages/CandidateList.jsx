import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CandidateList.css";

const CandidateList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [votes, setVotes] = useState({}); // Move useState to the top level

  const category = location.state?.category;

  if (!category) {
    console.error("Category data is missing.");
    return <div>Error: No category data found.</div>;
  }

  const candidates = [
    {
      id: 1,
      name: "Candidate A",
      party: "Party Alpha",
      partyLogo: "https://via.placeholder.com/50",
      image: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Candidate B",
      party: "Party Beta",
      partyLogo: "https://via.placeholder.com/50",
      image: "https://via.placeholder.com/100",
    },
  ]; // Replace with dynamic data later.

  const handleVoteToggle = (candidateId) => {
    setVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };
      if (updatedVotes[candidateId]) {
        delete updatedVotes[candidateId]; // Remove vote
      } else {
        updatedVotes[candidateId] = true; // Add vote
      }
      return updatedVotes;
    });
  };

  const isVoted = (candidateId) => !!votes[candidateId];
  const hasVotedForOther = (candidateId) =>
    Object.keys(votes).length > 0 && !votes[candidateId];

  return (
    <div className="candidate-list">
      <h1>{category.name} Category</h1>
      <table>
        <thead>
          <tr>
            <th >Full Name</th>
            <th>Party </th>
            <th>Vote</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <img
                  src={candidate.image}
                  alt={`Candidate ${candidate.name}`}
                  className="candidate-image"
                />
                {candidate.name}
              </td>
              <td>
              <img
                  src={candidate.partyLogo}
                  alt={`${candidate.party} logo`}
                  className="party-logo"
                />
                {candidate.party}
              </td>
              <td>
                <button
                  className={`vote-button ${
                    isVoted(candidate.id) ? "voted" : ""
                  }`}
                  onClick={() => handleVoteToggle(candidate.id)}
                  disabled={hasVotedForOther(candidate.id)}
                >
                  {isVoted(candidate.id) ? "Voted" : "Vote"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="back-button"
        onClick={() => navigate("/voter-dashboard")}
      >
        Back to Voter Dashboard
      </button>
    </div>
  );
};

export default CandidateList;