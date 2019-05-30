import React from 'react';
import {
    Modal,
    Row,
    Col,
    Progress,
} from 'antd';

export default class PlatModal extends React.Component {
    render () {
        const { platVisible, handleCancel, platData, getPercent, getFixed } = this.props;
        return (
            <Modal
                centered
                destroyOnClose
                footer={null}
                title="OMS-平台订单"
                visible={platVisible}
                onCancel={handleCancel}
            >
                <div>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">正常推送</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('normal', platData)} format={per => '平均：' + getFixed('normal', platData) + 'm'} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className="text-right padding-md-right">系统异常</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('exception', platData)} format={per => '平均：' + getFixed('exception', platData) + 'm'} />
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}