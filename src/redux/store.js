import { configureStore } from '@reduxjs/toolkit';
import resultSlice from './resultSlice';

export const store = configureStore({
  reducer: { results: resultSlice },
});
