import React, { Component } from 'react';
import {
    Table, Pagination, Spin,
} from 'antd';
import Tableoption from '../../../../components/Tableoption';
import BtnOperation from '../../../../components/BtnOperation';
import { commonRequest } from '../../../common/request';
import { page } from '../../../../constants';
import { getStateName } from '../../../../utils';
import {
    getTempState, MESSAGE_TEMP_DELETE, MESSAGE_TEMP_SET_INVALID, MESSAGE_TEMP_TO_EXAM_EINE, MESSAGE_TEMP_SET_PUBLIC_OR_PRAIVATE,
} from '../constants';
import { showConfirm } from '../../../../compliance/utils';

class App extends Component {
    columns = [
        {
            title: '模板名称',
            dataIndex: 'tempName',
            width: '284',
            render: (text, record) => (
                <div className="temp-name" onClick={() => this.props.onChangeModal('tempDetailVisible', true, record)}>{text}</div>
            ),
        }, {
            title: '模板所属',
            dataIndex: 'tempType',
            width: '93',
            render: text => (
                <div>{text === 1 ? '公有' : '私有'}</div>
            ),
        }, {
            title: '模板状态',
            dataIndex: 'tempState',
            width: '93',
            render: text => (
                <div>{getStateName(text, getTempState, 'code')}</div>
            ),
        }, {
            title: '分类',
            dataIndex: 'tempClass',
            width: '181',
        }, {
            title: '操作',
            dataIndex: 'option',
            align: 'center',
            width: '145',
            render: (text, record) => {
                const options = [
                    {
                        name: '编辑',
                        onChange: () => this.props.onChangeModal('addTempVisible', true, record, '编辑模板'),
                        funcId: '009-000002-000003-002',
                        subs: [],
                    }, {
                        name: '删除',
                        onChange: () => this.onDeleteTemp(record),
                        funcId: '009-000002-000003-004',
                        subs: [],
                    }, {
                        name: '失效',
                        onChange: () => this.onInvalidTemp(record),
                        funcId: '009-000002-000003-006',
                        subs: [],
                    }, {
                        name: '审核',
                        onChange: () => this.onExamTemp(record),
                        funcId: '009-000002-000003-005',
                        subs: [],
                    }, {
                        name: record.tempType === 1 ? '设为私有' : '设为公有',
                        onChange: () => this.onSetTempType(record),
                        funcId: '009-000002-000003-007',
                        subs: [],
                    },
                ];
                if (record.tempType === 1 && (record.tempState === 2 || record.tempState === 3)) {
                    options.splice(2, 1);
                } else if (record.tempType === 1 && record.tempState === 1) {
                    options.splice(3, 1);
                } else if (record.tempType === 2) {
                    options.splice(2, 2);
                }
                return (
                    <Tableoption {...this.props} options={options} isRender />
                );
            },
        },
    ]

    onDeleteTemp = (record) => {
        showConfirm(
            '提示！',
            '确定删除此模板',
            () => commonRequest(MESSAGE_TEMP_DELETE, { tempId: record.tempId }, this.props.listFetch),
        );
    }

    onInvalidTemp = (record) => {
        showConfirm(
            '提示！',
            '确定要让此模板失效',
            () => commonRequest(MESSAGE_TEMP_SET_INVALID, { tempId: record.tempId }, this.props.listFetch),
        );
    }

    onExamTemp = (record) => {
        showConfirm(
            '提示！',
            '确定审核通过该模板',
            () => commonRequest(MESSAGE_TEMP_TO_EXAM_EINE, { tempId: record.tempId }, this.props.listFetch),
        );
    }

    onSetTempType = (record) => {
        showConfirm(
            '提示！',
            record.tempType === 1 ? '确定设置该模板为私有吗' : '确定设置该模板为共有吗',
            () => commonRequest(MESSAGE_TEMP_SET_PUBLIC_OR_PRAIVATE, { tempId: record.tempId, setType: record.tempType === 1 ? 2 : 1 }, this.props.listFetch),
        );
    }

    render() {
        const { data, loading } = this.props.listReducer;
        const { total, current, pageSize } = this.props.paginationReducer;
        const { listFetch, addBtnShow } = this.props;
        const btnOptions = addBtnShow ? {
            left: [],
            right: [
                {
                    name: '语种管理',
                    onChange: () => this.props.onChangeModal('languagesVisible', true),
                    type: 'button',
                    icon: 'setting',
                    funcId: '009-000002-000003-003',
                    subs: [],
                },
                {
                    name: '新增模板',
                    onChange: () => this.props.onChangeModal('addTempVisible', true, undefined, '新增模板'),
                    type: 'button',
                    icon: 'plus',
                    funcId: '009-000002-000003-002',
                    subs: [],
                },
            ],
        }
            : {
                left: [],
                right: [
                    {
                        name: '语种管理',
                        onChange: () => this.props.onChangeModal('languagesVisible', true),
                        type: 'button',
                        icon: 'setting',
                        funcId: '009-000002-000003-003',
                        subs: [],
                    },
                ],
            };
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <BtnOperation
                        btnOptions={btnOptions}
                        {...this.props}
                    />
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={data}
                        rowKey={(record, index) => (index)}
                        pagination={false}
                    />
                    <Pagination
                        className="pull-right"
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定每页可以显示多少条
                        showSizeChanger // 是否可以改变 pageSize
                        defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={current}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={+total} // 数据总数
                        pageSize={pageSize} // 每页条数
                        onChange={listFetch} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={listFetch} // pageSize 变化的回调
                    />
                </Spin>
            </div>
        );
    }
}

export default App;
