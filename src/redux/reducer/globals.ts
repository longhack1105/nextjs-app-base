import { error } from 'console';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface GlobalState {
  isOpenMenu: boolean;
  isOpenDialog: boolean;
  activeNoti: boolean;
  error: any;
}

const initialState: GlobalState = {
  isOpenMenu: true,
  isOpenDialog: false,
  activeNoti: false,
  error: null,
};

const globalsSlice = createSlice({
  name: 'globals',
  initialState,
  reducers: {
    setIsOpenMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpenMenu = action.payload;
    },
    setIsOpenDialog: (state, action: PayloadAction<boolean>) => {
      state.isOpenDialog = action.payload;
    },
    setActiveNoti: (state, action: PayloadAction<boolean>) => {
      state.activeNoti = action.payload;
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

export const { setIsOpenMenu, setIsOpenDialog, setActiveNoti, setError } = globalsSlice.actions;

export default globalsSlice.reducer;
