import React from 'react';
import {
    Form,
} from 'antd';
import '../css/css.css';

import PrintView from './PrintView';
import Functions from '../../../../components/functions';


/**
 *作者: zhengXueNing
 *功能描述: 采购单打印页
 *时间: 2018/10/11 15:55
 */


class App extends React.Component {
    render() {
        return (
            <div className="yks-erp-tabs">
                <Functions
                    isPage
                    {...this.props}
                    functionkey="010-000003-000005-000002-002"
                >
                    <PrintView {...this.props} />
                </Functions>
            </div>

        );
    }
}

export default Form.create()(App);
