import React from "react";
import { WC } from "../components/WC.jsx";

export function DropdownMenu({label, items, onClick} = {}) {

    function menuItemClicked(e) {
        const target = e.target;
        const whichMenu = target.id;

        // if no id, then we can't do anything with it -- bail
        if (!whichMenu) return;

        // basic debouncing
        if (target.getAttribute("ignore")) return;
        target.setAttribute("ignore", "ignore");

        const menuEl = target.parentElement;
        const popover = menuEl.parentElement;

        // BUG: even though the popover is open, it shows as false. Setting it to false
        // won't close the popover because the value hasn't changed. This bit of hacky
        // code corrects this by forcing the popover open (does nothing really, since it
        // already is), and then we can safely hide it.
        popover.open = true;
        setTimeout(() => {
            // close the popover
            popover.open = false;

            // clear the selected item
            menuEl.selectedIndex = -1;

            const item = items.find(({id: candidateId, handler}={}) => candidateId === whichMenu);
            if (item && item.handler) {
                // add a timeout in case we have a dialog -- show it too fast and it and the popover
                // start having issues
                setTimeout(() => item.handler(), 100);
            }
        }, 16);

        // clear the flag for debounce
        setTimeout(() => {
            target.removeAttribute("ignore");
        }, 100);
    }

    function transformItems(items) {
        return items.map(({id, label}={}) => label !== "-" ? <sp-menu-item id={id} key={id}>{label}</sp-menu-item> 
                                                        : <sp-divider></sp-divider>);
    }

    return (<WC onClick={menuItemClicked}>
        <sp-overlay style={{display: "inline-block"}}>
            <sp-action-button size="s" slot="trigger" quiet>{label}</sp-action-button>
            <sp-popover size="s" offset="0" placement="bottom" alignment="bottom" appearance="none" slot="click">
                <sp-menu size="s" style={{width: "200px"}}>
                    {transformItems(items)}
                </sp-menu>
            </sp-popover>
        </sp-overlay>
    </WC>);
}