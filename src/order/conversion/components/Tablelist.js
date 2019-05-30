/**
 *作者: 任贸华
 *功能描述: 抓单配置表格展示模块
 *参数说明:
 *时间: 2018/4/16 11:40
 */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import actions from '../actions'
import Modalmodel from '@/components/modalmodel'
import {
    Form,
    Button,
    Select,
    message,
    Radio,
    Table,
    Pagination,
    Spin,
    Divider
} from 'antd'
import '../css/css.css'


const FormItem = Form.Item
const Option = Select.Option
import { timestampFromat, datasaddkey, functions } from 'util/baseTool';
import axios from "util/axios";
import * as config from "util/connectConfig";
import { levelOptions } from "util/options";


class Tablelist extends Component {
    constructor(props) {
        super(props);
    }

    showdel = (ruleId, index) => () => {
        this.props.modalmodelaction({ tablelistvisible: true, })
        this.props.tablemodelaction({ delkey: index, ruleId })
    }

    deleteOk = () => {
        const id = this.props.tablemodel.ruleId
        const newobj = { ruleId: id }
        axios.post(`${config.api_url}/oms/order/grab/motan/OrderGrabConfigApi/deleteRuleOrderGrabConfig`, newobj)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        message.success(response.data.msg)
                        this.props.fetchPosts({ key: 'data', })
                        this.props.modalmodelaction({ tablelistvisible: false })
                    } else {
                        message.error(response.data.msg)
                    }
                }
            }).catch(e => {
                console.log(e)
            })

    }

    columns = [{
        title: '序号',
        key: 'orderNum',
        render: (text, record, index) => {
            return '' + (this.props.Paginationmodel.current === 1 ? '' : this.props.Paginationmodel.current - 1) + (index + 1);
        }
    }, {
        title: '平台',
        className: '',
        dataIndex: 'platform',
        // width: 80,

    }, {
        title: '配置规则名称',
        dataIndex: 'rule',
        // width: 180,

    }, {
        title: '状态',
        dataIndex: 'state',
        // width: 50,
        render: (text, record) => {
            return text === 0 ? '启用' : '停用'
        }
    }, {
        title: '优先级',
        // width: 50,
        dataIndex: 'priority',

    },
    {
        title: '修改时间',
        dataIndex: 'modifitime',
        render: (text, record) => timestampFromat(text, 2),
        // width: 100,

    },
    {
        title: '操作人',
        dataIndex: 'operator',
        // width: 80,

    }, {
        title: '操作',
        // width: 60,
        dataIndex: 'Operation',
        render: (text, record, index) => {
            const ruleId = record.ruleId;
            return (
                <div>{functions(this, '001-000004-000001-005') ?
                    <a className={'viewbtn'} onClick={this.showedit(ruleId, index)}>修改</a> : null}
                    {functions(this, '001-000004-000001-006') ?
                        <a className={'viewbtn margin-ss-left'} onClick={this.showdel(ruleId, index)}>删除</a> : null}
                </div>
            )
        },

    }];

    /**
     *作者: 任贸华
     *功能描述: 列表新增、修改请求
     *参数说明:
     *时间: 2018/4/17 10:07
     */
    showedit = (ruleId = '', index = '') => () => {
        this.props.editconditionAppaction({ visible: true, ruleId, index })
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.tablemodelaction({ selectedRowKeys, selectedRows });
    }


    Paginatihandle = (page, pageSize) => {
        const newobj = {}
        newobj.pageNumber = page
        newobj.pageData = pageSize
        this.props.fetchPosts({ key: 'data', value: newobj });
        this.props.menudataaction({
            pageCache: {
                ...this.props.menuInfos.pageCache,
                [`${location.pathname}${location.search}`]: newobj
            }
        })
        this.props.tablemodelaction({ selectedRowKeys: [] });
    }

    ModalhandleCancel = (value) => () => {
        this.props.modalmodelaction({ [value]: false })
    }

    fieldshowhandle = () => {
        this.props.characterAPPaction({ visible: true })
    }

    skushowhandle = () => {
        this.props.skuprefixAPPaction({ visible: true })
    }

    render() {
        const { data } = this.props.tablemodel;
        const newdata = data && data.length === 0 ? data : datasaddkey(data)
        const columns = this.columns;
        const rowSelection = {
            selectedRowKeys: this.props.tablemodel.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
                disabled: true,
            }),
        };

        return (


            <div className="newCluenk pad_top_15">
                <div className="oms-conversion-optionBtn">
                    {functions(this, '001-000004-000001-004') ?
                        <Button onClick={this.showedit()} icon="plus">增加</Button> : null}
                    {functions(this, '001-000004-000001-002') ?
                        <Button type="primary" className={'ml10'} onClick={this.fieldshowhandle}>SMT字段配置</Button> : null}
                    {functions(this, '001-000004-000001-003') ?
                        <Button type="primary" className={'ml10'} onClick={this.skushowhandle}>通用解析配置</Button> : null}
                </div>
                <div className="content">
                    <Spin spinning={this.props.tablemodel.loading} delay={500} tip="Loading...">
                        <Table columns={columns} dataSource={newdata} bordered
                            pagination={false} />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger showQuickJumper={{ goButton: true }}
                        current={this.props.Paginationmodel.current}
                        defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                        total={this.props.Paginationmodel.total}
                        pageSize={this.props.Paginationmodel.pageSize}
                        onChange={this.Paginatihandle} />

                    <Modalmodel  {...{
                        ...this.props.modalmodel,
                        visible: this.props.modalmodel.tablelistvisible,
                        ModalText: '确认删除吗?',
                    }}
                        onOk={this.deleteOk}
                        confirmLoading={this.props.modalmodel.confirmLoading}
                        onCancel={this.ModalhandleCancel('tablelistvisible')} />

                </div>
            </div>

        );
    }
}

export default Tablelist
