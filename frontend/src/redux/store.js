import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import voterReducer from './slices/voterSlices';
import adminReducer from './slices/adminSlices';


export const store = configureStore({
  reducer: {
	  user: userReducer,
	  voters: voterReducer,
	  admin: adminReducer,
  },
})

export default store;