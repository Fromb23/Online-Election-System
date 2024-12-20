import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CandidateList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state;

  const candidates = [
    { id: 1, name: "Candidate A", description: "Details about Candidate A" },
    { id: 2, name: "Candidate B", description: "Details about Candidate B" },
  ]; // Fetch these dynamically later.

  const handleVote = (candidateId) => {
    alert(`You voted for Candidate ID: ${candidateId}`);
    navigate("/");
  };

  return (
    <div>
      <h1>{category.name}</h1>
      <button onClick={() => navigate("/")}>Back to Dashboard</button>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            <h3>{candidate.name}</h3>
            <p>{candidate.description}</p>
            <button onClick={() => handleVote(candidate.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;