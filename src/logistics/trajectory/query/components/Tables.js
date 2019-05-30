import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Button, Row, Col,
    Form,
} from 'antd';
import Functions from '../../../../components/functions';
import { randNum } from '../../../../util/baseTool';
import { fetchPost } from "../../../../util/fetch";
import { conversionData } from '../selectors/index';
import { Trajectory_List_Sub_Data_Api } from "../constants/Api";
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
};


export default class Tables extends React.Component {
    state = {
        subData: [],
    };

    columns =[
        {
            title: '序号',
            dataIndex: 'sno',
            render: (value, record, index) => (
                (this.props.pageNumber - 1) * this.props.pageData + (index + 1)
            ),
        },
        {
            title: '订单信息',
            dataIndex: 'orderInfo',
            render: (value, record) => {
                return (
                    <div key={randNum()}>
                        <div className="query-label-wrap">
                            <span className="orderInfo_left">内单号:</span>
                            <span className="query_right">{record.orderNumber}</span>
                        </div>
                        <div className="query-label-wrap">
                            <span className="orderInfo_left">目的国家:</span>
                            <span className="query_right">{record.destCountry}</span>
                        </div>
                        <div className="query-label-wrap">
                            <span className="orderInfo_left">发货时间:</span>
                            <span className="query_right">{record.shipmentsTime}</span>
                        </div>
                        <div className="query-label-wrap">
                            <span className="orderInfo_left">平台:</span>
                            <span className="query_right">{record.platform}</span>
                        </div>
                    </div>

                );
            },
        },
        {
            title: '渠道信息',
            dataIndex: 'channelInfos',
            render: (value, record) => {
                return (
                    <div>
                        <div className="query-label-wrap">
                            <span className="channelInfos_left">物流服务商:</span>
                            <span className="query_right">{record.logisticsService}</span>
                        </div>
                        <div className="query-label-wrap">
                            <span className="channelInfos_left">物流渠道:</span>
                            <span className="query_right">{record.logisticsChannel}</span>
                        </div>
                        <div className="query-label-wrap">
                            <span className="channelInfos_left">订单追踪码:</span>
                            <span className="query_right">{record.trackNum}</span>
                        </div>
                        <div className="query-label-wrap">
                            <span className="channelInfos_left">订单追踪码1:</span>
                            <span className="query_right">{record.trackNum1}</span>
                        </div>
                    </div>
                )
            },
        },
        {
            title: '状态',
            dataIndex: 'packageState',
            render: (value, record) => {
                const isShwoParcel = !!value;
                return (
                    <div key={randNum()}>
                        <div className="packageState_div">
                            <span className="info_two">轨迹状态:</span>
                            <a
                                className="info"
                                onClick={() => this.props.showModal(record)}
                            >
                                {record.trajectoryState}
                            </a>
                        </div>
                        {isShwoParcel ? (
                            <div className="packageState_div">
                                <span className="info_two">包裹状态:</span>
                                <p className="info">{value}</p>
                            </div>
                        ) : null}
                    </div>
                )
            },
        },
        {
            title: '轨迹状态时间',
            dataIndex: 'trajectoryStateTimes',
            render: (array) => {
                if (!array || array.length < 1) {
                    return;
                }
                return array.map(item => (
                    <div key={randNum()}>
                        <div className="query-label-wrap">
                            <span className="trajectoryStateTimes_left">{item.label}:</span>
                            <span className="query_right">{item.value}</span>
                        </div>
                    </div>
                ));
            },
        },
    ];

    expandedRowRender = (record, index, indent, expanded) => {
        let data = {};
        for (let i = 0; i < this.state.subData.length; i++) {
            if (this.state.subData[i].key === record.key) {
                data = this.state.subData[i];
                break;
            }
        }
        return expanded ? (
            <div>
                <Row>
                    <Col span={8}>
                        <div className="query-detail-info-one">
                            <p>
                                <span className="one-span">付款时间：</span>
                                <span>{data.payTime ? data.payTime : '加载中..'}</span>
                            </p>
                            <p>
                                <span className="one-span">进ERP时间：</span>
                                <span>{data.goERPTime ? data.goERPTime : '加载中..'}</span>
                            </p>
                            <p>
                                <span className="one-span">订单打印时间：</span>
                                <span>{data.ordrePrintTime ? data.ordrePrintTime : '加载中..'}</span>
                            </p>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="query-detail-info-two">
                            <p>
                                <span className="two-span">订单追踪码1获取时间：</span>
                                <span>{data.trackNum1Time ? data.trackNum1Time : '加载中..'}</span>
                            </p>
                            <p>
                                <span className="two-span">订单总金额：</span>
                                <span>{data.ordermMoney ? data.ordermMoney : '加载中..'}</span>
                            </p>
                            <p>
                                <span className="two-span">仓库：</span>
                                <span>{data.warehouse ? data.warehouse : '加载中..'}</span>
                            </p>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="query-detail-info-three">
                            <p>
                                <span className="three-span">销售账号：</span>
                                <span>{data.salesAccount ? data.salesAccount : '加载中..'}</span>
                            </p>
                            <p>
                                <span className="three-span">包裹类型：</span>
                                <span>{data.packageType ? data.packageType : '加载中..'}</span>
                            </p>
                            <p>
                                <span className="three-span">追踪类型：</span>
                                <span>{data.trackType ? data.trackType : '加载中..'}</span>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        ) : null;
    };

    onExpand = (expanded, record) => {
        if (!expanded) {
            for (let i = 0; i < this.state.subData.length; i++) {
                if (this.state.subData[i].key === record.key) {
                    this.state.subData.splice(i, 1);
                    break;
                }
            }
            return;
        }
        const data = {key: record.key};
        fetchPost(Trajectory_List_Sub_Data_Api, {data}, 2).then((result) => {
            if (result.state === '000001') {
                result.data.key = record.key;
                const data = conversionData(result.data);
                this.state.subData.push(data);
                this.setState({})
            }
        });
    };

    render() {
        const {
            loadingState,
            data,
            onSearch,
            pageNumber,
            pageData,
            onExportSku,
            exportLoading,
        } = this.props;
        return (
            <div className="yks-erp-table">
                <div className="top-container">
                     <Functions {...this.props} functionkey="002-000002-000001-002">
                        <Button loading={exportLoading} icon="download" className="top-right-wrap" onClick={onExportSku}>导出</Button>
                     </Functions>
                </div>
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        columns={this.columns}
                        dataSource={data.list}
                        pagination={false}
                        size="small"
                        bordered
                        expandedRowRender={(record, index, indent, expanded) => this.expandedRowRender(record, index, indent, expanded)}
                        onExpand={(expanded, record) => this.onExpand(expanded, record)}
                    />
                    <Pagination
                        showTotal={num => `共 ${num} 条`}
                        pageSizeOptions={['20', '30', '40', '50']}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={onSearch}
                        total={data.total}
                        pageSize={pageData}
                        onChange={onSearch}
                    />
                </Spin>
            </div>
        );
    }
}
