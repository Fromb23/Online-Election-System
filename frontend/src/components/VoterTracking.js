import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVoterVotingStatus } from "../redux/actions/voterTrackingActions";

const VoterTracking = ({ voterId }) => {
  const dispatch = useDispatch();
  const { voteStatuses, isLoading, error } = useSelector((state) => state.voterTracking);

  // Fetch voter voting status from endpoint api
  useEffect(() => {
    if (voterId) {
      const savedData = JSON.parse(localStorage.getItem("votes")) || {};
      const categoryVotes = savedData.votes || {};

      if (Object.keys(categoryVotes).length === 0) {
        console.log("Fetching vote data from backend...");
        dispatch(fetchVoterVotingStatus(voterId));
      } else {
        console.log("Local Votes:", categoryVotes);
      }
    }
  }, [dispatch, voterId]);

  // save to localStorage
  useEffect(() => {
    if (voteStatuses && Object.keys(voteStatuses).length > 0) {
      console.log("Saving vote statuses to localStorage...");
      localStorage.setItem("fetchedVotes", JSON.stringify({ fetchedVotes: voteStatuses }));
    }
  }, [voteStatuses]);

  if (isLoading) {
    return <div>Loading data from vote tracking...</div>;
  }

  if (error) {
    return <div>Error fron voterTracking: {error}</div>;
  }

  return null;
};

export default VoterTracking;