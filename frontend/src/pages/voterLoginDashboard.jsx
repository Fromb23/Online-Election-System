import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCandidateCategories } from '../redux/actions/createCandidateActions';
import { setLoading } from '../redux/slices/voterLoginSlices';
import VoterLoginHeader from '../components/voterLoginHeader';
import VoterLoginFooter from '../components/voterLoginFooter';
import VoterTracking from '../components/VoterTracking';
import CandidateCard from "../components/CandidateCard";
import { useSelector, useDispatch } from 'react-redux';
import TimerComponent from '../components/TimerComponent';
import '../styles/VoterDashboard.css';

const VoterLoginDashboard = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [votedCandidate, setVotedCandidate] = useState(null); // Track the voted candidate
  const [isVoted, setIsVoted] = useState(false); // Track if the user has voted
  const navigate = useNavigate();
  const voterId = localStorage.getItem('voterId');
  const { loading, error, candidate } = useSelector((state) => state.candidate);
  const voterTrackingLoading = useSelector((state) => state.voterTracking.isLoading);

  useEffect(() => {
    if (!voterId) {
      navigate("/voter-login");
    } else {
      console.log("Fetching voter data in the dashboard...", voterId);
      localStorage.setItem('voterId', voterId);
    }
  }, [voterId, navigate]);

  useEffect(() => {
    if (voterId) {
      console.log("Fetching voter tracking data and loading is true...", voterId);
      setLoading(true);
    }
  }, [voterId]);

  const categories = [
    { id: 1, name: "President", description: "Vote for the President" },
    { id: 2, name: "Governor", description: "Vote for the Governor" },
    { id: 3, name: "Member of Parliament", description: "Vote for your MP" },
    { id: 4, name: "MCA", description: "Vote for the MCA" },
    // Add more categories as needed
  ];

  const handleClickCategory = (category) => {
    setSelectedCategory(encodeURIComponent(category.name));
    dispatch(fetchCandidateCategories(category.name));
  };

  // Set candidates if available in Redux store
  useEffect(() => {
    if (Array.isArray(candidate)) {
      setCandidates(candidate);
    }
  }, [candidate]);

  return (
    <div className="voter-dashboard">
      <VoterLoginHeader />
      <TimerComponent />
      {loading && <p>Loading voter tracking...</p>}
      {voterId && <VoterTracking voterId={voterId} />}
      
      <main style={styles.main}>
        <h2>Voting Categories</h2>
        <div style={styles.cards}>
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleClickCategory(category)}
            >
              <CandidateCard category={category} />
            </div>
          ))}
        </div>
        {loading && <p>Loading candidates...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {selectedCategory && (
          <div>
            <h2>Candidates for {selectedCategory}</h2>
            {isVoted && (
              <p>You have already voted for candidate {votedCandidate}</p>
            )}
            <div style={styles.cards}>
              {candidates.length > 0 ? (
                candidates.map((candidate) => (
                  <CandidateCard key={candidate.candidateId} candidate={candidate} />
                ))
              ) : (
                <p>No candidates available for this category.</p>
              )}
            </div>
          </div>
        )}
      </main>
      <VoterLoginFooter />
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#f5f5f5",
    borderBottom: "1px solid #ddd",
  },
  profile: { position: "relative" },
  profileIcon: { width: "40px", height: "40px", cursor: "pointer" },
  dropdown: {
    position: "absolute",
    top: "50px",
    right: 0,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    display: "none", // Add interactivity later
  },
  main: { padding: "20px" },
  cards: { display: "flex", gap: "20px", flexWrap: "wrap" },
  footer: { textAlign: "center", padding: "10px 0", background: "#f5f5f5" },
};

export default VoterLoginDashboard;