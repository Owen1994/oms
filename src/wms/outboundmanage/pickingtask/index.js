/**
 *作者: 蒋林峰
 *功能描述:  拣货任务
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../../common/components/bundle/bundle';

/**
 *  拣货任务
 * @param props
 * @returns {*}
 * @constructor
 */
const PickingTaskBundle = props => (
    <Bundle load={() => import('./indexs')}>
        {PickingTaskComponent => <PickingTaskComponent {...props} />}
    </Bundle>
);
/**
 *  任务详情
 * @param props
 * @returns {*}
 * @constructor
 */
const PickingTaskDetailBundle = props => (
    <Bundle load={() => import('./detail')}>
        {PickingTaskDetailComponent => <PickingTaskDetailComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/wms/outboundmanage/pickingtask/';
    return (
        <div>
            <Switch>
                <Route path={`${path}detail/`} render={p => <PickingTaskDetailBundle {...props} {...p} />} />
                <Route exact path={path} render={p => <PickingTaskBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;
