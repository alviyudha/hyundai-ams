import FormEditColors from "../../components/colors/FormEditColors";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export default function EditColors() {
  const [color, setColor] = useColor("hex", "#561ECB");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: color.hex }}
    >
      <div className="w-full max-w-lg p-1">
        <ColorPicker
          width={456}
          height={228}
          color={color}
          onChange={setColor}
          hideHSV
          dark
        />
      </div>
      <div className="w-full max-w-lg p-1">
        <FormEditColors
          backgroundColor={color.hex}
          setBackgroundColor={setColor}
        />
      </div>
    </div>
  );
}
