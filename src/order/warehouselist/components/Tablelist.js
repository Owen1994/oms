/**
 *作者: 任贸华
 *功能描述: 指定发货仓平台展示组件
 *参数说明:
 *时间: 2018/4/16 11:22
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import actions from '../actions'
import Modalmodel from '../../../components/modalmodel'
import {Link} from 'react-router-dom'
import {
    Form,
    Button,
    Select,
    Radio,
    message,
    Divider,
    Table,
    Pagination,
    Spin,
    Menu,
    Icon,
    Dropdown,
} from 'antd'
import '../css/css.css'


const FormItem = Form.Item
const Option = Select.Option
import {datasaddkey, functions, getGangeGimes, timestampFromat} from '../../../util/baseTool';
import axios from "../../../util/axios";
import * as config from "../../../util/connectConfig";
import {levelOptions} from "../../../util/options";

class Tablelist extends Component {

    constructor(props) {
        super(props);
    }

    columns = [{
        title: '销售平台',
        className: '',
        dataIndex: 'salesPlatform',
        width: 80,
    }, {
        title: '规则名称',
        dataIndex: 'ruleName',
        render: this.addinputdata,
        width: 180,
    }, {
        title: '优先级',
        width: 60,
        dataIndex: 'priority',
    }, {
        title: '最后更新时间',
        dataIndex: 'lastTime',
        width: 120,

    },
        {
            title: '操作人',
            dataIndex: 'operator',
            width: 80,
        }, {
            title: '操作',
            width: 120,
            dataIndex: 'Operation',
            render: (text, record, index) => {
                const url = `/orderdetail/?orderId=${record.orderId}`;
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <a className="viewbtn" onClick={() => {
                                this.edithaddle(record.id, 2)
                            }}>修改</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a className="viewbtn" onClick={this.view('visible', index)}>删除</a>
                        </Menu.Item>
                    </Menu>)
                ;
                return (

                    <div className="actions-btns">
                        <span>
                            {functions(this, '001-000004-000003-002') ?
                                <a className="viewbtn" onClick={() => {
                                    this.edithaddle(record.id, 1)
                                }}>查看</a> : null}
                        </span>
                        {functions(this, '001-000004-000003-004') ?
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link margin-ss-left">
                                    更多 <Icon type="down"/>
                                </a>
                            </Dropdown> : null}
                    </div>
                )
            },
        }];

    /**
     *作者: 任贸华
     *功能描述: 列表增 、 查 、改
     *参数说明:
     *时间: 2018/4/17 10:23
     */
    edithaddle = (id, type) => {
        let title = ''
        if (type == 1) {
            title = '查看规则'
        } else if (type == 2) {
            title = '修改规则'
        } else if (type == 3) {
            title = '增加规则'
        }
        const types = type == 1 ? true : false
        this.props.warehouseruleaction({visible: true, id: id, type: types, viewtype: type, title})

    }

    componentDidMount() {

    }

    view = (value, index) => () => {
        this.props.modalmodelaction({[value]: true, delkey: index})
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.tablemodelaction({selectedRowKeys, selectedRows});
    }

    /**
     *作者: 任贸华
     *功能描述: 列表分页
     *参数说明:
     *时间: 2018/4/17 10:23
     */
    Paginatihandle = (page, pageSize) => {

        this.props.form.validateFieldsAndScroll((err, values) => {

            const newobj = {}
            if (!err) {
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'salesPlatform') {
                            newobj[i] = values[i]
                            break;
                        }
                    }
                }
                newobj.pageNumber = page
                newobj.pageData = pageSize
                this.props.fetchPosts({key: 'data', value: newobj});
                this.props.menudataaction({
                    pageCache: {
                        ...this.props.menuInfos.pageCache,
                        [`${location.pathname}${location.search}`]: newobj
                    }
                })
            }
        });
        this.props.tablemodelaction({selectedRowKeys: []});
    }

    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({[value]: false})
    }

    /**
     *作者: 任贸华
     *功能描述: 列表删除
     *参数说明:
     *时间: 2018/4/17 10:22
     */
    ModalhandleOk = () => {

        const delkey = this.props.modalmodel.delkey;
        const parms = {id: this.props.tablemodel.data[delkey].id}

        axios.post(`${config.api_url}/oms/order/manage/motan/IOrderManageConfigApi/deleteConfigRuleWarehouse`, parms)
            .then(response => {

                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        message.success(`${response.data.msg ? response.data.msg : '操作成功'}`);
                        const data = [...this.props.tablemodel.data];
                        data.splice(delkey, 1);
                        this.props.modalmodelaction({ModalText: '删除中···', confirmLoading: true,})
                        setTimeout(() => {
                            this.props.tablemodelaction({data: data,});
                            this.props.modalmodelaction({
                                visible: false,
                                confirmLoading: false,
                            });

                        }, 500);
                    } else {
                        message.error(`${response.data.msg}`);
                    }
                }
            }).catch(e => {
            console.log(e);
        })
    }

    render() {

        const {data} = this.props.tablemodel;
        const newdata = datasaddkey(data)
        const columns = this.columns;

        const rowSelection = {
            selectedRowKeys: this.props.tablemodel.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: true,
            }),
        };

        return (

            <div className="newCluenk">
                <div className="padding-sm-top padding-sm-right text-right">
                    {functions(this, '001-000004-000003-003') ?
                        <Button onClick={() => {
                            this.edithaddle('', 3)
                        }}>
                            新增规则
                        </Button> : null}
                </div>
                <div className="content">

                    <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                        <Table columns={columns} dataSource={newdata} bordered
                               pagination={false}/>
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger showQuickJumper={{goButton: true}}
                        current={this.props.Paginationmodel.current}
                        defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                        total={this.props.Paginationmodel.total}
                        pageSize={this.props.Paginationmodel.pageSize}
                        onChange={this.Paginatihandle}/>
                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.visible,
                        ModalText: '确认删除吗?',
                    }}
                                 onOk={this.ModalhandleOk}
                                 confirmLoading={this.props.modalmodel.confirmLoading}
                                 onCancel={this.ModalhandleCancel('visible')}/>

                </div>
            </div>

        );
    }
}

export default Tablelist