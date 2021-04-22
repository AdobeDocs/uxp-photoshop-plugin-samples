import React, { useRef, useState } from "react";

import { WC } from "../components/WC.jsx";

import "./ColorPicker.css";

export const ColorPicker = () => {
  const _sldR = useRef(null);
  const _sldG = useRef(null);
  const _sldB = useRef(null);
  const _txtR = useRef(null);
  const _txtG = useRef(null);
  const _txtB = useRef(null);

  const [R, setR] = useState(0xf0);
  const [G, setG] = useState(0xc0);
  const [B, setB] = useState(0xa0);

  const updateColor = (evt) => {
    const target = evt.target;
    const part = target.getAttribute("data-part");
    switch (part) {
      case "R":
        setR(Number(target.value));
        break;
      case "G":
        setG(Number(target.value));
        break;
      case "B":
        setB(Number(target.value));
        break;
      default:
        break;
    }
  };

  return (
    <div className="colorPicker">
      <div
        className="color"
        style={{ backgroundColor: `rgb(${R}, ${G}, ${B})` }}
      ></div>
      <WC onInput={updateColor}>
        <div className="sliderWithInput">
          <div className="filledRange">
            <sp-slider
              ref={_sldR}
              data-part="R"
              value={R}
              min={0}
              max={255}
              show-value="false"
            >
              <sp-label slot="label">Red</sp-label>
            </sp-slider>
          </div>
          <sp-textfield
            ref={_txtR}
            data-part="R"
            type="number"
            value={R}
            min={0}
            max={255}
          ></sp-textfield>
        </div>
        <div className="sliderWithInput">
          <div className="filledRange">
            <sp-slider
              ref={_sldG}
              data-part="G"
              value={G}
              min={0}
              max={255}
              show-value="false"
            >
              <sp-label slot="label">Green</sp-label>
            </sp-slider>
          </div>
          <sp-textfield
            ref={_txtG}
            data-part="G"
            type="number"
            value={G}
            min={0}
            max={255}
          ></sp-textfield>
        </div>
        <div className="sliderWithInput">
          <div className="filledRange">
            <sp-slider
              ref={_sldB}
              data-part="B"
              value={B}
              min={0}
              max={255}
              show-value="false"
            >
              <sp-label slot="label">Blue</sp-label>
            </sp-slider>
          </div>
          <sp-textfield
            ref={_txtB}
            data-part="B"
            type="number"
            value={B}
            min={0}
            max={255}
          ></sp-textfield>
        </div>
      </WC>
    </div>
  );
};
