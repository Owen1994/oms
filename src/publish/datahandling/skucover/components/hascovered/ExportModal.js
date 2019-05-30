import React from 'react';
import {
    Modal,
    Form,
    Row,
    Col,
    Radio,
    Checkbox,
    Spin,
    message,
} from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

import { fetchPost } from '../../../../../util/fetch';
import { parseStrToArray } from "../../../../../util/StrUtil";
import {
    Field_List_Api,
    Export_Sku_Covered_Api,
} from '../../constants/Api';


class ExportModal extends React.Component {
    state = {
        loading: false,
        listData: [],
        checkboxSytle: 0, // 0-不勾选 1-半勾选 2-全勾选
        httpIsError: false,
        buttonLoading: false,
    };

    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    };

    componentWillReceiveProps(nextProps){
        const visible = this.props.visible;
        const arraySelectData = nextProps.arraySelectData;
        const nextvisible = nextProps.visible;
        if(visible !== nextvisible && arraySelectData !== undefined){
            this.setState({
                loading: true,
            }, function () {
                this.loadData();
            });
        }
    }

    loadData = () => {
        const data = {
            fieldType: 'COVER_EXP',
        };
        fetchPost(Field_List_Api, data, 2)
            .then((result) => {
                this.setState({loading: false});
                if (result.state === '000001') {

                    let checkboxSytle = 0; // 0-不勾选 1-半勾选 2-全勾选

                    let iCount = 0;
                    for (let i = 0; i < result.data.list.length; i++) {
                        if (result.data.list[i].fieldValue === 1) {
                            iCount += 1;
                        }
                    }

                    if (iCount === 0) {
                        checkboxSytle = 0;
                    } else if (iCount === result.data.list.length) {
                        checkboxSytle = 2;
                    } else {
                        checkboxSytle = 1;
                    }

                    this.setState({
                        checkboxSytle: checkboxSytle,
                        listData: result.data.list,
                    });
                } else {
                    this.setState({
                        httpIsError: true,
                    });
                }
            })
    };

    // 取消
    handleCancel = () => {
        this.props.hiddenExportModal();
    };

    // 表单提交
    handleSubmit = () => {
        if (this.state.httpIsError) {
            message.error('界面获取导出字段错误，请重新关闭弹窗再次进入，进行获取！');
            return;
        }

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.exportType === 1) {

                    if (this.props.arraySelectData.length === 0) {
                        message.warning('请勾选数据后再进行导出');
                        return;
                    }
                    const exportNameData = [];
                    for (let i = 0; i < this.state.listData.length; i++) {
                        if (this.state.listData[i].fieldValue === 1) {
                            exportNameData.push(this.state.listData[i].fieldCode)
                        }
                    }

                    const arrayData = [];
                    for (let i = 0; i < this.props.arraySelectData.length; i++) {

                        const sSite = this.props.arraySelectData[i].siteCode === '--' ? '' : this.props.arraySelectData[i].siteCode;

                        const dicData = {
                            id: this.props.arraySelectData[i].id,
                            platform: this.props.arraySelectData[i].platform,
                            siteCode: sSite,
                            skuCode: this.props.arraySelectData[i].skuCode,
                        };
                        arrayData.push(dicData);
                    }

                    const params = {
                        data: {
                            exportType: 1,
                            exportName: exportNameData,
                            selectArray: arrayData,
                        }
                    };

                    this.httpExportData(params);

                } else {

                    if (values.platform === undefined) {
                        message.warning('需要在搜索栏选择平台，否则无法进行导出数据');
                        return;
                    }
                    if (values.coverNumOne === undefined && values.coverNumTwo !== undefined) {
                        message.warning('搜索栏 第一个覆盖次数不能为空');
                        return;
                    }
                    if (values.coverNumOne !== undefined && values.coverNumTwo === undefined) {
                        message.warning('搜索栏 第二个覆盖次数不能为空');
                        return;
                    }

                    let coverNum = undefined;
                    if (values.coverNumOne !== undefined && values.coverNumTwo !== undefined) {
                        if (values.coverNumOne > values.coverNumTwo) {
                            message.warning('搜索栏 第二个覆盖次数必须大于等于第一个覆盖次数');
                            return;
                        } else {
                            coverNum = [values.coverNumOne, values.coverNumTwo];
                        }
                    }

                    const skuCodes = parseStrToArray(values.skuCodes);
                    if (skuCodes.length >= 100) {
                        message.warning('搜索栏 SKU不能超过100个');
                        return false;
                    }


                    const exportNameData = [];
                    for (let i = 0; i < this.state.listData.length; i++) {
                        if (this.state.listData[i].fieldValue === 1) {
                            exportNameData.push(this.state.listData[i].fieldCode)
                        }
                    }

                    const searchData = {
                        coverNum,
                        platform: values.platform,
                        siteCodes: values.siteCodes,
                        skuCodes,
                    };

                    const params = {
                        data: {
                            exportType: 2,
                            exportName: exportNameData,
                            searchConditions: searchData,
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
        fetchPost(Export_Sku_Covered_Api, params, 1)
            .then((result) => {
                this.setState({
                    buttonLoading: false,
                });
                if (result.state === '000001') {
                    this.props.hiddenExportModal();
                }
            })
    };


    onChange = (index, e) => {

        const listData = this.state.listData;
        listData[index].fieldValue = e.target.checked ? 1 : 0;

        let checkboxSytle = 0; // 0-不勾选 1-半勾选 2-全勾选

        let iCount = 0;
        for (let i = 0; i < listData.length; i++) {
            if (listData[i].fieldValue === 1) {
                iCount += 1;
            }
        }

        if (iCount === 0) {
            checkboxSytle = 0;
        } else if (iCount === listData.length) {
            checkboxSytle = 2;
        } else {
            checkboxSytle = 1;
        }

        this.setState({
            listData: listData,
            checkboxSytle: checkboxSytle,
        });
    };

    onCheckAllChange = (e) => {

        const listData = this.state.listData;
        for (let i = 0; i < listData.length; i++) {
            if (e.target.checked) {
                if (listData[i].requiredFlag !== 1 && listData[i].fieldValue === 0) {
                    listData[i].fieldValue = 1;
                }
            } else {
                if (listData[i].requiredFlag !== 1 && listData[i].fieldValue === 1) {
                    listData[i].fieldValue = 0;
                }
            }

        }
        this.setState({
            listData: listData,
            checkboxSytle: e.target.checked ? 2 : 0,
        });
    };

    render() {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;

        const { listData, loading, buttonLoading } = this.state;

        let iCount = 0;
        if (this.props.arraySelectData) {
            iCount = this.props.arraySelectData.length;
        }

        return (
            <Modal
                visible={visible}
                title={'数据导出'}
                destroyOnClose={true}
                width={650}
                maskClosable
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                confirmLoading={buttonLoading}
            >
                <Spin spinning={loading} delay={500} tip="Loading...">
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
                            </FormItem>
                        </Col>
                        <Col span={24}>
                            <FormItem
                                label="导出字段"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator('exportName', {
                                    initialValue: 0,
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <div>
                                        <Checkbox
                                            indeterminate={this.state.checkboxSytle === 1}
                                            onChange={this.onCheckAllChange}
                                            checked={this.state.checkboxSytle === 2}
                                        >
                                            全部
                                        </Checkbox>
                                        <br />
                                        <Row>
                                            {
                                                listData.map((t, index) => {
                                                    return (
                                                        <Col span={6} key={index}>
                                                            <Checkbox
                                                                key={t.fieldCode}
                                                                onChange={(e) => this.onChange(index, e)}
                                                                checked={t.fieldValue === 1}
                                                                disabled={t.requiredFlag === 1}
                                                            >
                                                                {t.fieldName}
                                                            </Checkbox>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>

                                        <div style={{color: 'red', fontSize: '13px'}}>
                                            注：单次导出的数据不能超过150万条
                                        </div>
                                    </div>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Spin>
            </Modal>
        );
    }
}
export default Form.create()(ExportModal)
