import {
  PresentationResponse,
  PresentationState,
  UserState,
  SessionState,
} from '@/store';

import axios from 'axios';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE_URL;
const LOCAL_API_ENDPOINT = process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL;

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  name: string;
  password: string;
}

export const request = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': `application/json`,
  },
});

export const localRequest = axios.create({
  baseURL: LOCAL_API_ENDPOINT,
  withCredentials: true,
  headers: {
    'Content-Type': `application/json`,
  },
});

export const createNewUser = async (
  payload: RegisterPayload,
): Promise<UserState> => {
  const data = await request
    .post<UserState>(`/registration`, { user: payload })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return data;
};

export const createUserSession = async (
  payload: LoginPayload,
): Promise<UserState> => {
  const data = await localRequest
    .post<UserState>(`/session`, payload)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return data;
};

export const deleteSession = async () => {
  await localRequest.delete(`/session`);
};

export const updateUser = async (payload: UpdateUserPayload) => {
  await localRequest.put(`/users`, { user: payload });
};

export const fetchCurrentUser = async (
  cookie: string,
): Promise<UserState | null> => {
  const data = await request
    .get<UserState>(`/user/me`, {
      headers: {
        Cookie: cookie,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return data;
};

export const joinPresentation = async (code: string) => {
  const data = await request
    .post(`/presentations/join`, {
      code,
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return data;
};

export const fetchCurrentPresentation = async (sessionId: string) => {
  const data = await request
    .get<PresentationState>(`/presentations/session/${sessionId}`)
    .then((response) => response.data);

  return data;
};

export const fetchUserPresentations = async (cookie: string) => {
  const data = request
    .get<PresentationResponse>(`/presentations`, {
      headers: { Cookie: cookie },
    })
    .then((response) => response.data.data);

  return data;
};

export const createPresentation = async (payload: any) => {
  const data = await localRequest
    .post(`/presentations`, { presentation: payload })
    .then((response) => response.data);
  return data;
};

export const createSession = async (presentationId: string) => {
  const data = await request
    .post<SessionState>(`/presentations/session`, {
      presentation_id: presentationId,
    })
    .then((response) => response.data);

  return data;
};

export const updateUserPassword = async (password: string, token: string) => {
  const data = await request.put(`/password_reset`, { password, token });
  return data;
};

export const maybeForgotPassword = async (email: string) => {
  const data = await request.post(`/password_reset`, { email });
  return data;
};
