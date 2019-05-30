/**
 *作者: huangjianfeng
 *功能描述:  图库设置
 *时间: 2018/8/27 15:55
 */
import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import App from './containers'
import Functions from '../../../components/functions'
import "./css.css"

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
            <Functions isPage={true} {...this.props} functionkey={'008-000002-000001-001'}>
                <Provider store={store}>
                    <App {...this.props}/>
                </Provider>
            </Functions>
        );
    }
}
