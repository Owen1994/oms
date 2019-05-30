import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

// 自动回复
const AutoreplyBundle = props => (
    <Bundle load={() => import('./autoreply')}>
        {AutoreplyCom => <AutoreplyCom {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/customerservice/intelligentservice/';
    return (
        <Switch>
            <Route path={`${path}autoreply/`} render={p => <AutoreplyBundle {...props} {...p} />} />
            <Redirect from={path} to={`${path}autoreply/`} />
        </Switch>
    );
};


export default App;
