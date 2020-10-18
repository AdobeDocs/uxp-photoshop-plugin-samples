import React from "react";

export class WC extends React.Component {
    constructor(props) {
        super(props);
        this.el = React.createRef();
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(evt) {
        const propName = `on${evt.type[0].toUpperCase()}${evt.type.substr(1)}`;
        if (this.props[propName]) {
            this.props[propName].call(evt.target, evt);
        }
    }

    componentDidMount() {
        const el = this.el.current;
        const eventProps = Object.entries(this.props).filter(([k,v]) => k.startsWith("on"));
        eventProps.forEach(([k,v]) => el.addEventListener(k.substr(2).toLowerCase(), this.handleEvent));
    }
    
    componentWillUnmount() {
        const el = this.el.current;
        const eventProps = Object.entries(this.props).filter(([k,v]) => k.startsWith("on"));
        eventProps.forEach(([k,v]) => el.removeEventListener(k.substr(2).toLowerCase(), this.handleEvent));
    }

    render() {
        return <div ref={this.el} {...this.props}>{this.props.children}</div>
    }
}