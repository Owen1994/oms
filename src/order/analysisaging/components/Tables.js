import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Progress,
    Button,
} from 'antd';
import { timestampFromat } from 'util/baseTool';
import Functions from '@/components/functions';
import PlatModal from './PlatModal';
import OmsModal from './OmsModal';
import PkgModal from './PkgModal';
import { fetchPost } from 'util/fetch';
import {
    PLAT_DETAIL,
    ORDER_DETAIL,
    PACKAGE_DETAIL,
} from '../constants';

export default class table extends React.Component {

    state = {
        sortedInfo: {},
        platVisible: false,
        platData: '',
        manageVisible: false,
        manageData: '',
        packageVisible: false,
        packageData: '',
    }

    column2 = [{
        title: '序号',
        key: 'rankingIdx',
        width: 40,
        // fixed: 'left',
        render: (text, record, index) => ++index,
    }, {
        title: '平台',
        dataIndex: 'platform',
        key: 'platform',
        width: 80,
        sorter: (a, b) => {},
    }, {
        title: '销售账号',
        dataIndex: 'sellerId',
        key: 'sellerId',
        width: 120,
        sorter: (a, b) => {},
    }, {
        title: '订单总量',
        dataIndex: 'num',
        key: 'num',
        width: 100,
        sorter: (a, b) => {},
    }, {
        title: 'OMS-平台订单停留时间(m)',
        dataIndex: 'platTime',
        key: 'platTime',
        width: 120,
        sorter: (a, b) => {},
        render: (text, record) => <a onClick={() => this.handleCellClick(record, 'platTime')}>{text}</a>
    }, {
        title: 'OMS-订单管理停留时间(m)',
        dataIndex: 'omsTime',
        key: 'omsTime',
        width: 120,
        sorter: (a, b) => {},
        render: (text, record) => <a onClick={() => this.handleCellClick(record, 'omsTime')}>{text}</a>
    }, {
        title: 'OMS-包裹订单停留时间(m)',
        dataIndex: 'pkgTime',
        key: 'pkgTime',
        width: 120,
        sorter: (a, b) => {},
        render: (text, record) => <a onClick={() => this.handleCellClick(record, 'pkgTime')}>{text}</a>
    }, {
        title: 'WMS-已插入停留时间(m)',
        dataIndex: 'wmsInsertTime',
        key: 'wmsInsertTime',
        width: 120,
        sorter: (a, b) => {},
    }, {
        title: 'WMS-已核对停留时间(m)',
        dataIndex: 'wmsCheckTime',
        key: 'wmsCheckTime',
        width: 120,
        sorter: (a, b) => {},
    }, {
        title: 'WMS-待发运停留时间(m)',
        dataIndex: 'wmsDeliveryTime',
        key: 'wmsDeliveryTime',
        width: 120,
        sorter: (a, b) => {},
    }, {
        title: '累计执行时长(h)',
        dataIndex: 'totalTime',
        key: 'totalTime',
        width: 120,
        sorter: (a, b) => {},
    }, {
        title: '占比',
        dataIndex: 'percent',
        key: 'percent',
        width: 120,
        sorter: (a, b) => {},
        render: text => <Progress percent={parseFloat(text) ? parseFloat(text).toFixed(1) : 0} />,
    }];

    handleChange = (pagination, filter, sorter) => {
        this.setState({ sortedInfo: sorter }, () => {
            const { searchParams } = this.props;
            const { dimensionality } = searchParams;
            if (dimensionality === 'account') {
                if (sorter.order === 'ascend') {
                    searchParams.ascending = true;
                } else if (sorter.order === 'descend') {
                    searchParams.ascending = false;
                } else {
                    delete searchParams.ascending;
                }
                searchParams.sortField = sorter.columnKey;
                this.props.getTableList({ type: searchParams.dimensionality, params: searchParams, });
            }
        });
    }

    handleCellClick = (record, type) => {
        const { searchParams } = this.props;
        const { dimensionality } = searchParams;
        let params = {}, url = '', data = '', visible = '';

        if(type === 'platTime') {   // 平台订单停留时间
            url = PLAT_DETAIL;
            data = 'platData';
            visible = 'platVisible';
        } else if(type === 'omsTime') { // 订单管理停留时间
            url = ORDER_DETAIL;
            data = 'manageData';
            visible = 'manageVisible';
        } else {
            url = PACKAGE_DETAIL;
            data = 'packageData';
            visible = 'packageVisible';
        }

        if(dimensionality === 'plat') {
            params = {
                'grabTime': searchParams.grabTime,
                'platform': record.platformCode,
            };
        } else if(dimensionality === 'account') {
            params = {
                'grabTime': searchParams.grabTime,
                'platform': record.platformCode,
                'sellerId': record.sellerId,
            };
        } else {
            params = {
                'grabTime': searchParams.grabTime,
                'platform': record.platformCode,
                'orderId': record.platOrderId,
                'sellerId': record.sellerId,
            };
        }

        fetchPost(url, params, 2)
            .then(res => {
                if(res.state === '000001') {
                    this.setState({ [data]: res.data });
                }
            })
        this.setState({
            [visible]: true
        });
    }
    
