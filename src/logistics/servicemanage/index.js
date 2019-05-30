import React from "react";
import { Route, Switch } from "react-router-dom";

import Bundle from '../../common/components/bundle/bundle'

/**
 * 物流提供商
 * @param props
 * @returns {*}
 * @constructor
 */
const ProviderBundle = (props) => (
    <Bundle load={() => import('./provider')}>
        {(ProviderComponent) => <ProviderComponent {...props} />}
    </Bundle>
);

// /**
//  * 面单管理
//  * @param props
//  * @returns {*}
//  * @constructor
//  */
// const ManagementBundle = (props) => (
//     <Bundle load={() => import('./management')}>
//         {(ManagementComponent) => <ManagementComponent {...props} />}
//     </Bundle>
// );


const App = (props) => {
    const path = '/lgtconfig/servicemanage/';
    return (
        <Switch>
            <Route path={`${path}provider/`} render={(p) => <ProviderBundle {...props} {...p}/> } />
            {/*<Route path={`${path}management/`} render={(p) => <ManagementBundle {...props} {...p}/> } />*/}
        </Switch>
    )
};


export default App;
