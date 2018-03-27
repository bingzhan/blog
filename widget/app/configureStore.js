import { createStore, applyMiddleware, compose } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';

const configureStore = preloadedState => {
    const store = createStore(
        enableBatching(rootReducer),
        preloadedState,
        compose(
            applyMiddleware(
                thunkMiddleware
            ),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )
    window.store = store;
    return store;
}

export default configureStore;
