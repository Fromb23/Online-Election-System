import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  voteStatuses: {},
  voterTrackingData: null,
};

const voterTrackingSlice = createSlice({
  name: 'voterTracking',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setVoteStatuses: (state, action) => {
      state.isLoading = false;
      state.voteStatuses = action.payload;
    },
    setVoterTrackingData: (state, action) => {
      state.isLoading = false;
      state.voterTrackingData = action.payload;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the fulfilled and rejected actions for async operations (e.g., fetching vote statuses or tracking data)
    builder.addCase('voterTracking/fetchVoterTracking/fulfilled', (state, action) => {
      state.isLoading = false;
      state.voterTrackingData = action.payload; // Store the fetched tracking data
    });
    builder.addCase('voterTracking/fetchVoterTracking/rejected', (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // Handle error
    });
  },
});

export const { startLoading, setVoteStatuses, setVoterTrackingData, setError } = voterTrackingSlice.actions;

export default voterTrackingSlice.reducer;