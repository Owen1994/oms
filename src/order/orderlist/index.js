/**
 *作者: 魏洁(唐峰)
 *功能描述: 订单管理--全部订单--入口文件
 *参数说明:
 *时间: 2018/5/28 10:16
 */
import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import {functions} from "../../util/baseTool";
import Functions from "../../components/functions"

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

export default class Entrance extends React.Component {
    render() {
        return (

            <Functions {...this.props} functionkey={'001-000002-000001-001'}>
                <Provider store={store}>
                    <App {...this.props}/>
                </Provider>
            </Functions>
        );
    }
}
