import { VIEWS } from "../constants.js";

export class Store {
    constructor() {
        this._styles = ``;
        this._html = `
<sp-body>
    Hello, world!
</sp-body>
<sp-button>Hi!</sp-button>
`.trim();
        this._js = `
ReactDOM.render(<div>Hi</div>, rootNode);
`.trim();
        this._autorun = false;
        this._jsx = true;
        this._cbs = [];
        this._err = "";
        this._view = {
            [VIEWS.HTML]: true,
            [VIEWS.STYLES]: false,
            [VIEWS.JS]: false,
            [VIEWS.PREVIEW]: false
        };
        this._load();
    }

    _save() {
        localStorage.setItem("prefs", JSON.stringify({
            autorun: this.autorun,
            jsx: this.jsx,
            view: this.view
        }));
    }

    _load() {
        const savedPrefStr = localStorage.getItem("prefs");
        if (savedPrefStr) {
            const prefs = JSON.parse(savedPrefStr);
            this._autorun = prefs.autorun;
            this._jsx = prefs.jsx;
            this._view = prefs.view;
        }
    }

    _updated() {
        this._cbs.forEach(cb => cb && cb(this));
        this._save();
    }

    whenUpdated(cb) {
        this._cbs = Array.from(new Set([...this._cbs, cb]));
    }

    unsubscribe(cb) {
        this._cbs = this._cbs.filter(candidate => candidate !== cb);
    }

    get html() {
        return this._html;
    }

    get js() {
        return this._js;
    }

    get styles() {
        return this._styles;
    }

    get autorun() {
        return this._autorun;
    }

    get jsx() {
        return this._jsx;
    }

    get error() { 
        return this._err;
    }

    get view() {
        return this._view;
    }

    set view(v) {
        this._view = v;
        this._updated();
    }

    set html(v) {
        this._html = v;
        this._updated();
    }

    set js(v) {
        this._js = v;
        this._updated();
    }

    set styles(v) {
        this._styles = v;
        this._updated();
    }

    set autorun(v) {
        this._autorun = v;
        this._updated();
    }

    set jsx(v) {
        this._jsx = v;
        this._updated();
    }

    set error(v) {
        const old = this._err;
        this._err = v;
        if (old !== v) 
            this._updated();
    }
}