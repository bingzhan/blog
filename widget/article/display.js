import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Profile from '../right/profile';
import { getDetailAction } from '../app/actions';

class Display extends Component {
    componentDidMount() {
        const { aid, hasLoad, dispatch } = this.props;
        if (hasLoad){
            dispatch(getDetailAction({
                aid
            }));
        }
    }
    render() {
        const { title, content } = this.props;
        return (
            <div className="flexContainer">
                <div className="main" style={{backgroundColor: '#FFF'}}>
                    <div className="mhl">
                        <h1>{title}</h1>
                        <div dangerouslySetInnerHTML={{__html: content}}></div>
                    </div>
                </div>
                <div className="rightArea">
                    <Profile />
                </div>
            </div>
        )
    }
}
export default withRouter(connect((state, ownProps) => {
    const { blogEntity } = state;
    const { match:{params} } = ownProps;
    const aid = params.blogid;
    console.log(123, aid, blogEntity);
    const { title="", content="" } = blogEntity[aid] || {};
    return {
        hasLoad: !blogEntity[aid],
        aid,
        title: unescape(title),
        content: unescape(content)
    }
})(Display));
