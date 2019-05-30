/**
 *作者: 黄建峰
 *功能描述:  sku税率
 *时间: 2018/4/17 10:55
 */
import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
// import reducer from './reducers/index'
import App from './containers/index'

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    // reducer,
    applyMiddleware(...middleware)
);

export default class Entrance extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App {...this.props}/>
            </Provider>
        );
    }
}
