import React from 'react'
import {
    Button,
    Spin,
    Table,
    Pagination,
    message,
    Tooltip,
    Switch,
    Menu,
    Dropdown,
    Icon,
} from 'antd'
import PopConfirm from '../../../common/components/confirm';
import {fetchPost} from '../../../util/fetch';
import * as API from '../constants/api'
import Functions from '../../../components/functions'

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '序号',
            key: 'orderNum',
            render: (text, record, index) => {
                return '' + ( this.props.pageNumber === 1 ? '' : this.props.pageNumber - 1 ) + (index + 1);
            }
        },
        {
            title: '平台',
            dataIndex: 'platform',
            align: 'center',
        },
        {
            title: '规则名称',
            dataIndex: 'ruleName',
            align: 'center',
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'isEnabled',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <Switch checked={text === 1 ? true : false} onChange={()=>this.handleIsEnabledChange(text, record.ruleId)} />
                )
            }
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            align: 'center',
        },
        {
            title: '最后更新时间',
            dataIndex: 'modifiedTime',
            align: 'center',
        },
        {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <div>
                        {/* <Functions {...this.props} functionkey="001-000004-000006-001"> */}
                            <a onClick={()=>this.props.openModal(record.ruleId)}
                                style={{display: 'inline-block', marginRight: 10}}>
                                编辑
                            </a>
                        {/* </Functions> */}
                        {/* <Functions {...this.props} functionkey="001-000004-000006-002"> */}
                            <a onClick={() => PopConfirm('删除确认', 
                                                        '删除后无法恢复，确认要删除？', 
                                                        ()=>this.delRule(record.ruleId))}>
                                删除
                            </a>
                        {/* </Functions> */}
                    </div>
                )
            }
        },
    ];
    //删除
    delRule = (ruleId) => {
        fetchPost(API.DELETE_ORDER_AUDIT_RULE, {ruleId}, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.handleSubmit();
                }
            })
    };
    //切换授权状态
    handleIsEnabledChange =(isEnabled, ruleId) => {
        fetchPost(API.CHECK_RULES_ENABLED_DISABLE, {isEnabled: isEnabled === 1 ? 2 : 1, ruleId}, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.props.handleSubmit();
                }
            })
    }

    render() {
        const {data, pageNumber, pageData, handleSubmit, loadingState, openModal} = this.props;
        const total = data.total;
        return (
            <div className="checkrules-tablelist">
                <div className="checkrules-addBtn">
                    {/* <Functions {...this.props} functionkey="008-000001-000005-002"> */}
                        <Button icon="plus" onClick={()=>openModal()}>新增</Button>
                    {/* </Functions> */}
                </div>
                <div className="checkrules-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.data}
                            pagination={false}
                            rowKey={(record, index) => (index)}
                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination className="pull-right"
                                showTotal={total => `共 ${total} 条`}
                                showSizeChanger                             // 是否可以改变 pageSize
                                current={pageNumber}
                                showQuickJumper={{goButton: true}}        // 是否可以快速跳转至某页
                                total={total}                               // 数据总数
                                pageSize={pageData}                         // 每页条数
                                onChange={handleSubmit}                     // 页码改变的回调，参数是改变后的页码及每页条数
                                onShowSizeChange={handleSubmit}             // pageSize 变化的回调
                                // size="small"
                    />
                </div>
            </div>
        )
    }
}