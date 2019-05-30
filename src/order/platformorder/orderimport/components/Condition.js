/**
 * 作者: pzt
 * 描述: 速卖通订单导入页面条件查询组件
 * 时间: 2018/4/18 20:31
 **/
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
    Upload,
    Icon,
    Tag,
    message,
} from 'antd'

import {levelOptions} from 'util/options';
import {Paginationmodelaction, platformsearchaction, tablemodelaction} from "../actions";
import { objTodata, getLoginmsg } from 'util/baseTool'
import * as config from "util/connectConfig";
import axios from "util/axios";
import { downloadfun, customAxois } from 'util/axios';

const FormItem = Form.Item
const Option = Select.Option

class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        platformVisible: false,
        fileList: [],
        export: false
    }
    // 下载模板 start
    downloadTemplate = (e) => {
        e.preventDefault();
        message.info("请求已发出，请等待下载！");
        downloadfun(this, '/oms/order/grab/motan/OrderGrabApi/getTemplate')
    }
    // 下载模板 end

    handleChange = (info) => {
        let fileName = info.file.name;
        let isExcel = fileName.substr(fileName.lastIndexOf('.'), fileName.length);
        let isReg = /\.(?:xls|xlsx)$/i;
        isExcel = isExcel.toLowerCase();
        if (isReg.test(isExcel)) {
            let fileList = info.fileList;
            const status = info.file.status;
            const response = info.file.response;
            fileList = fileList.slice(-2);
            fileList = fileList.map((file) => {
                if (file.response) {
                    file.url = file.response.url;
                }
                return file;
            });
            fileList = fileList.filter((file) => {
                if (file.response) {
                    return file.response.status === 'success';
                }
                return true;
            });
            if (status === 'done') {
                if (response.data.state == '000001') {
                    axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabApi/excelOrderImport`, {...response.data})
                        .then(response => {
                            const url = response.data.data[0].path
                            location.href = url
                        }).catch(e => {
                        console.log(e);
                    })
                } else {
                    message.error(response.state + ": " + response.msg);
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败,请检查后台接口！`);
            }
            this.setState({fileList});
        } else {
            message.error("请上传正确的Excel模板文件！");
        }
    }

    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout2 = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    }

    // handleSubmit = (e) => {
    //     const or = typeof e == 'object' ? true : false
    //     or && e.preventDefault();
    //     const newobj = {}
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //             for (let i in values) {
    //                 if (values[i]) {
    //                     if (i == 'range-time') {
    //                         const arr = values[i].map(v => v.format("YYYY-MM-DD"))
    //                         newobj['startTime'] = arr[0] ? arr[0] : ''
    //                         newobj['endTime'] = arr[1] ? arr[1] : ''
    //                     } else if (i == 'other') {
    //                         newobj[i] = values[i].join(',')
    //                     } else if (i == 'compNameOrAddressOrMobile') {
    //                         newobj[i] = values[i].key
    //                     } else {
    //                         newobj[i] = values[i]
    //                     }
    //                 }
    //             }
    //             newobj.isPass = 'no';
    //             newobj.markToDistinguish = 'my';
    //             or && this.props.fetchPosts({key: 'data', value: newobj});
    //         }
    //     });
    //     return newobj
    // }
    //
    // handleReset = () => {
    //     this.props.form.resetFields();
    // }

    platformSelect = () => {
        this.props.platformsearchaction({visible: true,})
        this.props.fetchsearchplatform({key: 'data', value: {isPass: 'no',}})
    }


    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const props = {
            action: '/yks/file/server/',
            onChange: this.handleChange,
            multiple: false,
            customRequest: customAxois,
        };
        return (
            <div className="newCluenk">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">
                        <Row>
                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="选择平台" className={"ant-xs-row"}
                                >
                                    {getFieldDecorator('selectPlatform', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select style={{width: '100%'}} placeholder="请选择">

                                            {levelOptions('selectPlatform').map(item => {
                                                return (
                                                    <Option key={item.value} value={item.value}
                                                    >
                                                        {item.label}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>

                            <Col span={5} className="padding-md-left">
                                <FormItem {...this.formItemLayout2}
                                          className={"ant-xs-row"}
                                >
                                    {getFieldDecorator('selectPlateform1', {
                                        rules: [{required: false, message: '请选择'}], initialValue: ''
                                    })(
                                        <Select style={{width: '100%'}} placeholder="请选择">

                                            {levelOptions('orderTemplate').map(item => {
                                                return (
                                                    <Option key={item.value} value={item.value}
                                                    >
                                                        {item.label}
                                                    </Option>
                                                )
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={14} style={{overflow: 'hidden'}}>
                                <div className={'unify-btns margin-md-left pull-right'}>
                                    <Upload {...props} fileList={this.state.fileList}>
                                        <Button
                                        >
                                            <Icon type="upload"/>导入订单
                                        </Button>
                                    </Upload>
                                </div>
                                <div style={{paddingTop: '5px'}}
                                     className={'unify-btns hover-btn download-btns pull-right'}>
                                    <FormItem>
                                        <a
                                            onClick={this.downloadTemplate}
                                        >
                                            下载模板
                                        </a>
                                        {/*<a
                                            onClick={this.downloadTemplate}
                                            href={config.api_url +`/oms/order/grab/motan/OrderGrabApi/getTemplate`}
                                            download={config.api_url + `/oms/order/grab/motan/OrderGrabApi/getTemplate`}
                                        >
                                            下载模板
                                        </a>*/}
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
