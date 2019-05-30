/**
 * 作者: 陈林
 * 描述: 分仓订单详情入口
 * 时间: 2018/4/18 0018 下午 8:53
 **/
import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import {functions} from "../../util/baseTool";

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
        return functions(this, '001-000003-000001-000001-001') ?
            <Provider store={store}>
                <App {...this.props}/>
            </Provider> : null
    }
}



