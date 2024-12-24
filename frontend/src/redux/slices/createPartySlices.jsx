import { createSlice } from '@reduxjs/toolkit';
import { fetchParties, addParty, deleteParty } from '../actions/createPartyActions';

const initialState = {
  parties: [],
  selectedParty: null,
  error: null,
  success: null,
  loading: false,
};

const partySlice = createSlice({
  name: 'party',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParties.fulfilled, (state, action) => {
        state.parties = action.payload;
        state.loading = false;
      })
      .addCase(fetchParties.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addParty.fulfilled, (state, action) => {
        state.parties.push(action.payload);
        state.success = 'Party added successfully!';
      })
      .addCase(addParty.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteParty.fulfilled, (state, action) => {
        state.parties = state.parties.filter(
          (party) => party.partyId !== action.payload
        );
        state.success = 'Party deleted successfully!';
      })
      .addCase(deleteParty.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = partySlice.actions;
export default partySlice.reducer;