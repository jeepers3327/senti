import { configureStore } from '@reduxjs/toolkit';
import { presentationReducer, sessionReducer, userReducer } from './index';

export const store = configureStore({
  reducer: {
    presentation: presentationReducer,
    session: sessionReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
