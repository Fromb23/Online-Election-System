import api from '../../services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginVoter = createAsyncThunk(
  'voter/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/voters/login', credentials);

      if (!data.is_first_login) {
        localStorage.setItem('authToken', data.token);
      }
      localStorage.setItem('voterId', data.voterId);

      return { ...data, is_first_login: data.is_first_login };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);