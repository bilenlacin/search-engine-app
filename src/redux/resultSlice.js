import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getResultsAsync = createAsyncThunk(
  'results/getResultsAsync',
  async () => {
    const res = await fetch('http://localhost:3000/mockData.json')
      .then((response) => response.json())
      .then((res) => res.data);
    return await res;
  }
);

export const resultSlice = createSlice({
  name: 'results',
  initialState: {
    items: [],
    search: '',
  },
  reducers: {
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: {
    [getResultsAsync.fulfilled]: (state, action) => {
      state.items = action.payload.filter((item) => {
        if (item[0].toLowerCase().includes(state.search.toLowerCase())) {
          return item;
        }
        return false;
      });
    },
  },
});

export const { changeSearch } = resultSlice.actions;
export default resultSlice.reducer;
