import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { createLogger } from 'redux-logger';
import App1 from './containers';
import './style.css';
import Functions from "../../../components/functions";

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware),
);

/**
 *作者: 黄建峰
 *功能描述: 渠道设置
 *时间: 2018/12/10 10:45
 */
export default class App extends React.Component {

    render(){
        return (

                <div className="yks-erp-tabs">
                    <Functions
                        isPage
                        {...this.props}
                        functionkey="002-000002-000002-001"
                    >
                        <Provider store={store}>
                            <App1 {...this.props} />
                        </Provider>
                    </Functions>
                </div>
        )
    }
}
