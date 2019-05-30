/**
 *作者: xupeiwen
 *功能描述:  消息列表
 *时间: 2018/8/31
 */
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './css/index.css';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import App from './components';
import Functions from '@/components/functions';
import Error403 from '../../../common/components/403/403.js';
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
        platformAuthority: 2, // 0-无平台权限 1-有平台权限, 2-平台接口还未响应
        noAccess: false
    }

    componentDidMount() {
        // 权限过滤
        const pathname = window.location.pathname;
        const { menuInfos } = this.props;
        const keys = menuInfos.functions[pathname] || [];
        if (!keys.includes('009-000002-000004-002') && !keys.includes('009-000002-000004-008')) {
            this.setState({ noAccess: true });
        }
        // 平台权限管理
        getModePlatform({modeUse: 'message'})
            .then(messagePlatform => {
                getModePlatform({modeUse: 'buyer_mail'})
                    .then(emailPlatform => {
                        if (!messagePlatform.length && !emailPlatform.length) {
                            this.setState({ platformAuthority: 0 });
                            return;
                        }
                        this.setState({ platformAuthority: 1 });
                    })
            })
    }

    render() {
        const { noAccess, platformAuthority } = this.state;
        if (noAccess) {
            return <Error403 />;
        }
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
