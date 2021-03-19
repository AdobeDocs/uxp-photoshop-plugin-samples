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
      r: 0xf0,
      g: 0xc0,
      b: 0xa0,
    };

    this.#sldR = React.createRef();
    this.#sldG = React.createRef();
    this.#sldB = React.createRef();
    this.#txtR = React.createRef();
    this.#txtG = React.createRef();
    this.#txtB = React.createRef();
  }
  updateColor = (evt) => {
    const target = evt.target;
    const part = target.getAttribute("data-part");

    this.setState({ [part]: Number(target.value) });
  };
  render() {
    const { r, g, b } = this.state;
    return (
      <div className="colorPicker">
        <div
          className="color"
          style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
        ></div>
        <WC onInput={this.updateColor}>
          <div className="sliderWithInput">
            <div className="filledRange">
              <sp-slider
                show-value="false"
                ref={this.#sldR}
                data-part="r"
                value={r}
                min={0}
                max={255}
              >
                <sp-label slot="label">Red</sp-label>
              </sp-slider>
            </div>
            <sp-textfield
              ref={this.#txtR}
              data-part="r"
              type="number"
              value={r}
              min={0}
              max={255}
            ></sp-textfield>
          </div>
          <div className="sliderWithInput">
            <div className="filledRange">
              <sp-slider
                show-value="false"
                ref={this.#sldG}
                data-part="g"
                value={g}
                min={0}
                max={255}
              >
                <sp-label slot="label">Green</sp-label>
              </sp-slider>
            </div>
            <sp-textfield
              ref={this.#txtG}
              data-part="g"
              type="number"
              value={g}
              min={0}
              max={255}
            ></sp-textfield>
          </div>
          <div className="sliderWithInput">
            <div className="filledRange">
              <sp-slider
                show-value="false"
                ref={this.#sldB}
                data-part="b"
                value={b}
                min={0}
                max={255}
              >
                <sp-label slot="label">Blue</sp-label>
              </sp-slider>
            </div>
            <sp-textfield
              ref={this.#txtB}
              data-part="b"
              type="number"
              value={b}
              min={0}
              max={255}
            ></sp-textfield>
          </div>
        </WC>
      </div>
    );
  }
}
