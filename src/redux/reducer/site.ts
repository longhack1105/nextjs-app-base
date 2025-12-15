import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum enumDeviceType {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
}

export interface SiteState {
  loading: boolean;
  darkMode: boolean;
  deviceType?: enumDeviceType;
  isConnectSocket?: boolean;
}

const initialState: SiteState = {
  loading: true,
  darkMode: false,
  deviceType: undefined,
  isConnectSocket: false,
};

export const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload;
    },
    toogleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDeviceType: (state, action: PayloadAction<enumDeviceType | undefined>) => {
      state.deviceType = action?.payload;
    },
    setIsConnectSocket: (state, action: PayloadAction<boolean>) => {
      state.isConnectSocket = action?.payload;
    },
  },
});

export const { setLoading, toogleDarkMode, setDeviceType, setIsConnectSocket } = siteSlice.actions;
// Action creators are generated for each case reducer function
export default siteSlice.reducer;
