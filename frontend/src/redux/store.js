import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import voterReducer from './slices/voterSlices';
import adminReducer from './slices/adminSlices';
import dashboardSlice from './slices/dashboardSlices';
import voterLoginSlice from './slices/voterLoginSlices';

export const store = configureStore({
  reducer: {
	  user: userReducer,
	  voters: voterReducer,
	  admin: adminReducer,
	  dashboard: dashboardSlice,
	  voter: voterLoginSlice,
  },
})

export default store;