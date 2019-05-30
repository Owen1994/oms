import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel from '../../../components/modalmodel'
import {
    Form,
    Button,
    Select,
    Radio,
    Table,
    Pagination,
    Spin,
    Row,
    Col,
    Input,
    Menu,
    Icon,
    Dropdown,
} from 'antd'
import '../css/css.css'
import {Link} from 'react-router-dom';

const FormItem = Form.Item
const Option = Select.Option
const {TextArea} = Input;
import {timestampFromat, datasaddkey, strTrim} from '../../../util/baseTool';

import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import {levelOptions} from "../../../util/options";
import {message} from "antd/lib/index";
import Functions from "../../../components/functions"

class Tablelist extends Component {
    constructor(props) {
        super(props);
    }

    columns = [
        {
            title: '图片',
            dataIndex: 'picture',
            render: (text, record, index) => {
                {/*<img width={50} height={50} src={record.picture.replace(/http/g, 'https')}/>*/
                }
                return (
                    <img width={50} height={50} src={record.picture}/>
                )
            }
        },
        {
            title: 'listing信息',
            dataIndex: 'listinginfo',
            render: (text, record, index) => {
                return (
                    <div>
                        <div className="detailtablelisall"><span className="detailtit">ASIN：</span><span
                            className="detailtxt">{record.asin}</span></div>
                        <div className="detailtablelisall"><span className="detailtit">Seller SKU：</span><span
                            className="detailtxt">{record.sellerSku}</span></div>
                        <div className="detailtablelisall"><span className="detailtit">FNSKU：</span><span
                            className="detailtxt">{record.fnsku}</span></div>
                    </div>
                )
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '金额',
            dataIndex: 'mon',
            render: (text, record, index) => {
                let reimType;
                if (record.reimType == 1) {
                    reimType = '金额过少';
                } else {
                    reimType = '丢失残损';
                }
                return (
                    <div>
                        <div className="detailtablelisall"><span className="detailtit2">零售价：</span><span
                            className="detailtxt2">{record.listing_amount}</span></div>
                        <div className="detailtablelisall"><span className="detailtit2">预估索赔金额：</span><span
                            className="detailtxt2">{record.estimatedAmount}</span></div>
                        <div className="detailtablelisall"><span className="detailtit2">索赔类型：</span><span
                            className="detailtxt2">{reimType}</span></div>
                    </div>
                )
            }
        }, {
            title: '索赔信息',
            dataIndex: 'claiminfo',
            render: (text, record, index) => {
                let processStatus, isReimOk;
                if (record.processStatus == 1) {
                    processStatus = '已处理';
                } else if (record.processStatus == 2) {
                    processStatus = '系统合并';
                } else {
                    processStatus = '未处理'
                }
                if (record.isReimOk == 1) {
                    isReimOk = '已赔偿'
                } else if (record.isReimOk == 2) {
                    isReimOk = '放弃赔偿'
                } else {
                    isReimOk = '未赔偿'
                }
                return (
                    <div>
                        <div className="detailtablelisall"><span className="detailtit">处理状态：</span><span
                            className="detailtxt">{processStatus}</span></div>
                        <div className="detailtablelisall"><span className="detailtit">问题编号：</span><span
                            className="detailtxt">{record.caseId}</span></div>
                        <div className="detailtablelisall"><span className="detailtit">赔偿状态：</span><span
                            className="detailtxt">{isReimOk}</span></div>
                    </div>
                )
            }
        }, {
            title: '修改信息',
            dataIndex: 'modifyinfo',
            render: (text, record, index) => {
                return (
                    <div>
                        <div className="detailtablelisall2"><span className="detailtit2">处理人员：</span><span
                            className="detailtxt2">{record.createBy}</span></div>
                        <div className="detailtablelisall2"><span className="detailtit2">处理时间：</span><span
                            className="detailtxt2">{record.createTimeStr}</span></div>
                        <div className="detailtablelisall2"><span className="detailtit2">最新修改人员：</span><span
                            className="detailtxt2">{record.modifiedBy}</span></div>
                        <div className="detailtablelisall2"><span className="detailtit2">最新修改时间：</span><span
                            className="detailtxt2">{record.modifiedTimeStr}</span></div>
                    </div>
                )
            }
        }, {
            title: '操作',
            dataIndex: 'Operation',
            width: 100,
            render: (text, record, index) => {
                const editcontent = <Functions {...this.props} functionkey={'006-000001-000001-000001-002'}>
                    <a onClick={this.editdeaile(record)}>编辑</a>
                </Functions>
                const claim = <Functions {...this.props} functionkey={'006-000001-000001-000001-003'}>
                    <a onClick={this.claimletterdeaile(record)}>索赔信</a>
                </Functions>
                const separator = editcontent && claim ?
                    <span className="margin-ss-left margin-ss-right v-line">|</span> : null
                return (
                    <div>
                        {editcontent}{separator}{claim}
                    </div>
                )
            }
        }
    ];

    formItemLayout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 18
        }
    }
    state = {
        reasonhideshow: false
    }

    componentDidMount() {

    }

    /**
     *作者: 唐勇
     *功能描述: 分页功能
     *参数说明:1.page 当前页码 2.pageSize：多少条数据
     *时间: 2018/6/26 9:00
     */
    Paginatihandle = (page, pageSize) => {
        const roles2 = {}
        var newobj = {
            pageNumber: page,
            pageData: pageSize,
            searchKey: this.props.Infos.params
        }
        this
            .props
            .fetchPosts({
                key: 'data',
                value: newobj
            });
    }

    editdeaile = (record) => () => {
        this.props.claimlettableeditaction({data: record});
        this.props.claimeditmodalaction({visible: true});
    }
    claimletterdeaile = (record) => () => {
        const newobj = {}
        newobj.reimReportDetailId = record.reimReportDetailId;
        axios
            .post(`${config.api_url}/arm/motan/service/api/IArmService/getReimLetter`, newobj)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        this.props.claimlettablelcaimletteraction({data: response.data.data})
                    } else {
                        message.error(response.data.msg);
                    }
                }
            })
        this.props.claimletterdeailemodalaction({visible: true});

    }
    ModalhandleeditOk = () => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const newobj = {}
            const detailRslt = {}
            if (values.isReimOks == "已赔偿") {
                detailRslt.isReimOk = "1"
            } else if (values.isReimOks == "未赔偿") {
                detailRslt.isReimOk = "0"
            } else {
                detailRslt.reason = values.reason
                detailRslt.isReimOk = values.isReimOks
            }
            detailRslt.reimReportDetailId = this.props.claimlettableeditmodule.data.reimReportDetailId
            detailRslt.caseId = values.caseId
            newobj.detailRslt = detailRslt;
            axios
                .post(`${config.api_url}/arm/motan/service/api/IArmService/updateReimReportDetailRslt`, newobj)
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.state == '000001') {
                            message.success(response.data.msg);
                            this.setState({reasonhideshow: false});
                            this.props.form.resetFields();
                            this.props.form.setFieldsValue({reason: ""});
                            this.props.claimeditmodalaction({visible: false});
                        } else {
                            message.error(response.data.msg);
                        }
                    }
                })
        })

    }
    ModalhandleeditCancel = () => {
        this.props.form.resetFields();
        this.setState({reasonhideshow: false});
        this.props.form.setFieldsValue({reason: ""});
        this.props.claimeditmodalaction({visible: false});
    }

    ModalhandleletterdeaileOk = () => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        this.props.claimletterdeailemodalaction({visible: false});
    }
    ModalhandleletterdeaileCancel = () => {
        this.props.claimletterdeailemodalaction({visible: false});
    }
    editselect = (value, option) => {
        if (value == 2) {
            this.setState({reasonhideshow: true})
        } else {
            this.setState({reasonhideshow: false})
        }
    }
    reasononblur = () => {
        let value = this.props.form.getFieldValue('reason');
        this.props.form.setFieldsValue({reason: strTrim(value)});
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const {data} = this.props.claimreportdetailmodule
        const newdata = datasaddkey(data);
        const columns = this.columns;
        const {reasonhideshow} = this.state
        const editlist = this.props.claimlettableeditmodule.data
        const platformId = [{id: '1', name: '已赔偿'}, {id: '0', name: '未赔偿'}, {id: '2', name: '放弃赔偿'}] || []
        const platformIdselect = platformId.map((v, i) => <Option key={i} value={v.id}>{v.name}</Option>)
        const editdata = <div className="asinleft">
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <FormItem {...this.formItemLayout}
                              label="ASIN"
                    >
                        {getFieldDecorator('asin', {
                            rules: [{required: false}], initialValue: editlist.asin
                        })(
                            <span>{editlist.asin}</span>
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <FormItem {...this.formItemLayout}
                              label="Selller SKU"
                    >
                        {getFieldDecorator('sellerSku', {
                            rules: [{required: false}], initialValue: editlist.sellerSku
                        })(
                            <span>{editlist.sellerSku}</span>
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row className="detailpd10">
                <Col span={1}></Col>
                <Col span={22}>
                    <FormItem {...this.formItemLayout}
                              label="问题编号"
                    >
                        {getFieldDecorator('caseId', {
                            rules: [{required: false, pattern: /^[0-9a-zA-Z]+$/, message: '只允许输入数字和字母'}],
                            initialValue: editlist.caseId == "--" ? "" : editlist.caseId
                        })(
                            <Input maxLength="100" maxLength="11"/>
                        )}
                    </FormItem>
                </Col>
            </Row>
            <Row className="detailpd10">
                <Col span={1}></Col>
                <Col span={22}>
                    <FormItem {...this.formItemLayout}
                              label="赔偿状态"
                    >
                        {getFieldDecorator('isReimOks', {
                                rules: [{required: true, message: '销售平台'}],
                                initialValue: editlist.isReimOk == "1" ? '已赔偿' : '未赔偿'
                            },
                        )(
                            <Select className='ant-xs-row' onSelect={this.editselect}>
                                {platformIdselect}
                            </Select>
                        )}
                    </FormItem>
                </Col>
            </Row>

            {reasonhideshow ?
                <Row className="detailpd10">
                    <Col span={1}></Col>
                    <Col span={22}>
                        <FormItem {...this.formItemLayout}
                                  label="放弃原因"
                        >
                            {getFieldDecorator('reason', {
                                    rules: [{required: true, message: '请输入放弃原因'}],
                                },
                            )(
                                <TextArea rows={3} maxLength="500" onBlur={this.reasononblur}/>
                            )}
                        </FormItem>
                    </Col>
                </Row> : null
            }
        </div>
        const caimletter = this.props.claimlettablelcaimlettermodule.data

        return (
            <div className="newCluenk">

                <div className="content">
                    <Spin spinning={this.props.claimreportdetailmodule.loading} delay={500} tip="Loading...">
                        <Table key={'datadetail'} columns={columns} dataSource={newdata} bordered
                               pagination={false}/>
                    </Spin>

                    <Pagination
                        showTotal={total => `共 ${total} 条`} showTitle
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger showQuickJumper={{goButton: true}}
                        current={this.props.Paginationmodel.current}
                        defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                        total={this.props.Paginationmodel.total}
                        pageSize={this.props.Paginationmodel.pageSize}
                        onChange={this.Paginatihandle}/>

                    <Modalmodel  {...{
                        ...this.props.claimeditmodal,
                        visible: this.props.claimeditmodal.visible,
                        ModalText: editdata,
                    }}
                                 destroyOnClose={true}
                                 onOk={this.ModalhandleeditOk}
                                 onCancel={this.ModalhandleeditCancel}
                    />

                    <Modalmodel  {...{
                        ...this.props.claimletterdeailemodal,
                        visible: this.props.claimletterdeailemodal.visible,
                        ModalText: caimletter,
                    }}
                                 destroyOnClose={true}
                                 onOk={this.ModalhandleletterdeaileOk}
                                 onCancel={this.ModalhandleletterdeaileCancel}
                    />
                </div>
            </div>
        );
    }
}

export default Tablelist