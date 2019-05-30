/**
*作者: 任贸华
*功能描述: 渲染主页面文件
*参数说明:
*时间: 2018/4/16 10:53
*/
import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { message } from 'antd';
import reducer from './reducers';
import App from './containers/App';

// 限制message个数
message.config({
    maxCount: 1,
});

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
);


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
