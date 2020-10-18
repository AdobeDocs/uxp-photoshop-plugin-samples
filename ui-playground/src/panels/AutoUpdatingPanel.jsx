import React from "react";

export class AutoUpdatingPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateToggle: false
        }
        this.updateFromStore = this.updateFromStore.bind(this);
    }
    updateFromStore() {
        this.setState(state => ({
            updateToggle: !state.updateToggle
        }));
        if (this.state.autorun) {
            if (this._cancel) clearTimeout(this._cancel);
            this._cancel = setTimeout( () => this.executeCode(), 100 );
        }
    }
    componentDidMount() {
        this.props.store.whenUpdated(this.updateFromStore);
    }
    componentWillUnmount() {
        this.props.store.unsubscribe(this.updateFromStore);
    }
    render() {
        return (
            <>
                {props.children}
            </>
        )
    }
}