import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import voterReducer from './slices/voterSlices';

export const store = configureStore({
  reducer: {
	  user: userReducer,
	  voters: voterReducer
  },
})
