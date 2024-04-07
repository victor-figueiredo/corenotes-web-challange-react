import "../styles/components/NoteCreator.scss";
import { IoMdStarOutline } from "react-icons/io";

export default function NoteCreator() {
  return (
    <div className="creation-inputs">
      <div>
        <input type="text" placeholder="Título" />
        <IoMdStarOutline />
      </div>
      <hr />
      <textarea placeholder="Criar nota..." style={{ resize: "none" }} />
    </div>
  );
}
