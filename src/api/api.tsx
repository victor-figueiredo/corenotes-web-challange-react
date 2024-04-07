import { AxiosResponse } from "axios";
import httpClient from "./httpClient";
import { Note } from "../types";

export const getAllNotes = async (): Promise<AxiosResponse> => {
  try {
    const { data } = await httpClient.get("/notes");
    return data;
  } catch (error) {
    throw new Error("Failed to get notes");
  }
};

export const createNote = async (note: Note): Promise<AxiosResponse> => {
  try {
    const response = await httpClient.post("/notes", note);
    return response;
  } catch (error) {
    throw new Error("Failed to create note");
  }
};

export const updateNote = async (
  id: string,
  note: Note
): Promise<AxiosResponse> => {
  try {
    const response = await httpClient.put(`/notes/${id}`, note);
    return response;
  } catch (error) {
    throw new Error("Failed to update note");
  }
};

export const deleteNote = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await httpClient.delete(`/notes/${id}`);
    return response;
  } catch (error) {
    throw new Error("Failed to delete note");
  }
};
