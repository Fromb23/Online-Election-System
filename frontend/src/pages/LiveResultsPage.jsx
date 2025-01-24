import React, { useState, useEffect } from "react";
import styles from "../styles/LiveResultsPage.module.css";
import api from '../services/api';

const LiveResultsPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  // Fetch all Presidential candidates
  useEffect(() => {
    const fetchPresidentialCandidates = async () => {
      try {
        const res = await api.get(`/candidates`);
        const presidentialCandidates = res.data.filter(
          (candidate) => candidate.voteCategoryName === 'President'
        );
        setCandidates(presidentialCandidates);
        console.log("Live presidential page:", presidentialCandidates);
      } catch (error) {
        console.error("Error fetching presidential candidates:", error);
      }
    };

    fetchPresidentialCandidates();
  }, []);

  // Fetch votes and update candidates with vote counts
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await fetch('/api/votes');
        const data = await response.json();
        // Assuming the data is an array of votes
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    if (candidates.length > 0) {
      fetchVotes(); // Fetch votes only after candidates are fetched
    }
  }, [candidates.length]); // Run this effect when candidates change

  // Calculate total votes and percentages
  useEffect(() => {
    const total = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
    setTotalVotes(total);
  }, [candidates]); // ✅ Now runs whenever candidates updates

  // Determine the leading and trailing candidates
  const leadingCandidate = candidates.length > 0
    ? candidates.reduce((leading, candidate) => (candidate.votes > leading.votes ? candidate : leading))
    : null;
  const trailingCandidate = candidates.length > 0
    ? candidates.reduce((trailing, candidate) => (candidate.votes < trailing.votes ? candidate : trailing))
    : null;

  // Calculate the progress bar width for the leading candidate
  const getProgressWidth = (votes) => {
    if (totalVotes === 0) return 50; // Default to 50% if no votes
    return (votes / totalVotes) * 100;
  };

  // Determine the progress bar color for the leading candidate
  const getLeadingColor = (percentage) => {
    if (percentage < 55) return "#b3ffb3"; // Light green if around 50%
    return "#66ff66"; // Green if above 50%
  };

  // Determine the progress bar color for the trailing candidate
  const getTrailingColor = (percentage) => {
    if (percentage < 30) return "#ff4d4d"; // Red if far from 50%
    return "#ffcc99"; // Cream if closer to 50%
  };

  return (
    <div className={styles.liveResultsPage}>
      <h1>Live Presidential Election Results</h1>
      <div className={styles.candidatesContainer}>
        {candidates.map((candidate) => (
          <div key={candidate.candidateId} className={styles.candidateCard}>
            <h2>{candidate.candidateName}</h2>
            <p>Votes: {candidate.votes}</p>
            <p>Percentage: {totalVotes === 0 ? "0%" : `${((candidate.votes / totalVotes) * 100).toFixed(2)}%`}</p>
          </div>
        ))}
      </div>
      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBar}
          style={{
            width: `${getProgressWidth(leadingCandidate?.votes || 0)}%`,
            backgroundColor: getLeadingColor(getProgressWidth(leadingCandidate?.votes || 0)),
          }}
        ></div>
        <div
          className={styles.progressBarTrailing}
          style={{
            width: `${100 - getProgressWidth(leadingCandidate?.votes || 0)}%`,
            backgroundColor: getTrailingColor(getProgressWidth(trailingCandidate?.votes || 0)),
          }}
        ></div>
        <div className={styles.middleLine}></div>
      </div>
      <div className={styles.winnerSection}>
        <h2>Current Leader: {leadingCandidate?.candidateName || "No Leader"}</h2>
        <p>
          {leadingCandidate?.candidateName || "No Leader"} is leading with {((leadingCandidate?.votes / totalVotes) * 100 || 0).toFixed(2)}% of the votes.
        </p>
      </div>
      <a href="/" className={styles.backLink}>
        Back to Dashboard
      </a>
    </div>
  );
};

export default LiveResultsPage;