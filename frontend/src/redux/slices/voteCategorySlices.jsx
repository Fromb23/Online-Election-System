import { createSlice } from "@reduxjs/toolkit";
import { fetchVoteCategories, addVoteCategory, deleteVoteCategory } from "../actions/voteCategoryActions";

const voteCategorySlice = createSlice({
	name: "voteCategory",
	initialState: {
	  categories: [],
	  loading: false,
	  error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
	  builder
		// Fetch categories
		.addCase(fetchVoteCategories.pending, (state) => {
		  state.loading = true;
		  state.error = null;
		})
		.addCase(fetchVoteCategories.fulfilled, (state, action) => {
		  state.loading = false;
		  state.categories = action.payload;
		})
		.addCase(fetchVoteCategories.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.payload;
		})
		// Add category
		.addCase(addVoteCategory.pending, (state) => {
		  state.loading = true;
		  state.error = null;
		})
		.addCase(addVoteCategory.fulfilled, (state, action) => {
		  state.loading = false;
		  state.categories.push(action.payload);
		})
		.addCase(addVoteCategory.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.payload;
		})
		// Delete category
		.addCase(deleteVoteCategory.pending, (state) => {
		  state.loading = true;
		  state.error = null;
		})
		.addCase(deleteVoteCategory.fulfilled, (state, action) => {
		  state.loading = false;
		  state.categories = state.categories.filter(
			(category) => category.voteCategoryId !== action.payload
		  );
		})
		.addCase(deleteVoteCategory.rejected, (state, action) => {
		  state.loading = false;
		  state.error = action.payload;
		});
	},
  });
  
  export default voteCategorySlice.reducer;