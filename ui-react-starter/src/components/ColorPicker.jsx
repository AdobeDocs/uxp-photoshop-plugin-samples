import React from "react";

import { WC } from "../components/WC.jsx";

import "./ColorPicker.css";

export class ColorPicker extends React.Component {
    #sldR;
    #sldG;
    #sldB;
    #txtR;
    #txtG;
    #txtB;
    constructor(props) {
        super(props);
        this.state = {
            r: 0xF0,
            g: 0xC0,
            b: 0xA0
        };

        this.#sldR = React.createRef();
        this.#sldG = React.createRef();
        this.#sldB = React.createRef();
        this.#txtR = React.createRef();
        this.#txtG = React.createRef();
        this.#txtB = React.createRef();
    }
    updateColor = evt => {
        const target = evt.target;
        const part = target.getAttribute("data-part");

        this.setState({[part]: Number(target.value)});
    }
    render() {
        const {r, g, b} = this.state;
        return (
            <div className="colorPicker">
                <div className="color" style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}}></div>
                <WC onInput={this.updateColor}>
                    <div className="sliderWithInput">
                        <div className="filledRange">
                            <div className="gradient red" style={{background:`linear-gradient(to right, rgb(0, ${g}, ${b}), rgb(255, ${g}, ${b}))`}}></div>
                            <sp-slider ref={this.#sldR} data-part="r" value={r} min={0} max={255}>
                                <sp-label slot="label">Red</sp-label>
                            </sp-slider>
                        </div>
                        <sp-textfield ref={this.#txtR} data-part="r" type="number" value={r} min={0} max={255}></sp-textfield>
                    </div>
                    <div className="sliderWithInput">
                        <div className="filledRange">
                            <div className="gradient green" style={{background:`linear-gradient(to right, rgb(${r}, 0, ${b}), rgb(${r}, 255, ${b}))`}}></div>
                            <sp-slider ref={this.#sldG} data-part="g" value={g} min={0} max={255}>
                                <sp-label slot="label">Green</sp-label>
                            </sp-slider>
                        </div>
                        <sp-textfield ref={this.#txtG} data-part="g" type="number" value={g} min={0} max={255}></sp-textfield>
                    </div>
                    <div className="sliderWithInput">
                        <div className="filledRange">
                            <div className="gradient blue" style={{background:`linear-gradient(to right, rgb(${r}, ${g}, 0), rgb(${r}, ${g}, 255))`}}></div>
                            <sp-slider ref={this.#sldB} data-part="b" value={b} min={0} max={255}>
                                <sp-label slot="label">Blue</sp-label>
                            </sp-slider>
                        </div>
                        <sp-textfield ref={this.#txtB} data-part="b" type="number" value={b} min={0} max={255}></sp-textfield>
                    </div>
                </WC>
            </div>
        );
    }
}