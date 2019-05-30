import React from 'react'
import {
    Modal,
    Button,
    Row,
    Col
} from 'antd'

export default class AuthorizationDetailModal extends React.Component {
    state = {
        record: undefined
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.visible !== nextProps.visible && nextProps.visible && nextProps.record) {
            this.setState({
                record: nextProps.record
            })
        }
    }
    render() {
        const { visible } = this.props;
        const { record } = this.state;
        return (
            <Modal
                visible={visible}
                title={'查看'}
                destroyOnClose={true}
                width={600}
                onCancel={this.props.closeModal}
                footer={
                    <Button onClick={this.props.closeModal}>关闭</Button>
                }
                className="detail-modal"
            >
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={12} style={{ textAlign: 'right' }}>eBay账号：</Col>
                            <Col span={12} style={{ textAlign: 'left' }}>{record ? record.account : ''}</Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={12} style={{ textAlign: 'right' }}>开发者账号：</Col>
                            <Col span={12} style={{ textAlign: 'left' }}>{record ? record.developAccount : ''}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={12} style={{ textAlign: 'right' }}>Token授权日期：</Col>
                            <Col span={12} style={{ textAlign: 'left' }}>{record ? record.tokenAuthTime : ''}</Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={12} style={{ textAlign: 'right' }}>Token有效期：</Col>
                            <Col span={12} style={{ textAlign: 'left' }}>{record ? record.tokenValidity : ''}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={12} style={{ textAlign: 'right' }}>添加时间：</Col>
                            <Col span={12} style={{ textAlign: 'left' }}>{record ? record.createTime : ''}</Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={12} style={{ textAlign: 'right' }}>更新时间：</Col>
                            <Col span={12} style={{ textAlign: 'left' }}>{record ? record.operateTime : ''}</Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        )
    }
}