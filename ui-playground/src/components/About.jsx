import React from "react";

import { versions } from "uxp";
import os from "os";

import "./About.css";

export class About extends React.Component {
    render() {
        return (
            <form method="dialog" className="aboutDialog">
                <sp-heading>HTML Playground</sp-heading>
                <sp-divider size="large"></sp-divider>
                <sp-body>
                    You can use this plugin to test snippets of HTML, CSS, and JavaScript before building an
                    entire project. This can help to see if something is possible or makes sense to further develop
                    without a lot of startup cost.
                </sp-body>
                <sp-body class="well">
                    <sp-icon name="ui:InfoSmall" size="s"></sp-icon>
                    This plugin does _not_ support running React code. You may need to make some adjustments before
                    writing your plugin using React based on any findings here.
                </sp-body>
                <sp-detail>VERSIONS</sp-detail>
                <div className="table">
                    <div><sp-detail>PLUGIN: </sp-detail><sp-body> {versions.plugin}</sp-body></div>
                    <div><sp-detail>OPERATING SYTEM:</sp-detail><sp-body> {os.platform()} {os.release()}</sp-body></div>
                    <div><sp-detail>UNIFIED EXTENSIBILITY PLATFORM:</sp-detail><sp-body>{versions.uxp}</sp-body></div>
                </div>
                <sp-button-group>
                    <sp-button tabindex={0} variant="secondary" quiet="quiet" onClick={() => this.props.dialog.close("reasonCanceled")}>Cancel</sp-button>
                    <sp-button tabindex={0} autofocus="autofocus" variant="primary" onClick={() => this.props.dialog.close("ok")}>Ok</sp-button>
                </sp-button-group>
            </form>
        );
    }
}