    // 进度条百分比
    getPercent = (text, data) => {
        if(data && data[text]) {
            const newText = parseFloat(data[text]) ? parseFloat(data[text]) : 0;
            const total = this.getTotal(data);
            const res = newText / total * 100;
            return res;
        }
        return 0;
    }

    // 取一位小数
    getFixed = (text, data) => {
        if(data && data[text]){
            return parseFloat(data[text]) ? parseFloat(data[text]).toFixed(1) : 0;
        }
        return 0;
    }

    // 计算总和
    getTotal = (data) => {
        if(data) {
            let sum = 0;
            for(let i in data) {
                const a = data[i] ? parseFloat(data[i]) : 0;
                sum += a;
            }
            return sum;
        }
        return 100;
    }

    render() {
        const {
            dataList,
            loadingState,
            pageNumber,
            pageData,
            total,
            handleSearch,
        } = this.props;
        const {
            sortedInfo,
            platVisible, platData,
            manageVisible, manageData,
            packageVisible, packageData,
        } = this.state;
        const { dimensionality } = this.props.searchParams || 'plat';
        const sellerAccountCol = {
            title: '销售账号',
            dataIndex: 'sellerId',
            key: 'sellerId',
            width: 120,
            sorter: (a, b) => a.sellerId.charCodeAt(0) - b.sellerId.charCodeAt(0),
            sortOrder: sortedInfo.columnKey === 'sellerId' && sortedInfo.order,
        };
        const orderIdCol = {
            title: '平台单号',
            dataIndex: 'platOrderId',
            key: 'platOrderId',
            width: 200,
            sorter: (a, b) => a.platOrderId.charCodeAt(0) - b.platOrderId.charCodeAt(0),
            sortOrder: sortedInfo.columnKey === 'platOrderId' && sortedInfo.order,
        };
        const grabTimeCol = {
            title: '抓单时间',
            dataIndex: 'grabTime',
            key: 'grabTime',
            width: 100,
            sorter: (a, b) => a.grabTime - b.grabTime,
            sortOrder: sortedInfo.columnKey === 'grabTime' && sortedInfo.order,
            render: text => timestampFromat(text, 2),
        };
        const deliveryTimeCol = {
            title: '发货时间',
            dataIndex: 'deliveryTime',
            key: 'deliveryTime',
            width: 100,
            sorter: (a, b) => a.deliveryTime - b.deliveryTime,
            sortOrder: sortedInfo.columnKey === 'deliveryTime' && sortedInfo.order,
            render: text => timestampFromat(text, 2),
        };

        // 按平台
        const column = [{
            title: '序号',
            key: 'rankingIdx',
            width: 40,
            // fixed: 'left',
            render: (text, record, index) => ++index,
        }, {
            title: '平台',
            dataIndex: 'platform',
            key: 'platform',
            width: 80,
            sorter: (a, b) => a.platform.charCodeAt(0) - b.platform.charCodeAt(0),
            sortOrder: sortedInfo.columnKey === 'platform' && sortedInfo.order,
        }, {
            title: '订单总量',
            dataIndex: 'num',
            key: 'num',
            width: 120,
            sorter: (a, b) => a.num - b.num,
            sortOrder: sortedInfo.columnKey === 'num' && sortedInfo.order,
        }, {
            title: 'OMS-平台订单停留时间(m)',
            dataIndex: 'platTime',
            key: 'platTime',
            width: 120,
            sorter: (a, b) => a.platTime - b.platTime,
            sortOrder: sortedInfo.columnKey === 'platTime' && sortedInfo.order,
            render: (text, record) => <a onClick={() => this.handleCellClick(record, 'platTime')}>{text}</a>
        }, {
            title: 'OMS-订单管理停留时间(m)',
            dataIndex: 'omsTime',
            key: 'omsTime',
            width: 120,
            sorter: (a, b) => a.omsTime - b.omsTime,
            sortOrder: sortedInfo.columnKey === 'omsTime' && sortedInfo.order,
            render: (text, record) => <a onClick={() => this.handleCellClick(record, 'omsTime')}>{text}</a>
        }, {
            title: 'OMS-包裹订单停留时间(m)',
            dataIndex: 'pkgTime',
            key: 'pkgTime',
            width: 120,
            sorter: (a, b) => a.pkgTime - b.pkgTime,
            sortOrder: sortedInfo.columnKey === 'pkgTime' && sortedInfo.order,
            render: (text, record) => <a onClick={() => this.handleCellClick(record, 'pkgTime')}>{text}</a>
        }, {
            title: 'WMS-已插入停留时间(m)',
            dataIndex: 'wmsInsertTime',
            key: 'wmsInsertTime',
            width: 120,
            sorter: (a, b) => a.wmsInsertTime - b.wmsInsertTime,
            sortOrder: sortedInfo.columnKey === 'wmsInsertTime' && sortedInfo.order,
        }, {
            title: 'WMS-已核对停留时间(m)',
            dataIndex: 'wmsCheckTime',
            key: 'wmsCheckTime',
            width: 120,
            sorter: (a, b) => a.wmsCheckTime - b.wmsCheckTime,
            sortOrder: sortedInfo.columnKey === 'wmsCheckTime' && sortedInfo.order,
        }, {
            title: 'WMS-待发运停留时间(m)',
            dataIndex: 'wmsDeliveryTime',
            key: 'wmsDeliveryTime',
            width: 120,
            sorter: (a, b) => a.wmsDeliveryTime - b.wmsDeliveryTime,
            sortOrder: sortedInfo.columnKey === 'wmsDeliveryTime' && sortedInfo.order,
        }, {
            title: '累计执行时长(h)',
            dataIndex: 'totalTime',
            key: 'totalTime',
            width: 120,
            sorter: (a, b) => a.totalTime - b.totalTime,
            sortOrder: sortedInfo.columnKey === 'totalTime' && sortedInfo.order,
        }, {
            title: '占比',
            dataIndex: 'percent',
            key: 'percent',
            width: 120,
            sorter: (a, b) => a.percent - b.percent,
            sortOrder: sortedInfo.columnKey === 'percent' && sortedInfo.order,
            render: text => <Progress percent={parseFloat(text) ? parseFloat(text).toFixed(1) : 0} />,
        }];

        // 按订单
        if(dimensionality === 'order') {
            column.splice(2, 0, sellerAccountCol, orderIdCol, grabTimeCol);
            column.splice(-2, 0, deliveryTimeCol);
        }
        return (
            <div className="breadcrumb margin-ms-top padding-sm margin-ss-bottom overflow-hidden">
                {/* <Functions
                    {...this.props}
                    functionkey="001-000006-000003-002"
                > */}
                <div className="text-right">
                    <Button
                        type="default"
                        onClick={this.props.onDownloadData}
                    >
                        数据下载
                    </Button>
                </div>
                {/* </Functions> */}
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        {
                            dimensionality === 'account' ? 
                                <div>
                                    <Table
                                        columns={this.column2}
                                        dataSource={dataList}
                                        pagination={false}
                                        size="small"
                                        bordered
                                        onChange={this.handleChange}
                                        scroll={{ x: 1300 }}
                                    />
                                    <Pagination className="pull-right"
                                        showTotal={total => `共 ${total} 条`}
                                        showSizeChanger                             // 是否可以改变 pageSize
                                        pageSizeOptions={['10', '30', '50', '100']}
                                        current={pageNumber}
                                        showQuickJumper={{ goButton: true }}        // 是否可以快速跳转至某页
                                        total={total}                               // 数据总数
                                        pageSize={pageData}                         // 每页条数
                                        onChange={handleSearch}                     // 页码改变的回调，参数是改变后的页码及每页条数
                                        onShowSizeChange={handleSearch}             // pageSize 变化的回调
                                    />
                                </div>
                            :
                                <Table
                                    columns={column}
                                    dataSource={dataList}
                                    pagination={false}
                                    size="small"
                                    bordered
                                    onChange={this.handleChange}
                                    scroll={{ x: dimensionality === 'order' ? 1600 : 1200 }}
                                />
                        }
                        
                    </Spin>
                </div>
                <PlatModal
                    platVisible={platVisible}
                    platData={platData}
                    handleCancel={() => {
                        this.setState({
                            platVisible: false,
                        })
                    }}
                    getPercent={this.getPercent}
                    getFixed={this.getFixed}
                />
                <OmsModal
                    manageVisible={manageVisible}
                    manageData={manageData}
                    handleCancel={() => {
                        this.setState({
                            manageVisible: false,
                        })
                    }}
                    getPercent={this.getPercent}
                    getFixed={this.getFixed}
                />
                <PkgModal
                    packageVisible={packageVisible}
                    packageData={packageData}
                    handleCancel={() => {
                        this.setState({
                            packageVisible: false,
                        })
                    }}
                    getPercent={this.getPercent}
                    getFixed={this.getFixed}
                />
            </div>
        );
    }
}
