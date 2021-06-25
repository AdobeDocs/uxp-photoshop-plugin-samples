import React from "react";

import { versions } from "uxp";
import os from "os";

import "./About.css";

export const About = (props) => {
    let v = 0;
    const wasmStr = "0061736D 01000000 01070160 027F7F01 7F030201 00070A01 06616464 54776F00 000A0901 07002000 20016A0B 000E046E 616D6502 07010002 00000100".split(" ").join("");
    const wasmBytes = Array.from(wasmStr).reduce((acc, cur, idx) => {
        acc[Math.floor(idx/2)] = acc[Math.floor(idx/2)] + (parseInt(cur,16) << (4-(4*(idx & 1))));
        return acc;
    }, Array.from({length: wasmStr.length / 2}, _ => 0));
    const wbytes = Uint8Array.from(wasmBytes)
    const valid = WebAssembly.validate(wbytes)
    if (valid) {
        const m = new WebAssembly.Module(wbytes);
        const wi  = new WebAssembly.Instance(m);
        v = wi.exports.addTwo(4,9);
    }

    return (
        <form method="dialog" className="aboutDialog">
        <sp-heading>React Starter Plugin</sp-heading>
        <sp-divider size="large"></sp-divider>
        <sp-body>
            This is a simple plugin that demonstrates the various capabilities of React on UXP.
            When adapting to your own projects, you can replace <code>index.jsx</code> and the components
            with your own. 
        </sp-body>
        <sp-body class="well">
            <sp-icon name="ui:InfoSmall" size="s"></sp-icon>
            We've also included the `WC` component and a couple of controllers. You
            do not need to use these in your own projects, but you are welcome to do so.
        </sp-body>
        <sp-detail>VERSIONS</sp-detail>
        <div className="table">
            <div><sp-detail>PLUGIN: </sp-detail><sp-body> {versions.plugin}</sp-body></div>
            <div><sp-detail>OPERATING SYTEM:</sp-detail><sp-body> {os.platform()} {os.release()}</sp-body></div>
            <div><sp-detail>UNIFIED EXTENSIBILITY PLATFORM:</sp-detail><sp-body>{versions.uxp}</sp-body></div>
            <div><sp-detail>WASM:</sp-detail><sp-body>{v}</sp-body></div>
        </div>
        <sp-button-group>
            <sp-button tabindex={0} variant="secondary" quiet="quiet" onClick={() => props.dialog.close("reasonCanceled")}>Cancel</sp-button>
            <sp-button tabindex={0} autofocus="autofocus" variant="primary" onClick={() => props.dialog.close("ok")}>OK</sp-button>
        </sp-button-group>
    </form>
    );
}