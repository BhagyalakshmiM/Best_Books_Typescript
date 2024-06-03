import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { ImageObjectProp } from '../Types/types';

type BookListType = {
  bookList: Array<ImageObjectProp>;
  bookFavoriteList: Array<ImageObjectProp>;
}

// Define the initial state using that type
const initialState: BookListType = {
  bookList: [],
  bookFavoriteList: []
};

export const bookListSlice = createSlice({
  name: 'bookList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setBookList: (state, action: PayloadAction<Array<ImageObjectProp>>) => {
      state.bookList = action.payload;
    },
    setBookFavoriteList: (state, action: PayloadAction<ImageObjectProp>) => {
      state.bookFavoriteList.push(action.payload);
    },
    removeBookFavoriteList: (state, action: PayloadAction<ImageObjectProp>) => {
      let elementIndex = state.bookFavoriteList.findIndex(ele => action.payload.primary_isbn13  === ele.primary_isbn13);
      state.bookFavoriteList.splice(elementIndex,1);
    }
  }
})

export const { setBookList, setBookFavoriteList, removeBookFavoriteList } = bookListSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBookList = (state: RootState) => state.bookList

export default bookListSlice.reducer