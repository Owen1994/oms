/**
 *作者: 唐峰
 *功能描述: 标记信息组件
 *参数说明:
 *时间: 2018/4/17 11:10
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import qs from 'qs'
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
    Divider,
} from 'antd'
import '../css/css.css'
import * as config from "../../../util/connectConfig";
import Modalmodel from '../../../components/modalmodel'
import {signinfoTableaction} from "../actions";
import axios from "../../../util/axios";
import {dataPack, selectValues, closehandle, datasaddkey, functions} from "../../../util/baseTool";


const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class Signinfo extends Component {

    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    state = {
        readonly: true,
        formloading: true,
        handleStatus: false,
    }

    addinputdata = ({name, message, placeholder = '', initialValue = '', readonly = false, required = false, type = 'string',}) => (
        <FormItem className={'ant-xs-row'} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: required, message: message, type: type},], initialValue: initialValue,
            })(
                <Input disabled={this.state.handleStatus} placeholder={placeholder} className={'ant-xs-row'}
                       readOnly={readonly} maxLength="30"/>
            )}
        </FormItem>)


    /**
     *作者: 唐勇
     *功能描述: 删除新增的列表条数据
     *参数说明:
     *时间: 2018/5/28 15:00
     */
    Modalshow2 = (index) => () => {
        this.props.signModalmodelaction({visible: true,})
        this.props.signinfoTableaction({delkey: index,})
    }

    /**
     *作者: 唐勇
     *功能描述: 删除已存在的列表条数据
     *参数说明:
     *时间: 2018/5/28 15:00
     */
    updateModalshow2 = (record) => () => {
        this.props.signupdateModalmodelaction({visible: true,})
        this.props.signinfoTableaction({delid: record.id.initialValue,})
    }

    //请求平台名称
    addfetchdata = ({name, message, placeholder = '', initialValue = '', readonly = false, required = false, type = 'string',}, record) => {
        const num = name.match(/\d+/g)[0];
        const platform = 'platform' + num;
        const countryName = record.platformName ? record.platformName.initialValue : '';
        const platform2 = record.platform ? record.platform.initialValue : '';
        return (
            <FormItem className={'ant-xs-row'} {...{
                ...this.formItemLayout, ...{
                    wrapperCol: {
                        span: 24,
                    }
                }
            }}>
                {this.props.form.getFieldDecorator(platform, {
                    rules: [{required: required, message: message, type: type}], initialValue: countryName,
                })
                (<Input readOnly disabled={this.state.handleStatus} placeholder={placeholder} onClick={selectValues({
                    obj: this,
                    url: '/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform',
                    title: '平台名称',
                    name: platform,
                    id: '_' + platform,
                    searchabled: false
                })}/>)}
                {this.props.form.getFieldDecorator('_' + platform, {
                    rules: [{required: required, message: message, type: type},], initialValue: platform2,
                })(
                    <Input type="hidden"/>
                )}
                <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                    closehandle(e, this)
                }}/>
            </FormItem>)
    }


    //请求发货地
    addfetchCountry = ({name, message, placeholder = '', initialValue = '', readonly = false, required = false, type = 'string',}) => (
        <FormItem className={'ant-xs-row'} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: required, message: message, type: type}], initialValue: initialValue,
            })
            (<Input readOnly disabled={this.state.handleStatus} placeholder={placeholder} onClick={selectValues({
                obj: this,
                url: '/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData',
                title: '发货地',
                name: name,
                id: '_' + name,
                searchabled: true
            })}/>)}
            {this.props.form.getFieldDecorator('_' + name)(
                <Input maxLength={100} type="hidden"/>
            )}
            <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                closehandle(e, this)
            }}/>
        </FormItem>)


    //请求目的国
    addtoCountry = ({name, message, placeholder = '', initialValue = '', readonly = false, required = false, type = 'string',}, record) => {
        const num = name.match(/\d+/g)[0];
        const toCountry = 'toCountry' + num;
        const countryName = record.toCountry ? record.toCountry.initialValue : ''
        return (
            <FormItem className={'ant-xs-row'} {...{
                ...this.formItemLayout, ...{
                    wrapperCol: {
                        span: 24,
                    }
                }
            }}>
                {this.props.form.getFieldDecorator(toCountry, {
                    rules: [{required: required, message: message, type: type}], initialValue: initialValue,
                })
                (<Input readOnly disabled={this.state.handleStatus} placeholder={placeholder} onClick={selectValues({
                    obj: this,
                    url: '/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData',
                    title: '国家',
                    name: toCountry,
                    id: '_' + toCountry,
                    searchabled: true
                })}/>)}
                {this.props.form.getFieldDecorator('_' + toCountry, {
                    rules: [{required: required, message: message, type: type},], initialValue: countryName,
                })(
                    <Input type="hidden"/>
                )}
                <Icon type="close-circle" className={'commonClose'} onClick={(e) => {
                    closehandle(e, this)
                }}/>
            </FormItem>)
    }

    //下拉框
    addselectdata = ({name, message, initialValue = 0, placeholder = ''}) => (
        <FormItem className={'ant-xs-row'} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: false, message: message}], initialValue: initialValue
            })(
                <Select disabled={this.state.handleStatus} className={'ant-xs-row'} placeholder="请选择">
                    <Option value={0}>启用</Option>
                    <Option value={1}>停用</Option>
                </Select>
            )}
        </FormItem>)

    addselecttype = ({name, message, initialValue = undefined, placeholder = ''}) => (
        <FormItem className={'ant-xs-row'} {...{
            ...this.formItemLayout, ...{
                wrapperCol: {
                    span: 24,
                }
            }
        }}>
            {this.props.form.getFieldDecorator(name, {
                rules: [{required: false, message: message}], initialValue: initialValue
            })(
                <Select disabled={this.state.handleStatus} className={'ant-xs-row'} placeholder="请选择类型">
                    <Option value={0}>真实标记</Option>
                    <Option value={1}>虚拟标记</Option>
                    <Option value={2}>转单号标记（前标后改）</Option>
                    <Option value={3}>转单号标记（前不标后标）</Option>
                </Select>
            )}
        </FormItem>)


    columns = this.props.buttonType.buttonType === '1' ? [{
        title: '状态',
        dataIndex: 'isAvailable',
        width: 60,
        render: (text) => {
            if (text === 0) {
                text = '启用'
            } else if (text === 1) {
                text = '停用'
            }
            return text;
        }
    }, {
        title: '平台名称',
        dataIndex: 'platform',
        width: 80,

    }, {
        title: '标记类型',
        width: 80,
        dataIndex: 'signType',
        render: (text) => {
            if (text === 0) {
                text = '真实标记'
            } else if (text === 1) {
                text = '虚拟标记'
            } else if (text === 2) {
                text = '转单号标记（前标后改）'
            } else if (text === 3) {
                text = '转单号标记（前不标后标）'
            } else {
                return false
            }
            return text
        }
    }, {
        title: '发货地',
        width: 80,
        dataIndex: 'dispatchCountry',
    }, {
        title: '目的国',
        width: 80,
        dataIndex: 'toCountryName',
    }, {
        title: '标记渠道简称',
        width: 100,
        dataIndex: 'signChannelName',
    }, {
        title: '标记中文名称',
        width: 100,
        dataIndex: 'signCnName',
    }, {
        title: '标记承运商名称',
        width: 80,
        dataIndex: 'signCarrierName',
    }, {
        title: '标记网址',
        width: 80,
        dataIndex: 'signWebSite',
    }] : [{
        title: '状态',
        className: '',
        dataIndex: 'isAvailable',
        width: 80,
        render: this.addselectdata,
    }, {
        title: '平台名称',
        width: 100,
        dataIndex: 'platformName',
        render: this.addfetchdata,
    }, {
        title: '标记类型',
        width: 80,
        dataIndex: 'signType',
        render: this.addselecttype,
    }, {
        title: '发货地',
        width: 80,
        dataIndex: 'dispatchCountry',
        render: this.addfetchCountry,
    }, {
        title: '目的国',
        width: 80,
        dataIndex: 'toCountryName',
        render: this.addtoCountry,
    }, {
        title: '标记渠道简称',
        width: 80,
        dataIndex: 'signChannelName',
        render: this.addinputdata,
    }, {
        title: '标记中文名称',
        width: 120,
        dataIndex: 'signCnName',
        render: this.addinputdata,
    }, {
        title: '标记承运商名称',
        width: 80,
        dataIndex: 'signCarrierName',
        render: this.addinputdata,
    }, {
        title: '标记网址',
        width: 80,
        dataIndex: 'signWebSite',
        render: this.addinputdata,
    }, {
        title: '操作',
        dataIndex: 'Operation',
        width: 80,
        render: (text, record, index) => {
            let oldLength = this.props.signinfotable.oldLength;
            let ins = 0;
            if (this.props.buttonType.buttonType == 3) {
                ins = 1;
            }
            return (
                ins == 1 ?
                    (<div>

                            <a className={'viewbtn'} onClick={this.addhandleSave(index)}>保存</a>
                        <span className="margin-ss-left margin-ss-right v-line">|</span>

                            <a onClick={this.Modalshow2(index)}>{'删除'}</a>
                    </div>) : index + 1 > oldLength ?
                    (<div>

                            <a className={'viewbtn'} onClick={this.addhandleSave(index)}>保存</a>
                        <span className="margin-ss-left margin-ss-right v-line">|</span>

                            <a onClick={this.Modalshow2(index)}>{'删除'}</a>
                    </div>) :
                    (<div>
                            <a className={'viewbtn'} onClick={this.updatehandleSave(index)}>保存</a>
                            <span className="margin-ss-left margin-ss-right v-line">|</span>

                                <a className={'viewbtn'} onClick={this.updateModalshow2(record)}>{'删除'}</a>
                        </div>
                    )

            )
        }
    }];


    //弹窗上确认按钮
    ModalhandleOk2 = () => {
        const data = [...this.props.signinfotable.data];
        const delkey = this.props.signinfotable.delkey;
        data.splice(delkey, 1);
        this.props.signModalmodelaction({ModalText: '删除中···', confirmLoading: true,})
        setTimeout(() => {
            this.props.signinfoTableaction({data: data,});
            this.props.signModalmodelaction({
                visible: false,
                confirmLoading: false,
            });
        }, 500);
    }

    /**
     *作者: 唐勇
     *功能描述: 点击已存在列表删除弹窗确认按钮
     *参数说明:
     *时间: 2018/5/28 15:00
     */
    ModalupdatehandleOk2 = () => {
        const delid = this.props.signinfotable.delid;
        const postUrl = `${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/deleteChannelDetailSign`;
        axios.post(postUrl, {id: delid, newChannelCode: this.props.Infos.newChannelCode.value})
            .then(response => {
                if (response.data.state == '000001') {
                    this.props.signupdateModalmodelaction({visible: false})
                    message.success(`${response.msg ? response.data.msg : '成功!'}`);
                    this.signdelesavelist();

                } else {
                    message.error(response.data.msg)
                }

            }).catch(e => {
            console.log(e);
        })

    }
    /**
     *作者: 唐勇
     *功能描述: 删除成功后重新加载数据
     *参数说明:
     *时间: 2018/5/28 15:00
     */
    signdelesavelist = () => {
        const locationarr = window.location.href.split('?');
        const orderId = locationarr.length > 1 ? qs.parse(locationarr[1])['orderId'] ? qs.parse(locationarr[1])['orderId'] : '' : '';
        axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/getConfigRuleChannelSignDetail`, {
            newChannelCode: orderId
        }).then(response => {
            if (response.status == 200) {
                if (response.data.state == "000001") {
                    const Signinfo = response.data.data;
                    const newoperationLog = Signinfo.length ? Signinfo.map((v, i) => {
                        return ({
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
                                name: `_singPlatformName` + i,
                                initialValue: v.platform,
                                message: '请输入平台编码',
                                placeholder: '请输入平台名称',
                                required: true
                            },
                            platformName: {
                                name: `signPlatformName` + i,
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
                                name: `signSignChannelName` + i,
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
                        })
                    }) : []
                    this.props.signinfoTableaction({
                        data: newoperationLog,
                        count: newoperationLog.length + 1,
                        oldLength: Signinfo.length
                    })
                } else {
                    message.error(response.data.msg);
                }
            }
            this.setState({formloading: false})
        }).catch(e => {
            this.setState({formloading: false});
        })
    }
    //弹窗上取消按钮
    ModalhandleCancel2 = (value) => () => {
        this.props.signModalmodelaction({[value]: false})
    }

    /**
     *作者: 唐勇
     *功能描述: 已存在列表弹窗上取消按钮
     *参数说明:
     *时间: 2018/5/28 15:00
     */
    ModalupdatehandleCancel2 = (value) => () => {
        this.props.signupdateModalmodelaction({[value]: false})
    }
    //新增按钮
    handleAdd = () => {
        if (!this.props.Infos.isAdd && this.props.buttonType.buttonType == '3') {
            message.error('请先新增渠道信息!')
            return false
        }

        if (this.props.buttonType.buttonType == 3) {
            this.props.signinfoTableaction({data: [], count: 1, oldLength: 0});
            const {count, data} = this.props.signinfotable;
            let countlength = data.length + 1;
            const newData = {
                key: countlength + '',
                No: countlength + '',
                isAvailable: {name: 'signIsAvailable' + countlength, message: '状态', placeholder: '请选择状态',},
                platform: {
                    name: 'platform' + countlength,
                    message: '请输入平台编号',
                    placeholder: '请输入平台编号',
                    initialValue: ' ',
                    required: true
                },
                platformName: {
                    name: 'platformName' + countlength,
                    message: '请输入平台名称',
                    placeholder: '请输入平台名称',
                    required: true
                },
                signType: {
                    name: 'signSignType' + countlength,
                    message: '请输入标记类型',
                    placeholder: '请输入标记类型',
                    initialValue: 0,
                    required: true
                },
                dispatchCountry: {
                    name: 'signDispatchCountry' + countlength,
                    message: '请选择发货地',
                    placeholder: '请选择发货地',
                    required: true
                },
                signChannelName: {
                    name: 'signSignChannelName' + countlength,
                    message: '标记渠道简称',
                    placeholder: '标记渠道简称',
                    required: true
                },
                signCnName: {name: 'signSignCnName' + countlength, message: '标记渠道中文名称', placeholder: '标记渠道中文名称',},
                signCarrierName: {name: 'signSignCarrierName' + countlength, message: '承运商名称', placeholder: '承运商名称',},
                signWebSite: {name: 'signSignWebSite' + countlength, message: '标记网址', placeholder: '标记网址',},
                toCountry: {name: 'signtoCountry' + countlength, message: '请选择目的国', placeholder: '请选择目的国',},
                toCountryName: {name: 'toCountryName' + countlength, message: '请选择目的国', placeholder: '请选择目的国',},

            };
            this.props.signinfoTableaction({data: [...data, newData], count: data.length + 1,})
        } else {
            const {count, data} = this.props.signinfotable;
            const newData = {
                key: count + '',
                No: count + '',
                isAvailable: {name: 'signIsAvailable' + count, message: '状态', placeholder: '请选择状态',},
                platform: {
                    name: 'platform' + count,
                    message: '请输入平台编号',
                    placeholder: '请输入平台编号',
                    initialValue: '',
                    required: true
                },
                platformName: {
                    name: 'platformName' + count,
                    message: '请输入平台名称',
                    placeholder: '请输入平台名称',
                    required: true
                },
                signType: {
                    name: 'signSignType' + count,
                    message: '请输入标记类型',
                    placeholder: '请输入标记类型',
                    initialValue: 0,
                    required: true
                },
                dispatchCountry: {
                    name: 'signDispatchCountry' + count,
                    message: '请选择发货地',
                    placeholder: '请选择发货地',
                    required: true
                },
                signChannelName: {
                    name: 'signSignChannelName' + count,
                    message: '标记渠道简称',
                    placeholder: '标记渠道简称',
                    required: true
                },
                signCnName: {name: 'signSignCnName' + count, message: '标记渠道中文名称', placeholder: '标记渠道中文名称',},
                signCarrierName: {name: 'signSignCarrierName' + count, message: '承运商名称', placeholder: '承运商名称',},
                signWebSite: {name: 'signSignWebSite' + count, message: '标记网址', placeholder: '标记网址',},
                toCountry: {name: 'signtoCountry' + count, message: '请选择目的国', placeholder: '请选择目的国',},
                toCountryName: {name: 'toCountryName' + count, message: '请选择目的国', placeholder: '请选择目的国',},

            };
            this.props.signinfoTableaction({data: [...data, newData], count: count + 1,})
        }

    }

    addhandleSave = (index) => () => {
        var inds = index + 1;
        const signIsAvailable = 'signIsAvailable' + inds;
        const platform = 'platform' + inds;
        const platformName = 'platformName' + inds;
        const signType = 'signSignType' + inds;
        const dispatchCountry = 'signDispatchCountry' + inds;
        const signChannelName = 'signSignChannelName' + inds;
        const signCnName = 'signSignCnName' + inds;
        const signCarrierName = 'signSignCarrierName' + inds;
        const signWebSite = 'signSignWebSite' + inds;
        const toCountry = '_toCountry' + inds;
        const platform_id = '_platform' + inds;

        const objlist = [signIsAvailable, platform, platform_id, platformName, signType, dispatchCountry, signChannelName, signCnName, signCarrierName, signWebSite, toCountry];
        this.props.form.validateFields(objlist, (err, values) => {
            if (!err) {
                const newobj = {
                    newChannelCode: this.props.Infos.newChannelCode.value,  //渠道编号
                    isAvailable: values[signIsAvailable], //状态
                    platform: values[platform_id], //obj[platform]|| this.props.signinfotable.data[index].platform.initialValue,
                    signType: values[signType], //Number(obj[signType]), //标记类型
                    dispatchCountry: values[dispatchCountry],// obj[dispatchCountry], //发货地
                    signChannelName: values[signChannelName], //obj[signChannelName], //标记渠道简称
                    signCnName: values[signCnName],//obj[signCnName],    //标记中文名称
                    signCarrierName: values[signCarrierName], //obj[signCarrierName],  //标记承运商名称
                    signWebSite: values[signWebSite], //obj[signWebSite], //标记网址
                    toCountry: values[toCountry] //obj[toCountry]|| this.props.signinfotable.data[index].toCountry.initialValue, //目的国
                }
                const postUrl = `${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/addSaveChannelDetailSign`;
                axios.post(postUrl, newobj)
                    .then(response => {
                        if (response.status == 200) {
                            if (response.data.state == '000001') {
                                // this.setState({
                                //     handleStatus:!this.state.handleStatus
                                // })
                                message.success(`${response.data.msg ? response.data.msg : '成功!'}`);
                            } else {
                                message.error(response.data.msg)
                            }
                        }
                    }).catch(e => {
                    console.log(e);
                })
            }
        })
        // const obj = this.props.form.getFieldsValue([signIsAvailable,platform,platformName,signType,dispatchCountry,signChannelName,signCnName,signCarrierName,signWebSite,toCountry]);
        // console.log(obj);
        // const  newobj={
        //     newChannelCode:this.props.Infos.newChannelCode.value,  //渠道编号
        //     isAvailable:obj[signIsAvailable], //状态
        //     platform:obj[platform] || this.props.signinfotable.data[0].platform.initialValue,
        //     signType:Number(obj[signType]), //标记类型
        //     dispatchCountry:obj[dispatchCountry], //发货地
        //     signChannelName:obj[signChannelName], //标记渠道简称
        //     signCnName:obj[signCnName],    //标记中文名称
        //     signCarrierName:obj[signCarrierName],  //标记承运商名称
        //     signWebSite:obj[signWebSite], //标记网址
        //     toCountry:obj[toCountry]|| this.props.signinfotable.data[0].toCountry.initialValue, //目的国
        // }
        // console.log(newobj);
        // const postUrl=`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/addSaveChannelDetail`;
        // this.props.form.validateFieldsAndScroll((err, values) => {
        //     if (!err) {
        //         axios.post(postUrl, newobj)
        //             .then(response => {
        //                 if (response.status == 200) {
        //                     if (response.data.state == '000001') {
        //                         // this.setState({
        //                         //     handleStatus:!this.state.handleStatus
        //                         // })
        //                         message.success(`${response.data.msg ? response.data.msg : '成功!'}`);
        //                     } else {
        //                         message.error(response.data.msg)
        //                     }
        //                 }
        //             }).catch(e => {
        //             console.log(e);
        //         })
        //     }
        // })
    }
    //保存按钮
    updatehandleSave = (index) => () => {

        var inds = index + 1;
        const signIsAvailable = 'signIsAvailable' + inds;
        const platform = '_platform' + inds;
        const platformName = 'platform' + inds;
        const signType = 'signSignType' + inds;
        const dispatchCountry = 'signDispatchCountry' + inds;
        const signChannelName = 'signSignChannelName' + inds;
        const signCnName = 'signSignCnName' + inds;
        const signCarrierName = 'signSignCarrierName' + inds;
        const signWebSite = 'signSignWebSite' + inds;
        const toCountry = '_toCountry' + inds;
        const objlist = [signIsAvailable, platform, platformName, signType, dispatchCountry, signChannelName, signCnName, signCarrierName, signWebSite, toCountry];
        this.props.form.validateFields(objlist, (err, values) => {

            if (!err) {
                const obj = this.props.form.getFieldsValue([signIsAvailable, platform, signType, dispatchCountry, signChannelName, signCnName, signCarrierName, signWebSite, toCountry]);
                const newobj = {
                    newChannelCode: this.props.Infos.newChannelCode.value,  //渠道编号
                    isAvailable: values[signIsAvailable], //状态
                    platform: values[platform], //obj[platform]|| this.props.signinfotable.data[index].platform.initialValue,
                    signType: values[signType], //Number(obj[signType]), //标记类型
                    dispatchCountry: values[dispatchCountry],// obj[dispatchCountry], //发货地
                    signChannelName: values[signChannelName], //obj[signChannelName], //标记渠道简称
                    signCnName: values[signCnName],//obj[signCnName],    //标记中文名称
                    signCarrierName: values[signCarrierName], //obj[signCarrierName],  //标记承运商名称
                    signWebSite: values[signWebSite], //obj[signWebSite], //标记网址
                    toCountry: values[toCountry] //obj[toCountry]|| this.props.signinfotable.data[index].toCountry.initialValue, //目的国
                }
                const postUrl = `${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/saveChannelDetailSign`;
                newobj.id = this.props.signinfotable.data[index].id.initialValue
                console.log(newobj);
                axios.post(postUrl, newobj)
                    .then(response => {
                        if (response.status == 200) {
                            if (response.data.state == '000001') {
                                // this.setState({
                                //     handleStatus:!this.state.handleStatus
                                // })
                                message.success(`${response.data.msg ? response.data.msg : '成功!'}`);
                            } else {
                                message.error(response.data.msg)
                            }
                        }
                    }).catch(e => {
                    console.log(e);
                })
            }
        })

    }

    handleSave = (record) => {

        // this.props.form.validateFieldsAndScroll((err, values) => {
        //         console.log(values);
        //         if (!err) {
        //             const template = {
        //                 channelSignDetail: [{signIsAvailable: '', _signPlatformName: '',signDispatchCountry:'', _toCountryName:'', signPlatformName: '',signSignType: '',signSignChannelName: '',signSignCnName: '',signSignCarrierName: '',signSignWebSite: '' }],
        //             }
        //             const newArr = [],newobj = {};
        //             const data = dataPack(template, values)
        //             console.log(data.channelSignDetail)
        //             data.channelSignDetail.map((v,i)=>{
        //                 newArr.push({
        //                     newChannelCode:this.props.Infos.newChannelCode.value,  //渠道编号
        //                     isAvailable: Number(v.signIsAvailable), //状态
        //                     platform:v._signPlatformName || this.props.signinfotable.data[i].platform.initialValue, //平台编号
        //                     signType: Number(v.signSignType),       //标记类型
        //                     dispatchCountry:v.signDispatchCountry,   //发货地
        //                     signChannelName:v.signSignChannelName,  //标记渠道简称
        //                     signCnName:v.signSignCnName,            //标记中文名称
        //                     signCarrierName:v.signSignCarrierName,  //标记承运商名称
        //                     signWebSite:v.signSignWebSite,           //标记网址
        //                     toCountry:v._toCountryName|| this.props.signinfotable.data[i].toCountry.initialValue, //目的国
        //                 })
        //             })
        //             newobj.channelSignDetail = newArr
        //             newobj.newChannelCode = this.props.Infos.newChannelCode.value;
        //             console.log(newobj)
        //             const buttontype = this.props.buttonType.buttonType;
        //             const postUrl = buttontype === '2'?`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/saveChannelDetailSign`:`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/addSaveChannelDetail`;
        //             axios.post(postUrl, newobj)
        //                 .then(response => {
        //                     if (response.status == 200) {
        //                         if (response.data.state == '000001') {
        //                             this.setState({
        //                                 handleStatus:!this.state.handleStatus
        //                             })
        //                             message.success(`${response.data.msg ? response.data.msg : '成功!'}`);
        //                         } else {
        //                             message.error(response.data.msg)
        //                         }
        //                     }
        //                 }).catch(e => {
        //                 console.log(e);
        //             })
        //         }
        //     }
        // )
    }

    //修改按钮
    handleStatu = () => {
        this.setState({
            handleStatus: !this.state.handleStatus
        })
    }

    //组件销毁时
    componentWillUnmount() {
        this.props.form.resetFields();
    }

    render() {
        const buttontype = this.props.buttonType.buttonType; //获取父页面的按钮类型
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched, resetFields} = this.props.form;
        const {data} = buttontype == '1' ? this.props.tablemodel2 : this.props.signinfotable;
        const newdata = datasaddkey(data);
        const columns = this.columns;

        return buttontype == '1' ? (
            <div className="content channelall">
                <Table columns={columns} dataSource={newdata} bordered
                       pagination={false}/>
            </div>
        ) : (
            <div className="newCluenk">
                <div className="content channelall">
                    <Button onClick={this.handleAdd} className={'margin-ss-bottom'}>新增</Button>
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={newdata}
                        bordered
                        // footer={() => <div className={'text-center'}>
                        //     <Button
                        //         className={'margin-ms-right'}
                        //         disabled={this.state.handleStatus}
                        //         type="primary"
                        //         onClick={this.handleSave}>保存</Button>
                        //     <Button
                        //         className="editable-add-btn"
                        //         onClick={this.handleStatu}
                        //     >
                        //         修改
                        //     </Button>
                        // </div>}
                    />

                    <Modalmodel  {...{
                        ...this.props.signModalmodel,
                        visible: this.props.signModalmodel.visible,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.ModalhandleOk2}
                                 confirmLoading={this.props.signModalmodel.confirmLoading}
                                 onCancel={this.ModalhandleCancel2('visible')}/>

                    <Modalmodel  {...{
                        ...this.props.signupdateModalmodel,
                        visible: this.props.signupdateModalmodel.visible,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.ModalupdatehandleOk2}
                                 confirmLoading={this.props.signupdateModalmodel.confirmLoading}
                                 onCancel={this.ModalupdatehandleCancel2('visible')}/>

                </div>
            </div>
        );
    }
}

export default Signinfo