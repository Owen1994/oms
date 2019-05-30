import React from 'react';
import {
    Table, Switch, Pagination, Spin,
} from 'antd';
import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import { page } from '../../../../constants';
import Functions from '../../../../components/functions';


export default class TableList extends React.Component {
    state = {}

    columns = [
        {
            title: '标签名称',
            dataIndex: 'tagName',
            align: 'left',
            render: (text, record) => (!record.children && record.parentId !== undefined
                ? (
                    <span>
                        <span className="sublabel-sign">|— </span><span>{text}</span>
                    </span>
                )
                : text),
        },
        {
            title: '平台',
            dataIndex: 'platform',
            width: 200,
            align: 'center',
            render: (text, record) => (!record.children && record.parentId !== undefined ? text : text.label),
        },
        {
            title: '规则状态',
            dataIndex: 'ruleState',
            width: 200,
            render: (text, record) => {
                const { switchDisable } = this.state;
                if (!record.children && record.parentId !== undefined) {
                    return (
                        <Switch
                            disabled={switchDisable}
                            checkedChildren="启用"
                            unCheckedChildren="停用"
                            checked={text === 1}
                            onChange={(bool) => { this.props.onRuleChange(bool, record); }}
                        />
                    )
                } else {
                    return null;
                }
            }
        },
        {
            title: '排序',
            dataIndex: 'tagSort',
            width: 200,
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'options',
            key: 'options',
            width: 200,
            render: (text, record, index) => {
                const options = [
                    {
                        name: '新增子标签',
                        onChange: () => {
                            this.props.onOperate('新增子标签', 'subVisible', 'addSublabel', index, record);
                        },
                        funcId: '009-000001-000002-003',
                        subs: [],
                    }, {
                        name: '编辑',
                        funcId: '009-000001-000002-002',
                        onChange: () => { this.props.onOperate('编辑标签', 'visible', 'editlabel', index, record); },
                        subs: [],
                    }, {
                        name: '删除',
                        funcId: '009-000001-000002-004',
                        onChange: () => { this.props.onOperate('删除标签', '', 'deletelabel', index, record); },
                        subs: [],
                    }, {
                        name: '编辑',
                        onChange: () => { this.props.onOperate('编辑标签', 'subVisible', 'editSublabel', index, record); },
                        funcId: '009-000001-000002-003',
                        subs: [],
                    }, {
                        name: '规则',
                        funcId: '009-000001-000002-006',
                        onChange: () => { this.props.onOperate('应用规则', 'ruleVisible', 'editRule', index, record); },
                        subs: [],
                    }, {
                        name: '删除',
                        funcId: '009-000001-000002-004',
                        onChange: () => { this.props.onOperate('删除标签', '', 'deleteSublabel', index, record); },
                        subs: [],
                    },
                ];
                if (!record.children && record.parentId !== undefined) {
                    options.splice(0, 3);
                } else {
                    options.splice(3, 3);
                }
                return (
                    <Tableoption {...this.props} options={options} />
                );
            },
        },
    ]

    btnOptions = {
        left: [],
        right: [
            {
                name: '新增一级标签',
                onChange: () => this.props.onOperate('新增一级标签', 'visible', 'addlabel'),
                type: 'button',
                icon: 'plus',
                funcId: '009-000001-000002-002',
                subs: [],
            },
        ],
    }

    componentDidMount() {
        const { menuInfos } = this.props;
        const pathname = location.pathname;
        const keys = menuInfos.functions[pathname] || [];
        this.setState({ switchDisable: !keys.includes('009-000001-000002-005') })
    }

    render() {
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listData, loading } = this.props.listReducer;
        const { listFetch } = this.props;
        return (
            <div className="tablelist-item breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <BtnOperation
                        btnOptions={this.btnOptions}
                        {...this.props}
                    />
                    <Table
                        bordered
                        size="small"
                        indentSize={0}
                        columns={this.columns}
                        dataSource={listData}
                        pagination={false}
                        rowKey={record => (record.tagId)}
                    />
                    <Pagination
                        className="pull-right"
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
