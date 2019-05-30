import React from 'react';
import {
    Table, Pagination, Spin
} from 'antd';
import BtnOperation from '../../../../components/BtnOperation';
import Tableoption from '../../../../components/Tableoption';

import { page } from '../../../../constants';

export default class TableList extends React.Component {
    state = {}

    columns = [
        {
            title: '规则ID',
            dataIndex: 'basisId',
            width: 200,
            align: 'center',
        },
        {
            title: '平台',
            dataIndex: 'platform',
            width: 200,
            align: 'center',
        },
        {
            title: '站点',
            dataIndex: 'siteId',
            width: 200,
            align: 'center',
        },
        {
            title: '规则名称',
            dataIndex: 'ruleName',
            width: 200,
            align: 'center',
        },
        {
            title: '销售币种',
            dataIndex: 'currency',
            width: 200,
            align: 'center',
        },
        {
            title: 'SKU匹配规则',
            dataIndex: 'matchRule',
            width: 200,
            align: 'center',
            render: text => {
                const matchRule = text.split('=');
                if (matchRule.length > 1) {
                    const headerText = matchRule[0];
                    const headerFix = matchRule[1];
                    const headStr = headerText === 'prefix' ? '前缀为' : '后缀为';
                    return `${headStr}${headerFix}`;
                } else {
                    return '无';
                }
            }
        },
        {
            title: '发货仓库',
            dataIndex: 'warehouse',
            width: 200,
            align: 'center',
        },
        {
            title: '货品发往国家',
            dataIndex: 'destination',
            width: 200,
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'options',
            width: 200,
            align: 'center',
            render: (text, record) => {
                const options = [
                    {
                        name: '查看',
                        funcId: '008-000005-000004-002',
                        onChange: () => this.props.openDrawer('viewVisible', record),
                        subs: [],
                    }, {
                        name: '编辑',
                        funcId: '008-000005-000004-002',
                        onChange: () => this.props.openDrawer('editVisible', record),
                        subs: [],
                    }, {
                        name: '删除',
                        funcId: '008-000005-000004-002',
                        onChange: () => this.props.deleteRule(record),
                        subs: [],
                    }, {
                        name: '日志',
                        funcId: '008-000005-000004-002',
                        onChange: () => this.props.openDrawer('logsVisible', record),
                        subs: [],
                    }
                ];
                return (
                    <Tableoption {...this.props} options={options} isRender={true} />
                );
            },
        }
    ]

    btnOptions = {
        left: [],
        right: [
            {
                name: '新增',
                onChange: () => this.props.openDrawer('editVisible'),
                type: 'button',
                icon: 'plus',
                funcId: '008-000005-000004-002',
                subs: [],
            }
        ],
    }

    render() {
        const { total, current, pageSize } = this.props.paginationReducer;
        const { domesticRulesList, loading } = this.props.domesticRulesReducer;
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
                        dataSource={domesticRulesList}
                        pagination={false}
                        rowKey={record => (record.basisIdStr)}
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
