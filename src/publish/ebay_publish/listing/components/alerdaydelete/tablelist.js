import React from 'react'
import { Link } from 'react-router-dom'
import {
    Spin,
    Table,
    Pagination,
    Icon,
    Tooltip,
} from 'antd'
import Functions from '../../../../../components/functions'
import {defaultImg} from '../../../../../compliance/configs/config'

export default class Tablelist extends React.Component {
    state = {
        expandedAllKeys: []
    }

    columns = [
        {
            title: '图片',
            dataIndex: 'img',
            key: 'img',
            render: (text, record) => (
                <img src={text? text:defaultImg} width={58} height={50} />
            )
        },
        {
            title: 'SKU信息',
            dataIndex: 'sellerSkuStr',
            key: 'sellerSkuStr',
            render: (text, record) => {
                const itemId = record.itemIdStr;
                return (
                    <div>
                    {record.listingId ? <p className="hover-show-all" style={{maxWidth: 220}}><span className={"span-5"}>Listing ID</span>：{record.listingId}</p> : null }
                        {itemId ?
                            <p  className="hover-show-all" style={{maxWidth: 220}}><span className={"span-5"}>Item ID</span>: {itemId}</p>
                            : null}
                        <Tooltip placement={"top"} title={text}>
                            <p className="hover-show-all" style={{maxWidth: 220}}><span className={"span-5"}>Seller SKU</span>: {text}</p>
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
        {
            title: '销售信息',
            width: 150,
            dataIndex: 'hitCount',
            key: 'hitCount',
            render: (text, record) => {
                return(
                    <div className="text-left">
                        {                             record.isChildren ? null : <p><span className={"span-4"}>浏览量</span>：<span>{record.hitCount}</span></p>                         }
                        <p><span className={"span-4"}>销量</span>：{record.quantitySold}</p>
                    </div>
                )
            }
        },
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
                    <div className="pls-table_btns">
                        <Functions {...this.props} functionkey="008-000001-000001-029">
                            <span className="margin-ss-right">
                                <Link to={`/publish/listing/list/detail/?id=${record.listingId}&itemid=${record.itemIdStr}&state=${this.props.tabId}&type=copy`} target="_blank">复制</Link>
                            </span>
                        </Functions>
                        <Functions {...this.props} functionkey="008-000001-000001-030">
                            <a onClick={() => this.props.showLogModal(record)}>日志</a>
                        </Functions>
                    </div>)
            },
        }
    ];

    createTopelement = () => {
        return (
            <div className="overflow-hidden">
                <div className="pull-right">
                    <Functions {...this.props} functionkey="008-000001-000001-028">
                        <Link className="ant-btn ant-btn-default" to={"/publish/listing/list/detail/"}><Icon type="plus" />新增Listing</Link>
                    </Functions>
                </div>
            </div>
        )
    }

    handleUpdateExpandedRowKeys = (record) => {
        const expandedAllKeys = [record.key];
        record.children.forEach((item) => {
            expandedAllKeys.push(item.key);
        });
        this.setState({
            expandedAllKeys,
        })
    }

    render() {
        const { onSearch, loadingObj, pageNumber, pageData } = this.props
        const { lst, total,loading } = this.props.tablemodel
        const { expandedAllKeys } = this.state;
        // 根据刊登状态控制表格显示内容 end
        const rowSelection = {
            columnWidth: 30,
            getCheckboxProps: record => ({
                disabled: record.isChildren, // Column configuration not to be checked
            }),
            hideDefaultSelections: true,
        };
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
