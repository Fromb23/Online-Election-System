import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchVoters = createAsyncThunk(
	'voters/fetchVoter',
	async (voterId, { rejectWithValue }) => {
		try {
			const response = await api.get(`voters`);
			return response?.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Error fetching voter');
		}
	}
);

export const deleteVoter = createAsyncThunk(
	'voter/deleteVoter',
	async (voterId, { rejectWithValue }) => {
		try {
			const response = api.delete(`voters/${voterId}`);
			return voterId;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Error deleting voter');
		}
	}
);

export const createVoter = createAsyncThunk(
	'voters/createVoter',
	async (voterData, { rejectWithValue }) => {
		try {
			const response = await api.post('/voters', voterData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Error creating voter');
		}
	}
);

export const updateVoter = createAsyncThunk(
	'voters/updateVoter',
	async ({ voterId, voterData }, { rejectWithValue }) => {
		try {
			const response = await api.put(`/voters/${voterId}`, voterData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Error updating voter');
		}
	}
);

// Voter slice
const voterSlice = createSlice({
	name: 'voters',
	initialState: {
		list: [],
		selectedVoter: null,
		isLoading: false,
		error: null,
	},
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
		// Fetch voter
		.addCase(fetchVoters.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(fetchVoters.fulfilled, (state, action) => {
			state.isLoading = true;
			state.list = action.payload;
		})
		.addCase(fetchVoters.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		})
		.addCase(deleteVoter.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(deleteVoter.fulfilled, (state, action) => {
			state.isLoading = false;
			state.voters = state.voters.filter((voter) => voter.id !== action.payload);
		})
		.addCase(deleteVoter.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		})
		// Create Voter
		.addCase(createVoter.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(createVoter.fulfilled, (state, action) => {
			state.isLoading = false;
			state.voters.push(action.payload);
		})
		.addCase(createVoter.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		})
		// Update voter
		.addCase(updateVoter.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		})
		.addCase(updateVoter.fulfilled, (state, action) => {
			state.isLoading = false;
			state.voters = state.voters.map((voter) => 
				voter.id === action.payload.id ? action.payload : voter
			);
		})
		.addCase(updateVoter.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		})
	},
});

export const { clearError } = voterSlice.actions;

export default voterSlice.reducer;
