import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Response {
  id: number;
  answer: string;
  color: string;
}

interface Question {
  id: number;
  text: string;
  responses: Response[];
}

interface QuestionState {
  index: number;
  hasNext: boolean;
}

export interface Presentation {
  id: number;
  name: string;
  sessions: number;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface PresentationState {
  index: number;
  hasNext: boolean;
  isLoading?: boolean;
  presentation: Presentation;
}

export interface PresentationResponse {
  data: Presentation[];
}

const initialState: PresentationState = {
  index: 0,
  hasNext: true,
  isLoading: true,
  presentation: {
    id: 0,
    name: ``,
    sessions: 0,
    questions: [],
    createdAt: ``,
    updatedAt: ``,
  },
};

export const presentationSlice = createSlice({
  name: `presentation`,
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setNextQuestion: (state, action: PayloadAction<QuestionState>) => {
      state.index = action.payload.index;
      state.hasNext = action.payload.hasNext;
    },
    setPresentation: (state, action: PayloadAction<PresentationState>) => {
      state.index = action.payload.index;
      state.hasNext = action.payload.hasNext;
      state.presentation = action.payload.presentation;
      state.isLoading = false;
    },
  },
});

export const {
  setPresentation,
  setLoading,
  setNextQuestion,
} = presentationSlice.actions;
export default presentationSlice.reducer;
