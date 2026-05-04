import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null, firstname:null, url_profile: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
    },
    updateProfileImage: (state, action) => {
      state.value.url_profile = action.payload;
    },
  },
});

export const { login, logout, updateProfileImage } = userSlice.actions;
export default userSlice.reducer;