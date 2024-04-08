import "../styles/components/ColorPalette.scss";
import { useNotesContext } from "../context/notes";

type Props = {
  show: boolean;
};

const ColorPalette = ({ show }: Props) => {
  const { handleSetNewColor } = useNotesContext();

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

  return (
    <div className={`${show && "show"} color-palette-container`}>
      {colorList.map((color) => (
        <div
          key={color}
          onClick={() => handleSetNewColor(color)}
          className="color"
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
};

export default ColorPalette;
