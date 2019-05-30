import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

// 客诉列表
const ComplaintlistBundle = props => (
    <Bundle load={() => import('./complaintlist')}>
        {ComplaintlistBundles => <ComplaintlistBundles {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/customerservice/complaint/';
    return (
        <Switch>
            <Route path={`${path}complaintlist/`} render={p => <ComplaintlistBundle {...props} {...p} />} />

            <Redirect from={path} to={`${path}complaintlist/`} />
        </Switch>
    );
};


export default App;
