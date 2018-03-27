import React, { Component } from "react";
import { connect } from "react-redux";
import List from '../article/list';
import { getArticleAction } from '../app/actions';

class Home extends Component{
    componentDidMount() {
        this.props.dispatch(getArticleAction({type: 'home'}));
    }
    render() {
        return (
            <div className="flexContainer">
                <div className="main">
                    <List type="home" />
                </div>
                <div className="rightArea"></div>
            </div>
        )
    }
}

export default connect()(Home);
