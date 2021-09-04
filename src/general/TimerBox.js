import React from "react";

export default class TimerBox extends React.Component {

    constructor(props) {
        super(props);
        let start = new Date();
        this.state = {
            start: start,
            timeElapsed: 0,
            running: false
        };
    }

    componentWillUnmount() {
        this.stop();
    }

    tick() {
        this.setState({
            start: this.state.start,
            timeElapsed: Math.floor((new Date() - this.state.start)),
            running: this.state.running,
        });
    }

    start() {
        let start = new Date();
        this.setState({
            start: start,
            timeElapsed: 0,
            running: true,
        });
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    stop() {
        clearInterval(this.timerID);
        this.setState({
            start: null,
            current: null,
            running: false
        });
    }

    get timeString() {
        return new Date(this.state.timeElapsed).toISOString().substr(14, 5);
    }

    render() {
        return <span {...this.props}>{this.timeString}</span>;
    }
}