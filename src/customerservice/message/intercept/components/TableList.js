import React from 'react';
import {
    Table, Spin,
} from 'antd';
import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';

export default class TableList extends React.Component {
    columns = [
        {
            title: '拦截关键字',
            dataIndex: 'keywords',
            width: 280,
        },
        {
            title: '平台',
            dataIndex: 'platform.label',
            width: 280,
        },
        {
            title: '操作',
            width: 280,
            render: (text, record, index) => {
                const options = [
                    {
                        name: '编辑',
                        onChange: () => {
                            this.props.showAddUpdateModal('编辑拦截关键字', index);
                        },
                        funcId: '009-000002-000001-002',
                        subs: [],
                    },
                    {
                        name: '删除',
                        onChange: () => this.props.onOperate(record),
                        funcId: '009-000002-000001-003',
                        subs: [],
                    },
                ];
                return (
                    <Tableoption {...this.props} options={options} />
                );
            },
        },

    ]

    componentDidMount() {
        this.props.listFetch();
    }

    render() {
        const { data, loading } = this.props.listReducer;
        const btnOptions = {
            left: [],
            right: [
                {
                    name: '添加',
                    onChange: () => this.props.showAddUpdateModal('新增拦截关键字'),
                    type: 'button',
                    icon: 'plus',
                    funcId: '009-000002-000001-002',
                    subs: [],
                },
            ],
        };
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <BtnOperation btnOptions={btnOptions} {...this.props} />
                    <Table
                        rowKey={(record, index) => (index)}
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={data}
                        pagination={false}
                    />
                </Spin>
            </div>
        );
    }
}
