import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
  lists: string[][];
}

const initialState: ListsState = {
  lists: []
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ index: number; items: string[] }>) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },
    setDraggedItems: (
      state,
      action: PayloadAction<{ index: number; items: string[] }>
    ) => {
      const { index, items } = action.payload;
      if (index >= 0) {
        state.lists[index] = items;
      }
    },
    resetLists: (state, action: PayloadAction<string[][]>) => {
      state.lists = action.payload;
    }
  }
});

export const { addList, setDraggedItems, resetLists } = listsSlice.actions;
export default listsSlice.reducer;
