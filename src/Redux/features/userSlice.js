import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    removeUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { getUser, removeUser, fetchUserInitial } = userSlice.actions;
export default userSlice.reducer;
