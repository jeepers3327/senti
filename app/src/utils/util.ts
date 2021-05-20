import { PresentationState, SessionState } from '@/store';

export const isObjectEmpty = (object: any) => Object.keys(object).length === 0;

export const formatSession = (session: any): SessionState => ({
  id: session.id,
  presentationId: session.presentation_id,
  accessCode: session.access_code,
  status: session.status,
});

export const formatPresentation = (payload: any): PresentationState => ({
  index: payload.current_index,
  hasNext: payload.has_next,
  presentation: {
    id: payload.presentation.presentation_id,
    name: payload.presentation.presentation_name,
    questions: payload.presentation.questions,
    sessions: payload.presentation.sessions,
    createdAt: payload.presentation.createdAt,
    updatedAt: payload.presentation.updatedAt,
  },
});

export const isLoggedIn = (cookie: { [key: string]: string }) =>
  Object.prototype.hasOwnProperty.call(cookie, `_senti_key`);
