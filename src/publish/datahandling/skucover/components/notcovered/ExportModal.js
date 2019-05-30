import React from 'react';
import {
    Modal,
    Form,
    Row,
    Col,
    Radio,
    message,
} from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

import { fetchPost } from '../../../../../util/fetch';
import { parseStrToArray } from "../../../../../util/StrUtil";
import {
    ExportE_Sku_UnCovered_Api,
} from '../../constants/Api';


class ExportModal extends React.Component {

    state = {
        buttonLoading: false,
    };

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    };

    // 取消
    handleCancel = () => {
        this.props.hiddenExportModal();
    };

    // 表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.exportType === 1) {

                    if (this.props.arraySelectData.length === 0) {
                        message.warning('请勾选数据后再进行导出');
                        return;
                    }

                    const arrayData = [];
                    for (let i = 0; i < this.props.arraySelectData.length; i++) {
                        const dicData = {
                            id: this.props.arraySelectData[i].id,
                            platform: this.props.arraySelectData[i].platform,
                        };
                        arrayData.push(dicData);
                    }

                    const params = {
                        data: {
                            exportType: 1,
                            selectedArray: arrayData,
                        }
                    };

                    this.httpExportData(params);

                } else {

                    if (values.platformNot === undefined) {
                        message.warning('需要在搜索栏选择未覆盖平台，否则无法进行导出数据');
                        return;
                    }

                    const skuCodes = parseStrToArray(values.skuCodesNot);
                    if (skuCodes.length >= 100) {
                        message.warning('搜索栏 SKU不能超过100个');
                        return false;
                    }

                    const params = {
                        data: {
                            exportType: 2,
                            platform: values.platformNot,
                            siteCodes: values.siteCodesNot,
                            skuCodes,
                            todayStates: values.todayStates,
                        }
                    };

                    this.httpExportData(params);
                }
            }
        })
    };

    /**
     * HTTP请求导出数据
     * @param params
     */
    httpExportData = (params) => {
        this.setState({
            buttonLoading: true,
        });
        fetchPost(ExportE_Sku_UnCovered_Api, params, 1)
            .then((result) => {
                this.setState({
                    buttonLoading: false,
                });
                if (result.state === '000001') {
                    this.props.hiddenExportModal();
                }
            })
    };

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;

        const { buttonLoading } = this.state;

        let iCount = 0;
        if (this.props.arraySelectData) {
            iCount = this.props.arraySelectData.length;
        }

        return (
            <Modal
                visible={visible}
                title={'数据导出'}
                destroyOnClose={true}
                width={550}
                maskClosable
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                confirmLoading={buttonLoading}
            >
                <Row type="flex" align="top">
                    <Col span={24}>
                        <FormItem
                            label="导出方式"
                            {...this.formItemLayout}
                        >
                            {getFieldDecorator('exportType', {
                                initialValue: iCount > 0 ? 1 : 2,
                                rules: [{
                                    required: true, message: '请选择导出方式',
                                }],
                            })(
                                <RadioGroup size="small" className='sku-cover-modal'>
                                    <Radio
                                        value={1}
                                        disabled={iCount === 0}
                                    >
                                        导出选中的数据
                                    </Radio>
                                    <Radio
                                        value={2}
                                    >
                                        导出当前搜索条件下的数据
                                    </Radio>
                                </RadioGroup>
                            )}
                            <div style={{color: 'red', fontSize: '13px'}}>
                                注：单次导出的数据不能超过150万条
                            </div>
                        </FormItem>
                    </Col>
                </Row>
            </Modal>
        );
    }
}
export default Form.create()(ExportModal)
