/**
 *作者: zhengxuening
 *功能描述:  阿里订单详情
 *时间: 2019/02/21 09:00
 */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers';
import Functions from '../../../components/functions';

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
            <Functions
                isPage
                {...this.props}
                functionkey="010-000003-000006-000001-001"
            >
                <Provider store={store}>
                    <App {...this.props} />
                </Provider>
            </Functions>
        );
    }
}
