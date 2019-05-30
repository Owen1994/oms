import React, { Component } from 'react';
import {
    Button, Menu,
    Dropdown, Icon,
    Pagination, Spin, Table,
} from 'antd';
import Tableitem from '../../../../../../components/Tableitem/index';
import InventoryReviewModal from '../../modal/InventoryReviewModal';

class TableList extends Component {
    state = {
        // selectedRowKeys: [],
        // selectedRows: [],
        showInventoryReviewModal: false,
    };

    columns = [
        {
            title: '仓库名称',
            dataIndex: 'warehouseName',
        },
        {
            title: '盘点类型',
            dataIndex: 'inventoryType',
        },
        {
            title: '盘点单号',
            dataIndex: 'inventoryNumber',
        },
        {
            title: '审核状态',
            dataIndex: 'reviewStatus',
        },
        {
            title: '产品信息',
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={80}
                        right={80}
                        title="SKU"
                        content={record.sku}
                    />
                    <Tableitem
                        left={80}
                        title="中文名称"
                        content={record.chineseName}
                    />
                    <Tableitem
                        left={80}
                        title="储位"
                        content={record.storage}
                    />
                    <Tableitem
                        left={80}
                        title="储位库存"
                        content={record.storageStock}
                    />
                </div>
            ),
        },
        {
            title: '盘点结果',
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={100}
                        right={80}
                        title="初盘数量"
                        content={record.initialPlatesNumber}
                    />
                    <Tableitem
                        left={100}
                        right={80}
                        title="初盘差异量"
                        content={record.initialPlateDifference}
                    />
                    <Tableitem
                        left={100}
                        right={80}
                        title="复盘数量"
                        content={record.rewindingNumber}
                    />
                    <Tableitem
                        left={100}
                        right={80}
                        title="复盘差异量"
                        content={record.rewindingDifference}
                    />
                </div>
            ),
        },
        {
            title: '盘点人信息',
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={140}
                        right="auto"
                        title="初盘人"
                        content={record.initialPlatePerson}
                    />
                    <Tableitem
                        left={140}
                        right="auto"
                        title="复盘人"
                        content={record.rewindingMan}
                    />
                    <Tableitem
                        left={140}
                        right="auto"
                        title="初盘上传时间"
                        content={record.initialUploadTime}
                    />
                    <Tableitem
                        left={140}
                        right="auto"
                        title="复盘上传时间"
                        content={record.rewindingUploadTime}
                    />
                </div>
            ),
        },
        {
            title: '备注',
            dataIndex: 'remark',
        },
        // {
        //     title: '操作',
        //     render: () => <a onClick={this.review}>审核</a>,
        // },
    ];

    review = () => {
        this.setState({
            showInventoryReviewModal: true,
        });
    };

    render() {
        // /**
        //  * table选中回调
        //  */
        // const rowSelection = {
        //     selectedRowKeys: this.state.selectedRowKeys,
        //     selectedRows: this.state.selectedRows,
        //     onChange: (selectedRowKeys, selectedRows) => {
        //         this.setState({
        //             selectedRowKeys,
        //             selectedRows,
        //         });
        //     },
        //     getCheckboxProps: () => ({
        //         disabled: false,
        //     }),
        // };
        const menu = (
            <Menu>
                <Menu.Item key="1">
                    <div onClick={this.review}>
                        批量审核
                    </div>
                </Menu.Item>
            </Menu>
        );
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            onChangeListener,
        } = this.props;
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <div className="margin-ss-bottom display-none">
                        <Dropdown overlay={menu}>
                            <Button>
                                <span>批量操作</span> <Icon type="down" />
                            </Button>
                        </Dropdown>
                    </div>
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                    />
                    <Pagination
                        pageSizeOptions={['100']}
                        showTotal={t => `共${t}条`}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        total={partList.total}
                        current={pageNumber}
                        pageSize={pageData}
                        onChange={onChangeListener}
                    />
                </Spin>
                <InventoryReviewModal
                    cancel={() => this.setState({
                        showInventoryReviewModal: false,
                    })}
                    visible={this.state.showInventoryReviewModal}
                />
            </div>
        );
    }
}

export default TableList;
