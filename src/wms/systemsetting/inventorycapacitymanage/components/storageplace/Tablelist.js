import React from 'react';
import {
    Spin,
    Table,
    Pagination,
    Button,
    message,
} from 'antd';
import { fetchPost } from '../../../../../util/fetch';
import { DELETE_PLACE_MANAGE } from '../../constants/Api';
import Functions from '../../../../../components/functions';
import PopConfirm from '../../../../../common/components/confirm';

export default class Tablelist extends React.Component {
    columns = [
        {
            title: '序号',
            render: (text, record, index) => {
                const pNum = this.props.pageNumber;
                const pData = this.props.pageData;
                return (
                    <div>
                        {pNum > 1 ? (pNum - 1) * pData + (index + 1) : index + 1}
                    </div>
                );
            },
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouse',
            key: 'warehouse',
            align: 'center',
        },
        {
            title: '储位类型',
            dataIndex: 'storageType',
            key: 'storageType',
            align: 'center',
        },
        {
            title: '所属区',
            dataIndex: 'area',
            key: 'area',
            align: 'center',
        },
        {
            title: '货架编号',
            dataIndex: 'shelfNumber',
            key: 'shelfNumber',
            align: 'center',
        },
        {
            title: '货架组号',
            dataIndex: 'shelfGroupNumber',
            key: 'shelfGroupNumber',
            align: 'center',
        },
        {
            title: '货架层号',
            dataIndex: 'shelfLayerNumber',
            key: 'shelfLayerNumber',
            align: 'center',
        },
        {
            title: '储位编码',
            dataIndex: 'storageNumber',
            key: 'storageNumber',
            align: 'center',
        },
        {
            title: '长',
            dataIndex: 'length',
            key: 'length',
            align: 'center',
        },
        {
            title: '宽',
            dataIndex: 'width',
            key: 'width',
            align: 'center',
        },
        {
            title: '高',
            dataIndex: 'height',
            key: 'height',
            align: 'center',
        },
        {
            title: '操作',
            key: 'options',
            width: 100,
            render: (text, record) => (
                <div>
                    {/* <Functions {...this.props} functionkey="012-000005-000001-003"> */}
                    <a onClick={() => this.props.openModal('3', record)} style={{ marginRight: 10 }}>编辑</a>
                    {/* </Functions> */}
                    <Functions {...this.props} functionkey="012-000005-000001-003">
                        <a onClick={() => PopConfirm('删除', '您确定要删除吗？', () => this.deleteData([record.key.toString()]))}>删除</a>
                    </Functions>
                </div>
            ),
        },
    ];

    state = {
        selectedRowKeys: [],
    }


    // 离开页面时清除列表数据
    componentWillUnmount() {
        this.props.clearStoragePlaceList();
    }

    // 单项删除
    deleteData = (keys) => {
        fetchPost(DELETE_PLACE_MANAGE, { data: { keys } }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.props.handleSubmit();
                    this.setState({
                        selectedRowKeys: [],
                    });
                }
            });
    }

    // 批量删除
    deleteDataes = () => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys < 1) {
            return message.info('未选中数据！');
        }
        PopConfirm('批量删除', '您确定要批量删除选中项数据吗？', () => this.deleteData(selectedRowKeys));
        // this.deleteData(selectedRowKeys);
    }

    render() {
        const {
            data,
            pageNumber,
            pageData,
            handleSubmit,
            loadingState,
        } = this.props;
        const total = data.total;
        // 多选项配置
        const rowSelection = {
            columnWidth: 30,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({
                    selectedRowKeys,
                });
            },
            hideDefaultSelections: true,
        };
        // // 下拉列表
        // const menu = (
        //     <Menu>
        //         <Menu.Item>
        //             <Functions {...this.props} functionkey="012-000005-000001-003">
        //                 <a onClick={this.deleteDataes}>
        //                     批量删除
        //                 </a>
        //             </Functions>
        //         </Menu.Item>
        //     </Menu>
        // );

        return (
            <div className="wms-tablelist breadcrumb">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000005-000001-003">
                        <Button style={{ float: 'left', marginLeft: 0 }} onClick={this.deleteDataes}>
                                         批量删除
                        </Button>
                    </Functions>
                    {/* <Dropdown overlay={menu}> */}
                    {/* <Button style={{ float: 'left', marginLeft: 0 }}>批量操作<Icon type="down" /></Button> */}
                    {/* </Dropdown> */}
                    <Functions {...this.props} functionkey="012-000005-000001-002">
                        <Button icon="plus" onClick={() => this.props.openModal('1')}>新增</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="012-000005-000001-004">
                        <Button icon="download" onClick={() => this.props.openModal('2')}>数据导入</Button>
                    </Functions>
                </div>

                <div className="wms-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data.list}
                            pagination={false}
                            rowKey={record => record.key}
                            rowSelection={rowSelection}

                        />
                    </Spin>
                </div>
                <div className="pagination">
                    <Pagination
                        className="pull-right"
                        showTotal={total2 => `共 ${total2} 条`}
                        showSizeChanger // 是否可以改变 pageSize
                        current={pageNumber}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={pageData} // 每页条数
                        onChange={handleSubmit} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={handleSubmit} // pageSize 变化的回调
                        // size="small"
                        pageSizeOptions={['10', '30', '50', '100']}
                    />
                </div>
            </div>
        );
    }
}
