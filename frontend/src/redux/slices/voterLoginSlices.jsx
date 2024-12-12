import { createSlice } from '@reduxjs/toolkit';
import { loginVoter } from '../actions/voterLoginActions';

const voterLoginSlice = createSlice({
  name: 'voter',
  initialState: { 
	voterInfo: null,
	loading: false,
	error: null }, reducers: {
    logoutVoter: (state) => {
      state.voterInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginVoter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginVoter.fulfilled, (state, action) => {
        state.loading = false;
        state.voterInfo = action.payload;
      })
      .addCase(loginVoter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutVoter } = voterLoginSlice.actions;
export default voterLoginSlice.reducer;