/**
 *作者: chenwenchun
 *功能描述: itemID分析
 *时间: 2019年4月12日09:45:03
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
    middleware.push(createLogger());
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware),
);

export default class Entrance extends React.Component {
    render() {
        return (
            <Functions
                isPage
                {...this.props}
                functionkey="001-000006-000003-001"
            >
                <Provider store={store}>
                    <App {...this.props} />
                </Provider>
            </Functions>
        );
    }
}
