import { configureStore } from '@reduxjs/toolkit';
import listsReducer from './testing/features/quizSlice';

const store = configureStore({
  reducer: {
    lists: listsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
