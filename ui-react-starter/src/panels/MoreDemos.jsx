import React from "react";

import { Hello } from "../components/Hello.jsx";
import { PlayIcon } from "../components/Icons.jsx";

export class MoreDemos extends React.Component {
    render() {
        return (
            <>
                <Hello message="there"/>
                <sp-button variant="primary"> 
                    <span slot="icon"><PlayIcon /></span>
                    Start
                </sp-button>
            </>
        );
    }
}