/**
 *作者: 唐峰
 *功能描述: 渠道列表页--渠道标记配置表单(顶部)
 *参数说明:
 *时间: 2018/4/4 10:08
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    DatePicker,
    Icon,
    message,
} from 'antd'
// import moment from 'moment'  //页面未使用

const FormItem = Form.Item
const Option = Select.Option
// const RangePicker = DatePicker.RangePicker;  //页面未使用
import {levelOptions} from '../../../util/options';
import {platformsearchaction} from "../actions";
import {selectValues,closehandle} from "../../../util/baseTool";

/**
 *作者: 唐峰
 *功能描述: 定义渠道列表页--渠道标记配置表单类
 *参数说明:
 *时间: 2018/4/4 10:13
 */
class Condition extends Component {

    constructor(props) {
        super(props);
    }

    //栅格布局参数
    formItemLayout2 = {
        labelCol: {span: 9},
        wrapperCol: {span: 15}
    }

    formItemLayout3 = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    }

    //查询按钮
    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        const newobj = {}
        //ant表格校验方法
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if(values.channelNumber && values.channelNameId && values.channelName){
                        if(values.channelNumber == values.channelNameId){
                            values.channelNumber = ''
                        }else{
                            message.warning('渠道编号与渠道名称冲突,将以渠道名称为准!')
                            values.channelNumber = values.channelNameId
                        }
                }
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'range-time') {
                            const arr = values[i].map(v => v.valueOf())
                            newobj['paymentStartTime'] = arr[0] ? arr[0] : ''
                            newobj['paymentEndTime'] = arr[1] ? arr[1] : ''
                        } else if (i == 'searchContent' || i == 'searchType') {
                        } else if (i == 'compNameOrAddressOrMobile') {
                            newobj[i] = values[i].key
                        }else if(i == 'platform'){
                            continue
                        } else {
                            newobj[i] = values[i]
                        }
                    }
                }
                newobj.pageNumber = 1;
                newobj.pageData = this.props.Paginationmodel.pageSize || 20; //获取存放在redux中当前 每页显示的最大条数
                or && this.props.fetchPosts({key: 'data', value: newobj});
                this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:newobj}});
            }
        });
    }

    /**
     *作者: 唐峰
     *功能描述: 重置按钮事件
     *参数说明: @resetFields()  antd中form中的方法
     *时间: 2018/4/4 10:41
     */
    handleReset = () => {
        this.props.form.resetFields();
    }

    /**
     *作者: 唐峰
     *功能描述: 点击下拉事件数据请求
     *参数说明:
     * @url 地址(api_url后的地址)
     * @title 标题
     * @name 名称
     * @type 类型
     * @searchabled  是否搜索
     * @searchVluesaction() 调用公共组件搜索方法
     * @fetchsearchValues() 调用公共组件搜索方法
     *时间: 2018/4/4 10:18
     */

    render() {
        const {getFieldDecorator, getFieldsError,} = this.props.form;
        return (
                <div className="newCluenk">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <div className="content qu-searchlist">
                            <Row className={'pad-top-bottom8'}>
                                <Col span={5}>
                                    <FormItem {...this.formItemLayout2}
                                              label="销售平台" className={'ant-xs-row '}>
                                        {getFieldDecorator('platform', {
                                                rules: [{required: false, message: '请选择销售平台'}],
                                            },
                                        )(
                                            <Input readOnly disabled={true} placeholder={`请选择销售平台`} onClick={selectValues({
                                                obj:this,
                                                url: '/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform',
                                                title: '销售平台',
                                                name: 'platform',
                                                id: 'platformId',
                                                searchabled:false
                                            })}
                                                   maxLength={100}/>
                                        )}
                                        {getFieldDecorator('platformId')(
                                            <Input maxLength={100} type="hidden"/>
                                        )}
                                        <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                                            closehandle(e, this)
                                        }}/>
                                    </FormItem>
                                </Col>

                                <Col span={5}>
                                    <FormItem {...this.formItemLayout2}
                                                label="渠道名称" className={'ant-xs-row '}>
                                        {getFieldDecorator('channelName', {
                                                rules: [{required: false, message: '请选择渠道名称'}],
                                            },
                                        )(
                                            <Input readOnly placeholder={`请选择渠道名称`}
                                                    onClick={selectValues({
                                                        obj:this,
                                                        url: '/oms/order/manage/motan/IPackageApi/getLogisticsChannel',
                                                        title: '渠道名称',
                                                        name: 'channelName',
                                                        id: 'channelNameId',
                                                        searchField:"likeName",
                                                        searchabled: true,
                                                    })}
                                                    maxLength={100}/>
                                        )}
                                        <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                                            closehandle(e, this)
                                        }}/>
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem {...this.formItemLayout2}
                                              label="渠道编号" className={'ant-xs-row '}
                                    >

                                        {getFieldDecorator('channelNumber', {
                                                rules: [{required: false, message: '请输入渠道编号'}],
                                            },
                                        )(
                                            <Input placeholder={`请输入精准渠道编号`}  maxLength={100}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...this.formItemLayout3}
                                              label="渠道状态" className={'ant-xs-row '}
                                    >
                                        {getFieldDecorator('channelIsAvailable', {
                                            rules: [{required: false, message: '请选择渠道状态'}]
                                        })(
                                            <Select className={'ant-xs-row'} placeholder="请选择渠道状态">
                                                {levelOptions('渠道状态').map(item => {
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
                            </Row>
                            <Row className="pad-top-bottom8">
                                <Col span={5}>
                                    <FormItem {...this.formItemLayout2}
                                              label="渠道分组" className={'ant-xs-row '}
                                    >

                                        {getFieldDecorator('channelGroup', {
                                            rules: [{required: false, message: '请选择渠道分组'}]
                                        })(
                                            <Select className={'ant-xs-row'} placeholder="请选择渠道分组">
                                                {levelOptions('渠道分组').map(item => {
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

                                <Col span={5}>
                                    <FormItem {...this.formItemLayout2}
                                              label="渠道类型" className={'ant-xs-row '}
                                    >

                                        {getFieldDecorator('channelType', {
                                            rules: [{required: false, message: '请选择渠道类型'}]
                                        })(
                                            <Select className={'ant-xs-row'} placeholder="请选择渠道类型">
                                                {levelOptions('渠道类型').map(item => {
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
                                    <FormItem {...this.formItemLayout2}
                                              label="是否追踪" className={'ant-xs-row '}
                                    >

                                        {getFieldDecorator('trackType', {
                                            rules: [{required: false, message: '请选择是否追踪'}]
                                        })(
                                            <Select className={'ant-xs-row'} placeholder="请选择是否追踪">
                                                {levelOptions('是否追踪').map(item => {
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

                                <Col span={8}>

                                    <div className={'text-right '}>
                                        <FormItem>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                查询
                                            </Button>
                                        </FormItem>
                                        <FormItem>
                                            <Button
                                                type="default"
                                                onClick={this.handleReset}
                                            >
                                                重置
                                            </Button>
                                        </FormItem>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
        );
    }
}

export default Condition