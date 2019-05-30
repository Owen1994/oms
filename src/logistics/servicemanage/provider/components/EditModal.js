import React from 'react';
import { Form, Modal, Button,Icon, Input, Row, Col } from 'antd';
import { SUPPLIER_CODE_UPDATE, CHANNEL_UPDATE, SUPPLIER_SYNC } from '../constants/Api';
import CSelect from '../../../../components/cselect';
import { fetchPost } from '../../../../util/fetch';
import { PACKAGE_TYPE, TRACK_TYPE, Logistics_Type_List } from '../constants';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
};

class EditModal extends React.Component {
    state = {
        syncState: false,
        submitState: false,
    };

    handleOk = () => {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                this.setState({submitState: true});
                const item = this.props.item;

                let logisticsValue = '';
                if (values.logisticsService) {
                    if (!isNaN(values.logisticsService)) {
                        logisticsValue = values.logisticsService.toString();
                    } else {
                        const logisticsService = values.logisticsService.map(t => {
                            t = t.toString();
                            return t;
                        });
                        logisticsValue = logisticsService
                    }
                } else {
                    logisticsValue = '';
                }
                const qqGroupLink = values.qqGroupLink.replace(/(^\s*)|(\s*)$/g,"");
                const params = {
                    ...values,
                    qqGroupLink,
                    logisticsService: logisticsValue,
                };
                params.key = item.key;
                fetchPost(CHANNEL_UPDATE, {data:params}, 1)
                .then((result) => {
                    this.setState({submitState: false});
                    if (result.state === '000001') {
                        this.props.onOk();
                    }
                });
            }
        });
    };

    handleSync = () => {
        this.setState({syncState: true});
        fetchPost(SUPPLIER_SYNC, {}, 1)
        .then((result) => {
            this.setState({syncState: false});
            if (result.state === '000001') {

            }
        });
    };

    render(){
        const { onCancel, item, visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { syncState, submitState } = this.state;
        const type = /国内/u.test(item.channelType) ? 1 : 2;
        const trackList = TRACK_TYPE[type];
        return (
            <Modal
                width={600}
                title="修改"
                visible={visible}
                onCancel={onCancel}
                onOk={this.handleOk}
                confirmLoading={submitState}
                destroyOnClose
            >
                <FormItem
                    {...formItemLayout}
                    label="物流服务商"
                >
                    <p>{item.logisticsService}</p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="物流渠道"
                >
                    <p>{item.logisticsChannel}</p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="渠道编码"
                >
                    <p>{item.channelCode}</p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="渠道状态"
                >
                    <p>{item.channelState}</p>
                </FormItem>
                <div>
                    <FormItem
                        {...formItemLayout}
                        label="物流商简码"
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('logisticsService', {
                                    rules: [{
                                        required: true, message: '物流商简码不能为空',
                                    }],
                                    initialValue: item.logisticsCode ? [item.logisticsCode] : undefined,
                                })(
                                    <CSelect
                                        code="key"
                                        name="label"
                                        list={item.logisticsData}
                                        params={{data: {pageData: 20, pageNumber: 1, searchColumn: 'name'}}}
                                        url={SUPPLIER_CODE_UPDATE}
                                        apiListType={0}
                                        isNotCache
                                    />
                                )}
                            </Col>
                            <Col span={12}>
                                <Button loading={syncState} onClick={this.handleSync}>
                                    <Icon type="sync" />同步
                                </Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <Row gutter={8} >
                        <Col offset={4}>
                            <p style={{color: "red"}}>
                                下拉框中仅显示部分物流商简码，可以通过输入搜索查找更多物流商简码，若输入搜索也查找不到，可以点击“同步”更新
                            </p>
                        </Col>
                    </Row>
                </div>
                <FormItem
                    {...formItemLayout}
                    label="QQ"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('qq', {
                                rules: [{
                                    pattern: /[1-9]\d{4,19}/, message: 'QQ号是5到20位的数字，不能以0开头!',
                                }],
                                initialValue: item.qq
                            })(
                                <Input />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电话"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('tel', {
                                rules: [{
                                    pattern: /^\S{1,20}$/g, message: '电话号码不得超过20个字符!',
                                }],
                                initialValue: item.tel
                            })(
                                <Input />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="QQ群"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('qqGroup', {
                                rules: [{
                                    pattern: /[1-9]\d{4,19}/, message: 'QQ群是5到20位的数字，不能以0开头!',
                                }],
                                initialValue: item.qqGroup
                            })(
                                <Input />
                            )}
                        </Col>
                    </Row>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="QQ群链接"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('qqGroupLink', {
                                rules: [{
                                    max: 100, message: 'QQ群链接限制在100个字符以内',
                                }],
                                initialValue: item.qqGroupLink
                            })(
                                <Input />
                            )}
                        </Col>
                    </Row>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="物流类型"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('logisticsType', {
                                rules: [{
                                    required: true, message: '物流类型不能为空',
                                }],
                                initialValue: item.logisticsTypeId !== 0 ? item.logisticsTypeId + "" : null,
                            })(
                                <CSelect
                                    list={Logistics_Type_List}
                                />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="包裹类型"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('packageType', {
                                rules: [{
                                    required: true, message: '包裹类型不能为空',
                                }],
                                initialValue: item.packageTypeId !== 0 ? item.packageTypeId : '',
                            })(
                                <CSelect
                                    list={PACKAGE_TYPE}
                                />
                            )}
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="追踪类型"
                >
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator('trackType', {
                                rules: [{
                                    required: true, message: '追踪类型不能为空',
                                }],
                                initialValue: item.trackTypeId !== 0 ? item.trackTypeId : '',
                            })(
                                <CSelect
                                    list={trackList}
                                />
                            )}
                        </Col>
                    </Row>
                </FormItem>
            </Modal>
        )
    }
}

export default Form.create()(EditModal);
