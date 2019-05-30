import React from 'react';
import {
    Table, Switch, Pagination, Spin, Icon, Tooltip
} from 'antd';
import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import Functions from '@/components/functions';

import { page } from '../../../../constants';
import { fetchPost } from '../../../../util/fetch';
import { ACCOUNT_TOGGLE, ACCOUNT_REAUTHORIZATE } from '../constants';
import { showConfirm } from '../../../../compliance/utils';

export default class TableList extends React.Component {
    state = {}

    columns = [
        {
            title: 'paypal账号',
            dataIndex: 'account',
            width: 200,
            align: 'left',
        },
        {
            title: '状态',
            dataIndex: 'statusSwitch',
            width: 200,
            sorter: true,
            render: (text, record) => {
                const { switchDisable } = this.state;
                return (
                    <Switch
                        disabled={switchDisable}
                        checkedChildren="启用"
                        unCheckedChildren="停用"
                        checked={text === 1}
                        onChange={(bool) => { this.onRuleChange(bool, record); }}
                    />
                )
            }
        },
        {
            title: '授权状态检测',
            dataIndex: 'authStatus',
            width: 200,
            align: 'center',
            render: (text, record) => {
                let isException = false;
                let clsName = '';
                if (text === '异常') {
                    isException = true;
                    clsName = 'import-fail';
                } else if (text === '正常') {
                    clsName = 'import-succ';
                } else if (text === '授权中') {
                    clsName = 'import-ing';
                }
                return (
                    <div>
                        <span className={clsName}>{text}</span>
                        {isException
                            ? (
                                <Tooltip title={record.reason}>
                                    <Icon type="info-circle" style={{ marginLeft: 5, fontSize: 14 }} />
                                </Tooltip>
                            ) : null}
                    </div>
                )
            }
        },
        {
            title: '授权过期时间',
            dataIndex: 'expireTime',
            width: 200,
            align: 'center',
        },
        {
            title: '添加人',
            dataIndex: 'adder',
            width: 200,
            align: 'center',
        },
        {
            title: '添加时间',
            dataIndex: 'addTime',
            width: 200,
            align: 'center'
        },
        {
            title: '操作',
            dataIndex: 'options',
            key: 'options',
            width: 200,
            align: 'center',
            render: (text, record) => {
                const options = [
                    {
                        name: '操作记录',
                        funcId: '009-000006-000001-005',
                        onChange: () => this.props.openModal('operateLogsVisible', record),
                        subs: [],
                    }
                ];
                if (record.authStatus === '异常') {
                    options.unshift({
                        name: '编辑',
                        onChange: () => this.props.openModal('editAddVisible', record, '2'),
                        funcId: '009-000006-000001-002',
                        subs: [],
                    }, {
                        name: '重新授权',
                        funcId: '009-000006-000001-004',
                        onChange: () => this.reAuthorizate(record),
                        subs: [],
                    });
                }
                return (
                    <Tableoption {...this.props} options={options} isRender={true} />
                );
            },
        },
    ]

    btnOptions = {
        left: [],
        right: [
            {
                name: '新增账号',
                onChange: () => this.props.openModal('editAddVisible', undefined, '1'),
                type: 'button',
                icon: 'plus',
                funcId: '009-000006-000001-002',
                subs: [],
            },
            {
                name: '上传账号',
                onChange: () => this.props.openModal('uploadVisible'),
                type: 'button',
                icon: 'upload',
                funcId: '009-000006-000001-003',
                subs: [],
            }
        ],
    }

    componentDidMount() {
        const { menuInfos } = this.props;
        const pathname = location.pathname;
        const keys = menuInfos.functions[pathname] || [];
        this.setState({ switchDisable: !keys.includes('009-000006-000001-006') })
    }

    /**
     * switch切换
     * @param <Boolean> checked: bool
     * @param <Object> record: 切换时该项的record
     */
    onRuleChange = (checked, record) => {
        const { id, statusSwitch } = record;
        const messages = checked ? '确认要开启该项' : '确认要关闭该项';
        this.setState({
            dataSource: this.props.paypalReducer.paypalList,
        },);
        showConfirm(
            '提示！',
            messages,
            () => fetchPost(ACCOUNT_TOGGLE, { id, status: statusSwitch === 1 ? 2 : 1 }, 1).then((res) => {
                if (res && res.state === '000001') {
                    const { dataSource } = this.state;
                    const target = dataSource.find(item => item.id === record.id);
                    if (target) {
                        target.statusSwitch = target.statusSwitch === 1 ? 2 : 1;
                        this.setState({ dataSource });
                    }
                }
            }),
        );
    }

    reAuthorizate = (record) => {
        const { id } = record;
        showConfirm(
            '提示！',
            '确定重新授权？',
            () => fetchPost(ACCOUNT_REAUTHORIZATE, { id }, 1)
                .then((res) => {
                    if (res && res.state === '000001') {
                        this.props.listFetch();
                    }
                })
        );
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.props.form.setFieldsValue({
            statusOrder: sorter.order === 'descend' ? 'desc' : 'asc'
        });
        this.props.listFetch();
    }

    render() {
        const { total, current, pageSize } = this.props.paginationReducer;
        const { paypalList, loading } = this.props.paypalReducer;
        const { listFetch } = this.props;
        return (
            <div className="tablelist-item breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <BtnOperation
                        {...this.props}
                        btnOptions={this.btnOptions}
                    />
                    <Table
                        bordered
                        size="small"
                        indentSize={0}
                        columns={this.columns}
                        dataSource={paypalList}
                        pagination={false}
                        onChange={this.handleTableChange}
                        rowKey={record => (record.id)}  // TOMODIFY tagId字段
                    />
                    <Pagination
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定显示页数的选项(数组) ['20', '30', '40', '50', '100', '200']
                        showSizeChanger // 是否可以改变 pageSize
                        defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={current}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={pageSize} // 每页条数
                        onChange={listFetch} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch} // pageSize 变化的回调
                    />
                </Spin>
            </div>
        );
    }
}
