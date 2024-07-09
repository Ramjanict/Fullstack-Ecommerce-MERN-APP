import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      //console.log("user details", action.payload);
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
