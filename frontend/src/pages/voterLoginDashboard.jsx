import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCandidateCategories } from '../redux/actions/createCandidateActions';
import { setLoading } from '../redux/slices/voterLoginSlices';
import VoterLoginHeader from '../components/voterLoginHeader';
import VoterLoginFooter from '../components/voterLoginFooter';
import VoterTracking from '../components/VoterTracking';
import '../styles/VoterDashboard.css';
import CandidateCard from "../components/CandidateCard";
import { useSelector, useDispatch } from 'react-redux';

const VoterLoginDashboard = () => {
  const dispatch = useDispatch();
  const[selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const voterId = localStorage.getItem('voterId')
  const { loading, candidate, error } = useSelector((state) => state.candidate);
  const voterTrackingLoading = useSelector((state) => state.voterTracking.loading);

  useEffect(() => {
    if (!voterId) {
      navigate("/voter-login");
    } else {
      console.log("Fetching voter data in the dashb...", voterId);
      localStorage.setItem('voterId', voterId);
    }
  }, [voterId, navigate]);

  useEffect(() => {
    if (voterId) {
      console.log("Fetching voter tracking data and loading is true...", voterId);
      setLoading(true);
    }
  }, [voterId]);

  useEffect(() => {
    if (!voterTrackingLoading) {
      console.log("Voter tracking data fetched successfully and laoding is falses...", voterId);
      setLoading(false);
    }
  }, [voterTrackingLoading]);

const categories = [
  { id: 1, name: "President", description: "Vote for the President" },
  { id: 2, name: "Governor", description: "Vote for the Governor" },
  { id: 3, name: "Member of Paliament", description: "Vote for your MP"},
  { id: 4, name: "MCA", description: "Vote for the MCA"},
  // Add more categories as needed
];

const handleClickCategory = (category) => {
  setSelectedCategory(category.name);
  dispatch(fetchCandidateCategories(category.name));
}

console.log("voterId retrieved from localStorage:", voterId);
  return (
    <div className="voter-dashboard">
      { loading && <p>Loading voter tracking...</p> }
      { voterId && ( <VoterTracking
        voterId={voterId} /> )}
      <VoterLoginHeader />
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
        {candidate && (
          <div>
            <h2>Candidates for {selectedCategory}</h2>
            <div style={styles.cards}>
              {candidate.map((candidate) => (
                <CandidateCard key={candidate.candidateId} candidate={candidate} />
              ))}
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