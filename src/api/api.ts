import { AxiosResponse } from "axios";
import httpClient from "./httpClient";
import { INote } from "../types";

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse> =>
  await httpClient.post("/auth/login", { email, password });

export const getProfile = async () => await httpClient.post("/auth/user", {});

export const register = async (
  email: string,
  password: string,
  name: string
): Promise<AxiosResponse> => {
  try {
    const response = await httpClient.post("/user", { name, email, password });
    return response;
  } catch (error) {
    throw new Error("Failed to register user");
  }
};

export const logout = async (): Promise<AxiosResponse> => {
  try {
    const response = await httpClient.post("/auth/logout");
    return response;
  } catch (error) {
    throw new Error("Failed to logout");
  }
};

export const getAllNotes = async ({
  title,
  color,
}: {
  title: string;
  color: string;
}): Promise<AxiosResponse> => {
  if (title || color) {
    const params = { title, color };
    return await httpClient.get("/notes", { params });
  }
  return await httpClient.get("/notes");
};

export const createNote = async (note: INote): Promise<AxiosResponse> =>
  await httpClient.post("/note", note);

export const updateNote = async (
  id: number,
  title: string,
  content: string,
  user_id: number
): Promise<AxiosResponse> => {
  const response = await httpClient.put(`/note/${id}`, {
    title,
    content,
    user_id,
  });
  return response;
};

export const markAsFavorite = async (id: number): Promise<AxiosResponse> =>
  await httpClient.put(`/note/${id}/favorite`);

export const changeColor = async (
  id: number,
  color: string
): Promise<AxiosResponse> => {
  const response = await httpClient.put(`/note/${id}/color`, { color });
  return response;
};

export const deleteNote = async (id: number): Promise<AxiosResponse> =>
  await httpClient.delete(`/note/${id}`);
