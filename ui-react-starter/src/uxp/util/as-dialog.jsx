import React from "react";
import ReactDOM from "react-dom";

const defaultConfig = {
    resize: "none",
    size: {
        width: 480,
        height: 320
    }
}

export const asDialog = (Component) => {
    const config = merge(defaultConfig, Component.config);

    const configWithTitle = {
        title: config.title || config.id,
        ...config
    }

    let root;

    return {
        async run () {
            if (!root) {
                root = document.createElement("dialog");
                ReactDOM.render(<Component dialog={root} />, root);
            }
            document.body.appendChild(root);
    
            await root.showModal(configWithTitle);
            root.remove();
        }
    }
}
