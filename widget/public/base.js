
export const actionCreators = type => (data, name) => {
    if (!name){
        return {
            type, data
        }
    }
    return {
        type, data, name
    }
}


export const createNamedWrapperReducer = (reducerFunction, reducerName) => {
    return (state, action) => {
        const {name} = action;
        const isInitializationCall = state === undefined;
        if(name !== reducerName && !isInitializationCall) return state;

        return reducerFunction(state, action);
    }
}

export const searchToObj = str => {
    const data = {};
    const val = str.slice(1);
    const strArray = val.split('&');
    strArray.map(k => {
        const as = k.split('=');
        data[as[0]] = as[1];
    });
    return data;
}

function preventDefault(e){
    window.event? window.event.returnValue = false : e.preventDefault();
}

function stopPropagation(e){
    window.event? window.event.cancelBubble = true : e.stopPropagation();
}
