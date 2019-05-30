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
    message,
    Divider,
    Modal,
    Menu,
    Icon,
    Dropdown,
} from 'antd'
import '../css/css.css'

const FormItem = Form.Item
const Option = Select.Option
import {timestampFromat, datasaddkey, functions} from '../../../util/baseTool';
import Signselect from './Signselect';
import Signupdata from './Signupdata';
import Signadd from './Signadd';
import * as config from '../../../util/connectConfig'
import axios from '../../../util/axios'
import {levelOptions} from "../../../util/options";

class Tablelist extends Component {
    constructor(props) {
        super(props);
    }

    columns = [{
        title: '销售平台',
        dataIndex: 'salesPlatform',
        render: (text, record) => {

            var txt = '';
            var arr = this.props.commonSelectData.salesPlatform || [];

            for (var i = 0; i < arr.length; i++) {

                if (text == arr[i].id) {
                    txt = arr[i].name;
                    break;
                }
            }
            return txt;
        }
    },
        {
            title: '最后更新时间',
            dataIndex: 'lastTime',
            render: (text, record) => timestampFromat(text, 2),
        },
        {
            title: '操作人',
            dataIndex: 'operator',
        }, {
            title: '操作',
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <a className='viewbtn' onClick={this.updatatablelist(record)}>修改</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a className='viewbtn' onClick={this.deletetablelist(record)}>删除</a>
                        </Menu.Item>
                    </Menu>);
                return (

                    <div className="actions-btns">
                    <span>{functions(this, '001-000004-000004-002') ?
                        <a className='viewbtn' onClick={this.selecttablelist(record)}>查看</a> : null}
                    </span>
                        {functions(this, '001-000004-000004-004') ?
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link margin-ss-left">
                                    更多 <Icon type="down"/>
                                </a>
                            </Dropdown> : null}
                    </div>
                )
            }

        }];


    componentDidMount() {

    }

    /**
     *作者: 唐勇
     *功能描述: 暂时没用到，全选 单选只用
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.tablemodelaction({selectedRowKeys, selectedRows});
    }


    /**
     *作者: 唐勇
     *功能描述: 删除列表信息
     *参数说明:1.record=当前行数据集合
     *时间: 2018/4/3 19:00
     */
    deletetablelist = (record) => () => {
        this.props.modalmodelaction2({visible: true,})
        this.props.tablemodelaction({delkey: record.id,})
    }
    /**
     *作者: 唐勇
     *功能描述: 查看列表信息
     *参数说明:1.record=当前行数据集合
     *时间: 2018/4/3 19:00
     */

    selecttablelist = (record) => () => {
        this.props.modalmodelaction3({visible: true,})
        this.props.tablemodelaction({selkey: record.id,})
    }
    /**
     *作者: 唐勇
     *功能描述: 修改列表信息
     *参数说明:1.record=当前行数据集合
     *时间: 2018/4/3 19:00
     */

    updatatablelist = (record) => () => {
        this.props.modalmodelaction4({visible: true,})
        this.props.tablemodelaction({updakey: record.id, salesPlatform: record.salesPlatform})
    }

    /**
     *作者: 唐勇
     *功能描述: 修改列表信息
     *参数说明:1.page=当前页码, pageSize=当前页面多少条数据
     *时间: 2018/4/3 19:00
     */

    Paginatihandle = (page, pageSize) => {
        this.setState({
            pagenum: page,
        })
        var newobj = {...this.props.form.getFieldsValue(), pageNumber: page, pageData: pageSize}
        this.props.fetchPosts({
            key: 'data',
            value: newobj
        });
        this.props.menudataaction({
            pageCache: {
                ...this.props.menuInfos.pageCache,
                [`${location.pathname}${location.search}`]: newobj
            }
        })
    }

    /**
     *作者: 唐勇
     *功能描述: 新增取消隐藏框 数据清空
     *参数说明:
     *时间: 2018/4/3 19:00
     */

    ModalhandleCancel = () => {
        this.props.modalmodelaction({visible: false})
        this.props.tablemodelaction2({data2: [],});
        this.props.baseInfoForm({moduleplatformname: '', modulesalesPlatform: ''})
    }
    /**
     *作者: 唐勇
     *功能描述: 删除取消隐藏
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    ModalhandleCancel2 = () => {
        this.props.modalmodelaction2({visible: false})
    }

    /**
     *作者: 唐勇
     *功能描述: 详情取消隐藏 数据清空
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    ModalhandleCancel3 = () => {
        this.props.modalmodelaction3({visible: false})
    }

    /**
     *作者: 唐勇
     *功能描述: 修改取消隐藏框 数据清空
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    ModalhandleCancel4 = () => {
        this.props.modalmodelaction4({visible: false})
        this.props.tablemodelaction4({data4: [],});
        this.props.form.resetFields();
    }

    /**
     *作者: 唐勇
     *功能描述: 新增确定按钮
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    ModalhandleOk = () => {
        const {data2} = this.props.tablemodel2;
        var newobj = {
            addRule: {
                addresseeDetailList: [],
                addresseePlatform: {
                    platform: ''
                }
            }
        };
        var arr = [];
        var len = this.props.tablemodel2.selectlist.length;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (values.modulesalesPlatform == '' || values.modulesalesPlatform == undefined) {
                message.error('请选择销售平台');
                return false;
            }
            this.props.tablemodel2.data2.map((item, i) => {
                arr.push(item.key);
            });
            if (arr.length <= 0 && newobj) {
                message.error('请添加拦截字段');
                return false;
            }

            for (var i = 0; i < arr.length; i++) {
                if (values['addresseeValue' + arr[i]] == '' || values['addresseeValue' + arr[i]] == undefined) {
                    message.error('请选择收货人信息字段');
                    return false;
                } else {
                    newobj.addRule.addresseeDetailList[i] = {
                        addresseeKey: values['addresseeValue' + arr[i]],
                        platform: values.modulesalesPlatform,
                    }
                }
            }

            newobj.addRule.addresseePlatform.platform = values.modulesalesPlatform;
            newobj.addRule.addresseePlatform.sites = values.shopeeSites;
            for (var k = 0; k < newobj.addRule.addresseeDetailList.length; k++) {
                for (var j = 0; j < len; j++) {
                    if (newobj.addRule.addresseeDetailList[k].addresseeKey == this.props.tablemodel2.selectlist[j].addresseeKey) {
                        newobj.addRule.addresseeDetailList[k].addresseeValue = this.props.tablemodel2.selectlist[j].addresseeValue
                    }

                }
            }
            axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/saveConfigRuleAddressee`, newobj)
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.state == '000001') {
                            var txt = {}
                            txt.pageNumber = 1
                            txt.pageData = 20
                            this.props.fetchPosts({key: 'data', value: txt});
                            this.props.modalmodelaction({visible: false})
                            this.props.tablemodelaction2({data2: [], count: 0});
                            this.props.form.resetFields();
                        }
                        else {
                            message.error(response.data.msg);
                        }
                    }
                }).catch(e => {
                console.log(e);
            })
        })

    }


    /**
     *作者: 唐勇
     *功能描述: 删除确认按钮
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    Modalhandle2Ok = () => {
        const delkey = this.props.tablemodel.delkey;
        const newobj = {}
        const {salesPlatform} = this.props.Infos;
        axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/deleteConfigRuleAddressee`, {id: delkey})
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        newobj.pageNumber = 1
                        newobj.pageData = 20
                        if (salesPlatform) {
                            newobj.salesPlatform = salesPlatform.value;
                        } else {
                            newobj.salesPlatform = '';
                        }
                        this.props.fetchPosts({key: 'data', value: newobj})
                        this.props.modalmodelaction2({
                            visible: false,
                            confirmLoading: false,
                        });

                    }
                    else {
                        message.error(response.data.msg);
                    }
                }
            }).catch(e => {
            console.log(e);
        })

    }

    /**
     *作者: 唐勇
     *功能描述: 查看详情确认后弹窗隐藏
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    Modalhandle3Ok = () => {
        this.props.modalmodelaction3({visible: false})
    }

    /**
     *作者: 唐勇
     *功能描述: 修改功能确认按钮后数据保存
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    Modalhandle4Ok = () => {
        const {data4} = this.props.tablemodel4;
        var newobj = {
            addRule: {
                addresseeDetailList: [],
                addresseePlatform: {
                    platform: ''
                }
            }

        };
        var arr = [];

        var addresseeId = this.props.tablemodel.updakey;
        this.props.form.validateFieldsAndScroll((err, values) => {
            this.props.tablemodel4.data4.map((item, i) => {
                arr.push(item.key);
            });
            if (arr.length <= 0 && newobj) {
                message.error('请添加拦截字段');
                return false;
            }

            for (var i = 0; i < arr.length; i++) {
                if (values['addresseeKey' + arr[i]] == '' || values['addresseeKey' + arr[i]] == undefined) {
                    message.error('请选择收货人信息字段');
                    return false;
                } else {
                    newobj.addRule.addresseeDetailList[i] = {
                        addresseeKey: values['addresseeKey' + arr[i]],
                        addresseeId: addresseeId,
                        platform: values.platform,
                    }
                }
            }

            var arrplatform = this.props.commonSelectData.salesPlatform || [];
            for (var i = 0; i < arrplatform.length; i++) {
                if (values.platform == arrplatform[i].name) {
                    newobj.addRule.addresseePlatform.platform = arrplatform[i].id;
                    break;
                }
            }

            newobj.addRule.addresseePlatform.addresseeId = addresseeId;
            newobj.addRule.addresseePlatform.sites = values.shopeeSites2;
            var len = this.props.tablemodel4.data4[0].objlist.length;
            for (var k = 0; k < newobj.addRule.addresseeDetailList.length; k++) {
                for (var j = 0; j < len; j++) {
                    if (newobj.addRule.addresseeDetailList[k].addresseeKey == this.props.tablemodel4.data4[0].objlist[j].addresseeKey) {
                        newobj.addRule.addresseeDetailList[k].addresseeValue = this.props.tablemodel4.data4[0].objlist[j].addresseeValue

                    }
                }
            }
            axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/updateConfigRuleAddressee`, newobj)
                .then(response => {
                    if (response.status == 200) {
                        if (response.data.state == '000001') {
                            var txt = {}
                            txt.pageNumber = 1
                            txt.pageData = 20
                            this.props.fetchPosts({key: 'data', value: txt});
                            this.props.modalmodelaction4({visible: false})
                            this.props.tablemodelaction4({data4: [], count: 0});
                            this.props.baseInfoForm({addresseeKey: ''})
                            this.props.form.resetFields();
                        }
                        else {
                            message.error(response.data.msg);
                        }
                    }
                }).catch(e => {
                console.log(e);
            })
        })
    }

    /**
     *作者: 唐勇
     *功能描述: 新增弹窗显示
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    openModalhandle = () => {
        this.props.modalmodelaction({visible: true})
    }

    render() {
        const {data} = this.props.tablemodel;
        var newdata = datasaddkey(data);
        const columns = this.columns;
        const content = <Signadd {...this.props} />;
        const select = <Signselect {...this.props} />;
        const updata = <Signupdata {...this.props} />;
        return (
            <div className="newCluenk">

                <div className="padding-sm-top padding-sm-right text-right">
                    {functions(this, '001-000004-000004-003') ?
                        <Button onClick={() => {
                            this.openModalhandle()
                        }}>
                            新增
                        </Button> : null}
                </div>

                <div className="content">

                    <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                        <Table key={'data'} columns={columns} dataSource={newdata} bordered
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

                    {
                        /**
                         *  新增按钮弹窗显示信息
                         */
                    }
                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.visible,
                        ModalText: content,
                    }}
                                 onOk={this.ModalhandleOk}
                                 onCancel={this.ModalhandleCancel}
                    />

                    {
                        /**
                         *  删除确认窗显示
                         */
                    }
                    <Modalmodel  {...{
                        ...this.props.modalmodel2,
                        visible: this.props.modalmodel2.visible,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.Modalhandle2Ok}
                                 onCancel={this.ModalhandleCancel2}
                    />

                    {
                        /**
                         *  详情弹窗显示
                         */
                    }
                    <Modalmodel  {...{
                        ...this.props.modalmodel3,
                        visible: this.props.modalmodel3.visible,
                        ModalText: select,

                    }}
                                 destroyOnClose={true}
                                 onOk={this.Modalhandle3Ok}
                                 onCancel={this.ModalhandleCancel3}
                    />

                    {
                        /**
                         *  修改弹窗显示
                         */
                    }
                    <Modalmodel  {...{
                        ...this.props.modalmodel4,
                        visible: this.props.modalmodel4.visible,
                        ModalText: updata,

                    }}
                                 destroyOnClose={true}
                                 onOk={this.Modalhandle4Ok}
                                 onCancel={this.ModalhandleCancel4}
                    />

                </div>
            </div>
        );
    }
}

export default Tablelist