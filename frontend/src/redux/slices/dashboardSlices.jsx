import { createSlice } from '@reduxjs/toolkit';
import { fetchDashboardStats, fetchVoteTally } from '../actions/dashboardActions';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    totalPositions: 0,
    totalCandidates: 0,
    totalVoters: 0,
    totalVotesCast: 0,
    voteTally: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPositions = action.payload.totalPositions;
        state.totalCandidates = action.payload.totalCandidates;
        state.totalVoters = action.payload.totalVoters;
        state.totalVotesCast = action.payload.totalVotesCast;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVoteTally.fulfilled, (state, action) => {
        state.voteTally = action.payload;
      });
  },
});

export default dashboardSlice.reducer;