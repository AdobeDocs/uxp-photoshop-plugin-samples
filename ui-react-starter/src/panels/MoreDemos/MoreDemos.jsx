import React from "react";

import { Hello } from "./components/Hello/Hello";
import { PlayIcon } from "./components/Icons/Icons";

export const MoreDemos = () => {
    return (
        <>
            <Hello message="there" />
            <sp-button variant="primary">
                <span slot="icon"><PlayIcon /></span>
            </sp-button>
        </>
    );
}

MoreDemos.config = {
    id: "moreDemos",
    menuItems: [
        {
            id: "reload2",
            label: "Reload Plugin",
            enabled: true,
            checked: false,
            oninvoke: () => location.reload(),
        },
    ],
}
