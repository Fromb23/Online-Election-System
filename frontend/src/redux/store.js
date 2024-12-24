import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import voterReducer from './slices/voterSlices';
import adminReducer from './slices/adminSlices';
import dashboardSlice from './slices/dashboardSlices';
import voterLoginSlice from './slices/voterLoginSlices';
import locationSlice from './slices/locationSlices';
import voteCategorySlice from './slices/voteCategorySlices';
import createCandidateSlice from './slices/createCandidateSlices';
import createPartySlice from './slices/createPartySlices';

export const store = configureStore({
  reducer: {
	  user: userReducer,
	  voters: voterReducer,
	  admin: adminReducer,
	  dashboard: dashboardSlice,
	  voter: voterLoginSlice,
	  location: locationSlice,
	  voteCategory: voteCategorySlice,
	  createCandidate: createCandidateSlice,
	  party: createPartySlice,
  },
})

export default store;