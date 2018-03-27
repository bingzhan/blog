import React, {Component} from "react";
import {render} from "react-dom";
import {Provider} from 'react-redux';
import configureStore from '../app/configureStore';
import Bundle from '../public/bundle';

import Header from '../header';
import LoadHome from 'bundle-loader?lazy!../app/home';
import LoadLogin from 'bundle-loader?lazy!../access/login';
import LoadUser from 'bundle-loader?lazy!../user/index';
import LoadNewBlog from 'bundle-loader?lazy!../article/new';
import LoadBlog from 'bundle-loader?lazy!../article/display';
import 'normalize.css';
import './page.css';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const store = configureStore();

const Topics = ({match}) => (
    <div>
        <h2>Topicss</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)
const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Header />
                        <div className="page">
                        <Route exact path="/" render={() => {
                            return <Bundle load={LoadHome}>
                                {(Comp) => {
                                    return Comp ? <Comp/> : <div>Loading...</div>
                                }}
                            </Bundle>
                        }}/>
                        <Route path="/login" render={() => {
                            return <Bundle load={LoadLogin}>
                                {(Comp) => {
                                    return Comp ? <Comp/> : <div>Loading...</div>
                                }}
                            </Bundle>
                        }}/>
                        <Route path="/user/:id" render={() => {
                            return <Bundle load={LoadUser}>
                                {(Comp) => {
                                    return Comp ? <Comp/> : <div>Loading...</div>
                                }}
                            </Bundle>
                        }}/>
                        <Route path="/newblog" render={() => {
                            return <Bundle load={LoadNewBlog}>
                                {(Comp) => {
                                    return Comp ? <Comp/> : <div>Loading...</div>
                                }}
                            </Bundle>
                        }}/>
                        <Route path="/blog/:blogid" render={() => {
                            return <Bundle load={LoadBlog}>
                                {(Comp) => {
                                    return Comp ? <Comp/> : <div>Loading...</div>
                                }}
                            </Bundle>
                        }}/>
                        <Route path="/topics" component={Topics}/>
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}

render(
    <App/>, document.getElementById('pages'));
