import React from "react";
import Sval from "sval";
let Babel;
if (require("uxp").host) {
    Babel = require ("@babel/standalone");
}

import "./App.css";

import { PanelController } from "./controllers/PanelController.jsx";
import { EditorPanel } from "./panels/EditorPanel.jsx";
import { AutoUpdatingPanel } from "./panels/AutoUpdatingPanel.jsx";

const options = {
    ecmaVer: 9,
    sandBox: false
};


export class App extends AutoUpdatingPanel {
    constructor(props) {
        super(props);

        this.state = {
            updateToggle: false,
            ctr: 0
        };

        this.updateFromStore = this.updateFromStore.bind(this);
        this.executeCode = this.executeCode.bind(this);

        this.root = React.createRef();
        this.styleEl = React.createRef();
    }

    executeCode() {
        const store = this.props.store;
        try {
            store.error = "";
            const strictCode =`"use strict";${this.props.store.js}`;
            const code = store.jsx ? Babel.transform(strictCode, {presets: ["react"]}).code : strictCode;
            const interpreter = new Sval(options);
            interpreter.import("React", require("react"));
            interpreter.import("ReactDOM", require("react-dom"));
            interpreter.import("uxp", require("uxp"));
            interpreter.import("os", require("os"));
            interpreter.import("rootNode", document.querySelector("#__preview__") || this.root.current);
            interpreter.import("console", Object.assign({}, console, {
                log (...msg) {store.error = msg.join(""); },
                error (...msg) {store.error = "ERROR: " + msg.join(""); }
            }));
            interpreter.run(code);
        }
        catch(err) {
            store.error = err.message;
        }
    }

    updateFromStore() {
        super.updateFromStore();
        if (this.props.store.autorun) {
            if (this._cancel) clearTimeout(this._cancel);
            try {
                this.root.current.innerHTML = this.props.store.html;
                this.styleEl.current.innerHTML = this.props.store.styles;
                this._cancel = setTimeout( () => this.executeCode(), 100 );
            } catch (err) {
                this.props.store.error = err.message;
            }
        }
    }

    render() {
        return (
            <div>
                <PanelController id="editUxpPen"><EditorPanel store={this.props.store} onExecuteCode={this.executeCode} /></PanelController>
                <PanelController id="runPanel">
                    <style ref={this.styleEl} dangerouslySetInnerHTML={{__html:this.props.store.styles}}></style>
                    <div ref={this.root} dangerouslySetInnerHTML={{__html:this.props.store.html}}></div>
                </PanelController>
            </div>
        )
    }
}

