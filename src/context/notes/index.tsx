/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import * as Api from "../../api/api";
import { INote } from "../../types";

interface MyContextValue {
  isLoading: boolean;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setIsFavorite: (isFavorite: boolean) => void;
  isFavorite: boolean;
  getData: () => void;
  handleCreateNote: () => void;
  title: string;
  content: string;
  favoriteNotes: INote[];
  otherNotes: INote[];
  handleMarkAsFavorite: ({
    id,
    isFavorite,
  }: {
    id: number;
    isFavorite: string;
  }) => void;
  isEditing: number | null;
  isEditingNote: ({
    id,
    title,
    content,
  }: {
    id: number;
    title: string;
    content: string;
  }) => void;
  noteTitle: string;
  noteContent: string;
  isEditingColor: number | null;
  isChangingColor: (id: number) => void;
  changeTitle: ({ title, id }: { title: string; id: number }) => void;
  changeContent: ({ content, id }: { content: string; id: number }) => void;
  handleSetNewColor: (color: string) => void;
  handleDelete: (id: number) => void;
  setSearch: (search: string) => void;
  search: string;
  colorSelected: string;
  setColorSelected: (color: string) => void;
  handleGetByColor: (color: string) => void;
}

const NotesContext = createContext<MyContextValue | undefined>(undefined);

export const useNotesContext = (): MyContextValue => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used within a MyContextProvider");
  }
  return context;
};

