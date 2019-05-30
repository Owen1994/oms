import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

// 消息拦截
const BindingBundle = props => (
    <Bundle load={() => import('./intercept')}>
        {BindingBundles => <BindingBundles {...props} />}
    </Bundle>
);

// 模板分类
const ClassificationBundle = props => (
    <Bundle load={() => import('./templateclass')}>
        {BindingBundles => <BindingBundles {...props} />}
    </Bundle>
);

// 模板管理
const Templatelist = props => (
    <Bundle load={() => import('./templatelist')}>
        {Templatelists => <Templatelists {...props} />}
    </Bundle>
);

// 消息列表
const Messagelist = props => (
    <Bundle load={() => import('./messagelist')}>
        {Messagelists => <Messagelists {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/customerservice/message/';
    return (
        <Switch>
            <Route path={`${path}intercept/`} render={p => <BindingBundle {...props} {...p} />} />
            <Route path={`${path}templatelist/`} render={p => <Templatelist {...props} {...p} />} />
            <Route path={`${path}templateclass/`} render={p => <ClassificationBundle {...props} {...p} />} />
            <Route path={`${path}messagelist/`} render={p => <Messagelist {...props} {...p} />} />
            <Redirect from={path} to={`${path}intercept/`} />
        </Switch>
    );
};

export default App;
