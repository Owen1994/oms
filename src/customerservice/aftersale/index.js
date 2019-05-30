import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

// 退款原因分类设置
const RefundreasonBundle = props => (
    <Bundle load={() => import('./refundreason')}>
        {RefundreasonBundles => <RefundreasonBundles {...props} />}
    </Bundle>
);

// 退款申请
const RefundApplicaBundle = props => (
    <Bundle load={() => import('./refundapplication')}>
        {RefundApplicaBundles => <RefundApplicaBundles {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/customerservice/aftersale/';
    return (
        <Switch>
            <Route path={`${path}refundreason/`} render={p => <RefundreasonBundle {...props} {...p} />} />
            <Route path={`${path}refundapplication/`} render={p => <RefundApplicaBundle {...props} {...p} />} />

            <Redirect from={path} to={`${path}refundreason/`} />
        </Switch>
    );
};


export default App;
