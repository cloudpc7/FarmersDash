import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'anonymous',
  method: null,
  phone: null,
  notice: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signInPlaceholder(state, action) {
      state.status = 'signedIn';
      state.method = action.payload.method;
      state.phone = action.payload.phone ?? null;
      state.notice = action.payload.notice ?? null;
    },
    setNotice(state, action) {
      state.notice = action.payload;
    },
    clearNotice(state) {
      state.notice = null;
    },
    signOut() {
      return initialState;
    },
  },
});

export const { signInPlaceholder, setNotice, clearNotice, signOut } = sessionSlice.actions;
export const selectSession = (state) => state.session;
export default sessionSlice.reducer;
