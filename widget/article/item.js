import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Item extends Component {
    render() {
        const { artid, title, content, publish } = this.props;
        const path = publish === 0 ? `/newblog?artid=${artid}` : `/blog/${artid}`;
        return (
            <div className="artitem">
                <h1 className="pointer"><Link to={path}>{title}</Link></h1>
                <div className="hidden" dangerouslySetInnerHTML={{__html: content}}></div>
            </div>
        )
    }
}

export default connect((state, ownProps) => {
    const { blogId } = ownProps;
    const { artid, title, content, publish } = state.blogEntity[blogId];
    return {
        artid, publish,
        title: unescape(title),
        content: unescape(content),
    }
})(Item);
