import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { clearErrorAction } from '../slices/voterSlices';

//Thunk to create a new voter
export const createVoter = createAsyncThunk(
	'voters/createVoter',
	async (voterData, { rejectWithValue }) => {
		try {
			const res = await api.post('/voters', voterData);
			console.log(res);
			return res.data;
		} catch (error) {
			return rejectWithValue(
				error.res && error.res.data.message
				? error.res.data.message
				: error.message
			);
		}
	}
);

// Thunk to update a voter
export const updateVoter = createAsyncThunk(
	'voters/updateVoter',
	async ({voterId, voterData}, { rejectWithValue }) => {
		try {
			const res = await api.put(`/voters/${voterId}`, voterData);
			return res.data;
		} catch (error) {
			return rejectWithValue(			
				error.res && error.res.data.message
				? error.res.data.message
				: error.message
			);
		}
	}
);

// Thunk to delete a voter
export const deleteVoter = createAsyncThunk(
	'voters/deleteVoter',
	async (voterId, { rejectWithValue }) => {
		try {
			await api.delete(`/voters/${voterId}`);
			return voterId;
		} catch (error) {
			return rejectWithValue(
				error.res && error.res.data.message
				? error.res.data.message
				: error.message
			);
		}
	}
);

// Thunk to fetch a voter by voterId
export const fetchVoter = createAsyncThunk(
	'voters/fetchVoter',
	async (voterId, { rejectWithValue }) => {
		try {
			const res = await api.get(`/voters/${voterId}`);
			return res.data;
		} catch (error) {
			return rejectWithValue(
				error.res && error.res.data.message
				? error.res.data.message
				: error.message
			);
		}
	}
);

// Thunk to fetch all voters
export const fetchVoters = createAsyncThunk(
	'voters/fetchVoters',
	async (_, { rejectWithValue }) => {
		try {
			const res = await api.get('/voters');
			return res.data;
		} catch (error) {
			return rejectWithValue(
				error.res && error.res.data.message
				? error.res.data.message
				: error.message
			);
		}
	}
);

export const fetchCounties = createAsyncThunk(
	'location/fetchCounties',
	async (_, { rejectWithValue }) => {
		try {
			const res = await api.get('/counties');
			return res.data;
		} catch (error) {
			return rejectWithValue(
				error.res && error.res.data.message
				? error.res.data.message
				: error.message
			);
		}
	}
);

export const fetchConstituencies = createAsyncThunk(
	'location/fetchConstituencies',
	async (countyId, { rejectWithValue }) => {
		try {
			const res = await api.get(`/constituencies/${countyId}`);
			console.log(res.data);
			return res.data;
		} catch (error) {
			return rejectWithValue(
				error.res && error.res.data.message
				? error.res.data.message
				: error.message
			);
		}
	}
);

export const fetchPollingStations = createAsyncThunk(
	'location/fetchPollingStations',
	async (constituencyId, { rejectWithValue }) => {
		try {
			const res = await api.get(`/pollingStations/${constituencyId}`);
			return res.data;
		} catch (error) {
			return rejectWithValue(
				error.res && error.res.data.message
				? error.res.data.message
				: error.message
			);
		}
	}
);

// Action to clear errors
export const clearError = () => (dispatch) => {
	dispatch(clearErrorAction());
};