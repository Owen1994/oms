import React, {Component} from 'react'
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    DatePicker,
    Icon,
    Tag
} from 'antd'
import moment from 'moment';
import * as config from '@/util/connectConfig'
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
import {levelOptions} from '@/util/options';

import {
    datasaddkey,
} from '@/util/baseTool';
import axios from "@/util/axios";

class Condition extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        platformVisible: false
    }

    formItemLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        }
    }

    formItemLayout2 = {
        labelCol: {
            span: 9
        },
        wrapperCol: {
            span: 15
        }
    }

    /**
     *作者: 唐勇
     *功能描述: 重置按钮功能
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    handleReset = () => {
        this
            .props
            .form
            .resetFields();
    }

    /**
     *作者: 唐勇
     *功能描述: 查询按钮功能
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    handleSubmit = (e) => {
        const or = typeof e == 'object'
            ? true
            : false
        or && e.preventDefault();
        const newobj = {}
        this
            .props
            .form
            .validateFieldsAndScroll((err, values) => {
                if (!err) {
                    newobj.authState = values.authState; //授权状态
                    newobj.platformAccount = values.platformAccount //平台账号
                    newobj.pageNumber = 1
                    newobj.pageData = 20
                    axios
                        .post(`${config.api_url}/oms/order/grab/motan/SellStoreAccountApi/findStoreList`, newobj)
                        .then(response => {
                            if (response.status == 200) {
                                const productInfo = response.data.data;
                                const productInfoarr = datasaddkey(productInfo);
                                const newproductInfoarr = productInfoarr.length
                                    ? productInfoarr.map((v, i) => {
                                        var starttime = v.secretStartTime;
                                        var endtime = v.secretEndTime;
                                        var showabled = true
                                        var time = ''
                                        if (!starttime || !endtime) {
                                            showabled = false;
                                        }
                                        time = showabled
                                            ? starttime + '-' + endtime
                                            : starttime || "" + endtime || ""

                                        return ({
                                            sid: v.sid,
                                            platformAccounts: v.platformAccount,
                                            accountTypes: {
                                                name: `accountTypes${v.key}`,
                                                initialValue: v.accountType,
                                                message: '请选择账号类型',
                                                placeholder: '账号类型'
                                            },
                                            authStates: {
                                                name: `authStates${v.key}`,
                                                initialValue: v.authState,
                                                message: '请选择授权状态',
                                                placeholder: '授权状态'
                                            },
                                            // shopowners: v.shopowner,
                                            Keyvalidityperiods: time,
                                            operators: v.operator,
                                            operationTimes: v.operationTime,
                                            shopId: v.shopId,
                                            url: v.url
                                        })
                                    })
                                    : []
                                const total = response.data.total
                                this
                                    .props
                                    .Paginationmodelaction({
                                        current: newobj['pageNumber'] || 1,
                                        total: total,
                                        pageSize: newobj['pageData'] || 20,
                                        platformAccount:newobj.platformAccount,
                                        authState:newobj.authState
                                    })
                                this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:newobj}})
                                this
                                    .props
                                    .tablemodelaction({data: newproductInfoarr, count: newproductInfoarr.length, loading: false});
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            });
    }
    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        return (
            <div className="newCluenk">
                <div>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <div className="content">
                            <Row>
                                <Col span={5}>
                                    <FormItem
                                        {...this.formItemLayout2}
                                        label="平台账号"
                                        className='ant-xs-row'
                                    >
                                        {getFieldDecorator('platformAccount', {
                                            rules: [
                                                {
                                                    required: false,
                                                    message: `请输入`
                                                }
                                            ]
                                        })(<Input placeholder={`请输入`} maxLength="100"/>)}

                                    </FormItem>
                                </Col>

                                <Col span={6}>
                                    <FormItem
                                        {...this.formItemLayout2}
                                        label="启用状态"
                                        className='ant-xs-row'
                                    >
                                        {getFieldDecorator('authState', {
                                            rules: [
                                                {
                                                    required: false,
                                                    message: '请选择'
                                                }
                                            ]
                                        })(
                                            <Select
                                                className='ant-xs-row'
                                                placeholder="请选择">
                                                {levelOptions('授权状态').map(item => {
                                                    return (
                                                        <Option key={item.value} value={item.value}>
                                                            {item.label}
                                                        </Option>
                                                    )
                                                })}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>

                                <Col span={6}>
                                </Col>

                                <Col span={7}>
                                    <div className='text-right'>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit">
                                                查询
                                            </Button>
                                        </FormItem>
                                        <FormItem>
                                            <Button type="default" onClick={this.handleReset}>
                                                重置
                                            </Button>
                                        </FormItem>
                                    </div>
                                </Col>

                            </Row>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Condition