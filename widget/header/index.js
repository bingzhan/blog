import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getHeaderAction, logoutAction } from '../app/actions';

import './index.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(getHeaderAction());
    }
    logout() {
        const { dispatch, history } = this.props;
        dispatch(logoutAction(history));
    }
    render() {
        const { islogin, loginInfo } = this.props;
        return (
            <div className="headerArea relative">
                <div className="headerContent flexContainer">
                    <div className="flexOne"><Link className="logoIcon" to="/">Blog</Link></div>
                    <div className="flexOne center"><input className="headerSearch" type="text" placeholder="Search..." /></div>
                    {!islogin ?
                        <div className="flexOne center end headerButtonBar">
                            <Link className="headerButton" to="/login">Login</Link>
                            <Link className="headerButton" to="/signin">Sign in</Link>
                        </div> :
                        <div className="flexOne center end headerButtonBar">
                            <Link className="headerButton" to={"/user/" +loginInfo.id}>{loginInfo.name}</Link>
                            <a className="headerButton" onClick={this.logout} href="javascript:void(0)">Logout</a>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
export default withRouter(connect(state => {
    const { islogin, loginInfo } = state;
    return {
        islogin, loginInfo
    }
})(Header));
