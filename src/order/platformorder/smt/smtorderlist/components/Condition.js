/**
 * 作者: pzt
 * 描述: 速卖通条件查询组件
 * 时间: 2018/4/18 20:23
 **/
import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
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

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import { levelOptions } from "../../../../../util/options";
import { selectValues, getGangeGimes, closehandle, timestampFromat } from '../../../../../util/baseTool';
import { addQuotes, pageCache } from '../../../../../util/baseTool';
import Ctags from '../../../../../components/ctags';



class Condition extends Component {

    componentWillMount() {

    }

    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    }

    formItemLayout2 = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 }
    }

    formItemLayout3 = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
    }
    formItemLayout4 = {
        labelCol: { span: 11 },
        wrapperCol: { span: 13 }
    }

    state = {
        unfold: false,
    }

    // 只能输入数字 start
    onlyNumber = (e) => {
        let val = e.target.value;
        val = val.replace(/[^0-9]/g, '');
        this.props.form.setFieldsValue({ platformNumber: val })
    };

    // 只能输入数字 end
    rangeConfig = {
        rules: [{ type: 'array', required: false, message: '请选择' }],
    };

    // 查看更多快捷状态
    showMore = () => {
        this.setState({
            unfold: !this.state.unfold,
        })
    };


    render() {
        const {
            getFieldDecorator,
            getFieldsError,
        } = this.props.form;

        const {
            handleSubmit,
            handleReset,
            disabledDate,
            orderTimeChange,
            changeOption,
            active
        } = this.props;

        const time = this.props.form.getFieldValue('orderDate');

        // 订单状态数据
        let allOrderStatus = this.props.commonSelectData.allOrderStatus || [];
        allOrderStatus.shift();
        allOrderStatus.unshift({ value: '', option: '全部' });

        const allOrderStatusselect = allOrderStatus.map((v, i) => <Option key={i} value={v.value}>{v.option}</Option>);

        const selectSearch =  (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="买家账号"
                        >
                            {getFieldDecorator('buyersAccount', {
                                rules: [{ required: false, message: '买家账号' }], initialValue: ''
                            },
                            )(
                                <Input placeholder={`请输入买家账号`} maxLength={100} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="平台单号"
                        >
                            {getFieldDecorator('platformNumber', {
                                rules: [{ required: false, message: '请输入平台单号' }],
                            })(
                                <Input placeholder={`请输入平台单号`}
                                    maxLength={100}
                                    onKeyUp={this.onlyNumber}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="下单时间"
                        >
                            {getFieldDecorator('orderDate', {
                                ...this.rangeConfig,
                                // initialValue: [moment('00:00:00', 'YYYY-MM-DD'), moment('23:59:59', 'HH:mm:ss')]
                            }, )(
                                <RangePicker
                                    onCalendarChange={orderTimeChange}
                                    disabledDate={disabledDate}
                                    allowClear={false}
                                    {...levelOptions('pickerConfig')}
                                    className={'ant-xs-row'} />

                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="订单状态"
                        >
                            {getFieldDecorator('orderState', {
                                rules: [{ required: false, message: '请选择' }],
                                initialValue: '',
                            })(
                                <Select
                                    onSelect={changeOption}
                                    className={'ant-xs-row'}
                                    placeholder="请选择">
                                    {allOrderStatusselect}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="销售账号"
                        >
                            {getFieldDecorator('saleAccountName', {
                                rules: [{ required: false, message: '请选择销售账号' }],
                            },
                            )(
                                <Input readOnly placeholder={`请选择销售账号`}
                                    onClick={selectValues({
                                        obj: this,
                                        url: '/oms/order/grab/motan/SellStoreAccountApi/findStoreListPublic',
                                        title: '销售账号',
                                        name: 'saleAccountName',
                                        id: 'shopAccount'
                                    })}
                                    maxLength={100} />
                            )}
                            {getFieldDecorator('shopAccount')(
                                <Input readOnly maxLength={100} type="hidden" />
                            )}
                            <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                                closehandle(e, this)
                            }} />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="付款时间"
                        >
                            {getFieldDecorator('paymentDate', this.rangeConfig)(
                                <RangePicker
                                    // {...levelOptions('pickerConfig')}
                                    className={'ant-xs-row'}
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="商品编码"
                        >
                            {getFieldDecorator('goodsNumber', {
                                rules: [{
                                    required: false,
                                    message: `请输入在线商品编码`
                                }],
                            })(
                                <Input placeholder={`请输入在线商品编码`}
                                    maxLength={100} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="跟踪号"
                        >
                            {getFieldDecorator('waybillNumber', {
                                rules: [{
                                    required: false,
                                    message: `请输入跟踪号`
                                }],
                            })(
                                <Input placeholder={`请输入跟踪号`}
                                    maxLength={100} />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="Item ID"
                            className="smtorder-condition-itemid"
                        >
                            {getFieldDecorator('itimID', {
                                rules: [{ required: false, message: 'Itim ID' }], initialValue: ''
                            },
                            )(
                                <Input placeholder={`请输入Item ID`} maxLength={100} />
                            )}
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={this.hasErrors(getFieldsError())}
                                onClick={() => handleSubmit()}
                            >
                                查询
                            </Button>
                            <Button
                                type="default"
                                onClick={handleReset}
                            >
                                重置
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const ctageSearch = (
            <div className="ctageSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="订单来源"
                        >
                            {getFieldDecorator('orderSource', {
                                initialValue: ['']
                            },
                            )(
                                <Ctags
                                    list={levelOptions('orderSource').map(v=>({code: v.value, name: v.label}))}
                                    handleChange={() => handleSubmit()}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="尖货订单"
                        >
                            {getFieldDecorator('tipOrderType', {
                                initialValue: ['']
                            },
                            )(
                                <Ctags
                                    list={levelOptions('tipOrderType').map(v=>({code: v.value, name: v.label}))}
                                    handleChange={() => handleSubmit()}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        {
                            active < 0 || active === 14 ?
                                <FormItem
                                    label="顶替标记"
                                >
                                    {getFieldDecorator('isFake', {
                                        initialValue: ['']
                                    },
                                    )(
                                        <Ctags
                                            list={levelOptions('isFake').map(v=>({code: v.value, name: v.label}))}
                                            handleChange={() => handleSubmit()}
                                        />
                                    )}
                                </FormItem>
                             : null
                        }
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="breadcrumb smtorder-search-cwc">
                <Form>
                    <div className="select-type">
                        {selectSearch}
                    </div>
                    {ctageSearch}
                </Form>
            </div>
        );
    }
}

export default Condition
// <Col span={5}>
// <FormItem  {...this.formItemLayout}
//            label="商品名称"
// >
//     {getFieldDecorator('goodsName', {
//         rules: [{
//             required: false,
//             message: `请输入商品名称`
//         }],
//     })(
//         <Input placeholder={`请输入商品名称`}
//                maxLength="100"/>
//     )}
// </FormItem>
// </Col>
