/**
 *作者: 蒋林峰
 *功能描述:  样品管理
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';

/**
 *  样品记录
 * @param props
 * @returns {*}
 * @constructor
 */
const SampleRecordBundle = props => (
    <Bundle load={() => import('./samplerecord')}>
        {SampleRecordComponent => <SampleRecordComponent {...props} />}
    </Bundle>
);

const App = (props) => {
    const path = '/wms/samplemanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}samplerecord/`} render={p => <SampleRecordBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
