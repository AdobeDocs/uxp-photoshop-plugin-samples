import React from "react";
import ReactDOM from "react-dom";

export class PanelController{
    #id = null;
    #root = null;
    #attachment = null;
    #Component = null;
    #menuItems = [];

    constructor(Component, {id, menuItems} = {}) {
        this.#Component = Component;
        this.#id = id;
        this.#menuItems = menuItems || [];

        this.menuItems = this.#menuItems.map(menuItem => ({
            id: menuItem.id,
            label: menuItem.label,
            enabled: menuItem.enabled || true,
            checked: menuItem.checked || false
        }));

        ["create", "show", "hide", "destroy", "invokeMenu"].forEach(fn => this[fn] = this[fn].bind(this));
    }

    create() {
        this.#root = document.createElement("div");
        this.#root.style.height = "100vh";
        this.#root.style.overflow = "auto";
        this.#root.style.padding = "8px";

        ReactDOM.render(this.#Component({panel: this}), this.#root);

        return this.#root;
    }

    show(event)  {
        if (!this.#root) this.create();
        this.#attachment = event.node;
        this.#attachment.appendChild(this.#root);
    }

    hide() {
        if (this.#attachment && this.#root) {
            this.#attachment.removeChild(this.#root);
            this.#attachment = null;
        }
    }

    destroy() { }

    invokeMenu(id) {
        const menuItem = this.#menuItems.find(c => c.id === id);
        if (menuItem) {
            const handler = menuItem.oninvoke;
            if (handler) {
                handler();
            }
        }
    }
}
