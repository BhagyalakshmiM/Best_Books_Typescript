import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { ImageObjectProp } from '../Types/types';

type BookListType = {
  bookList: Array<ImageObjectProp>;
  bookFavoriteList: Array<ImageObjectProp>;
  searchStr: string;
}

type UpdatePropType = {
  item: ImageObjectProp,
  price: string,
  rating: number
}

// Define the initial state using that type
const initialState: BookListType = {
  bookList: [],
  bookFavoriteList: [],
  searchStr: ''
};

export const bookListSlice = createSlice({
  name: 'booListStore',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // setting the main list from api call
    setBookList: (state, action: PayloadAction<Array<ImageObjectProp>>) => {
      state.bookList = action.payload;
    },
    // setting favorite list to redux state
    setBookFavoriteList: (state, action: PayloadAction<ImageObjectProp>) => {
      state.bookFavoriteList.push(action.payload);
    },
    //removing item from favorite list
    removeBookFavoriteList: (state, action: PayloadAction<ImageObjectProp>) => {
      let elementIndex = state.bookFavoriteList.findIndex(ele => action.payload.primary_isbn13  === ele.primary_isbn13);
      state.bookFavoriteList.splice(elementIndex,1);
    },
    // updating price and rate of book item
    updatePriceRating: (state, action: PayloadAction<UpdatePropType>) => {
      let elementIndex = state.bookFavoriteList.findIndex(ele => action.payload.item.primary_isbn13  === ele.primary_isbn13);
      state.bookFavoriteList.splice(elementIndex,1, {...action.payload.item, price: action.payload.price.toString(), rank: action.payload.rating});
    },
    //storing search string to redux state
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchStr = action.payload;
    }
  }
})

export const { setBookList, setBookFavoriteList, removeBookFavoriteList, updatePriceRating, setSearchString } = bookListSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectBookList = (state: RootState) => state.booListStore

export default bookListSlice.reducer