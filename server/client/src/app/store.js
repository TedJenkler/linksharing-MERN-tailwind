import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});