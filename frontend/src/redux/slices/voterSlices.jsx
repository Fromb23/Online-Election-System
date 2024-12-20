import { createSlice } from '@reduxjs/toolkit';
import { createVoter, updateVoter, fetchVoter, fetchVoters, deleteVoter } from '../actions/voterActions';
import { fetchConstituencies, fetchPollingStations } from '../actions/voterActions';

// Voter slice
const voterSlice = createSlice({
	name: 'voters',
	initialState: {
		county: [],
		constituency: [],
		pollingStation: [],
  		constituencies: [],
  		pollingStations: [],
		list: [],
		selectedVoter: null,
		loading: false,
		success: false,
		error: null,
		voter: null,
	},
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
		// Fetch voter by voterId
			.addCase(fetchVoter.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(fetchVoter.fulfilled, (state, action) => {
				state.loading = false;
				state.voter = action.payload;
			})
			.addCase(fetchVoter.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
		// Fetch voters
			.addCase(fetchVoters.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchVoters.fulfilled, (state, action) => {
				state.loading = false;
				state.list = action.payload;
			})
			.addCase(fetchVoters.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteVoter.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteVoter.fulfilled, (state, action) => {
				state.loading = false;
				state.voters = state.voters.filter((voter) => voter.id !== action.payload);
			})
			.addCase(deleteVoter.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
		// Create Voter
			.addCase(createVoter.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(createVoter.fulfilled, (state, action) => {
				state.loading = false;
				state.list.push(action.payload);
				state.success = true;
			})
			.addCase(createVoter.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.success = false;
			})
		// Update voter
			.addCase(updateVoter.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success =false;
			})
			.addCase(updateVoter.fulfilled, (state, action) => {
				state.loading = false;
				state.list = state.list.map((voter) => 
					voter.voterId === action.payload.voterId ? action.payload : voter
				);
				state.success = true;
			})
			.addCase(updateVoter.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.success = false;
			})
	},
});

export const { clearErrorAction } = voterSlice.actions;
export default voterSlice.reducer;
