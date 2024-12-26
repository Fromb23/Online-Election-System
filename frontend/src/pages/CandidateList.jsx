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
  const category = location.state?.category;

  const { loading, candidates, error } = useSelector((state) => state.candidate);
  console.log("Candidates from Redux state:", candidates);

  useEffect(() => {
    if (category) {
      console.log("Fetching candidates for category in the list:", category);
  
      // Load the saved votes for this specific category from localStorage
      const savedVotes = JSON.parse(localStorage.getItem('votes')) || {};
      const categoryVotes = savedVotes[category.name] || {};
  
      setVotes(categoryVotes);
  
      // Fetch candidates for the category if needed (e.g., dispatching API call)
      dispatch(fetchCandidateCategories(category.name));
    }
  }, [category, dispatch]);

  useEffect(() => {
    if (category) {
      console.log("Fetching candidates for category in the list:", category);
      dispatch(fetchCandidateCategories(category.name));
    }
  }, [category, dispatch]);

  const handleVoteToggle = (candidateId) => {
    const categoryName = category?.name;
  
    if (!categoryName) return;
  
    // Fetch previous votes for the current category from localStorage
    const savedVotes = JSON.parse(localStorage.getItem('votes')) || {};
  
    setVotes((prevVotes) => {
      const updatedVotes = { ...prevVotes };
  
      // Update the vote status for the selected candidate in the current category
      if (updatedVotes[candidateId]) {
        delete updatedVotes[candidateId]; // Remove vote
      } else {
        updatedVotes[candidateId] = true; // Add vote
      }
  
      // Store the updated votes for this specific category in localStorage
      savedVotes[categoryName] = updatedVotes;
      localStorage.setItem('votes', JSON.stringify(savedVotes));
  
      return updatedVotes;
    });
  };

  const handleVoted = () => {
    const hasVoted = Object.keys(votes).some((candidateId) => votes[candidateId]);
  
    // If no votes are cast, navigate back to the main dashboard
    if (!hasVoted) {
      navigate('/voter-dashboard');
      return;
    }
  
    candidates.map((candidate) => {
      if (votes[candidate.candidateId]) {
        alert(`You have voted for ${candidate.candidateName} as your preferred choice`);
        
        // Store the voted candidate ID in localStorage
        let userId = localStorage.getItem('userId');
        if (!userId) {
          userId = generateUniqueId(); // Create a unique ID if not exists
          localStorage.setItem('userId', userId);
        }
  
        const savedVotes = JSON.parse(localStorage.getItem('votes')) || {};
        savedVotes[userId] = savedVotes[userId] || {};
  
        savedVotes[userId][category.name] = candidate.candidateId; // Store the voted candidateId
  
        localStorage.setItem('votes', JSON.stringify(savedVotes)); // Save it to localStorage
  
        // Set a 'voted' flag
        localStorage.setItem('voted', true);
        navigate('/voter-dashboard'); // Redirect to the dashboard
      }
    });
  }; 
  
  const generateUniqueId = () => {
    return 'user_' + Date.now();
  };

  const isVoted = (candidateId) => !!votes[candidateId];
  const hasVotedForOther = (candidateId) =>
    Object.keys(votes).length > 0 && !votes[candidateId];

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
                    className={`vote-button ${
                      isVoted(candidate.candidateId) ? "voted" : ""
                    }`}
                    onClick={() => handleVoteToggle(candidate.candidateId)}
                    disabled={hasVotedForOther(candidate.candidateId)}
                  >
                    {isVoted(candidate.candidateId) ? "Voted" : "Vote"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates found for this category.</p> // Display message when no candidates are found
      )}
      <button
        className="back-button"
        onClick={() => handleVoted()}
      >
        Back to Voter Dashboard
      </button>
    </div>
  ); 
}

export default CandidateList;