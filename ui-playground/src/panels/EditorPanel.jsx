import React from "react";

import { versions } from "uxp";
import os from "os";

import { AutoUpdatingPanel } from "./AutoUpdatingPanel.jsx";
import { WC } from "../components/WC.jsx";
import { DropdownMenu } from "../components/DropdownMenu.jsx";
import { VIEWS } from "../constants.js";
import { SmallPlayIcon, SomethingBadIcon } from "../components/Icons.jsx";

import { CommandController } from "../controllers/CommandController.jsx";
import { About } from "../components/About.jsx";

export class EditorPanel extends AutoUpdatingPanel {
    constructor(props) {
        super(props);
        this.state = {
            updateToggle: false
        };
        this.textChanged = this.textChanged.bind(this);
        this.updateFromStore = this.updateFromStore.bind(this);
        this.viewChanged = this.viewChanged.bind(this);
        
        this.executeCode = this.executeCode.bind(this);
        this.autorunChanged = this.autorunChanged.bind(this);
        this.jsxChanged = this.jsxChanged.bind(this);

        /*this.copyFromClipboard = this.copyFromClipboard.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);*/
    }
    showAbout() {
        const aboutController = new CommandController(({dialog}) => <About dialog={dialog}/>, {id: "showAbout", title: "UXP HTML Playground", size: {width: 480, height: 480} });
        aboutController.run();
    }
    autorunChanged(e) {
        this.props.store.autorun = e.target.checked;
    }
    jsxChanged(e) {
        this.props.store.jsx = e.target.checked;
    }
    executeCode() {
        if (this.props.onExecuteCode) this.props.onExecuteCode();
    }
    textChanged(evt) {
        const text = evt.target.value;
        const whichView = evt.target.getAttribute("data-view");
        this.props.store[whichView] = text;
    }
    viewChanged(evt) {
        const target = evt.target;
        const newValue = target.checked;
        const whichView = target.getAttribute("data-view");
        this.props.store.view = Object.assign({}, this.props.store.view, {
                [whichView]: newValue
            });
        /*this.setState(prevState => ({
            view: Object.assign({}, prevState.view, {
                [whichView]: newValue
            })
        }));*/
    }

    copyToClipboard() {
        const data = {
            [VIEWS.HTML]: this.props.store[VIEWS.HTML],
            [VIEWS.STYLES]: this.props.store[VIEWS.STYLES],
            [VIEWS.JS]: this.props.store[VIEWS.JS]
        };

        document.clipboard.setContent({"text/json": JSON.stringify(data)});
    }
    async copyFromClipboard() {
        const json = (await document.clipboard.getContent())["text/json"];
        if (!json) return;
        const data = JSON.parse(json)
        if (data) {
            this.props.store[VIEWS.HTML] = data[VIEWS.HTML];
            this.props.store[VIEWS.STYLES] = data[VIEWS.STYLES];
            this.props.store[VIEWS.JS] = data[VIEWS.JS];
        }
    }
    switchViews(evt) {
        this.setState({view: VIEWS[evt.target.selectedIndex]})
    }

