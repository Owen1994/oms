import React from 'react';

import {
    Modal,
    Select,
    Button,
    Form,
    InputNumber,
    message,
    Checkbox,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { LOGISTICS_MODE, BATCH_CREATE_PO } from '../../constants';
import CSelect from '../../../../../components/cselect';
import { getTimeStamp } from '../../../../../util/moment';
import { parseStrToArray } from '@/util/StrUtil';
const FormItem = Form.Item;
const Option = Select.Option;

class logisticsCom extends React.Component {
    state = {
        logisticsList: [],
        logisticsType: 1,
        loading: false
    }


    formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
    }

    formItemLayout1 = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

   
    saveHandle = () => {
        const { data } = this.props;
   
        const params = {...this.props.form.getFieldsValue()}
        params.supplierIds = data,
        params.oeEmployee = Array.isArray(params.oeEmployee) ? params.oeEmployee[0].key : params.oeEmployee

        if (params.purchaseDevelop) {
            params.purchaseDevelop = params.purchaseDevelop[0].key
        }

        if (params.searchContents) {
            params.searchContents = parseStrToArray(params.searchContents);
            if (params.searchContents.length >= 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            }
            params.searchType = params.searchType;
        } else {
            delete params.searchType;
            delete params.searchContents;
        }

        if (params.demandTimes) {
            params.demandTimes = params.demandTimes.map(item => (
                getTimeStamp(item)
            ));
        }

        const { getFieldValue } = this.props.form;
        const logisticsType = getFieldValue('logisticsType');
        const expense = getFieldValue('expense');
        if (logisticsType === undefined) return message.warning('请选择物流方式');
        params.logisticsType = logisticsType;
        if (logisticsType === 0) {
            if (expense) {
                params.expense = expense;
            } else {
                return message.warning('请填写运费');
            }
        }
        const isPackageMaterial = getFieldValue('isPackageMaterial');
        params.isPackageMaterial = isPackageMaterial ? 1: 0;
        this.setState({
           loading: true,
        })
        fetchPost(BATCH_CREATE_PO,{ data: params })
            .then((result) => {
                if (result.state === '000001') {
                    message.success(result.msg);
                    this.modalCancel(true);
                    this.setState({
                        loading: false,
                    })
                } else {
                    message.error(result.msg);
                    this.props.onSearch();
                    this.setState({
                        loading: false,
                    })
                    setTimeout(()=> {
                        window.location.href = "/pms/importexportmanage/importexportlist/";
                    }, 1000)
                }
            });
    }

    modalCancel = (flag = false) => {
        this.props.onCancel(flag);
    }
    list =  [{key: 1, label: "供应商包邮"}]
    render() {
        const { visible } = this.props;
        const { logisticsList,loading } = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const logisticsType = getFieldValue('logisticsType');
        
        const content = (
            <Form>
                <FormItem
                    label="物流方式"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator(
                        'logisticsType',
                        {
                            rules: [{ required: true, message: '物流方式为必填' }],
                            initialValue: 1,
                        },
                    )(
                        <CSelect
                            code="key" // 列表编码字段
                            name="label" // 列表名称字段
                            url={LOGISTICS_MODE}
                            params={{
                                data: {
                                    searchColumn: 'name',
                                    procurementType: 2,
                                    pageData: 20,
                                    pageNumber: 1,
                                },
                            }} // 搜索参数
                            list={this.list}
                            style={{ width: '80%' }}
                            // onChange={this.handleLogisticsType}
                            isNotCache
                            // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                        />,
                    )}
                </FormItem>

                {
                    logisticsType === 0 ? (
                        <FormItem
                            className="mt8"
                            label="运费"
                            {...this.formItemLayout}
                        >
                            {getFieldDecorator(
                                'expense',
                                {
                                    rules: [{ required: true, message: '请填写运费' }],
                                    initialValue: undefined,
                                },
                            )(
                                <InputNumber
                                    style={{ width: '80%' }}
                                    min={0}
                                    precision={2}
                                />,
                            )}
                        </FormItem>
                    ) : null
                }
                <FormItem
                    style={{ paddingLeft: 60 }}
                    {...this.formItemLayout}
                >
                    {getFieldDecorator('isPackageMaterial', {
                        initialValue: false,
                    })(
                        <Checkbox>包材下单</Checkbox>
                    )}
                </FormItem>
            </Form>
        );

        const footer = (
            <div>
                <Button onClick={this.modalCancel}>取消</Button>
                <Button onClick={this.saveHandle} loading={loading}>确定</Button>
            </div>
        );

        return (
            <Modal
                title="生成PO选项"
                width={600}
                destroyOnClose
                visible={visible}
                footer={footer}
                maskClosable={false}
                onCancel={this.modalCancel}
                className=""
            >
                {content}
            </Modal>
        );
    }
}

export default Form.create()(logisticsCom);
