const React = require("react");
const ReactDOM = require("react-dom");
const os = require("os");

export class PanelController extends React.Component{
    constructor(props) {
        super(props);

        this._id = props.id;
        this._root = document.createElement("div");
        this._root.style.height = "100vh";
        this._root.style.overflow = "auto";
        this._attachment = null;

        this.onUxpHidePanel = this.onUxpHidePanel.bind(this);
        this.onUxpShowPanel = this.onUxpShowPanel.bind(this);

    }

    onUxpShowPanel(event) {
        if (event.panelId !== this._id) return;

        this._attachment = event.node;
        this._attachment.appendChild(this._root);
    }

    onUxpHidePanel(event) {
        if (event.panelId !== this._id) return;

        if (this._attachment && this._root) {
            this._attachment.removeChild(this._root);
            this._attachment = null;
        }
    }

    componentDidMount() {
        // register for events
        document.addEventListener("uxpshowpanel", this.onUxpShowPanel);
        document.addEventListener("uxpHidePanel", this.onUxpHidePanel);

        if (document._uxpAttachments) {
            const us = document._uxpAttachments.find(c => c.id === this._id);
            if (us) {
                this.onUxpShowPanel({panelId: us.id, node: us.node});
                document._uxpAttachments = document._uxpAttachments.filter(c => c.id !== this._id);
            }
        }
    }

    componentWillUnmount() {
        if (this._attachment && this._root) {
            this._attachment.removeChild(this._root);
            this._attachment = null;
        }
        document.removeEventListener("uxpshowpanel", this.onUxpShowPanel);
        document.removeEventListener("uxpHidePanel", this.onUxpHidePanel);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this._root);
    }
}
