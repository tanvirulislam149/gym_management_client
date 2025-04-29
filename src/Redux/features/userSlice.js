import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "getUser",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { getUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
