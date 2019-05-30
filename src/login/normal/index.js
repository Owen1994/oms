/**
*作者: 任贸华
*功能描述: 登录入口文件
*参数说明:
*时间: 2018/4/16 11:05
*/
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import App from './containers/App';


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
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
