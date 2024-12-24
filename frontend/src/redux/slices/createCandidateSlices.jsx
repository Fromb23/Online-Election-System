import { createSlice } from '@reduxjs/toolkit';
import { fetchCandidates, createCandidate, fetchPartiesAndCategories } from '../actions/createCandidateActions';

const initialState = {
  candidates: [],
  candidateName: '',
  partyId: '',                // This will store the selected party ID
  voteCategoryId: '',         // This will store the selected vote category ID
  parties: [],                // Store parties with their IDs
  voteCategories: [],         // Store vote categories with their IDs
  error: null,
  success: null,
  loading: false,
};

// Slice for creating a candidate
const createCandidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    setCandidateName: (state, action) => {
      state.candidateName = action.payload;
    },
    setPartyId: (state, action) => {
      state.partyId = action.payload;  // Store party ID when set
    },
    setVoteCategoryId: (state, action) => {
      state.voteCategoryId = action.payload;  // Store vote category ID when set
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
    // Handle fetching Candidates
    .addCase(fetchCandidates.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchCandidates.fulfilled, (state, action) => {
      state.candidates = action.payload;
      state.loading = false;
    })
    .addCase(fetchCandidates.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
      // Handling fetchPartiesAndCategories action
      .addCase(fetchPartiesAndCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPartiesAndCategories.fulfilled, (state, action) => {
        state.parties = action.payload.parties;  // Store fetched parties (with IDs)
        state.voteCategories = action.payload.voteCategories;  // Store fetched vote categories (with IDs)
        state.loading = false;
      })
      .addCase(fetchPartiesAndCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Handling createCandidate action
      .addCase(createCandidate.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.success = action.payload;
        state.candidateName = '';  // Clear candidate name after creation
        state.partyId = '';         // Clear party ID after creation
        state.voteCategoryId = '';  // Clear vote category ID after creation
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