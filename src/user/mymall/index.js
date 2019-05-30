/**
 *作者: 陈文春
 *功能描述:  Mymall平台授权
 *时间: 2019年1月2日09:54:55
 */
import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import App from './containers'
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
            <Functions isPage={true} {...this.props} functionkey={'004-000002-000006-001'}>
                <Provider store={store}>
                    <App {...this.props}/>
                </Provider>
            </Functions>
        );
    }
}
