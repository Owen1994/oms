import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';
import './index.css';

// 邮箱管理
const EmailBundle = props => (
    <Bundle load={() => import('../email')}>
        {EmailBundles => <EmailBundles {...props} />}
    </Bundle>
);

// 消息管理
const MessageBundle = props => (
    <Bundle load={() => import('../message')}>
        {MessageBundles => <MessageBundles {...props} />}
    </Bundle>
);

// 客诉管理
const ComplaintBundle = props => (
    <Bundle load={() => import('../complaint')}>
        {ComplaintBundles => <ComplaintBundles {...props} />}
    </Bundle>
);

// 订单售后
const AftersaleBundle = props => (
    <Bundle load={() => import('../aftersale')}>
        {AftersaleBundles => <AftersaleBundles {...props} />}
    </Bundle>
);

// 智能客服
const IntelligentserviceBundle = props => (
    <Bundle load={() => import('../intelligentservice')}>
        {IntelligentserviceCom => <IntelligentserviceCom {...props} />}
    </Bundle>
);

// 基础设置
const SettingBundle = props => (
    <Bundle load={() => import('../basicsetting')}>
        {SettingCom => <SettingCom {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/customerservice/';
    return (
        <Switch>
            <Route path={`${path}email/`} render={() => <EmailBundle {...props} />} />
            <Route path={`${path}message/`} render={() => <MessageBundle {...props} />} />
            <Route path={`${path}complaint/`} render={() => <ComplaintBundle {...props} />} />
            <Route path={`${path}aftersale/`} render={() => <AftersaleBundle {...props} />} />
            <Route path={`${path}intelligentservice/`} render={() => <IntelligentserviceBundle {...props} />} />
            <Route path={`${path}basicsetting/`} render={() => <SettingBundle {...props} />} />

            <Redirect from={path} to={`${path}email/`} />
        </Switch>
    );
};

export default App;
