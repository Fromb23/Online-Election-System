// src/redux/actions/createCandidateActions.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk to fetch candidates and vote categories
export const fetchCandidatesAndCategories = createAsyncThunk(
  'candidateManagement/fetchCandidatesAndCategories',
  async (_, { rejectWithValue }) => {
    try {
      const partyResponse = await api.get('/parties');
      const categoryResponse = await api.get('/voteCategories');
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
  'candidateManagement/createCandidate',
  async (candidateData, { rejectWithValue }) => {
    try {
      console.log("Candidate data actions: ", candidateData);
      const response = await api.post('/candidates', candidateData);
      return response.data;      
    } catch (err) {
      console.log("Action error: ", err);
      return rejectWithValue('Failed to create candidate. Please try again.');
    }
  }
);

// Async thunk to fetch a candidate by ID (used for updating candidate data)
export const fetchCandidateById = createAsyncThunk(
  'candidateManagement/fetchCandidateById',
  async (candidateId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/candidates/${candidateId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch candidate.');
    }
  }
);

// Async thunk to update a candidate's details
export const updateCandidate = createAsyncThunk(
  'candidateManagement/updateCandidate',
  async ({ id, candidate }, { rejectWithValue }) => {
    try {
      console.log("Updating candidate: ", candidate);
      const response = await api.put(`/candidates/${id}`, candidate);
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to update candidate.');
    }
  }
);

// Async thunk to delete a candidate
export const deleteCandidate = createAsyncThunk(
  'candidateManagement/deleteCandidate',
  async (candidateId, { rejectWithValue }) => {
    try {
      console.log("Candidate ID fronted: ", candidateId);
      await api.delete(`/candidates/${candidateId}`);
      return candidateId;
    } catch (err) {
      return rejectWithValue('Failed to delete candidate.');
    }
  }
);

export const fetchPartiesAndCategories = createAsyncThunk(
  'party/fetchPartiesAndCategories',
  async (_, { rejectWithValue }) => {
    try {
      const partiesResponse = await api.get('/parties');
      const categoriesResponse = await api.get('/voteCategories');
      return { parties: partiesResponse.data, categories: categoriesResponse.data };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// In createCandidateActions.js
export const fetchCandidates = createAsyncThunk(
  'candidate/fetchCandidates',
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching candidates");
      const response = await api.get('/candidates');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);