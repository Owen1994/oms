import React from 'react'
import { Link } from 'react-router-dom'
import {
    Spin,
    Table,
    Pagination,
    Icon,
    Tooltip,
    Dropdown,
    Menu,
    Button,
    message,
} from 'antd'
import Functions from '../../../../../components/functions'
import itemIdLink from "../../constants/ItemIdLink";
import { defaultImg } from '../../../../../compliance/configs/config'
import PopConfirm from '../../../../../common/components/confirm'
import { fetchPost } from 'util/fetch';

export default class Tablelist extends React.Component {
    state = {
        plsStateId: 1,
        selectedRowKeys: [],
        expandedAllKeys: [],
    }
    columns = [
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            render: (text, record) => (
                <img src={text ? text : defaultImg} width={58} height={50} />
            )
        },
        {
            title: 'SKU信息',
            dataIndex: 'sellerSkuStr',
            key: 'sellerSkuStr',
            render: (text, record) => {
                const itemId = record.itemIdStr;
                const itemIdUrl = `${itemIdLink[record.site]}${itemId}`;
                return (
                    <div>
                        {record.listingId ? <p className="hover-show-all" style={{ maxWidth: 220 }}><span className={"span-5"}>Listing ID</span>：{record.listingId}</p> : null}
                        {itemId ?
                            <p className="hover-show-all" style={{ maxWidth: 220 }}><span className={"span-5"}>Item ID</span>: <a href={itemIdUrl} target={"_blank"}>{itemId}</a></p>
                            : null}
                        <Tooltip placement={"top"} title={text}>
                            <p className="hover-show-all" style={{ maxWidth: 220 }}><span className={"span-5"}>Seller SKU</span>: {text}</p>
                        </Tooltip>
                    </div>
                )
            }
        },
        {
            title: '基本信息',
            width: 300,
            dataIndex: 'basicInfo',
            key: 'basicInfo',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p><span className={"span-4"}>标题</span>：<span className={"span-content"}>{record.titleStr}</span></p>
                        <p><span className={"span-4"}>一级分类</span>：{record.oneClass}</p>
                        <p><span className={"span-4"}>销售类型</span>：{record.saleTypeStr}</p>
                    </div>
                )
            }
        },
        // {
        //     title: '销售信息',
        //     width: 150,
        //     dataIndex: 'hitCount',
        //     key: 'hitCount',
        //     render: (text, record) => {
        //         return(
        //             <div className="text-left">
        //                 {                             record.isChildren ? null : <p><span className={"span-4"}>浏览量</span>：<span>{record.hitCount}</span></p>                         }
        //                 <p><span className={"span-4"}>销量</span>：{record.quantitySold}</p>
        //             </div>
        //         )
        //     }
        // },
        {
            title: '价格库存',
            dataIndex: 'priceStock',
            key: 'priceStock',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p><span className={"span-3"}>零售价</span>：{record.currencyCode} {record.retailPrice}</p>
                        <p><span className={"span-3"}>库存</span>：{record.stockStr}</p>
                    </div>
                )
            }
        },
        {
            title: '销售账号',
            dataIndex: 'creates',
            key: 'creates',
            render: (text, record) => {
                return (
                    <div className="text-left">
                        <p><span className={"span-4"}>销售账号</span>：{record.saleAccountStr}</p>
                        <p><span className={"span-4"}>站点</span>：{record.site}</p>
                        {record.queueType ?
                            <p><span className={"span-4"}>队列类型</span>: {record.queueType}</p>
                            : null}
                        {record.queueTime ?
                            <p><span className={"span-4"}>队列时间</span>: {record.queueTime}</p>
                            : null}
                    </div>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text, record) => {
                if (record.isChildren) {
                    return '--'
                }
                return (
                    <Functions {...this.props} functionkey="008-000001-000001-030">
                        <a onClick={() => this.props.showLogModal(record)}>日志</a>
                    </Functions>
                )
            },
        }];

    handleUpdateExpandedRowKeys = (record) => {
        const expandedAllKeys = [record.key];
        record.children.forEach((item) => {
            expandedAllKeys.push(item.key);
        });
        this.setState({
            expandedAllKeys,
        })
    }

    handleConfirm = (type) => {
        if (type === 1) { // 执行批量中断
            const selectedRowKeys = this.state.selectedRowKeys;
            if (selectedRowKeys < 1) {
                return message.warning("请选择操作项");
            }
            PopConfirm('是否确认要批量中断？', '', () => {
                // 确认，执行中断
                fetchPost("/pls/ebay/motan/service/api/IEbayService/listingBatchInterrupt", { listingId: selectedRowKeys, type: 1 }, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            this.props.onSearch();
                        }
                    });
            });
        }
    }

    createTopelement = () => {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions {...this.props} functionkey="008-000001-000001-039">
                        <span onClick={() => this.handleConfirm(1)}>批量中断</span>
                    </Functions>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="overflow-hidden">
                <div className="pull-right">
                    <Functions {...this.props} functionkey="008-000001-000001-008">
                        <Link className="ant-btn ant-btn-default" to={"/publish/listing/list/detail/"}><Icon type="plus" />新增Listing</Link>
                    </Functions>
                </div>
                <div className="pull-left">
                    <Dropdown overlay={menu}>
                        <Button>批量操作<Icon type="down" /></Button>
                    </Dropdown>
                </div>
            </div>)
    }
    render() {
        const { onSearch, loadingObj, pageNumber, pageData } = this.props
        const { lst, total, loading } = this.props.tablemodel
        const { expandedAllKeys } = this.state;
        const rowSelection = {
            columnWidth: 30,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys
                })
            },
            getCheckboxProps: record => ({
                disabled: record.isChildren, // Column configuration not to be checked
            }),
            hideDefaultSelections: true,
        };
        // 根据刊登状态控制表格显示内容 end
        return (
            <div className="padding-sm">
                {this.createTopelement()}
                <div className="margin-ss-top">
                    <Spin spinning={loading} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={lst}
                            pagination={false}
                            bordered={true}
                            size="small"
                            rowSelection={rowSelection}
                            onExpand={(expanded, record) => this.handleUpdateExpandedRowKeys(record)}
                            indentSize={0}
                            rowClassName={(record, index) => {
                                if (expandedAllKeys.indexOf(record.key) >= 0) {
                                    return "table-row-select"
                                }
                                return ""
                            }}
                        />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={onSearch}
                        total={total}
                        pageSize={pageData}
                        onChange={onSearch} />
                </div>
            </div>
        )
    }
}
