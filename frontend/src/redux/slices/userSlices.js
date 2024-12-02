import { createSlice } from '@reduxjs/toolkit'
const localStorageUserInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
	userInfo: localStorageUserInfo,
	loading: false,
	error: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		loginUserStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginUserSuccess: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
			localStorage.setItem('userInfo', JSON.stringify(action.payload))
		},
		loginUserFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;	
		},
		logout: (state) => {
			state.userInfo = null;
			localStorage.removeItem('userInfo');
		},
	},
})

export const { loginUserStart, loginUserSuccess, loginUserFail, logout } = userSlice.actions

export default userSlice.reducer
