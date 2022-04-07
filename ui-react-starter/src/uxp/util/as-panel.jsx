import React from "react";
import ReactDOM from "react-dom";

const defaultConfig = {
    enabled: true,
    checked: false
};

export function asPanel(Component) {
    let root;
    let attachment;

    const { menuItems: menuItemsFromConfig } = Component.config || {};

    const menuItems = menuItemsFromConfig.map(mergeWith(defaultConfig));

    const menus = new Map(
        menuItems.map(menu => [menu.id, menu])
    );

    return {
        create () {
            root = document.createElement("div");
            root.className = "panel";

            ReactDOM.render(<Component panel={this} />, root);

            return root;
        },
        show(e) {
            if (!root) this.create();
            attachment = e.node;
            attachment.appendChild(root);
        },
        hide() {
            if (attachment && root) {
                attachment.removeChild(root);
                attachment = null;
            }
        },
        destroy () {},
        invokeMenu (id) {
            const { oninvoke: invoke } = menus.get(id) || {};

            if(!invoke) return;

            invoke();
        },
        menuItems: menuItems.map(({ oninvoke, ...menu }) => menu)
    }
}

const mergeWith = obj1 => obj2 => ({ ...obj1, ...obj2 });
