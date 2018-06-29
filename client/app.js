import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css';
import './app.css'

import { Timeline, Icon, Avatar, Layout, Badge, Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


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

    async componentDidMount() {
        const res = await fetch ("https://api.github.com/orgs/ionlyloveresearch/events", {
            cache: 'no-cache', 
            headers: {
                'user-agent': 'Mozilla/4.0 Jack',
                'content-type': 'application/json'
            },
            method: 'GET', 
            mode: 'cors', 
            redirect: 'follow', 
            referrer: 'no-referrer', 
        })

        const events = await res.json()

        await this.setStateAsync({events: events, loading: false})
    }

    async handleClick(event) {
        event.preventDefault()

        await this.enterLoading()
        
        const res = await fetch ("https://api.github.com/orgs/ionlyloveresearch/events", {
            cache: 'no-cache', 
            headers: {
                'user-agent': 'Mozilla/4.0 Jack',
                'content-type': 'application/json'
            },
            method: 'GET', 
            mode: 'cors', 
            redirect: 'follow', 
            referrer: 'no-referrer', 
        })

        const events = await res.json()

        await this.setStateAsync({events: events, loading: false})
    }

    render () {
        console.log(this.state)

        var timelineItems = [];
        var agains_created = '';
        var agains_edited = '';
        for (var i=this.state.events.length-1; i > -1; i--) {
            if (this.state.events != {} && this.state.events[i].payload.pages[0].action == 'created') {
                let previousEvent = thisEvent;
                let thisEvent = this.state.events[i];
                if (previousEvent != undefined && thisEvent.actor.id === previousEvent.actor.id) {
                    agains_created += '又'
                } else {
                    agains_created = ''
                }
                timelineItems.unshift(<Timeline.Item dot={<Avatar size="default" src={thisEvent.actor.avatar_url} />} >
                                            <span style={{ fontSize: 10, color: "#C8C2BB" }}> &nbsp;&nbsp;{new Date(thisEvent.created_at).getYear()+1900}年
                                                {new Date(thisEvent.created_at).getMonth()+1}月{new Date(thisEvent.created_at).getDate()}日
                                                {new Date(thisEvent.created_at).getHours()}:{new Date(thisEvent.created_at).getMinutes()}:{new Date(thisEvent.created_at).getMinutes()} </span> <br />
                                            {thisEvent.actor.display_login}同学{agains_created}读了一篇paper啦!~ <br />
                                            TA在github的{thisEvent.repo.name.split('/')[1]} repo里创建了题目是<a href={thisEvent.payload.pages[0].html_url}> {thisEvent.payload.pages[0].title} </a>的精致分析~ 快去看看吧~ <br />
                                        </Timeline.Item>);
            } else if (this.state.events != {} && this.state.events[i].payload.pages[0].action == 'edited') {
                let previousEvent = thisEvent;
                let thisEvent = this.state.events[i];
                if (previousEvent != undefined && thisEvent.payload.pages[0].html_url === previousEvent.payload.pages[0].html_url) {
                    agains_edited += '又'
                } else {
                    agains_edited = ''
                }
                timelineItems.unshift(<Timeline.Item dot={<Avatar size="default" src={thisEvent.actor.avatar_url} />} >
                                            <span style={{ fontSize: 10, color: "#C8C2BB" }}> &nbsp;&nbsp;{new Date(thisEvent.created_at).getYear()+1900}年
                                                {new Date(thisEvent.created_at).getMonth()+1}月{new Date(thisEvent.created_at).getDate()}日
                                                {new Date(thisEvent.created_at).getHours()}:{new Date(thisEvent.created_at).getMinutes()}:{new Date(thisEvent.created_at).getMinutes()} </span> <br />
                                            {thisEvent.actor.display_login}同学在github的{thisEvent.repo.name.split('/')[1]}repo里{agains_edited}修改了<a href={thisEvent.payload.pages[0].html_url}> {thisEvent.payload.pages[0].title} </a>页面~ <br />
                                        </Timeline.Item>);
            }
        }

        return (
            <Layout>
                <Header className="header" style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 24 }}> Paper Daily Timeline </span>
                    <Badge count={3} >
                        <Icon type={this.state.loading? "loading" : "reload"} style={{ fontSize: 32, position: "relative", left: "25px" }} onClick={ this.handleClick.bind(this) } />
                        {/* <Button type="dashed" icon="reload" loading={this.state.loading} onClick={this.enterLoading} size="large" ghost style={{ position: "relative", left: "25px" }} /> */}
                    </Badge>
                </Header>
                <Content className="content">
                    <Timeline className="timeline" style={{ textAlign: 'left' }}>
                        {timelineItems}
                    </Timeline>
                </Content>
                <Footer className="footer" style={{ textAlign: 'center' }}>
                    JackLLLLL Design © 2018 CJC Gaming
                </Footer>
            </Layout>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'))