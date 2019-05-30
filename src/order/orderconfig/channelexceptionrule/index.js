/**
 * 描述：订单配置 - 渠道异常规则
 */
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './reducers';
import App from './container'
import {functions} from "util/baseTool";
import NotFound from '@/common/components/403/403';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production'){
    middleware.push(createLogger())
}
const store = createStore(reducer, applyMiddleware(...middleware));

export default class Entrance extends React.Component{
    render(){
        return(
            functions(this, '001-000004-000007-001') ?
                <Provider store={store}>
                    <App {...this.props}/>
                </Provider> 
            : <NotFound/>
        )
    }
}