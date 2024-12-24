import { createSlice } from '@reduxjs/toolkit';
import { createCandidate, fetchPartiesAndCategories } from '../actions/createCandidateActions';

// Initial state
const initialState = {
	candidateName: '',
	partyId: '',
	voteCategoryId: '',
	parties: [],
	voteCategories: [],
	error: null,
	success: null,
	loading: false,
  };
  
  // Slice
  const createCandidateSlice = createSlice({
	name: 'createCandidate',
	initialState,
	reducers: {
	  setCandidateName: (state, action) => {
		state.candidateName = action.payload;
	  },
	  setPartyId: (state, action) => {
		state.partyId = action.payload;
	  },
	  setVoteCategoryId: (state, action) => {
		state.voteCategoryId = action.payload;
	  },
	  clearMessages: (state) => {
		state.error = null;
		state.success = null;
	  },
	},
	extraReducers: (builder) => {
	  builder
		.addCase(fetchPartiesAndCategories.pending, (state) => {
		  state.loading = true;
		})
		.addCase(fetchPartiesAndCategories.fulfilled, (state, action) => {
		  state.parties = action.payload.parties;
		  state.voteCategories = action.payload.voteCategories;
		  state.loading = false;
		})
		.addCase(fetchPartiesAndCategories.rejected, (state, action) => {
		  state.error = action.payload;
		  state.loading = false;
		})
		.addCase(createCandidate.pending, (state) => {
		  state.loading = true;
		})
		.addCase(createCandidate.fulfilled, (state, action) => {
		  state.success = action.payload;
		  state.candidateName = '';
		  state.partyId = '';
		  state.voteCategoryId = '';
		  state.loading = false;
		})
		.addCase(createCandidate.rejected, (state, action) => {
		  state.error = action.payload;
		  state.loading = false;
		});
	},
  });
  
  export const {
	setCandidateName,
	setPartyId,
	setVoteCategoryId,
	clearMessages,
  } = createCandidateSlice.actions;
  
  export default createCandidateSlice.reducer;