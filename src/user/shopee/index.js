/**
 *作者: huangjianfeng
 *功能描述:  ebay订单抓单
 *时间: 2018/11/20 09:42
 */
import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import App from './containers'
import './css/index.css'
import Functions from '@/components/functions';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);

export default class Entrance extends React.Component {
    render() {
        return (
            <Functions isPage={true} {...this.props} functionkey={'004-000002-000007-001'}>
                <Provider store={store}>
                    <App {...this.props}/>
                </Provider>
            </Functions>
        );
    }
}