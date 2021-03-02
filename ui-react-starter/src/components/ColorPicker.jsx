import React, { useRef, useState } from "react";

import { WC } from "../components/WC.jsx";

import "./ColorPicker.css";

export const ColorPicker = () => {
    const sldR = useRef(null);
    const sldG = useRef(null);
    const sldB = useRef(null);
    const txtR = useRef(null);
    const txtG = useRef(null);
    const txtB = useRef(null);
    
    const [R, setR] = useState(0xF0);
    const [G, setG] = useState(0xC0);
    const [B, setB] = useState(0xA0);

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
    }

    return (
        <div className="colorPicker">
                <div className="color" style={{backgroundColor: `rgb(${R}, ${G}, ${B})`}}></div>
                <WC onInput={updateColor}>
                    <div className="sliderWithInput">
                        <div className="filledRange">
                            <div className="gradient red" style={{background:`linear-gradient(to right, rgb(0, ${G}, ${B}), rgb(255, ${G}, ${B}))`}}></div>
                            <sp-slider ref={sldR} data-part="R" value={R} min={0} max={255}>
                                <sp-label slot="label">Red</sp-label>
                            </sp-slider>
                        </div>
                        <sp-textfield ref={txtR} data-part="R" type="number" value={R} min={0} max={255}></sp-textfield>
                    </div>
                    <div className="sliderWithInput">
                        <div className="filledRange">
                            <div className="gradient green" style={{background:`linear-gradient(to right, rgb(${R}, 0, ${B}), rgb(${R}, 255, ${B}))`}}></div>
                            <sp-slider ref={sldG} data-part="G" value={G} min={0} max={255}>
                                <sp-label slot="label">Green</sp-label>
                            </sp-slider>
                        </div>
                        <sp-textfield ref={txtG} data-part="G" type="number" value={G} min={0} max={255}></sp-textfield>
                    </div>
                    <div className="sliderWithInput">
                        <div className="filledRange">
                            <div className="gradient blue" style={{background:`linear-gradient(to right, rgb(${R}, ${G}, 0), rgb(${R}, ${G}, 255))`}}></div>
                            <sp-slider ref={sldB} data-part="B" value={B} min={0} max={255}>
                                <sp-label slot="label">Blue</sp-label>
                            </sp-slider>
                        </div>
                        <sp-textfield ref={txtB} data-part="B" type="number" value={B} min={0} max={255}></sp-textfield>
                    </div>
                </WC>
            </div>
    );
}