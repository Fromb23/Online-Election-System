import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { startLoading, setVoterTrackingData, setVoteStatuses, setError } from "../slices/voterTrackingSlices";

export const fetchVoterVotingStatus = createAsyncThunk(
  'voterTracking/fetchVoterVotingStatus',
  async (voterId, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      console.log("Fetching vote statuses for voter in votes actions:", voterId);
      const response = await api.get(`/votes/status/${voterId}`);
      dispatch(setVoteStatuses(response.data));
    } catch (error) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVoterTracking = createAsyncThunk(
  'voterTracking/fetchVoterTracking',
  async (token, { dispatch, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      console.log("Fetching voter tracking data...");
      const response = await api.get(`/voters/track/${token}`);
      dispatch(setVoterTrackingData(response.data));
    } catch (error) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  }
);