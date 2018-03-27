import React, { Component } from "react";
import { connect } from 'react-redux';
import Item from './item';
import { getArticleAction } from '../app/actions';

class List extends Component {
    constructor(props) {
        super(props);
        this.loadmore = this.loadmore.bind(this);
    }
    loadmore() {
        const { type, dispatch } = this.props;
        dispatch(getArticleAction({type}));
    }
    render() {
        return (
            <div className="artUl">
                {!this.props.list.length && <div className="noList">NO DATA</div>}
                {this.props.list.map(unit => {
                    return <Item blogId={unit} key={unit} />
                })}
                {this.props.hasMore && <a className="loadmoreList" onClick={this.loadmore} href="javascript:void(0)">加载更多</a>}
            </div>
        )
    }
}

export default connect((state, ownProps) => {
    const { baseurl, homeList, userList, publishList, draftList, count } = state;
    const typeIndexs = {
        home: homeList,
        user: userList,
        publish: publishList,
        draft: draftList,
    };
    const { type } = ownProps;
    const list = typeIndexs[type];
    const total = count[`${type}Count`];
    return {
        list,
        hasMore: total > list.length
    }
})(List);
