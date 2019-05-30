import React from 'react'
import {
    Modal,
    Form,
    Button,
    Input,
    InputNumber,
    message,
    Radio,
    Row,
    Col,
} from 'antd'
import { fetchPost } from '../../../util/fetch';
import CSelect from '../../../components/cselect';
import * as API from '../constants/api'
import '../../../components/jqueryfilter/css/all.css'
import '../../../components/jqueryfilter/css/ligerui-all.css'
import $ from "../../../components/jqueryfilter";
import '../../../components/jqueryfilter/js/base'
import '../../../components/jqueryfilter/js/ligeruiall'
import '../../../components/jqueryfilter/js/ligerFilter'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const arr = [];

class AddModal extends React.Component {
    state = {
        loading: false,
        details: undefined,
        processRule: undefined,
        // orderStatus: undefined,
        // sellerAccount: undefined,
    };
    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
    };
    //表单提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            this.setState({ loading: true });
            //过滤器值
            const filter = this.props.filtertable.filter
            if (filter) {
                const group = filter.getData();
                const val = $.ligerui.toJSON(group)
                values.conditionJson = val;
            }
            if(this.props.ruleId){
                values.ruleId = this.props.ruleId;
            }
            if(Array.isArray(values.platform)){
                values.platform = values.platform[0];
            }
            if (!err) {
                fetchPost(API.ADD_OR_UPDATE_ORDER_AUDIT_RULE, values, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.handleCancel();
                            this.props.handleSubmit();
                        }
                    })
            }
        })
    };
    //取消
    handleCancel = () => {
        this.setState({
            loading: false,
            details: undefined,
            // processRule: undefined,
            // orderStatus: undefined,
            // sellerAccount: undefined,
        });
        arr.splice(0, arr.length);
        this.props.form.resetFields();
        this.props.closeModal();
    };
    componentWillReceiveProps(nextProps) {
        if (this.props.ruleId !== nextProps.ruleId && nextProps.ruleId && nextProps.visible) {
            //获取弹窗详情
            fetchPost(API.GET_ORDER_AUDIT_RULE_DETAIL, { ruleId: nextProps.ruleId.toString() }, 2)
                .then(result => {
                    let filter = this.fn();
                    if (result.state === '000001') {
                        arr.push(result.data.platform)
                        if (result.data.conditionJson) {
                            filter.setData(JSON.parse(result.data.conditionJson));
                        }
                        this.setState({ details: result.data });
                    }
                })
        } else if (!nextProps.ruleId && this.props.visible !== nextProps.visible && nextProps.visible) {
            setTimeout(() => {
                this.fn();
            }, 300)
        }
    }
    componentDidMount() {
        //获取流程规则
        fetchPost(API.GET_PROCESS_RULE_DEFINITION, {}, 2)
            .then(result => {
                if (result.state === '000001') {
                    this.setState({ processRule: result.data });
                }
            })
        //获取wish平台订单状态下拉列表
        // fetchPost(API.GET_WISH_ORDER_STATUS_LIST, {}, 2)
        //     .then(result => {
        //         if (result.state === '000001') {
        //             this.setState({ orderStatus: result.data });
        //         }
        //     })
        //获取wish平台销售账号
        // fetchPost(API.SEARCH_WISH_ACCOUNT, {pageNumber: 1, pageData: 20}, 2)
        //     .then(result => {
        //         if (result.state === '000001') {
        //             // this.setState({ sellerAccount: result.data.data });
        //             console.log(result.data.data)
        //         }
        //     })
    }

    fn = () => {
        // const ChannelCodearr = this.props.commonSelectData.newChannelCode || []
        // const newChannelCodearr = ChannelCodearr.map(v => ({text: v.name, id: v.id}))
        const commonObj = {
            data: [
                { code: 1, name: '空' },
                { code: 0, name: '非空' },
            ],
            valueField: "code",
            textField: "name",
        };
        const fields = [
            // {
            //     display: '订单状态',
            //     name: 'orderStatus',
            //     type: 'combobox',
            //     editor: {
            //         type: 'combobox',
            //         options: {
            //             data: this.state.orderStatus,
            //             valueField: "code",
            //             textField: "name",
            //         }
            //     }
            // },
            {
                display: '国家',
                name: 'isBuyerCountryNull',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: commonObj
                }
            },
            {
                display: '收件人',
                name: 'isBuyerNameNull',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: commonObj
                }
            },
            {
                display: '邮编',
                name: 'isBuyerZipcodeNull',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: commonObj
                }
            },
            {
                display: 'SKU是否有效',
                name: 'isValidYksSku',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { code: 1, name: '有效' },
                            { code: 0, name: '无效' },
                        ],
                        valueField: "code",
                        textField: "name",
                    }
                }
            },
            {
                display: '是否留言订单',
                name: 'isMsgOrder',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { code: 1, name: '是' },
                            { code: 0, name: '否' },
                        ],
                        valueField: "code",
                        textField: "name",
                    }
                }
            },
            {
                display: '是否黑名单',
                name: 'isBlacklist',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { code: 1, name: '是' },
                            { code: 0, name: '否' },
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
                display: '订单类型',
                name: 'orderType',
                type: 'combobox',
                editor: {
                    type: 'combobox',
                    options: {
                        data: [
                            { code: 1, name: '手工订单' },
                            { code: 0, name: '线上订单' },
                        ],
                        valueField: "code",
                        textField: "name",
                    }
                }
            },
            {
                display: '销售账号',
                name: 'sellerId',
                type: 'text'
            },
            {
                display: '公司sku',
                name: 'yksSku',
                type: 'text'
            },
            // { 
            //     display: '发货时间', 
            //     name: 'deliveryTime', 
            //     type: 'float' 
            // },
        ];
        const filter = $("#newFilter").ligerFilter({ fields: fields });
        this.props.filterTableaction({ filter })
        return filter;
    }

    render() {
        const { visible, ruleId } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { details, processRule } = this.state;
        return (
            <Modal
                visible={visible}
                title={ruleId ? '编辑审核规则' : '新增审核规则'}
                destroyOnClose={true}
                width={800}
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                confirmLoading={this.state.loading}
                okText={'保存'}
                // footer={null}
            >
                <div className="checkrules-modal">
                    <Form>
                        <div className="checkrules-modal-form">
                            <FormItem
                                {...this.formItemLayout}
                                label="规则名称"
                            >
                                {
                                    getFieldDecorator('ruleName', {
                                        rules: [{ required: true, message: '规则名称不能为空' }],
                                        initialValue: details ? details.ruleName : ''
                                    })(
                                        <Input
                                            style={{ width: 260 }}
                                            onChange={() => { this.setState({ loading: false }); }}
                                        // disabled={sellerId}
                                        // maxLength={50}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="优先级"
                            >
                                {
                                    getFieldDecorator('priority', {
                                        rules: [{ required: true, message: '优先级不能为空' }],
                                        initialValue: details ? details.priority : ''
                                    })(
                                        <InputNumber
                                            style={{ width: 260 }}
                                            precision={0}
                                            // maxLength={12}
                                            onChange={() => { this.setState({ loading: false }); }}
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="销售平台"
                                className="checkrules-modal-cselect"
                            >
                                {
                                    getFieldDecorator('platform', {
                                        rules: [{ required: true, message: '销售平台不能为空' }],
                                        initialValue: details ? [details.platform.id] : [],
                                        // initialValue: [{id:'0', name:'US'}, {id:'2', name:'CA'}],        //两种初始化方法都可以
                                    })(
                                        <CSelect
                                            // list={details ? [details.platform] : []} // 默认值列表
                                            list={arr}
                                            code='id' // 列表编码字段
                                            name='name' // 列表名称字段
                                            url={API.GET_PLATFORM}
                                            // mode='multiple' // 是否多选
                                            // maxCount={3} // 最多选择项数量
                                            // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                            params={{ searchColumn: 'name' }} // 搜索参数
                                            apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                            placeholder={'请选择'}
                                            style={{ width: 260 }}
                                        //其它字段同 Select组件配置
                                        />
                                    )
                                }
                            </FormItem>
                            <FormItem
                                {...this.formItemLayout}
                                label="状态"
                            >
                                {
                                    getFieldDecorator('isEnabled', {
                                        rules: [{ required: true }],
                                        initialValue: details ? details.isEnabled : 1,
                                    })(
                                        <RadioGroup name="isEnabled">
                                            <Radio value={1}>启用</Radio>
                                            <Radio value={2}>停用</Radio>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>
                        </div>
                        <div className="newCluenk checkrules-modal-condition">
                            <h3><span className="checkrules-span-before"></span>可选条件</h3>
                            <div className="content">
                                <div id="newFilter"></div>
                                <input id="txtGroup" type="hidden" />
                            </div>
                        </div>
                        <div className="checkrules-modal-action">
                            <h3><span className="checkrules-span-before"></span>执行动作</h3>
                            <FormItem
                                {...this.formItemLayout}
                                label="流程规则"
                            >
                                {
                                    getFieldDecorator('tagCode', {
                                        rules: [{ required: true }],
                                        initialValue: 1,
                                    })(
                                        <RadioGroup name="tagCode">
                                            <Radio value={processRule ? processRule.code : ''}>{processRule ? processRule.name : ''}</Radio>
                                        </RadioGroup>
                                    )
                                }
                            </FormItem>
                            <div className="checkrules-modal-expectionOrder">
                                <FormItem>
                                    {
                                        getFieldDecorator('subTagCode', {
                                            rules: [{ required: true, message: '异常订单选项不能为空' }],
                                            initialValue: details ? details.subTagCode : 1,
                                        })(
                                            <RadioGroup name="subTagCode" style={{ width: '100%' }} onChange={() => { this.setState({ loading: false }) }}>
                                                <Row>
                                                    {
                                                        processRule ? processRule.children.map(it => {
                                                            return <Col key={it.code} span={6}><Radio value={it.code}>{it.name}</Radio></Col>
                                                        }) : null
                                                    }
                                                    {/* <Col span={6}><Radio value={1}>留言订单</Radio></Col>
                                                    <Col span={6}><Radio value={2}>手工导入订单</Radio></Col>
                                                    <Col span={6}><Radio value={3}>订单超过200美金</Radio></Col>
                                                    <Col span={6}><Radio value={4}>SKU无储位</Radio></Col> */}
                                                </Row>
                                                {/* <Row>
                                                    <Col span={6}><Radio value={5}>产品信息错误</Radio></Col>
                                                    <Col span={6}><Radio value={6}>收件人信息缺失</Radio></Col>
                                                    <Col span={6}><Radio value={7}>零单价订单</Radio></Col>
                                                    <Col span={6}><Radio value={8}>SKU属性缺失</Radio></Col>
                                                </Row> */}
                                            </RadioGroup>
                                        )
                                    }
                                </FormItem>
                            </div>
                        </div>
                        {/*<div className="checkrules-submitBtn">*/}
                            {/*<Button onClick={this.handleCancel}>取消</Button>*/}
                            {/*<Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>保存</Button>*/}
                        {/*</div>*/}
                    </Form>
                </div>
            </Modal>
        );
    }
}
export default Form.create()(AddModal)