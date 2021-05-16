import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Presentation } from './index';

export interface AuthUser {
  isLoggedIn: boolean;
  user: UserState;
}

export interface UserState {
  id: string;
  name: string;
  presentations: Presentation[];
  selectedPresentation: Presentation;
  isAuthenticated: boolean;
  failedAttempts: number;
}

export const initialState: UserState = {
  id: ``,
  name: ``,
  presentations: [],
  selectedPresentation: {
    createdAt: ``,
    id: 0,
    name: ``,
    questions: [],
    updatedAt: ``,
  },
  isAuthenticated: false,
  failedAttempts: 0,
};

export const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.isAuthenticated = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    resetUserInfo: (state) => {
      state.id = ``;
      state.name = ``;
      state.isAuthenticated = false;
    },
    increaseAuthFailedAttempts: (state) => {
      state.isAuthenticated = false;
      state.failedAttempts += 1;
    },
    setUserPresentations: (state, action: PayloadAction<Presentation[]>) => {
      state.presentations = action.payload;
    },
    setSelectedPresentation: (state, action: PayloadAction<number>) => {
      const presentation = state.presentations.filter(
        (p) => p.id === action.payload,
      )[0];
      state.selectedPresentation = presentation;
    },
  },
});

export const {
  setUserInfo,
  resetUserInfo,
  increaseAuthFailedAttempts,
  setUserPresentations,
  setSelectedPresentation,
} = userSlice.actions;
export default userSlice.reducer;
