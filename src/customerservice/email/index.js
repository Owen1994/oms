import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

// 邮箱绑定
const BindingBundles = props => (
    <Bundle load={() => import('./binding')}>
        {BindingBundle => <BindingBundle {...props} />}
    </Bundle>
);

// 标签绑定
const LabelBundle = props => (
    <Bundle load={() => import('./label')}>
        {Component => <Component {...props} />}
    </Bundle>
);

// 邮件管理
const ListBundle = props => (
    <Bundle load={() => import('./list')}>
        {Component => <Component {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/customerservice/email/';
    return (
        <Switch>
            <Route path={`${path}binding/`} render={p => <BindingBundles {...props} {...p} />} />
            <Route path={`${path}label/`} render={p => <LabelBundle {...props} {...p} />} />
            <Route path={`${path}list/`} render={p => <ListBundle {...props} {...p} />} />

            <Redirect from={path} to={`${path}binding/`} />
        </Switch>
    );
};


export default App;
