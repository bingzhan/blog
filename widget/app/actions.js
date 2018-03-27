import { batchActions } from 'redux-batched-actions';
import { actionCreators } from '../public/base';
import axios from "axios";

export const IS_LOGIN = 'IS_LOGIN'
export const isLogin = actionCreators(IS_LOGIN);

export const LOGIN_INFO = 'LOGIN_INFO'
export const loginInfo = actionCreators(LOGIN_INFO);

export const LOGIN_INFO_ASSIGN = 'LOGIN_INFO_ASSIGN'
export const loginInfoUpdate = actionCreators(LOGIN_INFO_ASSIGN);

export const CLEAR_INFO = 'CLEAR_INFO'
export const clearInfo = actionCreators(CLEAR_INFO);

export const UPDATE_ART_ENTITY = 'UPDATE_ART_ENTITY'
export const updateArtEntity = actionCreators(UPDATE_ART_ENTITY);

export const CHANGE_BLOG = 'CHANGE_BLOG'
export const changeBlog = actionCreators(CHANGE_BLOG);

export const PUBLISH_BLOG = 'PUBLISH_BLOG'
export const publishBlog = actionCreators(PUBLISH_BLOG);

export const UPDATE_LIST = 'UPDATE_LIST'
export const updateList = actionCreators(UPDATE_LIST);

export const ADD_LIST = 'ADD_LIST'
export const addList = actionCreators(ADD_LIST);

export const DEL_LIST = 'DEL_LIST'
export const delList = actionCreators(DEL_LIST);

export const UPDATE_COUNT = 'UPDATE_COUNT'
export const updateCount = actionCreators(UPDATE_COUNT);

export const add_COUNT = 'add_COUNT'
export const addCount = actionCreators(add_COUNT);

export const SUBTRACT_COUNT = 'SUBTRACT_COUNT'
export const subtractCount = actionCreators(SUBTRACT_COUNT);


export const loginAction = (data, history) => (dispatch, getState) => {
    const { baseurl } = getState();
    return axios.post(baseurl+'/login', data).then(response => {
        const results = response.data;
        if (!results.data){
            alert('用户或密码错误！');
            return false;
        }
        history.replace('/user/'+results.session.userId);
        dispatch(batchActions([
            isLogin(true),
            loginInfo({name: results.session.userName,id: results.session.userId})
        ]));
    })
    .catch((error) => {
        console.log(error);
    });
}

export const logoutAction = history => (dispatch, getState) => {
    const { baseurl } = getState();
    return axios.get(baseurl+'/logout').then(response => {
        dispatch(batchActions([
            isLogin(false),
            clearInfo()
        ]));
        history.push('/');
    });
}

export const getHeaderAction = data => (dispatch, getState) => {
    const { baseurl } = getState();
    return axios.get(baseurl+'/getHeader', data).then(response => {
        const results = response.data;
        const islogin = !!results.data;
        dispatch(batchActions([
            isLogin(islogin),
            loginInfo({name: results.data.name,id: results.data.id})
        ]));
    })
    .catch((error) => {
        console.log(error);
    });
}

export const setMottoAction = data => (dispatch, getState) => {
    const { baseurl } = getState();
    return axios.post(baseurl+'/setMotto', data).then(response => {
        dispatch(loginInfoUpdate({motto: data.text}));
    })
    .catch((error) => {
        console.log(error);
    });
}

export const saveBlogAction = (data, history) => (dispatch, getState) => {
    const { baseurl, loginInfo, count } = getState();
    return axios.post(baseurl+'/saveArticle', data).then(response => {
        const results = response.data;
        if (data.aid){
            dispatch(changeBlog(data));
            history.push(`/user/${loginInfo.id}`);
            return false;
        }
        const id = results.data.artid;
        const actions = [
            updateArtEntity({[id]: results.data}),
            addList(id, 'user'),
            addList(id, 'draft')
        ];
        count.userCount && actions.push(addCount('user'));
        count.draftCount && actions.push(addCount('draft'));
        dispatch(batchActions(actions));
        history.push(`/user/${loginInfo.id}`);
    })
    .catch((error) => {
        console.log(error);
    });
}

export const publishBlogAction = data => (dispatch, getState) => {
    const { baseurl, count } = getState();
    return axios.post(baseurl+'/publishArticle', data).then(response => {
        const results = response.data;
        if (data.aid){
            const actions = [
                publishBlog(data.aid),
                addList(data.aid, 'user'),
                addList(data.aid, 'publish'),
                delList(data.aid, 'draft')
            ];
            count.userCount && actions.push(addCount('user'));
            count.publishCount && actions.push(addCount('publish'));
            count.draftCount && actions.push(subtractCount('draft'));
            dispatch(batchActions(actions));
            return false;
        }
        const id = results.data.artid;
        const actions = [
            updateArtEntity({[id]: results.data}),
            addList(id, 'user'),
            addList(id, 'publish')
        ];
        count.userCount && actions.push(addCount('user'));
        count.publishCount && actions.push(addCount('publish'));
        dispatch(batchActions(actions));
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getArticleAction = data => (dispatch, getState) => {
    const { baseurl, homeList, userList, publishList, draftList, count } = getState();
    const typeIndexs = {
        home: homeList,
        user: userList,
        publish: publishList,
        draft: draftList,
    };
    const hasfirst = !!Number(count[`${data.type}Count`]);
    Object.assign(data, {
        hasfirst,
        start: typeIndexs[data.type].length
    });
    if (data.start >= count[`${data.type}Count`]){
        return false;
    }
    return axios.get(baseurl+'/getArticle', {
        params: data
    }).then(response => {
        const results = response.data;
        const { list, entity, count } = results.data;
        const actions = [
            updateList(list, data.type),
            updateArtEntity(entity)
        ];
        if (count) actions.push(updateCount(count));
        dispatch(batchActions(actions));
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getDetailAction = data => (dispatch, getState) => {
    const { baseurl } = getState();
    return axios.get(baseurl+'/getDetail', {
        params: data
    }).then(response => {
        const results = response.data;
        dispatch(updateArtEntity({
            [results.data.artid]: results.data
        }));
    })
    .catch((error) => {
        console.log(error);
    });
}
