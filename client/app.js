import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import './app.css'

import { Timeline } from 'antd';


class App extends React.Component {
    state = {
        loading: true,
        events: {}
    }

    setStateAsync (state) {
        return new Promise ((resolve) => {
          this.setState(state, resolve)
        })
    }

    enterLoading = () => {
        this.setState({loading: true});
    }

    finishLoading = () => {
        this.setState({loading: false});
    }

    async getData() {
        const res = await fetch (url, {
            cache: 'no-cache', 
            headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
            },
            method: 'GET', 
            mode: 'cors', 
            redirect: 'follow', 
            referrer: 'no-referrer', 
        })

        const {events} = await res.json()

        await this.setStateAsync({events: events})
    }

    render () {
        if (this.loading) {
            return (
                <Timeline className="timeline">

                <Timeline.Item color="green"> no data </Timeline.Item>

                </Timeline>
            );

        } else {
            return (
                <Timeline className="timeline">

                <Timeline.Item color="green"> #{this.state.events[0].actor.login} </Timeline.Item>

                </Timeline>
            );
        }

    }
}

ReactDOM.render(<App />, document.getElementById('root'))