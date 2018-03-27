import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from '../app/actions';

class Login extends Component {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this)
    }
    componentDidMount() {
        this.form.username.focus();
    }
    submit(e) {
        e.stopPropagation();
        e.preventDefault();

        this.props.dispatch(loginAction({
            username: this.form.username.value,
            password: this.form.password.value
        }, this.props.history));
    }
    render() {
        return (
            <form className="loginFrame" ref={node => this.form=node}>
                <div className="">
                    <input className="loginInput" type="text" name="username" placeholder="User name" />
                </div>
                <div className="">
                    <input className="loginInput" type="password" name="password" placeholder="Password" />
                </div>
                <button className="loginSubmit" onClick={this.submit}>Submit</button>
            </form>
        )
    }
}
export default withRouter(connect()(Login));
