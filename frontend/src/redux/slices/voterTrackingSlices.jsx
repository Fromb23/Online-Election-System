import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  voteStatuses: [],
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
    builder.addCase('voterTracking/fetchVoterTracking/fulfilled', (state, action) => {
      state.isLoading = false;
      state.voterTrackingData = action.payload;
    });
    builder.addCase('voterTracking/fetchVoterTracking/rejected', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { startLoading, setVoteStatuses, setVoterTrackingData, setError } = voterTrackingSlice.actions;

export default voterTrackingSlice.reducer;