    render() {
        const { autorun, jsx, view } = this.props.store;
        return (
            <div className="editorPanel">
                <div className="tabbar">
                    <div className="tabsection" style={{flex: "0 0 auto"}}>
                        <DropdownMenu label="File" items={[
                            /*{id: "file-new", label: "New"},
                            {id: "file-new-from", label: "New From..."},
                            {id: "file-open", label: "Open..."},
                            {id: "file-save", label: "Save"},
                            {id: "file-save-as", label: "Save As..."},
                            {label: "-"},
                            {id: "file-export-as", label: "Export As..."},
                            {label: "-"},*/
                            {id: "file-reload", label: "Reload", handler: () => window.location.reload() },
                        ]}></DropdownMenu>
                        <DropdownMenu label="Edit" items={[
                            {id: "edit-copy", label: "Copy", handler: () => this.copyToClipboard() },
                            {id: "edit-paste", label: "Paste", handler: () => this.copyFromClipboard() }
                        ]}></DropdownMenu>
                        <DropdownMenu label="Help" items={[
                            {id: "help-about", label: "About", handler: this.showAbout},
                            /*{label: "-"},
                            {id: "help-ps-docs", label: "Photoshop Docs"},
                            {id: "help-uxp-docs", label: "UXP Docs"},
                            {label: "-"},
                            {id: "help-reset", label: "Reset Settings"},*/
                        ]}></DropdownMenu>
                    </div>
                    <div className="tabsection">
                        <WC onChange={this.viewChanged}>
                            <sp-checkbox size="s" data-view={VIEWS.HTML}    checked={view[VIEWS.HTML]    ? true : null}>HTML</sp-checkbox>
                            <sp-checkbox size="s" data-view={VIEWS.STYLES}  checked={view[VIEWS.STYLES]  ? true : null}>CSS</sp-checkbox>
                            <sp-checkbox size="s" data-view={VIEWS.JS}      checked={view[VIEWS.JS]      ? true : null}>JS</sp-checkbox>
                            <sp-checkbox size="s" data-view={VIEWS.PREVIEW} checked={view[VIEWS.PREVIEW] ? true : null}>PREVIEW</sp-checkbox>
                        </WC>
                    </div>
                    <div className="tabsection">
                        {view[VIEWS.JS] && <>
                            <sp-checkbox size="s" onClick={this.jsxChanged} checked={jsx ? "checked" : undefined}>JSX</sp-checkbox>
                            <sp-checkbox size="s" onClick={this.autorunChanged} checked={autorun ? "checked" : undefined}>Auto-run</sp-checkbox>
                            <sp-action-button size="s" onClick={this.executeCode} disabled={autorun ? "disabled" : undefined}>
                                <div slot="icon" style={{fill: "currentcolor"}}><SmallPlayIcon/></div>
                                Run
                            </sp-action-button>
                        </>}
                        {/*
                        <sp-action-button onClick={this.copyToClipboard} title="Copy"><div slot="icon" style={{fill: "currentColor"}}><CopyIcon/></div></sp-action-button>
                        <sp-action-button onClick={this.copyFromClipboard} title="Paste"><div slot="icon" style={{fill: "currentColor"}}><PasteIcon/></div></sp-action-button>
                        */}
                    </div>
                </div>
                {view[VIEWS.PREVIEW] && 
                    <div className="preview" id="__preview__">
                        <style dangerouslySetInnerHTML={{__html:this.props.store.styles}}></style>
                        <div dangerouslySetInnerHTML={{__html:this.props.store.html}}></div>
                    </div>
                }
                <WC onInput={this.textChanged} className="editor">
                    {view[VIEWS.HTML] 
                     && <sp-textarea size="s" placeholder="HTML" maxlength={8192} value={this.props.store[VIEWS.HTML]} data-view={VIEWS.HTML}></sp-textarea>}
                    {view[VIEWS.STYLES] 
                     && <sp-textarea size="s" placeholder="CSS" maxlength={8192} value={this.props.store[VIEWS.STYLES]} data-view={VIEWS.STYLES}></sp-textarea>}
                    {view[VIEWS.JS] 
                     && <sp-textarea size="s" placeholder="JS" maxlength={8192} value={this.props.store[VIEWS.JS]} data-view={VIEWS.JS}></sp-textarea>}
                </WC>
                {
                    this.props.store.error &&
                        <div className="err">
                            <SomethingBadIcon/>
                            <sp-body>{this.props.store.error}</sp-body>
                        </div>
                }
                <div className="info">
                    <sp-detail>PLUGIN: {versions.plugin}</sp-detail>
                    <sp-detail>OS: {os.platform()} {os.release()}</sp-detail>
                    <sp-detail>UXP: {versions.uxp}</sp-detail>
                </div>
            </div>
        )
    }
}