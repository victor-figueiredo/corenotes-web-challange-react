import "../styles/components/NoteCreator.scss";
import { useNotesContext } from "../context/notes";
import { StartIcon } from "../assets/icons/icons";
import { CiCirclePlus } from "react-icons/ci";

export default function NoteCreator() {
  const {
    handleCreateNote,
    isFavorite,
    setIsFavorite,
    setTitle,
    title,
    setContent,
    content,
  } = useNotesContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateNote();
  };

  return (
    <div className="creation-inputs">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <StartIcon
            onClick={() => setIsFavorite(!isFavorite)}
            enabled={isFavorite}
          />
          <button type="submit">
            <CiCirclePlus />
          </button>
        </div>
        <hr />
        <textarea
          name="content"
          value={content}
          placeholder="Criar nota..."
          style={{ resize: "none" }}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
    </div>
  );
}
