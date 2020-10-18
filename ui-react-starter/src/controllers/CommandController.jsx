import React from "react";
import ReactDOM from "react-dom";

export class CommandController{
    #id = null;
    #root = null;
    #Component = null;
    #dialogOpts = {};

    constructor(Component, {id, ...dialogOpts} = {}) {
        this.#Component = Component;
        this.#id = id;
        this.#dialogOpts = Object.assign({}, {
            title: id,
            resize: "none",
            size: {
                width: 480,
                height: 320
            }
        }, dialogOpts);
        ["run"].forEach(fn => this[fn] = this[fn].bind(this));
    }

    async run() {
        if (!this.#root) {
            this.#root = document.createElement("dialog");
            ReactDOM.render(this.#Component({dialog: this.#root}), this.#root);
        }
        document.body.appendChild(this.#root);

        await this.#root.showModal(this.#dialogOpts);
        this.#root.remove();
    }
}
