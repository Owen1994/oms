/**
 *作者: 唐峰
 *功能描述: 渠道标记页面
 *参数说明:
 *时间: 2018/4/4 9:21
 */

import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'
import {functions} from "../../../util/baseTool";

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
            <Provider store={store}>
                <App {...this.props}/>
            </Provider>
        );
    }
}
