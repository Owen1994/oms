/**
 *作者: yangbo
 *功能描述:  邮箱绑定
 *时间: 2018/8/31
 */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './components';
import Error403 from '../../../common/components/403/403.js';
import { getPlatformList } from '../../common/request';

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
        platformAuthority: 2, // 0-无平台权限 1-有平台权限, 2-平台接口还未响应
    }

    componentDidMount() {
        getPlatformList({ commonStatus: -1 }).then((result) => {
            if (Array.isArray(result) && !result.length) {
                this.setState({ platformAuthority: 0 });
                return;
            }
            this.setState({ platformAuthority: 1 });
        });
    }

    render() {
        const { platformAuthority } = this.state;
        if (platformAuthority === 2) {
            return false;
        } else if (platformAuthority === 0) {
            return <Error403 />;
        }
        return (
            <Provider store={store}>
                <App {...this.props} />
            </Provider>
        );
    }
}
