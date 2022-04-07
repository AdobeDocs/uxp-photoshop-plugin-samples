import React from "react";
import { About } from "../../dialogs/About/About";

import { ColorPicker } from "./components/ColorPicker/ColorPicker";

export const Demos = () => {
    return (
        <>
            <ColorPicker />
        </>
    )
}

Demos.config = {
    id: "demos",
    menuItems: [
        {
            id: "reload1",
            label: "Reload Plugin",
            enabled: true,
            checked: false,
            oninvoke: () => location.reload(),
        },
        {
            id: "dialog1",
            label: "About this Plugin",
            enabled: true,
            checked: false,
            oninvoke: () => About.run(),
        },
    ],
}
