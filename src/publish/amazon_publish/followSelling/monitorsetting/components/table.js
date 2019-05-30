import React from 'react'
import { Link } from 'react-router-dom'
import {
    Spin,
    Table,
    Pagination,
    Icon,
    Input,
    Dropdown,
    Menu,
    Tooltip,
    message,
    Button,
    Modal
} from 'antd'
import defaultImg from '@/common/img/default.png'
import Shunt from './shunt'
import AddModal from './addModal'
import ImportModal from './importModal'
import ExportsModel from './exportsModel'
import Functions from '@/components/functions'
import { functions, autoZeroToString } from '@/util/baseTool'

const confirm = Modal.confirm;
const style = {
    input: {
        width: '100%',
        border: 'none',
        outline: 'none',
    },
    pr36: {
        paddingRight: '36px'
    }

}

export default class Tablelist extends React.Component {
    state = {
        selectedRowKeys: [],
        // items: [],
        // expandedRowKeys: [],
        editItem: {
            // currentItem: {},
            // field: '',
            // value: null,
            // type: 0
        },
        visible: false, // 修改价格的弹窗控制器
        priceData: {}, // 修改价格的数据
        addModalVisible: false,
        // logModalVisible: false,
        importModalVisible: false,
        exportModalVisible: false,
        amendData: undefined,
    }

    arrs = [];

    // 刊登中
    columns = [
        {
            title: 'ASIN',
            dataIndex: 'asin',
            key: 'asin',
            width: 100,
        },
        {
            title: 'Seller SKU',
            dataIndex: 'sellerSku',
            key: 'sellerSku',
            width: 100,
        },
        {
            title: '币种',
            dataIndex: 'currency',
            key: 'currency',
            width: 100,
        },
        {
            title: '销售账号',
            dataIndex: 'sellerAccount',
            key: 'sellerAccount',
            width: 100
        },
        {
            title: '站点',
            dataIndex: 'siteCode',
            key: 'siteCode',
            width: 100,
        },
        {
            title: '最低售价',
            dataIndex: 'lowestPrice',
            key: 'lowestPrice',
            width: 100,
            render: (t) => typeof t === "number" ? autoZeroToString(t) : t
        },

        {
            title: '最高售价',
            dataIndex: 'highestPrice',
            key: 'highestPrice',
            width: 100,
            render: (t) => typeof t === "number" ? autoZeroToString(t) : t
        },
        {
            title: '自动调价幅度',
            dataIndex: 'autoPriceRange',
            key: 'autoPriceRange',
            width: 100,
            render: (t) => typeof t === "number" ? autoZeroToString(t) : t
        },
        {
            title: '操作',
            dataIndex: 'queueTime',
            key: 'queueTime',
            width: 100,
            render: (t, r, i) => {
                return <div className="blue">
                    <Functions {...this.props} functionkey="008-000007-000002-005">
                        <span className="pointer" onClick={() => this.addModalShow(r)}>修改</span>
                    </Functions>
                    <Functions {...this.props} functionkey="008-000007-000002-008">
                        <span
                            className="margin-sm-left pointer"
                            onClick={() => confirm({
                                title: '提示',
                                content: '确认删除？',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: () => this.delModal(r),
                            })}
                        >
                            删除</span>
                    </Functions>

                </div>
            }
        },
    ]

    //  新增或编辑
    addModalShow = (r) => {
        this.setState({
            addModalVisible: true,
            amendData: r
        })
    }

    addModalOnCancel = () => {
        this.setState({
            addModalVisible: false,
            amendData: undefined
        })
    }

    addModalOnOk = (params) => {
        const { addAsync, updateAsync, getList } = this.props;
        let callback;
        if (params.data && params.data.id !== undefined) {
            callback = updateAsync
        } else {
            callback = addAsync
        }
        return callback(params)
            .then(r => {
                if (r) {
                    message.success(r.msg)
                    getList()
                }
                return r;
            })
    }

    delModal = (r) => {
        const { delAsync, getList } = this.props;
        delAsync({
            data: {
                id: r.id
            }
        })
            .then(r => {
                if (r) {
                    message.success(r.msg)
                    getList()
                }
            })
    }

    rowSelectionOnChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        })
    }

    paginationOnChange = (pageNumber, pageSize) => {
        const { getList } = this.props;
        this.rowSelectionOnChange([])
        getList(pageNumber, pageSize)
    }

    render() {
        const {
            visible,
            priceData,
            addModalVisible,
            logModalVisible,
            selectedRowKeys,
            // expandedRowKeys,
            amendData,
            importModalVisible,
            exportModalVisible,
        } = this.state;
        const {
            getParams,
            listData,
            uploadAsync,
            siteData,
            getAccountAsync,
        } = this.props;
        const {
            list,
            total,
            loading,
            params,
        } = listData;
        const {
            pageNumber,
            pageData,
        } = params;

        const rowSelection = {
            selectedRowKeys,
            columnWidth: 30,
            onChange: this.rowSelectionOnChange
            // hideDefaultSelections: true,
        };
        // 根据刊登状态控制表格显示内容 end
        return (
            <div className="padding-sm bgcfff">
                <div className="text-right margin-ss-bottom">
                    <Functions {...this.props} functionkey="008-000007-000002-005">
                        <Button icon="plus" onClick={() => this.addModalShow()}>新增</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="008-000007-000002-006">
                        <Button icon="download" className="margin-ss-left" onClick={() => this.setState({ importModalVisible: true })}>数据导入</Button>
                    </Functions>
                    <Functions {...this.props} functionkey="008-000007-000002-007">
                        <Button icon="upload" className="margin-ss-left" onClick={() => this.setState({ exportModalVisible: true })}>数据导出</Button>
                    </Functions>


                </div>
                <Spin spinning={loading} delay={500} tip="Loading...">
                    <Table
                        rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={list}
                        pagination={false}
                        bordered={true}
                        size="small"
                        indentSize={0}
                        rowKey={record => record.id}
                    />
                </Spin>
                <Pagination
                    showTotal={total => `共 ${total} 条`}
                    pageSizeOptions={['20', '30', '40', '50']}
                    showSizeChanger
                    showQuickJumper={{ goButton: true }}
                    current={pageNumber}
                    defaultCurrent={1}
                    onShowSizeChange={this.paginationOnChange}
                    total={total}
                    pageSize={pageData}
                    onChange={this.paginationOnChange}
                />
                <AddModal
                    visible={addModalVisible}
                    siteData={siteData}
                    getAccountAsync={getAccountAsync}
                    onCancel={this.addModalOnCancel}
                    data={amendData}
                    onOk={this.addModalOnOk}
                />
                <ImportModal
                    visible={importModalVisible}
                    uploadAsync={uploadAsync}
                    onCancel={() => this.setState({ importModalVisible: false })}
                />
                <ExportsModel
                    visible={exportModalVisible}
                    ids={selectedRowKeys}
                    getParams={getParams}
                    onCancel={() => this.setState({ exportModalVisible: false })}
                />
            </div>
        )
    }
}
