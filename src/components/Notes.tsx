/* eslint-disable @typescript-eslint/no-explicit-any */
import "../styles/components/Notes.scss";
import { useNotesContext } from "../context/notes";
import Skeleton from "@mui/material/Skeleton";
import Note from "./Note";

export default function Notes() {
  const { favoriteNotes, otherNotes, isLoading } = useNotesContext();

  const RenderLoading = (
    <>
      <Skeleton
        className="skeleton"
        variant="rectangular"
        width={390}
        height={437}
      />
      <Skeleton
        className="skeleton"
        variant="rectangular"
        width={390}
        height={437}
      />
      <Skeleton
        className="skeleton"
        variant="rectangular"
        width={390}
        height={437}
      />
    </>
  );

  return (
    <div className="notes-list">
      {(favoriteNotes.length > 0 || isLoading) && (
        <>
          <h2>Favoritos</h2>
          <div className="favorites-list">
            {isLoading ? (
              <>{RenderLoading}</>
            ) : (
              favoriteNotes.map((note: any) => (
                <Note key={note.id} note={note} />
              ))
            )}
          </div>
        </>
      )}
      {(otherNotes.length > 0 || isLoading) && (
        <>
          <h2>Outras</h2>
          <div className="others-list">
            {isLoading ? (
              <>{RenderLoading}</>
            ) : (
              otherNotes.map((note: any) => <Note key={note.id} note={note} />)
            )}
          </div>
        </>
      )}
    </div>
  );
}
