/**
 *作者: 黄建峰
 *功能描述:  报表
 *时间: 2018/10/11 10:55
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from '../../common/components/bundle/bundle';


/**
 *  导入导出列表
 * @param props
 * @returns {*}
 * @constructor
 */
const ImportexportlistBundle = props => (
    <Bundle load={() => import('./importexportlist')}>
        {ImportexportlistComponent => <ImportexportlistComponent {...props} />}
    </Bundle>
);


const App = (props) => {
    const path = '/pms/importexportmanage/';
    return (
        <div>
            <Switch>
                <Route path={`${path}importexportlist/`} render={p => <ImportexportlistBundle {...props} {...p} />} />
            </Switch>
        </div>
    );
};


export default App;