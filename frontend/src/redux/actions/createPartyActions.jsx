import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchParties = createAsyncThunk(
  'party/fetchParties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/parties');
      return response.data
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addParty = createAsyncThunk(
  'party/addParty',
  async (partyData, { rejectWithValue }) => {
    try {
      const response = await api.post('/parties', partyData);
      return response.data;
	} catch (err) {
		return rejectWithValue(err.message);
	}
  }
);

export const deleteParty = createAsyncThunk(
  'party/deleteParty',
  async (partyId, { rejectWithValue }) => {
    try {
      await api.delete(`/parties/${partyId}`);
      return partyId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateParty = createAsyncThunk(
  'party/updateParty',
  async ({partyId, partyData}, { rejectWithValue }) => {
    try {
      const response = await api.put(`/parties/${partyId}`, partyData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);