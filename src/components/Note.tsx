/* eslint-disable @typescript-eslint/no-explicit-any */
import "../styles/components/Note.scss";
import { IoMdClose } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { PainsIcon, StartIcon } from "../assets/icons/icons";
import { INoteProps } from "../types";
import { useNotesContext } from "../context/notes";
import ColorPalette from "./ColorPallete";

type INoteComponent = {
  key: number;
  note: INoteProps;
};

export default function Note({ note, key }: INoteComponent) {
  const {
    handleMarkAsFavorite,
    isEditing,
    isEditingNote,
    isEditingColor,
    noteTitle,
    noteContent,
    changeTitle,
    changeContent,
    isChangingColor,
    handleDelete,
  } = useNotesContext();

  return (
    <div className="note-container">
      <div className="note" key={key}>
        <div
          className="title-and-favorite-button"
          style={{ backgroundColor: note.color }}
        >
          <input
            type="text"
            placeholder="Título"
            value={note.id === isEditing ? noteTitle : note.title}
            onChange={(e) =>
              changeTitle({ title: e.target.value, id: note.id } as {
                title: string;
                id: number;
              })
            }
          />
          <StartIcon
            enabled={note.isFavorite === "1"}
            onClick={() =>
              handleMarkAsFavorite({
                id: note.id as number,
                isFavorite: note.isFavorite as string,
              })
            }
          />
        </div>
        <hr />
        <div className="note-content">
          <textarea
            value={note.id === isEditing ? noteContent : note.content}
            placeholder="Digite o conteúdo..."
            style={{ backgroundColor: note.color }}
            onChange={(e) =>
              changeContent({ content: e.target.value, id: note.id } as {
                content: string;
                id: number;
              })
            }
          ></textarea>
        </div>
        <div className="note-actions" style={{ backgroundColor: note.color }}>
          <div className="first-buttons">
            <div
              className={`icon-box ${note.id === isEditing && "editing"}`}
              onClick={() =>
                isEditingNote({
                  id: note.id,
                  title: note.title,
                  content: note.content,
                } as any)
              }
            >
              <LuPencil className="is-editing-content" />
            </div>
            <div
              className={`icon-box ${note.id === isEditingColor && "editing"}`}
              onClick={() => isChangingColor(note.id)}
            >
              <PainsIcon className="is-editing-color" />
            </div>
          </div>
          <IoMdClose onClick={() => handleDelete(note.id)} />
        </div>
      </div>
      <ColorPalette show={note.id === isEditingColor} />
    </div>
  );
}
