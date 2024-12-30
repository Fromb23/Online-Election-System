import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVoterVotingStatus } from "../redux/actions/voterTrackingActions";

const VoterTracking = ({ voterId }) => {
  const dispatch = useDispatch();
  const { voteStatuses, isLoading, error } = useSelector((state) => state.voterTracking);

  useEffect(() => {
    if (voterId) {
      const savedData = JSON.parse(localStorage.getItem("votes")) || {};
      const categoryVotes = savedData.votes || {};
  
      if (Object.keys(categoryVotes).length > 0) {
        console.log("Local Votes:", categoryVotes);
      } else {
        dispatch(fetchVoterVotingStatus(voterId));
      }
    }
  }, [dispatch, voterId]);

  // Save data to localStorage once data has been fetched (in Redux state)
  useEffect(() => {
    if (voteStatuses && Object.keys(voteStatuses).length > 0) {
      localStorage.setItem("votes", JSON.stringify({ votes: voteStatuses }));
    }
  }, [voteStatuses]);

  useEffect(() => {
    if(voteStatuses && Object.keys(voteStatuses).length > 0) {
        updateCategories();
    }
  }, [voteStatuses]);

  const updateCategories = () => {
    for ( const[categoryId, status] of Object.entries(voteStatuses)) {
      const category = document.getElementById(categoryId);
      if (category) {
        if (status === "voted") {
          category.classList.add("voted");
        } else if (status === "notVoted") {
          category.classList.add("not-voted");
        }
      }
    }
  }

  if (isLoading) {
    return <div>Loading data from vote Tracking...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null; // No UI if just fetching data
};

export default VoterTracking;