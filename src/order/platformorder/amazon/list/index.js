/**
 *作者: zhengxuening
 *功能描述:  amazon订单列表
 *时间: 2018/12/14 15:55
 */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers';
import Functions from '../../../../components/functions';
import './css/css.css';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware),
);

export default class AmazonListlApp extends React.Component {
    render() {
        return (
            <Functions
                isPage
                {...this.props}
                functionkey="001-000001-000006-001"
            >
                <Provider store={store}>
                    <App {...this.props} />
                </Provider>
            </Functions>
        );
    }
}
