import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export interface NotesResponse {
  notes: Note[];
  totalCount: number;
}

export const fetchNotes = async (
  params?: FetchNotesParams
): Promise<NotesResponse> => {
  const { data } = await api.get<NotesResponse>("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  note: Pick<Note, "title" | "content" | "tag">
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", credentials);
  return data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await api.get<User | null>("/auth/session");
  return data || null;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (userData: Partial<User>): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", userData);
  return data;
};