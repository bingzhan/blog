import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CKEditor from "react-ckeditor-component";
import { saveBlogAction, publishBlogAction, getDetailAction } from '../app/actions';
import { searchToObj } from '../public/base';

class NewBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
        };
        this.input = this.input.bind(this);
        this.save = this.save.bind(this);
        this.publish = this.publish.bind(this);
    }
    componentDidMount() {
        const { aid, hasLoad, dispatch } = this.props;
        if (hasLoad){
            dispatch(getDetailAction({
                aid
            }));
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.title !== nextProps.title){
            this.setState({
                title: nextProps.title
            });
        }
    }
    input(e) {
        this.setState({
            title: e.target.value
        })
    }
    save() {
        const { aid, history, dispatch } = this.props;
        dispatch(saveBlogAction({
            aid,
            title: this.state.title,
            content: this.editor.state.content
        }, history));
    }
    publish() {
        const { aid, dispatch } = this.props;
        const data = aid ? { aid } : {
            title: this.state.title,
            content: this.editor.state.content
        }
        dispatch(publishBlogAction(data));
    }
    render() {
        return (
            <div className="newBlogArea">
                <input className="blogTileInput"
                    type="text"
                    placeholder="Title"
                    onChange={this.input}
                    value={this.state.title} />
                <Editor ref={node => this.editor=node} content={this.props.content} />
                <div className="mtl">
                    <button onClick={this.save}>保存</button>
                    <button onClick={this.publish}>发布</button>
                </div>
            </div>
        )
    }
}

class Editor extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.state = {
            content: props.content,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.content !== nextProps.content){
            this.setState({
                content: nextProps.content
            });
        }
    }
    updateContent(newContent) {
        this.setState({
            content: newContent
        })
    }
    onChange(evt){
        var newContent = evt.editor.getData();
        this.setState({
            content: newContent
        })
    }
    onBlur(evt){
        console.log("onBlur event called with event info: ", evt);
    }
    afterPaste(evt){
        console.log("afterPaste event called with event info: ", evt);
    }
    render() {
        return (
            <CKEditor
              activeClass="p10"
              content={this.state.content}
              events={{
                "blur": this.onBlur,
                "afterPaste": this.afterPaste,
                "change": this.onChange
              }}
             />
        )
    }
}
export default withRouter(connect(state => {
    const { blogEntity } = state;
    const search = searchToObj(location.search);
    const { title='', content='' } = blogEntity[search.artid] || {};
    return {
        hasLoad: !blogEntity[search.artid],
        aid: search.artid,
        title: unescape(title),
        content: unescape(content)
    }

})(NewBlog));
