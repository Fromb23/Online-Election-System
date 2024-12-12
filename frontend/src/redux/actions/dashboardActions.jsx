import  { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk to fetch dashboard statistics
export const fetchDashboardStats = createAsyncThunk(
	'dashboard/fetchDashboardStats',
	async () => {
		const res = await api.get('/stats');
		return res.data;
	}
);

// Async thunk to fetch vote tally
export const fetchVoteTally = createAsyncThunk(
	'dashboard/fetchVoteTally',
	async () => {
		const res = await api.get('/vote-tally');
		return res.data;
	}
);