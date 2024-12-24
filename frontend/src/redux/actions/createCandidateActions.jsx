import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk to fetch parties and vote categories
export const fetchPartiesAndCategories = createAsyncThunk(
  'createCandidate/fetchPartiesAndCategories',
  async (_, { rejectWithValue }) => {
    try {
      const partyResponse = await api.get('/api/parties');
      const categoryResponse = await api.get('/api/voteCategories');
      return {
        parties: partyResponse.data,
        voteCategories: categoryResponse.data,
      };
    } catch (err) {
      return rejectWithValue('Failed to fetch data');
    }
  }
);

// Async thunk to create a candidate
export const createCandidate = createAsyncThunk(
  'createCandidate/createCandidate',
  async (candidateData, { rejectWithValue }) => {
    try {
      await api.post('/api/candidates', candidateData);
      return 'Candidate created successfully!';
    } catch (err) {
      return rejectWithValue('Failed to create candidate. Please try again.');
    }
  }
);