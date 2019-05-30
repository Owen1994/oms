/**
 *作者: 唐峰
 *功能描述: 渠道标记--修改页-父组件
 *参数说明:
 *时间: 2018/4/4 14:44
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions, {signinfoTableaction} from '../actions'
import NotFound from '../../../common/components/404/404'

import {
    Form,
    Tabs,
    Row,
    Button
} from 'antd'

import '../css/css.css'


import qs from 'qs'
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import Channeldetail from '../components/Channeldetail';
import Signinfo from '../components/Signinfo';
import Thirdinfo from '../components/Thirdinfo';
import Skuprefix from '../components/skuprefix';
import SearchValues from '../../../components/searchValues/containers/App';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const buttonTypeArr = ['1','2','3']; //button类型数组  1详情  2修改 3新增

class UserForm extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        readonly: true,
        formloading: true,
        isTrue:null,
    }

    //组件销毁时 清空数据
    componentWillUnmount() {
        this.props.skuprefixTableaction({data: []});
        this.props.thirdinfoTableaction({data: []});
        this.props.signinfoTableaction({data: []});
        this.props.form.resetFields();
    }

    componentDidMount() {
        const locationarr = window.location.href.split('?');
        const orderId = locationarr.length > 1 ? qs.parse(locationarr[1])['orderId'] ? qs.parse(locationarr[1])['orderId'] : '' : '';  //获取ID
        const urlType = window.location.href.split('&');
        const reg = /.*?\/channelsignall\/$/;
        let buttonType = urlType.length > 1 ? qs.parse(urlType[1])['buttontype'] && qs.parse(urlType[1])['buttontype'] !=='3' ? qs.parse(urlType[1])['buttontype'] : '' : '';
        buttonType = reg.test(urlType[0])?'3':buttonType;
        const isTrue = buttonTypeArr.indexOf(buttonType);   //控制button是否出现其他类型
        this.setState({
            isTrue:isTrue
        })
        this.props.buttonTypelaction({buttonType:buttonType});
        
        //渠道信息
        if (orderId && isTrue !== -1) {
            axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleChannelDetail`, {
                newChannelCode: orderId
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.state == "000001") {
                        const {
                            channelCnName,
                            channelCountry,
                            channelEnName,
                            channelGroup,
                            channelLogisticsAttr,
                            channelMaxWeight,
                            channelType,
                            channelWebSite,
                            companyCarrierCode,
                            companyCarrierName,
                            developingCountry,
                            extendInfo,
                            isAvailable,
                            longestLength,
                            newChannelCode,
                            outLineCountries,
                            shortestLength,
                            trackingType,
                        } = response.data.data;

                        this.props.form.setFieldsValue({
                            channelCnName,
                            channelCountry,
                            channelEnName,
                            channelGroup,
                            channelLogisticsAttr,
                            channelMaxWeight:buttonType === '1'?`${channelMaxWeight}${channelMaxWeight.length?' g':''}`:channelMaxWeight,
                            channelType,
                            channelWebSite,
                            companyCarrierCode,
                            companyCarrierName,
                            developingCountry,
                            extendInfo,
                            isAvailable:Number(isAvailable),
                            longestLength:buttonType === '1'?`${longestLength}${longestLength.length?' 天':''}`:longestLength,
                            newChannelCode,
                            outLineCountries,
                            shortestLength:buttonType === '1'?`${shortestLength}${shortestLength.length?' 天':''}`:shortestLength,
                            trackingType,
                        });
                        const radioState = response.data.data.isAvailable;
                        this.props.baseInfoForm({radioState: radioState})
                    }else{
                        message.error(response.data.msg);
                    }
                }
                this.setState({formloading: false})
            }).catch(e => {
                this.setState({formloading: false});
            })
        } else {
            this.setState({formloading: false})
        }

        //仓库信息
        if (orderId && isTrue !== -1) {
            axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleChannelWarehouseDetail`, {
                newChannelCode: orderId
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.state == "000001") {
                        const Warehouseinfo = response.data.data;
                        const newoperationLog = Warehouseinfo.length ? Warehouseinfo.map((v, i) => {
                            return (buttonType === '2'?{
                                key: ++i + '',
                                No: i + '',
                                isAvailable: {
                                    name: 'editIsAvailable' + i ,
                                    initialValue: v.isAvailable,
                                    message: '是否启用',
                                    placeholder: '是否启用',
                                },
                                warehouseName: {
                                    name: 'editWarehouseName' +i,
                                    initialValue: v.warehouseCodeName,
                                    message: '仓库名称',
                                    placeholder: '请选择仓库名称',
                                },
                                warehouseCode: {
                                    name: 'editWarehouseCode' +i ,
                                    initialValue: v.warehouseCode,
                                    message: '请输入仓库编码',
                                    placeholder: '请输入仓库编码',
                                },
                                warehouseChannelSign: {
                                    name: 'editWarehouseChannelSign' +i,
                                    initialValue: v.warehouseChannelSign,
                                    message: '仓库的渠道标识',
                                    placeholder: '仓库的渠道标识',
                                },
                                
                            }:{
                                key: v.id,
                                No: ++i + '',
                                isAvailable: Number(v.isAvailable),
                                warehouseChannelSign: v.warehouseChannelSign,
                                warehouseName: v.warehouseCodeName,
                            })
                        }) : [];
                        buttonType === '2'?this.props.skuprefixTableaction(
                            {data: newoperationLog,
                            count: newoperationLog.length + 1,
                            oldLength: Warehouseinfo.length,
                            }):this.props.tablemodelaction5({data: newoperationLog, count: newoperationLog.length + 1,});
                    }else{
                        message.error(response.data.msg);
                    }
                }
                this.setState({formloading: false})
            }).catch(e => {
                this.setState({formloading: false});
            })
        } else {
            this.setState({formloading: false})
        }

        //标记信息
        if (orderId && isTrue !== -1) {
            axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleChannelSignDetail`, {
                newChannelCode: orderId
            }).then(response => {
                if (response.status == 200) {
                    if (response.data.state == "000001") {
                        const Signinfo = response.data.data;
                        const newoperationLog = Signinfo.length ? Signinfo.map((v, i) => {
                            return (buttonType === '2'?{
                                key: ++i + '',
                                No: i + '',
                                id: {
                                    name: `id` + i,
                                    initialValue: v.id,
                                    message: '请选择id',
                                    placeholder: '请选择id',
                                },
                                isAvailable: {
                                    name: `signIsAvailable` + i,
                                    initialValue: Number(v.isAvailable),
                                    message: '请选择状态',
                                    placeholder: '请选择状态',
                                },
                                toCountry: {
                                    name: `signtoCountry` + i,
                                    initialValue: v.toCountry,
                                    message: '请选择目的国',
                                    placeholder: '请选择目的国',
                                },
                                toCountryName: {
                                    name: `toCountryName` + i,
                                    initialValue: v.toCountryName,
                                    message: '请选择目的国',
                                    placeholder: '请选择目的国',
                                },
                                platform: {
                                    name: `platform`+i,
                                    initialValue: v.platform,
                                    message: '请输入平台编码',
                                    placeholder: '请输入平台名称',
                                    required: true
                                },
                                platformName: {
                                    name: `platformName` +i,
                                    initialValue: v.platformName,
                                    message: '请输入平台名称',
                                    placeholder: '请输入平台名称',
                                    required: true
                                },
                                signType: {
                                    name: `signSignType` + i,
                                    initialValue: Number(v.signType),
                                    message: '请输入标记类型',
                                    placeholder: '请输入标记类型',
                                    required: true
                                },
                                dispatchCountry: {
                                    name: `signDispatchCountry` + i,
                                    initialValue: v.dispatchCountry,
                                    message: '请选择发货地',
                                    placeholder: '请选择发货地',
                                    required: true
                                },
                                signChannelName: {
                                    name: `signSignChannelName`+i,
                                    initialValue: v.signChannelName,
                                    message: '标记渠道简称',
                                    placeholder: '标记渠道简称',
                                    required: true
                                },
                                signCnName: {
                                    name: `signSignCnName` + i,
                                    initialValue: v.signCnName,
                                    message: '标记渠道中文名称',
                                    placeholder: '标记渠道中文名称',
                                },
                                signCarrierName: {
                                    name: `signSignCarrierName` + i,
                                    initialValue: v.signCarrierName,
                                    message: '承运商名称',
                                    placeholder: '承运商名称',
                                },
                                signWebSite: {
                                    name: `signSignWebSite` + i,
                                    initialValue: v.signWebSite,
                                    message: '标记网址',
                                    placeholder: '标记网址',
                                },
                                Operation: '删除'
                            }:{
                                key: v.id,
                                No: ++i + '',
                                isAvailable:Number(v.isAvailable),
                                platform: v.platformName,
                                toCountryName:v.toCountryName,
                                dispatchCountry: v.dispatchCountry,         //发货地
                                signType: Number(v.signType),               //标记类型
                                signCarrierName: v.signCarrierName,
                                signChannelName: v.signChannelName,
                                signCnName: v.signCnName,
                                signWebSite: v.signWebSite,

                            })
                        }) : []
                        buttonType === '2'?this.props.signinfoTableaction({data: newoperationLog, count: newoperationLog.length + 1,oldLength:Signinfo.length}):
                        this.props.tablemodelaction2({data: newoperationLog, count: newoperationLog.length + 1,});
                    }else{
                        message.error(response.data.msg);
                    }
                }
                this.setState({formloading: false})
            }).catch(e => {
                this.setState({formloading: false});
            })
        } else {
            this.setState({formloading: false})
        }

        //第三方信息
        if (orderId && isTrue !== -1) {
            axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleChannelMappingDetail`, {
                newChannelCode: orderId
            }).then(response => {

                if (response.status == 200) {
                    if (response.data.state == "000001") {
                        const Thirdinfo = response.data.data;
                        const newoperationLog = Thirdinfo.length ? Thirdinfo.map((v, i) => {
                            return (buttonType === '2'?{
                                key: ++i + '',
                                No: i + '',
                                isAvailable: {
                                    name: `thirdIsAvailable` + i,
                                    initialValue: v.isAvailable,
                                    message: '请选择状态',
                                    placeholder: '请选择状态',
                                },
                                systemCode: {
                                    name: `thirdSystemCode`+ i,
                                    initialValue: v.systemCode,
                                    message: '请选择系统名称',
                                    placeholder: '请选择系统名称',
                                },
                                systemChannelCode: {
                                    name: `thirdSystemChannelCode`+ i,
                                    initialValue: v.systemChannelCode,
                                    message: '请输入渠道简称',
                                    placeholder: '请输入渠道简称',
                                },
                                systemEnName: {
                                    name: `thirdSystemEnName` + i,
                                    initialValue: v.systemEnName,
                                    message: '渠道英文名称',
                                    placeholder: '渠道英文名称',
                                },
                                systemCnName: {
                                    name: `thirdSystemCnName` + i,
                                    initialValue: v.systemCnName,
                                    message: '渠道中文名称',
                                    placeholder: '渠道中文名称',
                                },
                                channelInfo: {
                                    name: `thirdChannelInfo` + i,
                                    initialValue: v.channelInfo,
                                    message: '渠道扩展信息',
                                    placeholder: '渠道扩展信息',
                                },
                                Operation: '删除',
                            }:{
                                key: v.id,
                                No: ++i + '',
                                isAvailable:Number(v.isAvailable),
                                channelInfo: v.channelInfo,
                                systemChannelCode: v.systemChannelCode,
                                systemCnName: v.systemCnName,
                                systemCode: v.systemCode,
                                systemEnName: v.systemEnName,
                            })
                        }) : []
                        buttonType === '2'?this.props.thirdinfoTableaction({data: newoperationLog, count: newoperationLog.length + 1,oldLength:Thirdinfo.length}):
                        this.props.tablemodelaction3({data: newoperationLog, count: newoperationLog.length + 1,});
                    }else{
                        message.error(response.data.msg);
                    }
                }
                this.setState({formloading: false})
            }).catch(e => {
                this.setState({formloading: false});
            })
        } else {
            this.setState({formloading: false})
        }
    }

    //返回按钮
    returnprev=()=>{
        this.props.history.goBack();
    }
    
    render() {
        return this.state.isTrue !== -1 ?this.state.isTrue == 0?
        (
            <div className="newClue detail">
                <div className="newCluewk detailTab">
                    <Channeldetail {...this.props} />
                    <Tabs type="card" className='typeCard'>
                        <TabPane tab="仓库信息" key="1"><Skuprefix {...this.props} /></TabPane>
                        <TabPane tab="标记信息" key="2"><Signinfo {...this.props} /></TabPane>
                        <TabPane tab="第三方信息" key="3"><Thirdinfo {...this.props} /></TabPane>
                    </Tabs>

                    <div className="submit hover-btn">
                        <Row className={'text-right'}>
                            <FormItem>
                                <Button  onClick={this.returnprev}>
                                    返回
                                </Button>
                            </FormItem>
                        </Row>
                    </div>
                    
                </div>
            </div>
        ):
        (<div className="newClue modify">
                <div className="newCluewk modifyTab">
                    <Channeldetail {...this.props} />
                    <Tabs type="card" className="tabs">
                        <TabPane tab="仓库信息" key="1"><Skuprefix {...this.props} /></TabPane>
                        <TabPane tab="标记信息" key="2"><Signinfo {...this.props} /></TabPane>
                        <TabPane tab="第三方信息" key="3"><Thirdinfo {...this.props} /></TabPane>
                    </Tabs>
                </div>
                <SearchValues {...this.props} />
                <div className="hover-btn">
                    <Row className={'text-right'}>
                        <FormItem>
                            <Button  onClick={this.returnprev}>
                                返回
                            </Button>
                        </FormItem>
                    </Row>
                </div>
            </div>
        ):<NotFound/>;
    }
}

export default connect(state => ({...state}), dispatch => bindActionCreators(actions, dispatch))(
    Form.create({
        mapPropsToFields(props) {
            const Infos = {}
            for (let i in props.Infos) {
                if (props.Infos[i].name) {
                    Infos[i] = Form.createFormField(props.Infos[i])
                }
            }
            return Infos
        },
        onFieldsChange(props, fields) {
            props.baseInfoForm(fields)

        },
    })(UserForm));