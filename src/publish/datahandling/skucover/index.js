/**
 *作者: zhengxuening
 *功能描述:  SKU覆盖列表
 *时间: 2019年04月22日09:30:11
 */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers';
import Functions from '@/components/functions';

const middleware = [thunk];
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
            <Functions {...this.props} isPage={true} functionkey="008-000006-000003-001">
                <Provider store={store}>
                    <App {...this.props} />
                </Provider>
            </Functions>
        )
    }
}
