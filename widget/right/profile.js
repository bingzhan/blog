import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getArticleAction, setMottoAction } from '../app/actions';
import avatar from '../../static/default.jpg';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.setMotto = this.setMotto.bind(this);
        this.changeType = this.changeType.bind(this);
    }
    setMotto(e) {
        const text = e.target.textContent.trim();
        if (text === this.props.motto) return false;
        this.props.dispatch(setMottoAction({
            text: e.target.textContent
        }));
    }
    changeType(e) {
        const type = e.target.dataset.type;
        const { id, dispatch, history, location } = this.props;
        history.push(`/user/${id}?type=${type}`);
        // dispatch(getArticleAction({type}));
        // this.setState({type});
    }
    render() {
        return (
            <div>
                <a className="avatar"><img className="avatarImg" src={avatar} /></a>
                <div className="avatarInfo clearfix">
                    <a className="fl mrs avatarName" href="">{this.props.name}</a>
                    <div className="hidden break outnone"
                        contentEditable="true"
                        data-text="Say.."
                        suppressContentEditableWarning="true"
                        onBlur={this.setMotto}>{this.props.motto}</div>
                    <div className="flexContainer column mtm">
                        <Link className="mvs" to="/newblog">新建文章</Link>
                        <a className="mvs" onClick={this.changeType} data-type="draft" href="javascript:void(0)">未发布文章</a>
                        <a className="mvs" onClick={this.changeType} data-type="publish" href="javascript:void(0)">已发布文章</a>
                    </div>
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
})(Profile));
