import React, { useState, useEffect } from "react";

const TimerComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [votingOpen, setVotingOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Retrieve votingStart and votingEnd from localStorage or calculate them if they don't exist
  const getVotingTimes = () => {
    const savedVotingStart = localStorage.getItem("votingStart");
    const savedVotingEnd = localStorage.getItem("votingEnd");

    if (savedVotingStart && savedVotingEnd) {
      return {
        votingStart: new Date(parseInt(savedVotingStart, 10)),
        votingEnd: new Date(parseInt(savedVotingEnd, 10)),
      };
    } else {
      const votingStart = new Date(currentTime.getTime() + 0.1 * 60 * 1000); // 1 minutes from now
      const votingEnd = new Date(votingStart.getTime() + 12 * 60 * 60 * 1000); // 12 hours after voting start
      localStorage.setItem("votingStart", votingStart.getTime());
      localStorage.setItem("votingEnd", votingEnd.getTime());
      return { votingStart, votingEnd };
    }
  };

  const { votingStart, votingEnd } = getVotingTimes();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Check if voting is open
      if (now >= votingStart && now <= votingEnd) {
        setVotingOpen(true);
        setTimeRemaining(votingEnd - now); // Update countdown during voting period
      } else if (now > votingEnd) {
        setVotingOpen(false);
        setTimeRemaining(0); // Voting has ended
        clearInterval(timer); // Stop the timer
      } else {
        setTimeRemaining(votingStart - now); // Countdown to voting start
      }
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, [votingStart, votingEnd]);

  // Format the remaining time
  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  // Only lock the dashboard if voting has not started or has ended
  const shouldLockDashboard = currentTime < votingStart || currentTime > votingEnd;

  return (
    <>
      {/* Overlay for Pre-Voting or Post-Voting Period */}
      {shouldLockDashboard && (
        <div
          style={{
            position: "absolute",
            top: "170px", // Adjust this value based on the header height
            left: 0,
            width: "100%",
            height: "calc(100% - 60px)", // Adjust this value based on the header height
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ textAlign: "center" }}>
            {currentTime < votingStart ? (
              <>
                <h2>Voting Starts in</h2>
                <p>{formatTime(timeRemaining)}</p>
              </>
            ) : (
              <>
                <h2>Voting Has Ended</h2>
                <p>Voting ended on March 5, 2025, at 5:00 PM EAT.</p>
              </>
            )}
            <p>You can view your profile or voting instructions.</p>
          </div>
        </div>
      )}

      {/* Countdown timer if voting is open */}
      {votingOpen && (
        <div
          style={{
            position: "absolute",
            top: "90px", // Position below the header (adjust based on header height)
            left: 0,
            width: "100%", // Stretch across the entire row
            backgroundColor: "white", // White background
            color: "red",
            padding: "10px",
            textAlign: "right",
            zIndex: 10,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for better visibility
          }}
        >
          <h3>Time Remaining: {formatTime(timeRemaining)}</h3>
        </div>
      )}
    </>
  );
};

export default TimerComponent;