import React from 'react';
import {
    Modal,
    Row,
    Col,
    Progress,
} from 'antd';

export default class OmsModal extends React.Component {

    render () {
        const { manageVisible, handleCancel, manageData, getPercent, getFixed } = this.props;
        return (
            <Modal
                centered
                destroyOnClose
                footer={null}
                title="OMS-订单管理"
                visible={manageVisible}
                onCancel={handleCancel}
                width={600}
            >
                <div>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">货到付款</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('payOnDelivery', manageData)} format={per => '平均：' + getFixed('payOnDelivery', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">留言订单</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('messageOrder', manageData)} format={per => '平均：' + getFixed('messageOrder', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">黑名单客户</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('blackList', manageData)} format={per => '平均：' + getFixed('blackList', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">分仓失败</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('separateFail', manageData)} format={per => '平均：' + getFixed('separateFail', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">产品信息错误</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('productInfoError', manageData)} format={per => '平均：' + getFixed('productInfoError', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">收件人信息错误</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('receiverInfoError', manageData)} format={per => '平均：' + getFixed('receiverInfoError', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">手工导入订单</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('manualImport', manageData)} format={per => '平均：' + getFixed('manualImport', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">超额订单</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('overfulfill', manageData)} format={per => '平均：' + getFixed('overfulfill', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">零单价订单</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('zeroPrice', manageData)} format={per => '平均：' + getFixed('zeroPrice', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">SKU物流属性缺失</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('skuLogisticsMiss', manageData)} format={per => '平均：' + getFixed('skuLogisticsMiss', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">SKU无储位</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('skuNoStorage', manageData)} format={per => '平均：' + getFixed('skuNoStorage', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">线上渠道跟踪号为空</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('trackNoMiss', manageData)} format={per => '平均：' + getFixed('trackNoMiss', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row className="margin-ss-bottom">
                        <Col span={6} className="text-right padding-md-right">调用物流优化异常</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('callPreferEx', manageData)} format={per => '平均：' + getFixed('callPreferEx', manageData) + 'm'} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} className="text-right padding-md-right">系统异常</Col>
                        <Col span={14}>
                            <Progress percent={getPercent('systemEx', manageData)} format={per => '平均：' + getFixed('systemEx', manageData) + 'm'} />
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}