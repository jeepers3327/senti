import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SessionState {
  id: number;
  presentationId: number;
  accessCode: string;
  status: 'ready' | 'started' | 'ended';
}

const initialState: SessionState = {
  id: 0,
  accessCode: ``,
  presentationId: 0,
  status: `ready`,
};

export const sessionSlice = createSlice({
  name: `session`,
  initialState,
  reducers: {
    setSessionInfo: (state, action: PayloadAction<SessionState>) => {
      state.id = action.payload.id;
      state.accessCode = action.payload.accessCode;
      state.presentationId = action.payload.presentationId;
      state.status = action.payload.status;
    },
  },
});

export const { setSessionInfo } = sessionSlice.actions;
export default sessionSlice.reducer;
