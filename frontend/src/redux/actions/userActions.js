import api from '../../services/api';
import { loginUserStart, loginUserSuccess, loginUserFail } from '../slices/userSlices';

export const login = (userData) => async (dispatch) => {
	try {
		dispatch(loginUserStart());
		const res = await api.post('/admins/login', userData);
		console.log(userData);
		dispatch(loginUserSuccess(res.data))
	} catch (error) {
		const message = error.response?.data?.message  ? error.response?.data?.message : error.message;
		dispatch(loginUserFail(message));
	}
};
