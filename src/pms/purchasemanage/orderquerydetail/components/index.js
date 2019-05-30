import React from 'react';
import {
    Form,
} from 'antd';
import '../css/css.css';
import DetailsTabs from './tabs/index';
import FloatButton from './operation/index';
import Content from './content';

/**
 *作者: zhengxuening
 *功能描述: Amazon详情
 *时间: 2018/10/11 15:55
 */


class App extends React.Component {
    render() {
        return (
            <div className="pms-order-query-detail">
                <Content
                    {...this.props}
                />
                <DetailsTabs
                    {...this.props}
                />
                <FloatButton
                    {...this.props}
                />
            </div>
        );
    }
}

export default Form.create()(App);
