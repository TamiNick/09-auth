import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { Session } from "@/types/session";
import { cookies } from "next/headers";
import { api } from "./api";
import type { AxiosResponse } from "axios";

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}): Promise<Note[]> => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await api.get<Note[]>("/notes", {
    params,
    headers: { Cookie: cookieHeader },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });

  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const { data } = await api.get<User>("/users/me", {
    headers: { Cookie: cookieHeader },
  });

  return data;
};

export const checkSession = async (): Promise<AxiosResponse<Session> | null> => {
  try {
    const cookieStore = cookies();

    const response = await api.get<Session>("/auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return response;
  } catch {
    return null;
  }
};