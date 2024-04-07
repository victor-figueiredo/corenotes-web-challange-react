import CreationArea from "./components/CreationArea";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes";
import "./styles/_main.scss";

function App() {
  return (
    <>
      <Navbar />
      <CreationArea />
      <Notes />
    </>
  );
}

export default App;
