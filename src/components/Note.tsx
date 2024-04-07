import "../styles/components/Note.scss";
import { IoMdClose } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { PainsIcon } from "../assets/icons/icons";
import { IoMdStarOutline } from "react-icons/io";

export default function Note() {
  return (
    <div className="note">
      <div className="title-and-favorite-button">
        <input type="text" placeholder="Título" />
        <IoMdStarOutline />
      </div>
      <hr />
      <div className="note-content">
        <textarea
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dicta!"
          value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, dicta!"
        ></textarea>
      </div>
      <div className="note-actions">
        <div>
          <LuPencil />
          <PainsIcon className="note-color" />
        </div>
        <IoMdClose />
      </div>
    </div>
  );
}
