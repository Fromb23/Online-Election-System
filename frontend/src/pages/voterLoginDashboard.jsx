import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import VoterLoginHeader from '../components/voterLoginHeader';
import VoterLoginFooter from '../components/voterLoginFooter';
import '../styles/VoterDashboard.css';
import CandidateCard from "../components/CandidateCard";
import { useSelector } from 'react-redux';

const VoterLoginDashboard = () => {
  const navigate = useNavigate();
  const voterInfo = useSelector((state) => state.voter.voterInfo);

  useEffect(() => {
    if (!voterInfo) {
      navigate("/voter-login");
    } else {
      console.log("Fetching voter data...", voterInfo);
    }
  }, [voterInfo, navigate]);

const categories = [
  { id: 1, name: "President", description: "Vote for the President" },
  { id: 2, name: "Governor", description: "Vote for the Governor" },
  // Add more categories as needed
];

  return (
    <div className="voter-dashboard">
      <VoterLoginHeader />
      <main style={styles.main}>
        <h2>Voting Categories</h2>
        <div style={styles.cards}>
          {categories.map((category) => (
            <CandidateCard key={category.id} category={category} />
          ))}
        </div>
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