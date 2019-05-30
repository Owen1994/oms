import React from 'react';
import { Table, Pagination, Spin } from 'antd';
import Modal2 from '../../../../components/Modal2';
import Tableoption from '../../../../components/Tableoption';
import LabelModal from './LabelModal';
import SubLabelModal from './SubLabelModal';
import BtnOperation from '../../../../components/BtnOperation';
import { commonRequest } from '../../../common/request';
import { showConfirm } from '../../../../compliance/utils';
import { ADD_EDIT_LABEL, ADD_EDIT_SUBLABEL, DELETA_LABEL } from '../constants';
import { page } from '../../../../constants';
import { fetchPost } from '../../../../util/fetch';

export default class CommentTablelist extends React.Component {
    state = {
        record: {},
        modalTitle: '',
        addVisible: false,
        addSubVisible: false,
        addConfirmLoading: false,
        addSubConfirmLoading: false,
    }

    columns = [
        {
            title: '分类名称',
            dataIndex: 'category',
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
            title: '编号',
            dataIndex: 'cateCode',
            width: 200,
            align: 'center',
        },
        {
            title: '排序',
            dataIndex: 'categorySort',
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
                            this.handleOpenModal('addSubVisible', '新增子标签', index, record);
                        },
                        funcId: '009-000004-000001-003',
                        subs: [],
                    }, {
                        name: '编辑',
                        funcId: '009-000004-000001-002',
                        onChange: () => { this.handleOpenModal('addVisible', '编辑标签', index, record); },
                        subs: [],
                    }, {
                        name: '删除',
                        funcId: '009-000004-000001-004',
                        onChange: () => { this.handleDelete(record); },
                        subs: [],
                    }, {
                        name: '编辑',
                        onChange: () => { this.handleOpenModal('addSubVisible', '编辑子标签', index, record); },
                        funcId: '009-000004-000001-003',
                        subs: [],
                    }, {
                        name: '删除',
                        funcId: '009-000004-000001-004',
                        onChange: () => { this.handleDelete(record); },
                        subs: [],
                    },
                ];
                if (record.parentId !== undefined) {
                    options.splice(0, 3);
                } else {
                    options.splice(3, 2);
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
                onChange: () => this.handleOpenModal('addVisible', '添加一级标签'),
                type: 'button',
                icon: 'plus',
                funcId: '009-000004-000001-002',
                subs: [],
            },
        ],
    }

    /**
     * 操作栏点击选项后的回调
     * @param <String> title 弹出框的标题
     * @param <String> visibleType 各弹框的显示参数
     * @param <String> optionType 操作项的类型
     * @param <String> index 操作项的索引
     */
    handleOpenModal = (visible, modalTitle, index, record) => {
        // 解决编辑后操作项的record传递不正常
        let newRecord = {};
        if (record) {
            if (record.parentId) {
                this.props.refundReasonList.data.forEach((ele) => {
                    if (ele.categoryId === record.parentId) {
                        const target = ele.children.find(item => item.categoryId === record.categoryId);
                        newRecord = target;
                    }
                });
            } else {
                const target = this.props.refundReasonList.data.find(item => item.categoryId === record.categoryId);
                newRecord = target;
            }
        }
        this.setState({
            modalTitle,
            [visible]: true,
            record: newRecord,
        });
    }

    handleCancel = (visible) => {
        this.setState({ [visible]: false });
    }

    handleAddOk = () => {
        this.labelformRef.validateFields((err, values) => {
            if (!err) {
                this.setState({ addConfirmLoading: true });
                fetchPost(ADD_EDIT_LABEL, values, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.props.refundReasonFetch();
                            this.setState({
                                addVisible: false,
                            });
                        }
                        this.setState({ addConfirmLoading: false });
                    });
            }
        });
    }

    handleAddSubOk = () => {
        this.subLabelformRef.validateFields((err, values) => {
            if (!err) {
                this.setState({ addSubConfirmLoading: true });
                fetchPost(ADD_EDIT_SUBLABEL, values, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.props.refundReasonFetch();
                            this.setState({
                                addSubVisible: false,
                            });
                        }
                        this.setState({ addSubConfirmLoading: false });
                    });
            }
        });
    }

    handleDelete = (record) => {
        showConfirm(
            '提示！',
            '确认要删除该分类',
            () => commonRequest(DELETA_LABEL, {
                group: '1',
                categoryId: record.categoryId,
            }, this.props.refundReasonFetch),
        );
    }

    render() {
        const {
            record,
            modalTitle,
            addVisible,
            addSubVisible,
            addConfirmLoading,
            addSubConfirmLoading,
        } = this.state;
        const { reasonPageData, reasonPageNumber, refundReasonFetch } = this.props;
        const loading = this.props.refundReasonLoading;
        const data = this.props.refundReasonList.data;
        const total = this.props.refundReasonList.total;
        return (
            <div className="refund-tablelist breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <BtnOperation
                        {...this.props}
                        btnOptions={this.btnOptions}
                    />
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={data}
                        // expandedRowRender={this.expandedRowRender}
                        pagination={false}
                        rowKey={records => (records.categoryId)}
                    />
                    <Pagination
                        className="pull-right"
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定显示页数的选项(数组) ['20', '30', '40', '50', '100', '200']
                        showSizeChanger // 是否可以改变 pageSize
                        // defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={reasonPageNumber}
                        onChange={refundReasonFetch} // 页码改变的回调，参数是改变后的页码及每页条数
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={reasonPageData} // 每页条数
                        onShowSizeChange={refundReasonFetch} // pageSize 变化的回调
                    />
                </Spin>
                {/* 添加标签/编辑标签弹窗 */}
                <Modal2
                    component={
                        (
                            <LabelModal
                                record={record}
                                ref={labelform => this.labelformRef = labelform}
                            />
                        )
                    }
                    title={modalTitle}
                    visible={addVisible}
                    handleOk={this.handleAddOk}
                    handleCancel={() => this.handleCancel('addVisible')}
                    confirmLoading={addConfirmLoading}
                />
                {/* 添加子标签/编辑子标签弹窗 */}
                <Modal2
                    component={
                        (
                            <SubLabelModal
                                record={record}
                                ref={labelform => this.subLabelformRef = labelform}
                            />
                        )
                    }
                    title={modalTitle}
                    visible={addSubVisible}
                    handleOk={this.handleAddSubOk}
                    handleCancel={() => this.handleCancel('addSubVisible')}
                    confirmLoading={addSubConfirmLoading}
                />
            </div>
        );
    }
}
