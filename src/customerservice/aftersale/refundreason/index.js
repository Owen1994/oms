/**
 *作者: yangbo
 *功能描述:  标签分类
 *时间: 2018/8/31
 */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './containers';
import './css/index.css';
import Error403 from '../../../common/components/403/403';
import { getModePlatform } from '../../common/request';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware),
);

export default class Entrance extends React.Component {
    state = {
        hasFunction: false,
    }

    componentDidMount() {
        const pathname = window.location.pathname;
        const { menuInfos } = this.props;
        const keys = menuInfos.functions[pathname] || [];
        if (keys.includes('009-000004-000001-001') || keys.includes('009-000004-000001-005')) {
            this.setState({
                hasFunction: true,
            });
        }
    }

    render() {
        if (!this.state.hasFunction) {
            return <Error403 />;
        }
        return (
            <Provider store={store}>
                <App {...this.props} />
            </Provider>
        );
    }
}
