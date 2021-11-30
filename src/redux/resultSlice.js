import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

export const getResultsAsync = createAsyncThunk(
  'results/getResultsAsync',
  async () => {
    const res = await fetch('http://localhost:3000/mockData.json')
      .then((response) => response.json())
      .then((res) => res.data);
    return await res;
  }
);
export const getDataAsync = createAsyncThunk(
  'results/getDataAsync',
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
    sorting: '',
  },
  reducers: {
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    sortData: (state, action) => {
      state.sorting = action.payload;
      const currentState = JSON.parse(JSON.stringify(state.items));

      if (state.sorting === 'nameAscending') {
        let filtered = currentState
          .filter((item) => {
            return item[0];
          })
          .sort(function (a, b) {
            var nameA = a[0].toUpperCase();
            var nameB = b[0].toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            return 0;
          });
        state.items = filtered;
      } else if (state.sorting === 'nameDescending') {
        let filtered = currentState
          .filter((item) => {
            return item[0];
          })
          .sort(function (a, b) {
            var nameA = a[0].toUpperCase();
            var nameB = b[0].toUpperCase();
            if (nameB < nameA) {
              return -1;
            }
            if (nameB > nameA) {
              return 1;
            }

            return 0;
          });
        state.items = filtered;
      } else if (state.sorting === 'yearAscending') {
        let filtered = currentState
          .filter((item) => {
            return item[3];
          })
          .slice()
          .sort(
            (a, b) =>
              Date.parse(new Date(a[3].split('/').reverse().join('-'))) -
              Date.parse(new Date(b[3].split('/').reverse().join('-')))
          );
        state.items = filtered;
      } else if (state.sorting === 'yearDescending') {
        let filtered = currentState
          .filter((item) => {
            return item[3];
          })
          .slice()
          .sort(
            (a, b) =>
              Date.parse(new Date(b[3].split('/').reverse().join('-'))) -
              Date.parse(new Date(a[3].split('/').reverse().join('-')))
          );
        state.items = filtered;
      }
    },
  },
  extraReducers: {
    [getResultsAsync.fulfilled]: (state, action) => {
      state.items = action.payload.filter((item) => {
        if (item[0].toLowerCase().includes(state.search.toLowerCase())) {
          item.push(nanoid());
          return item;
        }
        return false;
      });
      state.search = '';
    },
    [getDataAsync.fulfilled]: (state, action) => {
      state.items = action.payload.map((item) => {
        item.push(nanoid());
        return item;
      });
    },
  },
});

export const { changeSearch, sortData } = resultSlice.actions;
export default resultSlice.reducer;
