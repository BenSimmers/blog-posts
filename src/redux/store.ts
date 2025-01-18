import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { blogSlice } from './blogSlice';

export const store = configureStore({
  reducer: {
    blog: blogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
