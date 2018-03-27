import { combineReducers } from "redux";
import { createNamedWrapperReducer } from '../../public/base'
import { IS_LOGIN, LOGIN_INFO, LOGIN_INFO_ASSIGN, CLEAR_INFO,
    UPDATE_ART_ENTITY, CHANGE_BLOG, PUBLISH_BLOG,
    UPDATE_LIST, ADD_LIST, DEL_LIST,
    UPDATE_COUNT, ADD_COUNT, SUBTRACT_COUNT } from '../actions';

const baseurl = () => '';
const staticServer = () => 'http://0.0.0.0:3001';

const islogin = (state=false, {type, data}) => {
    switch (type) {
    case IS_LOGIN:
        return data;
    default:
        return state;
    }
}
const loginInfo = (state={}, {type, data}) => {
    switch (type) {
    case LOGIN_INFO:
        return data;
    case LOGIN_INFO_ASSIGN:
        return Object.assign({}, state, data);
    case CLEAR_INFO:
        return {};
    default:
        return state;
    }
}

const list = (state=[], {type, data}) => {
    switch (type) {
    case UPDATE_LIST:
        return state.concat(data);
    case ADD_LIST:
        return [data, ...state];
    case DEL_LIST:
        return state.filter(unit => unit !== data);
    default:
        return state;
    }
}

const count = (state={}, {type, data}) => {
    switch (type) {
    case UPDATE_COUNT:
        return Object.assign({}, state, data);
    case ADD_COUNT:
        return Object.assign({}, state, {
            [`${data}Count`]: (Number(state[`${data}Count`]) || 0) + 1
        });
    case SUBTRACT_COUNT:
        return Object.assign({}, state, {
            [`${data}Count`]: (Number(state[`${data}Count`]) || 0) - 1
        });
    default:
        return state;
    }
}

const blogEntity = (state={}, {type, data}) => {
    switch (type) {
    case UPDATE_ART_ENTITY:
        return Object.assign({}, state, data);
    case CHANGE_BLOG:
        return Object.assign({}, state, {
            [data.aid]: Object.assign({}, state[data.aid], {
                title: data.title,
                content: data.content
            })
        });
    case PUBLISH_BLOG:
        const item = Object.assign({}, state[data], {
            publish: 1
        });
        return Object.assign({}, state, {
            [data]: item
        });
    default:
        return state;
    }
}

export default combineReducers({
    baseurl,
    staticServer,
    islogin,
    loginInfo,
    blogEntity,
    homeList: createNamedWrapperReducer(list, 'home'),
    userList: createNamedWrapperReducer(list, 'user'),
    publishList: createNamedWrapperReducer(list, 'publish'),
    draftList: createNamedWrapperReducer(list, 'draft'),
    count,
});
