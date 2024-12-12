import api from '../../services/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginVoter = createAsyncThunk(
  'voter/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/voter', credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Login failed');
    }
  }
);
