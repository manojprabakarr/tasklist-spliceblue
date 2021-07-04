import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    AuthorizedUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { AuthorizedUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
