/**
 *作者: 陈文春
 *功能描述:  库存查询
 *时间: 2018年11月27日18:02:34
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
import Functions from '@/components/functions';

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
            <Functions isPage={true} {...this.props} functionkey={'001-000001-000008-000001-001'}>
                <Provider store={store}>
                    <App {...this.props} />
                </Provider>
            </Functions>
        );
    }
}
