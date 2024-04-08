import { useContext } from "react";
import { LogoIcon } from "../assets/icons/icons";
import "../styles/components/Navbar.scss";
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../context/auth";
import { useNotesContext } from "../context/notes";

const Navbar = () => {
  const { handleLogout } = useContext(AuthContext);
  const { getData, search, setSearch, colorSelected, handleGetByColor } =
    useNotesContext();

  const colorList = [
    "#BAE2FF",
    "#B9FFDD",
    "#FFE8AC",
    "#FFCAB9",
    "#F99494",
    "#9DD6FF",
    "#ECA1FF",
    "#DAFF8B",
    "#FFA285",
    "#CDCDCD",
    "#979797",
    "#A99A7C",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className="navbar">
      <div className="logo-and-title">
        <LogoIcon className="logo" />
        <h1>CoreNotes</h1>
      </div>
      <div className="search-input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pesquisar notas"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <IoMdSearch className="search-icon" />
          </button>
        </form>
        <div className="color-select">
          <select
            value={colorSelected}
            style={{ background: colorSelected || "#FFFFFF" }}
            onChange={(e) => handleGetByColor(e.target.value)}
          >
            <option style={{ backgroundColor: "#FFFFFF" }} value="">
              Ver todos
            </option>
            {colorList.map((color, index) => (
              <option
                style={{ backgroundColor: color }}
                key={index}
                value={color}
              >
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>
      <IoMdClose className="button-exit" onClick={handleLogout} />
    </div>
  );
};

export default Navbar;