export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");

  const [favoriteNotes, setFavoriteNotes] = useState([]);
  const [otherNotes, setOtherNotes] = useState([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isEditingColor, setIsEditingColor] = useState<number | null>(null);
  const [search, setSearch] = useState<string>("");
  const [colorSelected, setColorSelected] = useState<string>("");

  useEffect(() => {
    if (!userId) {
      getUser();
    }
    getData();
  }, []);

  const getFavoriteNotes = (notes: any) => {
    setFavoriteNotes(notes.filter((note: INote) => note.isFavorite === "1"));
  };

  const changeTitle = ({ title, id }: { title: string; id: number }) => {
    if (id !== isEditing) return;
    setNoteTitle(title);
  };

  const changeContent = ({ content, id }: { content: string; id: number }) => {
    if (id !== isEditing) return;
    setNoteContent(content);
  };

  const isChangingColor = (id: number) => {
    if (isEditingColor && isEditingColor === id) {
      setIsEditingColor(null);
      return;
    }

    setIsEditingColor(id);
  };

  const handleSetNewColor = (color: string) => {
    if (!isEditingColor) return;
    handleUpdateColor(color, isEditingColor);
  };

  const handleUpdateColor = async (color: string, id: number) => {
    const { data } = await Api.changeColor(id, color);

    if (data.error) {
      console.log("data.error");
      console.log(data.error);
      return;
    }

    const note = getNoteById(id) as any;
    note.color = color;

    if (note.isFavorite === "1") {
      const newFavoriteNotes = favoriteNotes.map((n: INote) =>
        n.id === id ? note : n
      ) as any;
      setFavoriteNotes(newFavoriteNotes);
    } else {
      const newOtherNotes = otherNotes.map((n: INote) =>
        n.id === id ? note : n
      ) as any;
      setOtherNotes(newOtherNotes);
    }
    setIsEditingColor(null);
  };

  const isEditingNote = ({
    id,
    title,
    content,
  }: {
    id: number;
    title: string;
    content: string;
  }) => {
    if (isEditing && isEditing === id) {
      handleUpdateNote();
      return;
    }

    setIsEditing(id);
    setNoteTitle(title);
    setNoteContent(content);
  };

  const getOtherNotes = (notes: any) => {
    setOtherNotes(notes.filter((note: INote) => note.isFavorite === "0"));
    setIsLoading(false);
  };

  const getData = async () => {
    const { data } = await Api.getAllNotes({
      title: search,
      color: colorSelected,
    });
    if (data.error) {
      console.log("results.error");
      console.log(data.error);
      return;
    }
    getFavoriteNotes(data.notes);
    getOtherNotes(data.notes);
  };

  const handleGetByColor = async (color: string) => {
    setIsLoading(true);
    if (color === "") setColorSelected("");
    setColorSelected(color);
    const { data } = await Api.getAllNotes({
      title: "",
      color,
    });

    if (data.error) {
      console.log("data.error");
      console.log(data.error);
      return;
    }

    getFavoriteNotes(data.notes);
    getOtherNotes(data.notes);
    setIsLoading(false);
  };

  const handleCreateNote = async () => {
    if (!title || !content) return;
    const { data } = await Api.createNote({
      title,
      content,
      user_id: userId,
      isFavorite: isFavorite ? "1" : "0",
    });

    if (data.error) {
      console.log("data.error");
      console.log(data.error);
      return;
    }

    data.note.color = "#FFFFFF";
    if (data.note.isFavorite === "1") {
      setFavoriteNotes([...favoriteNotes, data.note] as any);
    } else {
      setOtherNotes([...otherNotes, data.note] as any);
    }
    setTitle("");
    setContent("");
    setIsFavorite(false);
  };

  const getNoteById = (id: number) => {
    const note = favoriteNotes.find((note: INote) => note.id === id);

    if (note) {
      return note;
    }

    return otherNotes.find((note: INote) => note.id === id);
  };

  const handleUpdateNote = async () => {
    const { data } = await Api.updateNote(
      isEditing as number,
      noteTitle,
      noteContent,
      parseInt(userId)
    );

    if (data.error) {
      console.log("data.error");
      console.log(data.error);
      return;
    }

    setIsEditing(null);
    setNoteTitle("");
    setNoteContent("");

    // buscando a nota que foi editada
    const note = getNoteById(isEditing as number) as any;

    if (note) {
      note.title = noteTitle;
      note.content = noteContent;
      if (note.isFavorite === "1") {
        const newFavoriteNotes = favoriteNotes.map((n: INote) =>
          n.id === note.id ? note : n
        ) as any;
        setFavoriteNotes(newFavoriteNotes);
      } else {
        const newOtherNotes = otherNotes.map((n: INote) =>
          n.id === note.id ? note : n
        ) as any;
        setOtherNotes(newOtherNotes);
      }
    }
    setIsEditing(null);
    setNoteTitle("");
    setNoteContent("");
  };

  const handleDelete = async (id: number) => {
    const { data } = await Api.deleteNote(id);

    if (data.error) {
      console.log("data.error");
      console.log(data.error);
      return;
    }

    const note = getNoteById(id) as any;

    if (note) {
      if (note.isFavorite === "1") {
        const newFavoriteNotes = favoriteNotes.filter(
          (n: INote) => n.id !== id
        ) as any;
        setFavoriteNotes(newFavoriteNotes);
      } else {
        const newOtherNotes = otherNotes.filter(
          (n: INote) => n.id !== id
        ) as any;
        setOtherNotes(newOtherNotes);
      }
    }
  };

  const getUser = async () => {
    const { data } = await Api.getProfile();
    if (data.error) {
      console.log("data.error");
      console.log(data.error);
      return;
    }

    if (data.user) {
      setUserId(data.user.id);
    }
  };

  const handleMarkAsFavorite = async ({
    id,
    isFavorite,
  }: {
    id: number;
    isFavorite: string;
  }) => {
    const { data } = await Api.markAsFavorite(id);

    if (data.error) {
      console.log("data");
      console.log(data);
      return;
    }
    setIsLoading(true);
    if (isFavorite === "1") {
      const note = favoriteNotes.find((note: INote) => note.id === id) as any;
      note.isFavorite = "0";
      const newFavoriteNotes = favoriteNotes.filter(
        (note: INote) => note.id !== id
      );
      setFavoriteNotes(newFavoriteNotes);
      setOtherNotes([...otherNotes, note] as any);
    } else {
      const note = otherNotes.find((note: INote) => note.id === id) as any;
      note.isFavorite = "1";
      const newOtherNotes = otherNotes.filter((note: INote) => note.id !== id);
      setOtherNotes(newOtherNotes);
      setFavoriteNotes([...favoriteNotes, note] as any);
    }
    setIsLoading(false);
  };

  const contextValue: MyContextValue = {
    isLoading,
    setTitle,
    title,
    setContent,
    content,
    setIsFavorite,
    isFavorite,
    handleCreateNote,
    favoriteNotes,
    otherNotes,
    handleMarkAsFavorite,
    isEditing,
    isEditingNote,
    noteTitle,
    noteContent,
    changeTitle,
    changeContent,
    isEditingColor,
    isChangingColor,
    handleSetNewColor,
    handleDelete,
    setSearch,
    search,
    colorSelected,
    setColorSelected,
    getData,
    handleGetByColor,
  };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};
