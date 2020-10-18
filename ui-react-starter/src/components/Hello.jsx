import React from "react";

export class Hello extends React.Component {
    render() {
        return (
            <sp-body>Hello, {this.props.message || "world"} </sp-body>
        );
    }
}