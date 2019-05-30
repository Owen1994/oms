import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

// paypal账号
const PaypalBundle = props => (
    <Bundle load={() => import('./paypalaccount')}>
        {PaypalCom => <PaypalCom {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/customerservice/basicsetting/';
    return (
        <Switch>
            <Route path={`${path}paypalaccount/`} render={p => <PaypalBundle {...props} {...p} />} />
            
            <Redirect from={path} to={`${path}paypalaccount/`} />
        </Switch>
    );
};

export default App;
