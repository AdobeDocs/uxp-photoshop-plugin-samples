import React from "react";

import { AutoUpdatingPanel } from "./AutoUpdatingPanel.jsx";
import { WC } from "../components/WC.jsx";
import { VIEWS } from "../constants.js";
import { PlayIcon, SomethingBadIcon, CopyIcon, PasteIcon } from "../components/Icons.jsx";

export class EditorPanel extends AutoUpdatingPanel {
    constructor(props) {
        super(props);
        this.state = {
            updateToggle: false,
            view: VIEWS.HTML
        };
        this.textChanged = this.textChanged.bind(this);
        this.updateFromStore = this.updateFromStore.bind(this);
        this.copyFromClipboard = this.copyFromClipboard.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.switchViews = this.switchViews.bind(this);
        this.executeCode = this.executeCode.bind(this);
        this.autorunChanged = this.autorunChanged.bind(this);
    }
    autorunChanged(e) {
        this.props.store.autorun = e.target.checked;
    }
    executeCode() {
        if (this.props.onExecuteCode) this.props.onExecuteCode();
    }
    textChanged(evt) {
        const text = evt.target.value;
        this.props.store[this.state.view] = text;
    }

    copyToClipboard() {
        const text = this.props.store[this.state.view]
        document.clipboard.setContent({"text/plain": text});
    }
    async copyFromClipboard() {
        const text = (await document.clipboard.getContent())["text/plain"];
        if (text) {
            this.props.store[this.state.view] = text;
        }
    }
    switchViews(evt) {
        this.setState({view: VIEWS[evt.target.selectedIndex]})
    }

    render() {
        const { view } = this.state;
        const { autorun } = this.props.store;
        return (
            <div className="editorPanel">
                <div className="tabbar">
                    <div className="tabsection">
                        <WC onChange={this.switchViews}>
                            <sp-dropdown style={{display: "flex", width: "200px"}} placeholder="Switch Code View...">
                                <sp-label variant="overBackground" slot="label" style={{width: "50px"}}>View:</sp-label>
                                <sp-menu slot="options">
                                    <sp-menu-item selected={view === VIEWS.HTML ? "selected" : undefined}>HTML</sp-menu-item>
                                    <sp-menu-item selected={view === VIEWS.STYLES ? "selected" : undefined}>STYLES</sp-menu-item>
                                    <sp-menu-item selected={view === VIEWS.JS   ? "selected" : undefined}>JS</sp-menu-item>
                                </sp-menu>
                            </sp-dropdown>
                        </WC>
                    </div>
                    <div className="tabsection">
                        {view === VIEWS.JS && <>
                            <sp-checkbox onClick={this.autorunChanged} checked={autorun ? "checked" : undefined}>Auto-run</sp-checkbox>
                            <sp-action-button onClick={this.executeCode} disabled={autorun ? "disabled" : undefined}>
                                <div slot="icon" style={{fill: "currentColor"}}><PlayIcon/></div>
                                Run
                            </sp-action-button>
                        </>}
                        <sp-action-button onClick={this.copyToClipboard} title="Copy"><div slot="icon" style={{fill: "currentColor"}}><CopyIcon/></div></sp-action-button>
                        <sp-action-button onClick={this.copyFromClipboard} title="Paste"><div slot="icon" style={{fill: "currentColor"}}><PasteIcon/></div></sp-action-button>
                    </div>
                </div>
                <WC onInput={this.textChanged} className="editor">
                    <textarea maxlength={8192} value={this.props.store[view]}></textarea>
                </WC>
                {
                    this.props.store.error &&
                        <div className="err">
                            <SomethingBadIcon/>
                            <sp-body>{this.props.store.error}</sp-body>
                        </div>
                }
            </div>
        )
    }
}