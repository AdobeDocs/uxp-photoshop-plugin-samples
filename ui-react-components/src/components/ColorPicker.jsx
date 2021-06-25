import React, { useRef, useState } from "react";

import { WC } from "../components/WC.jsx";
import { FancySlider } from "./FancySlider.jsx";
import { HotText } from "./HotText.jsx";

import "./ColorPicker.css";

export const ColorPicker = () => {
    const _sldR = useRef(null);
    const _sldG = useRef(null);
    const _sldB = useRef(null);
    const _txtR = useRef(null);
    const _txtG = useRef(null);
    const _txtB = useRef(null);
    
    const [R, setR] = useState(0xF0);
    const [G, setG] = useState(0xC0);
    const [B, setB] = useState(0xA0);

    const updateColor = (evt) => {
        const target = evt.target;
        const part = target.getAttribute("data-part");
        switch (part) {
            case "R":
                setR(Math.round(Number(target.value)));
                break;
            case "G":
                setG(Math.round(Number(target.value)));
                break;
            case "B":
                setB(Math.round(Number(target.value)));
                break;
            default:
                break;
        }
    }

    return (
        <div className="colorPicker">
            <div className="color" style={{backgroundColor: `rgb(${R},${G},${B})`}}></div>
            <HotText min={0} max={255} step={1}/>
            <WC onInput={updateColor}>
                <div className="sliderWithInput">
                    <FancySlider onInput={r => setR(r)} value={R} min={0} max={255} trackStyle={{background:`linear-gradient(to right,rgb(0,${G},${B}),rgb(255,${G},${B}))`}}></FancySlider>
                    <sp-textfield ref={_txtR} data-part="R" type="number" value={R} min={0} max={255} step={1}></sp-textfield>
                </div>
                <div className="sliderWithInput">
                    <FancySlider onInput={g => setG(g)} value={G} min={0} max={255} trackStyle={{background:`linear-gradient(to right,rgb(${R},0,${B}),rgb(${R},255,${B}))`}}></FancySlider>
                    <sp-textfield ref={_txtG} data-part="G" type="number" value={G} min={0} max={255} step={1}></sp-textfield>
                </div>
                <div className="sliderWithInput">
                    <FancySlider onInput={b => setB(b)} value={B} min={0} max={255} trackStyle={{background:`linear-gradient(to right,rgb(${R},${G},0),rgb(${R},${G},255))`}}></FancySlider>
                    <sp-textfield ref={_txtB} data-part="B" type="number" value={B} min={0} max={255} step={1}></sp-textfield>
                </div>
            </WC>
        </div>
    );
}