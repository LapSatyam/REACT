import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    activeTab: "photos",
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setActiveTabs(state, action) {
      state.activeTab = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearResults(state) {
      state.results = [];
      state.error = null;
    },
  },
});

export const {
  setQuery,
  setActiveTabs,
  setError,
  setLoading,
  setResults,
  clearResults,
} = searchSlice.actions;

export default searchSlice.reducer;
