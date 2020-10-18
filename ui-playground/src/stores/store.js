export class Store {
    constructor() {
        this._styles = ``;
        this._html = `
<sp-body>
    Hello, world!
</sp-body>
<sp-button>Hi!</sp-button>
`.trim();
        this._js = ``;
        this._autorun = false;
        this._cbs = [];
        this._err = "";
    }

    _updated() {
        this._cbs.forEach(cb => cb && cb(this));
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

    get error() { 
        return this._err;
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

    set error(v) {
        const old = this._err;
        this._err = v;
        if (old !== v) 
            this._updated();
    }
}