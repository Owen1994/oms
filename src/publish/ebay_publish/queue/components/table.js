/**
 * 作者: 陈林
 * 描述: 库存价格队列列表组件
 * 时间: 2018/7/30 0030 下午 3:14
 * @param
 **/
import React, {Component} from 'react'
import {Table, Pagination, Spin, Modal, Tooltip,Button} from 'antd';
import ImportModal from './modal'
const confirm = Modal.confirm
import {datasaddkey, timestampFromat} from '../../../../util/baseTool'

const columns = [
    {
        title: 'listing信息',
        dataIndex: 'listinginformation',
        key: 'listinginformation',
        render: (text, record) => {
            const itemId = record.itemId;
            const sellerSku = record.sellerSku
            return (
                <div>
                    {itemId ?
                        <p className="list">
                            <span>Item ID&nbsp;:&nbsp;</span>      
                            <span style={{width: 160}}>{itemId}</span>
                        </p>
                        :
                        <p className="list">
                            <span>Item ID&nbsp;:&nbsp;</span>
                            <span>--</span>
                        </p>
                    }
                    {sellerSku ?
                        <p className="list">
                            <span style={{verticalAlign: 'top'}}>Seller SKU&nbsp;:&nbsp;</span>
                            <Tooltip placement={"top"} title={sellerSku}>
                                <span style={{maxHeight: 56, overflow: 'hidden', display: 'inline-block', wordBreak: 'break-all',width: 160}}>{sellerSku}</span>
                            </Tooltip>
                        </p>
                        :
                        <p className="list">
                            <span>Seller SKU&nbsp;:&nbsp;</span>
                            <span>--</span>
                        </p>
                    }
                </div>
            )
        }
    }, {
        title: '修改',
        dataIndex: 'modify',
        key: 'modify',
        render: (text, record) => {
            let editType = record.editType;
            const retailPrice = record.retailPrice;
            const stock = record.stock;
            if (editType === 0) {
                editType = "全部"
            } else if (editType === 1) {
                editType = "修改库存"
            } else {
                editType = "修改价格"
            }
            return (
                <div>
                    {editType ?
                        <p className="list">
                            <span>修改类型&nbsp;:&nbsp;</span>
                            <span>{editType}</span>
                        </p>
                        :
                        <p className="list">
                            <span className="text-left">修改类型&nbsp;:&nbsp;</span>
                            <span className="text-left">--</span>
                        </p>
                    }
                    {retailPrice ?
                        <p className="list">
                            <span>零售价&nbsp;:&nbsp;</span>
                            <span>{retailPrice}</span>
                        </p>
                        :
                        <p className="list">
                            <span> 零售价&nbsp;:&nbsp;</span>
                            <span>--</span>
                        </p>
                    }
                    {stock || stock === 0 ?
                        <p className="list">
                            <span>库存&nbsp;:&nbsp;</span>
                            <span>{stock}</span>
                        </p>
                        :
                        <p className="list">
                            <span>库存&nbsp;:&nbsp;</span>
                            <span> --</span>
                        </p>
                    }
                </div>
            )
        }
    }, {
        title: '销售账号',
        dataIndex: 'saleAccount',
        key: 'saleAccount',
        render: (text, record) => {
            const saleAccount = record.saleAccount;
            const site = record.site
            return (
                <div>
                    {saleAccount ?
                        <p className="list">
                            <span>销售账号&nbsp;:&nbsp;</span>
                            <span>{saleAccount}</span>
                        </p>
                        :
                        <p className="list">
                            <span>销售账号&nbsp;:&nbsp;</span>
                            <span>--</span>
                        </p>
                    }
                    {site ?
                        <p className="list">
                            <span>站点&nbsp;:&nbsp;</span>
                            <span>{site}</span>
                        </p>
                        :
                        <p className="list">
                            <span>站点&nbsp;:&nbsp;</span>
                            <span> --</span>
                        </p>
                    }
                </div>
            )
        }
    }, {
        title: '同步信息',
        dataIndex: 'synchronizationInformation',
        key: 'synchronizationInformation',
        render: (text, record) => {
            let syncState = record.syncState;
            if (syncState === 0) {
                syncState = "全部"
            } else if (syncState === 1) {
                syncState = "同步中"
            } else if (syncState === 2) {
                syncState = "同步成功"
            } else {
                syncState = "同步失败"
            }
            const syncs = record.syncs;
            const syncTime = timestampFromat(record.syncTime, 2);
            return (
                <div>
                    {
                        <p className="list">
                            <span>同步状态&nbsp;:&nbsp;</span>
                            <span>{syncState}</span>
                        </p>
                    }
                    {syncs ?
                        <p className="list">
                            <span> 同步人员&nbsp;:&nbsp;</span>
                            <span>{syncs}</span>
                        </p>
                        :
                        <p className="list">
                            <span> 同步人员&nbsp;:&nbsp;</span>
                            <span>--</span>
                        </p>
                    }
                    {syncTime ?
                        <p className="list">
                            <span>  同步时间&nbsp;:&nbsp;</span>
                            <span>{syncTime}</span>
                        </p>
                        :
                        <p className="list">
                            <span>  同步时间&nbsp;:&nbsp;</span>
                            <span> --</span>
                        </p>
                    }
                </div>
            )
        }
    }, {
        title: '同步结果信息',
        dataIndex: 'resultInformation',
        key: 'resultInformation',
        render: (text, record) => {
            const syncSuccessTime = timestampFromat(record.syncSuccessTime, 2);
            const syncErrorTime = timestampFromat(record.syncErrorTime, 2);
            const syncErrorReason = record.syncErrorReason;

            let successText = syncSuccessTime ?
                <p className="list-l overflow-hidden">
                    <span> 同步成功时间&nbsp;:&nbsp;</span>
                    <span>{syncSuccessTime}</span>
                </p>
                :
                <p className="list-l overflow-hidden">
                    <span> 同步成功时间&nbsp;:&nbsp;</span>
                    <span> --</span>
                </p>;

            let errorText = syncErrorTime ?
                <p className="list-l overflow-hidden">
                    <span> 同步失败时间&nbsp;:&nbsp;</span>
                    <span>{syncErrorTime}</span>
                </p>
                :
                <p className="list-l overflow-hidden">
                    <span> 同步失败时间&nbsp;:&nbsp;</span>
                    <span>--</span>
                </p>
            let errorReasonText = syncErrorReason ?
                <Tooltip placement={"top"} title={syncErrorReason}>
                    <p className="list-l overflow-hidden">
                        <span style={{verticalAlign: 'top'}}> 同步失败原因&nbsp;:&nbsp;</span>
                        <span style={{maxHeight: 56, overflow: 'hidden'}}>{syncErrorReason}</span>
                    </p>
                </Tooltip>
                :
                <p className="list-l overflow-hidden">
                    <span> 同步失败原因&nbsp;:&nbsp;</span>
                    <span>--</span>
                </p>
            let syncState = record.syncState;
            return (
                <div>
                    {syncState === 1 ?
                        <div>
                            <p className="list-l overflow-hidden">
                                <span> 同步成功时间&nbsp;:&nbsp;</span>
                                <span>--</span>
                            </p>
                            <p className="list-l overflow-hidden">
                                <span> 同步失败时间&nbsp;:&nbsp;</span>
                                <span>--</span>
                            </p>
                            <p className="list-l overflow-hidden">
                                <span> 同步失败原因&nbsp;:&nbsp;</span>
                                <span>--</span>
                            </p>
                        </div>
                        :
                        <div>
                            {syncState === 3 ? null : successText}
                            {syncState === 2 ? null : errorText}
                            {syncState === 2 ? null : errorReasonText}
                        </div>
                    }
                </div>
            )
        }
    }
];

class table extends Component {

    state = {
        dataList: [],
        loading: true,
        visible: false,
        itemsName: null,
        title: '',
        modelVisible:false
    }

    render() {
        const {paginationHandle} = this.props;
        const {pageNumber, pageSize} = this.props.paginationData;
        const {data, loading} = this.props.queueList;
        const dataList = data.lst || [];
        const total = data.total;
        const {modelVisible} = this.state
        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="text-right margin-ss-bottom">
                    <Button onClick={()=>this.setState({modelVisible:true})} icon="download">数据导入</Button>
                </div>
                <div>
                    <Spin spinning={loading} delay={500} tip="Loading...">
                        <Table
                            columns={columns}
                            dataSource={datasaddkey(dataList)}
                            onChange={this.props.sorter}
                            pagination={false}
                            bordered={true}
                            size="small"
                        />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{goButton: true}}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={paginationHandle}
                        total={total}
                        pageSize={pageSize}
                        onChange={paginationHandle}
                    />
                </div>
                <ImportModal
                onCancel={()=>this.setState({modelVisible:false})}
                visible={modelVisible}/>
            </div>
        )
    }
}

export default table
