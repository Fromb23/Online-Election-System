import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Submit a vote
export const submitVote = createAsyncThunk(
  "vote/submitVote",
  async (voteData, { rejectWithValue }) => {
	try {
		console.log("Vote data Actions:", voteData);
	  const response = await api.post("/votes", voteData);
	  return response.data;
	} catch (err) {
		console.log("Error:", err);
	  return rejectWithValue(err.response.data.message || "Failed to submit vote.");
	}
  }
);