/**
 * 原待审包裹 - 失败原因显示组件
 */
import React, {Component} from 'react'
import {
    Row,
    Col,
} from 'antd';

export default class FailureInfo extends Component {

    render() {
        const { exceptionInfo } = this.props;
        return (
            <div className="newCluenk">
                <div className="title">失败原因</div>
                <div className="content">
                    <Row className="text-center">
                        <Col span={24}>
                           <p  className="text-danger font-lg-weight">{exceptionInfo}</p>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
