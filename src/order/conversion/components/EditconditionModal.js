/**
 *作者: 任贸华
 *功能描述: 修改条件配置组件
 *参数说明:
 *时间: 2018/4/16 11:33
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    Spin,
} from 'antd'
import '../css/css.css'
import * as config from "../../../util/connectConfig";
import Modalmodel from '../../../components/modalmodel'
import { skuprefixTableaction } from "../actions";
import axios from "../../../util/axios";
import { datasaddkey, timestampFromat } from "../../../util/baseTool";
import '../css/css.css'
import '../../../components/jqueryfilter/css/all.css'
import '../../../components/jqueryfilter/css/ligerui-all.css'
import $ from "../../../components/jqueryfilter";
import '../../../components/jqueryfilter/js/base'
import '../../../components/jqueryfilter/js/ligeruiall'
import '../../../components/jqueryfilter/js/ligerFilter'
import CSelect from '../../../components/cselect'
import { relative } from 'path';

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const paramArr = [];
const wishAccountData = [];

class WarehouseOrder extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(next) {
        const ruleId = next.editconditionApp.ruleId;
        const nextVisible = next.editconditionApp.visible;
        const visible = this.props.visible;
        if (!ruleId && nextVisible) {    //新增
            if (this.props.commonSelectData.comonSkuPrefix != next.commonSelectData.comonSkuPrefix ||
                this.props.commonSelectData.comonSkuSuffix != next.commonSelectData.comonSkuSuffix) {
                this.setFilter(next)
            }
        } else if (ruleId && visible !== nextVisible && nextVisible) {          //编辑
            axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/getConditionDetail`, { id: ruleId })
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.state == '000001') {
                            const datas = response.data.data
                            const { priority, configRuleName, configJson, isAvailable, id, platform } = datas.config
                            const operationLog = datas.operationLog
                            paramArr.push(platform);        //销售平台初始化值
                            //SKU前缀列表
                            this.props.getCommonSelectData({
                                url: '/oms/order/grab/motan/OrderGrabConfigApi/getRuleSkuConvertList',
                                key: 'comonSkuPrefix',
                                value: {
                                    platformCode: platform.id,
                                    strPosition: 0
                                }
                            }, false)
                            //SKU后缀列表
                            this.props.getCommonSelectData({
                                url: '/oms/order/grab/motan/OrderGrabConfigApi/getRuleSkuConvertList',
                                key: 'comonSkuSuffix',
                                value: {
                                    platformCode: platform.id,
                                    strPosition: 2
                                }
                            }, false)
                            this.props.editconditionAppaction({ operationLog, })
                            this.props.form.setFieldsValue({ priority, configRuleName, isAvailable })
                            let filter = this.setFilter(next)
                            if (configJson) {
                                filter.setData(JSON.parse(configJson))
                            }
                        }
                    }
                }).catch(e => {
                    console.log(e);
                })
        } else if (visible !== nextVisible && !nextVisible) {   //关闭弹窗
            paramArr.splice(0, paramArr.length);
            this.setState({
                readonly: true,
                formloading: true,
                ifShowLog: false,
                platformCode: '',
            })
            //SKU前缀列表
            this.props.getCommonSelectData({
                url: '/oms/order/grab/motan/OrderGrabConfigApi/getRuleSkuConvertList',
                key: 'comonSkuPrefix',
                value: {
                    platformCode: '',
                    strPosition: 0
                }
            }, false)
            //SKU后缀列表
            this.props.getCommonSelectData({
                url: '/oms/order/grab/motan/OrderGrabConfigApi/getRuleSkuConvertList',
                key: 'comonSkuSuffix',
                value: {
                    platformCode: '',
                    strPosition: 2
                }
            }, false)
        }
    }
    setFilter = (props) => {
        let comonSkuPrefix = props.commonSelectData.comonSkuPrefix || []
        let comonSkuSuffix = props.commonSelectData.comonSkuSuffix || []
        const smt_fields = [
            {
                display: '订单状态', name: 'state', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '全部订单', id: '0' },
                            { text: '等待买家付款', id: '1' },
                            { text: '买家申请取消', id: '2' },
                            { text: '等待您发货', id: '3' },
                            { text: '部分发货', id: '4' },
                            { text: '等待买家收货', id: '5' },
                            { text: '等待成团', id: '6' },
                            { text: '已结束的订单', id: '7' },
                            { text: '含纠纷的订单', id: '8' },
                            { text: '冻结中的订单', id: '9' },
                            { text: '等待您确认金额', id: '10' },
                            { text: '资金未到帐', id: '11' },

                        ], valueField: "id", textField: "text",
                    }
                }
            },
            // 暂时不启用--魏洁
            // {
            //     display: '订单来源', name: 'source', type: 'combobox', editor: {
            //         type: 'combobox',
            //         options: {
            //             data: [
            //                 {text: 'SMT平台订单', id: '0'},
            //                 {text: '手工导入订单', id: '1'},
            //                 {text: '批发订单', id: '2'},
            //             ], valueField: "id", textField: "text",
            //         }
            //     }
            // },
            // {display: '订单金额', name: 'amount',type: 'float'},
            {
                display: '发货方式', name: 'channel', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '平台发货', id: '1' },
                            { text: '自发货', id: '2' },

                        ], valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: 'SKU前缀', name: 'frontPosition', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: comonSkuPrefix, valueField: "code", textField: "code",
                    }
                }
            },
            {
                display: 'SKU后缀', name: 'backPosition', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: comonSkuSuffix, valueField: "code", textField: "code",
                    }
                }
            },
            /*{ display: '时间', name: 'Time', editor: { type: 'date', options: { showTime: false}} },*/
        ];
        const wish_fields = [
            {
                display: '订单状态', name: 'state', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '待发货', id: '1' },
                            { text: '已发货', id: '2' },
                            { text: '已退款', id: '3' },
                            { text: '审核中', id: '4' },
                        ], valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '销售账号', name: 'sellerAccount', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: wishAccountData, valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: 'SKU前缀', name: 'frontPosition', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: comonSkuPrefix, valueField: "code", textField: "code",
                    }
                }
            },
            {
                display: 'SKU后缀', name: 'backPosition', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: comonSkuSuffix, valueField: "code", textField: "code",
                    }
                }
            },
        ];
        const ebay_fields = [
            {
                display: '订单状态', name: 'state', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '全部订单', id: '0' },
                            { text: '已付款未到账', id: '1' },
                            { text: '待发货', id: '2' },
                            { text: '已发货', id: '3' },
                            { text: '取消中', id: '4' },
                            { text: '已取消', id: '5' }
                        ], valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '订单来源',
                name: 'orderType',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { code: 0, name: 'ebay平台订单' },
                            { code: 1, name: '手工导入订单' },
                        ],
                        valueField: "code",
                        textField: "name",
                    }
                }
            },
            {
                display: '订单金额',
                name: 'orderTotalAmount',
                type: 'text'
            },
            {
                display: '发货方式',
                name: 'deleveryWay',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { code: 0, name: '平台发货' },
                            { code: 1, name: '自发货' },
                        ],
                        valueField: "code",
                        textField: "name",
                    }
                }
            },
            {
                display: 'SKU前缀', name: 'frontPosition', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: comonSkuPrefix, valueField: "code", textField: "code",
                    }
                }
            },
        ];
        const joom_fields = [
            {
                display: '订单状态', name: 'state', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '已批准', id: '1' },
                            { text: '已发货', id: '2' },
                            { text: '已退款', id: '3' },
                            { text: '卖家取消', id: '4' },
                        ], valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '订单来源',
                name: 'orderType',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { code: 0, name: '线上订单' },
                            { code: 1, name: '手工订单' },
                        ],
                        valueField: "code",
                        textField: "name",
                    }
                }
            },
            {
                display: '订单金额',
                name: 'orderTotalAmount',
                type: 'text'
            },
            {
                display: '发货方式',
                name: 'deleveryWay',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { code: 0, name: '平台发货' },
                            { code: 1, name: '自发货' },
                        ],
                        valueField: "code",
                        textField: "name",
                    }
                }
            },
            {
                display: 'SKU前缀', name: 'frontPosition', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: comonSkuPrefix, valueField: "code", textField: "code",
                    }
                }
            }
        ];
        const mymall_fields = [
            {
                display: '订单状态', name: 'state', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '审核中', id: '0' },
                            { text: '待发货', id: '1' },
                            { text: '已发货', id: '2' },
                            { text: '已支付', id: '3' },
                            { text: '关闭交易', id: '4' },
                            { text: '妥投', id: '5' },
                            { text: '退款', id: '6' },
                            { text: '订单取消', id: '7' },
                            { text: '提交未审核', id: '8' },

                        ], valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '发货方式', name: 'channel', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '平台发货渠道', id: '0' },
                            { text: '线上渠道', id: '1' },
                            { text: '线下渠道', id: '2' },

                        ], valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: 'SKU前缀', name: 'frontPosition', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: comonSkuPrefix, valueField: "code", textField: "code",
                    }
                }
            },
            {
                display: 'SKU后缀', name: 'backPosition', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: comonSkuSuffix, valueField: "code", textField: "code",
                    }
                }
            }
        ];
        const shopee_fields = [
            {
                display: '订单状态', name: 'state', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '未付款', id: '0' },
                            { text: '已付款未发货', id: '1' },
                            { text: '已发货', id: '2' },
                            { text: '已完成', id: '3' },
                            { text: '取消中', id: '4' },
                            { text: '已取消', id: '5' },
                            { text: '退款', id: '6' },
                            { text: '重发货', id: '7' },
                            { text: '确认收货', id: '8' },
                            { text: '已付款待发货（货到付款）', id: '9' },

                        ], valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '发货渠道', name: 'channel', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '平台发货渠道', id: '0' },
                            { text: '线上渠道', id: '1' },
                            { text: '线上渠道', id: '2' },

                        ], valueField: "id", textField: "text",
                    }
                }
            }
        ];
        const amazon_fields = [
            {
                display: '订单状态', name: 'state', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '待付款', id: '1' },
                            { text: '待发货', id: '2' },
                            { text: '已发货', id: '3' },
                            { text: '取消', id: '4' },
                        ], valueField: "id", textField: "text",
                    }
                }
            },
            {
                display: '发货方式', name: 'channel', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '平台发货', id: 'AFN' },
                            { text: '自发货', id: 'MFN' },
                        ], valueField: "id", textField: "text",
                    }
                }
            },
        ];
        const other_fields = [
            {
                display: '待开发', name: 'state', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { text: '待开发', id: '0' },
                        ], valueField: "id", textField: "text",
                    }
                }
            }
        ];
        let platformCode = this.state.platformCode;
        if (paramArr.length > 0) {
            platformCode = paramArr[0].id;
        }
        let filter = $("#filter").ligerFilter({ fields: other_fields });
        if (platformCode === 'SM') {
            filter = $("#filter").ligerFilter({ fields: smt_fields });
        } else if (platformCode === 'WH') {
            filter = $("#filter").ligerFilter({ fields: wish_fields });
        }else if(platformCode === 'EB'){
            filter = $("#filter").ligerFilter({ fields: ebay_fields });
        }else if(platformCode === 'MM'){
            filter = $("#filter").ligerFilter({ fields: mymall_fields });
        }else if(platformCode === 'SE'){
            filter = $("#filter").ligerFilter({ fields: shopee_fields });
        }else if(platformCode === 'YA'){
            filter = $("#filter").ligerFilter({ fields: amazon_fields });
        }
        // else if(platformCode === 'JO'){
        //     filter = $("#filter").ligerFilter({ fields: joom_fields });
        // }
        this.props.editconditionAppaction({ filter });
        return filter
    }

    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 }
    }
    state = {
        readonly: true,
        formloading: true,
        ifShowLog: false,
        platformCode: '',
    }
    logcolumns = [{
        title: '序号',
        dataIndex: 'No',
        render: (text, record, index) => ++index,
        width: 50,
    }, {
        title: '操作属性',
        className: 'column-order',
        dataIndex: 'operateContent',
        render: text => text,
        width: 120,
    }, {
        title: '描述',
        dataIndex: 'description',
        render: text => text,
    }, {
        title: '用户名',
        dataIndex: 'userName',
        render: text => text,
        width: 120
    }, {
        title: '用户ID',
        dataIndex: 'loginName',
        render: text => text,
        width: 120
    }, {
        title: '操作时间',
        dataIndex: 'createDate',
        render: (text, record, index) => timestampFromat(text, 2),
        width: 150,

    }];
    handleLogClick = () => {
        const { ifShowLog } = this.state;
        if (ifShowLog) {
            this.setState({ ifShowLog: false });
        } else {
            this.setState({ ifShowLog: true });
        }
    }
    handleSelectChange = (value) => {
        this.setState({ platformCode: value }, () => {
            //SKU前缀列表
            this.props.getCommonSelectData({
                url: '/oms/order/grab/motan/OrderGrabConfigApi/getRuleSkuConvertList',
                key: 'comonSkuPrefix',
                value: {
                    platformCode: this.state.platformCode,
                    strPosition: 0
                }
            }, false)
            //SKU后缀列表
            this.props.getCommonSelectData({
                url: '/oms/order/grab/motan/OrderGrabConfigApi/getRuleSkuConvertList',
                key: 'comonSkuSuffix',
                value: {
                    platformCode: this.state.platformCode,
                    strPosition: 2
                }
            }, false)
        });
    }
    componentDidMount(){
        axios.post(`${config.api_url}/oms/order/manage/motan/service/api/IOrderManageService/getWishAccountList`, { pageNumber: 1, pageData: 9999 })
                .then(res => {
                    if (res.data.state == '000001') {
                        let data = res.data.data.data;
                        data.map((item, index) => {
                            wishAccountData.push({text: item.sellerId, id: index })
                        })

                    }
                })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const logdata = this.props.editconditionApp.operationLog;
        const newlogdata = datasaddkey(logdata)
        const logcolumns = this.logcolumns;
        const showlog = (
            <Button onClick={this.handleLogClick} style={{ height: 22,position: 'absolute',top: 0,left: 80 }}>{'展开'}<Icon type="down" /></Button>
        );
        const hidelog = (
            <Button onClick={this.handleLogClick} style={{ height: 22,position: 'absolute',top: 0,left: 80 }}>{'隐藏'}<Icon type="up" /></Button>
        );
        return (
            <Modal
                visible={this.props.visible}
                title={this.props.title}
                destroyOnClose={true}
                width={800}
                onCancel={this.props.onCancel}
                onOk={this.props.onOk}
                okText={'保存'}
                maskClosable={false}
                wrapClassName={'mtdiv10'}
            >
                <div>
                    <div className="newCluenk">
                        <div className="title conversion-modal-title" style={{marginTop: 20}}><h3>条件配置</h3></div>
                        <div className="content conversion-modal-content">
                            <FormItem
                                label="配置名称"  {...this.formItemLayout} className={'wfull'}
                            >
                                {getFieldDecorator('configRuleName', {
                                    rules: [{ required: true, message: '配置名称' }],
                                })(
                                    <Input placeholder="配置名称" id="success" maxLength={100} />
                                )}
                            </FormItem>
                            <FormItem
                                label="优先级"  {...this.formItemLayout} className={'wfull'}
                            >
                                {getFieldDecorator('priority', {
                                    rules: [{ required: true, message: '优先级' }],
                                })(
                                    <Input placeholder="优先级" id="success" maxLength={100} />
                                )}
                            </FormItem>
                            <FormItem
                                label="销售平台"  {...this.formItemLayout} className={'wfull'}
                            >
                                {getFieldDecorator('platformCode', {
                                    rules: [{ required: true, message: '销售平台' }],
                                    initialValue: paramArr.length ? paramArr[0].id : []
                                })(
                                    <CSelect
                                        list={paramArr} // 默认值列表
                                        code='id' // 列表编码字段
                                        name='name' // 列表名称字段
                                        url={`${config.api_url}/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform`}
                                        // mode='multiple' // 是否多选
                                        // maxCount={3} // 最多选择项数量
                                        // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                        // params={{ searchColumn: 'name' }} // 搜索参数
                                        apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                        placeholder={'请选择'}
                                        style={{ width: 260 }}
                                        onChange={this.handleSelectChange}
                                        localSearch={1}
                                    //其它字段同 Select组件配置
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="是否启用"  {...this.formItemLayout} className={'wfull'}
                            >
                                {getFieldDecorator('isAvailable', {
                                    rules: [{ required: false, message: '是否启用' }],
                                    initialValue: 0
                                })(
                                    <RadioGroup onChange={this.onChange}>
                                        <Radio value={0}>是</Radio>
                                        <Radio value={1}>否</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </div>
                    </div>

                    <div className="newCluenk">
                        <div className="title conversion-modal-title" style={{marginTop: 25}}><h3>条件配置</h3></div>
                        <div className="content">
                            <div id="filter"></div>
                            <input id="txtGroup" type="hidden" />
                        </div>
                    </div>


                    <div className="newCluenk order-conversion-log" style={{position: 'relative'}}>
                        <div className="title conversion-modal-title" style={{marginTop: 40}}><h3>操作日志</h3>{this.state.ifShowLog ? hidelog : showlog}</div>
                        {
                            this.state.ifShowLog ?
                                <div className="content">
                                    <Table
                                        columns={logcolumns}
                                        bordered
                                        pagination={false}
                                        dataSource={newlogdata}
                                    />
                                </div> : null
                        }
                    </div>
                </div>

            </Modal>
        );
    }
}

export default WarehouseOrder
