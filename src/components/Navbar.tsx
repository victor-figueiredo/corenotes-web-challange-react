import { LogoIcon } from "../assets/icons/icons";
import { useMyContext } from "../context/useContext";
import "../styles/components/Navbar.scss";
import { IoMdSearch } from "react-icons/io";

const Navbar = () => {
  const { count, increment } = useMyContext();
  return (
    <div className="navbar">
      <LogoIcon className="logo" />
      <h1>CoreNotes {count}</h1>
      <div>
        <input type="text" placeholder="Pesquisar notas" />
        <IoMdSearch className="search-icon" onClick={increment} />
      </div>
    </div>
  );
};

export default Navbar;
