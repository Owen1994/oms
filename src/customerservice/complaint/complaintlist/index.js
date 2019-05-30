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
        platformAuthority: 2, // 0-无平台权限 1-有平台权限, 2-平台接口还未响应
    }

    componentDidMount() {
        const pathname = window.location.pathname;
        const { menuInfos } = this.props;
        const keys = menuInfos.functions[pathname] || [];
        if (keys.includes('009-000003-000001-001') || keys.includes('009-000003-000001-010') || keys.includes('009-000003-000001-014')) {
            this.setState({
                hasFunction: true,
            });
        }
        getModePlatform({modeUse: 'complain'})
            .then(data => {
                if (Array.isArray(data) && !data.length) {
                    this.setState({ platformAuthority: 0 });
                    return;
                }
                this.setState({ platformAuthority: 1 });
            })
    }

    render() {
        const { platformAuthority } = this.state;
        if (platformAuthority === 2) {
            return false;
        } else if (platformAuthority === 0) {
            return <Error403 />;
        }
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
