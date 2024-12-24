import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Thunks for async actions
export const fetchVoteCategorY = createAsyncThunk(
  "voteCategory/fetchVoteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/voteCategories/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Failed to fetch categories.");
    }
  }
);

// Get all vote categories
export const fetchVoteCategories = createAsyncThunk(
  "voteCategory/fetchVoteCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/voteCategories");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Failed to fetch categories.");
    }
  }
);

export const addVoteCategory = createAsyncThunk(
  "voteCategory/addVoteCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await api.post("/voteCategories", category);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Failed to add category.");
    }
  }
);

export const deleteVoteCategory = createAsyncThunk(
  "voteCategory/deleteVoteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/voteCategories/${id}`);
      return id;
     } catch (err) {
      return rejectWithValue(err.response.data.message || "Failed to delete category.");
    }
  }
);

export const updateVoteCategory = createAsyncThunk(
  "voteCategory/updateVoteCategory",
  async ({ id, category }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/voteCategories/${id}`, category);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Failed to update category.");
    }
  }
);