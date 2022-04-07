import { entrypoints } from "uxp";
import { asDialog } from "./util/as-dialog";
import { asPanel } from "./util/as-panel";

export function setup(pluginConfig) {
    const { commands, panels } = pluginConfig;

    return entrypoints.setup({
        ...pluginConfig,
        commands: decorateWith(asDialog)(commands),
        panels: decorateWith(asPanel)(panels)
    })
}

function decorateWith(wrapper) {
    return entities => map(entities, wrapper)
}

function map(obj, fn) {
    Object.keys(obj).reduce((result, key) => {
        const newValue = fn(obj[key]);
        return {... result, [key]: newValue }
    }, {})
}
