/**
 *作者: 蒋林峰
 *功能描述:  容器管理
 */
import React from 'react';
import {
    createStore,
    applyMiddleware,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware),
);

export default class Entrance extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App {...this.props} />
            </Provider>
        );
    }
}
