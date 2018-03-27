import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import List from '../article/list';
import Profile from '../right/profile';
import { getArticleAction } from '../app/actions';
import { searchToObj } from '../public/base';

class User extends Component {
    constructor(props) {
        super(props);

        const search = searchToObj(props.location.search);
        this.state = {
            type: search.type || "user",
        }
    }
    componentDidMount() {
        this.props.dispatch(getArticleAction({type: this.state.type}));
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch, location } = nextProps;
        const { type='user' } = searchToObj(this.props.location.search);
        const { type:nextType='user' } = searchToObj(location.search);
        if (type !== nextType){
            this.setState({type: nextType});
            dispatch(getArticleAction({type: nextType}));
        }
    }

    render() {
        return (
            <div className="flexContainer">
                <div className="main">
                    <List type={this.state.type} />
                </div>
                <div className="rightArea">
                    <Profile />
                </div>
            </div>
        )
    }
}
export default withRouter(connect(state => {
    const { loginInfo } = state;
    return {
        id: loginInfo.id,
        name: loginInfo.name,
        motto: loginInfo.motto
    }
})(User));
