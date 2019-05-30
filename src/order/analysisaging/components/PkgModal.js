import React from 'react';
import {
    Modal,
    Row,
    Col,
    Progress,
} from 'antd';

export default class PkgModal extends React.Component {
    render () {
        const { packageVisible, handleCancel, packageData, getPercent, getFixed } = this.props;
        return (
            <Modal
                centered
                destroyOnClose
                footer={null}
                title="OMS-包裹订单"
                visible={packageVisible}
                onCancel={handleCancel}
            >
                <div>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">推送失败</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('pushFail', packageData)} format={per => '平均：' + getFixed('pushFail', packageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">待推送</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('waitPush', packageData)} format={per => '平均：' + getFixed('waitPush', packageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">负利润包裹</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('negativeProfit', packageData)} format={per => '平均：' + getFixed('negativeProfit', packageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">偏远包裹</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('remote', packageData)} format={per => '平均：' + getFixed('remote', packageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">超重包裹</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('overweight', packageData)} format={per => '平均：' + getFixed('overweight', packageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">待EUB审核包裹</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('waitEubAudit', packageData)} format={per => '平均：' + getFixed('waitEubAudit', packageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">EUB渠道包裹</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('eubChannel', packageData)} format={per => '平均：' + getFixed('eubChannel', packageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">渠道异常</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('channelEx', packageData)} format={per => '平均：' + getFixed('channelEx', packageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">缺货包裹</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('stockout', packageData)} format={per => '平均：' + getFixed('stockout', packageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className="text-right padding-md-right">系统异常</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('systemEx', packageData)} format={per => '平均：' + getFixed('systemEx', packageData) + 'm'} />
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}