import { createSlice } from '@reduxjs/toolkit';
import { fetchCounties, fetchConstituencies, fetchPollingStations } from '../actions/voterActions';

const locationSlice = createSlice({
	name: 'location',
	initialState: {
		counties: [],
		constituencies: [],
		pollingStations: [],
		loading: false,
		success: false,
		error: null,
	},
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		clearConstituencies: (state) => {
			state.constituencies = [];
		  },
		clearPollingStations: (state) => {
			state.pollingStations = [];
		  },
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCounties.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(fetchCounties.fulfilled, (state, action) => {
				state.loading = false;
				state.counties = action.payload;
			})
			.addCase(fetchCounties.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Fetch constituencies
			.addCase(fetchConstituencies.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(fetchConstituencies.fulfilled, (state, action) => {
				state.loading = false;
				state.constituencies = action.payload;
			})
			.addCase(fetchConstituencies.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Fetch polling stations
			.addCase(fetchPollingStations.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.success = false;
			})
			.addCase(fetchPollingStations.fulfilled, (state, action) => {
				state.loading = false;
				state.pollingStations = action.payload;
			})
			.addCase(fetchPollingStations.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { clearErrorAction, clearConstituencies, clearPollingStations } = locationSlice.actions;
export default locationSlice.reducer;