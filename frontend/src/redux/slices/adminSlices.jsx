import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

//Thunk to create a new admin
export const createAdmin = createAsyncThunk(
	'admin/createAdmin/',
	async (adminData, { rejectWithValue }) => {
		try {
			const res = await api.post('/admins', adminData);
			return res.data;
		} catch (error) {
			return rejectWithValue(
				error.res && error.res.data.messagge
				? error.res.data.messagge
				: error.message
			);
		}
	}
);

const adminSlice = createSlice({
	name: 'admin',
	initialState: {
		loading: false,
		success: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase(createAdmin.pending, (state) => {
			state.loading =false;
			state.error = null;
			state.success = false;
		})
		.addCase(createAdmin.fulfilled, (state, action) => {
			state.loading = false;
			state.success = true;
			state.error = null;
		})
		.addCase(createAdmin.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.success = false;
		});
	},
});

export default adminSlice.reducer;