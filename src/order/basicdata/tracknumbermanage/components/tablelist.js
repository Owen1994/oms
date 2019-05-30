import React from 'react';
import {
    Link
} from 'react-router-dom';

import {
    Button,
    Table,
    Spin,
    Pagination,
} from 'antd';
import {
    timestampFromat,
} from "@/util/baseTool";

import {
    downlodFile
} from "@/util/fetch";

import { levelOptions } from '@/util/options';
import PopConfirm from '@/common/components/confirm';
export default class Tablelist extends React.Component {
    columns = () => {
        return this.columns = [
            {
                title: '序号',
                width: 100,
                key: 'no',
                render: (text, record, index) => {
                    const { pageNumber, pageData } = this.props;
                    return pageData * (pageNumber - 1) + index + 1;
                }
            },
            {
                title: '使用平台',
                dataIndex: 'usePlatform',
                width: 100,
                key: 'usePlatform',
            },
            {
                title: '追踪码',
                dataIndex: 'trackingNumber',
                width: 100,
                key: 'trackingNumber',
            },
            {
                title: '运输方式',
                dataIndex: 'logisticsType',
                width: 100,
                key: 'logisticsType',
            },
            {
                title: '是否使用',
                dataIndex: 'isUsed',
                width: 100,
                key: 'isUsed',
                render: (text) => {
                    return text ? "是" : "否"
                }
            },
            {
                title: '目的国',
                dataIndex: 'targetCountry',
                width: 100,
                key: 'targetCountry',
            },
            {
                title: '创建时间',
                dataIndex: 'createDate',
                width: 100,
                key: 'createDate',
                render: (text) => {
                    return timestampFromat(text, 0)
                }
            },
            {
                title: '老ERP发货时间',
                dataIndex: 'erpSendGoodDate',
                width: 100,
                key: 'erpSendGoodDate',
                render: (text) => {
                    return timestampFromat(text, 0)
                }
            },
            {
                title: '上网时间',
                dataIndex: 'onlineDate',
                width: 100,
                key: 'onlineDate',
                render: (text) => {
                    return timestampFromat(text, 0)
                }
            },
            {
                title: '使用时间',
                dataIndex: 'useDate',
                width: 100,
                key: 'useDate',
                render: (text) => {
                    return timestampFromat(text, 0)
                }
            },
            {
                title: '来源方式',
                dataIndex: 'sourceType',
                width: 100,
                key: 'sourceType',
                render: (text) => {
                    return text ? "手动导入" : "自动导入";
                }
            },
            {
                title: '来源平台',
                dataIndex: 'sourcePlatform',
                width: 100,
                key: 'sourcePlatform',
            },
            {
                title: '来源老ERP订单号',
                dataIndex: 'sourceErpOrderId',
                width: 100,
                key: 'sourceErpOrderId',
            },
            {
                title: '现使用平台订单号',
                dataIndex: 'usedPlatformOrderId',
                width: 100,
                key: 'usedPlatformOrderId',
            },
        ];
    }
    // Paginatihandle = (page, pageSize) => {
    //     var { tableDataActionAsync, npdProjecListData } = this.props
    //     var params = npdProjecListData.params
    //     params.pageNumber = page
    //     params.pageData = pageSize
    //     tableDataActionAsync(params)
    // }

    /**
     * 导出
     */
    exportTracking = () => {
        const { exportTrackingAction, filterSearchParams } = this.props;
        const params = filterSearchParams();
        delete params.pageNumber;
        delete params.pageData;
        exportTrackingAction(params)
            .then(result => {
                if(result.state === '000001'){
                    window.location.href="/order/basicdata/importexportrecords/";
                }
            })
    }

    /**
     * 导出JOOM数据
     */
    exportJoomData = () => {
        const { filterSearchParams, exportJoomTrackingAction } = this.props;
        const params = filterSearchParams();
        delete params.pageNumber;
        delete params.pageData;
        exportJoomTrackingAction(params)
            .then(result => {
                if(result.state === '000001'){
                    window.location.href="/order/basicdata/importexportrecords/";
                }
            })
    }

    render() {
        var { npdProjecListData, loadingData, changeModal, changeOrdermodal } = this.props
        var { total, list, params } = npdProjecListData
        var { pageNumber, pageData } = params
        var columns = typeof this.columns == "function" ? this.columns() : this.columns;
        const usePlatform = this.props.form.getFieldValue('usePlatform');
        console.log('usePlatform: ', usePlatform)
        var table = (
            <Spin spinning={loadingData} delay={500} tip="Loading...">
                <div className="padding-notop-10">
                    <Table
                        bordered={true}
                        size="small"
                        rowClassName={(record, index) => {
                            return record.isUsed ? "grayb2" : "";
                        }}
                        dataSource={list}
                        pagination={false}
                        columns={columns} />
                    <Pagination
                        showTotal={total => `共 ${total} 条`}
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        current={pageNumber}
                        defaultCurrent={1}
                        onShowSizeChange={this.props.handleSubmit}
                        total={total}
                        pageSize={pageData}
                        onChange={this.props.handleSubmit} />
                </div>
            </Spin>
        )
        var buttons = (
            <div className="tracknumbermanage-tablewrap-btns">
                <Button onClick={() => changeOrdermodal({ visible: true })} className="pull-right">
                    <span>跟踪号抓取配置</span>
                </Button>
                <Button icon="download" onClick={() => changeModal("importmodalvisible", true)} className="pull-right margin-sm-right">
                    <span>数据导入</span>
                </Button>
                <Button icon="upload" onClick={this.exportTracking} className="pull-right margin-sm-right">
                    <span>数据导出</span>
                </Button>
                {
                    usePlatform === 'JO' ? (
                        <Button
                            icon="upload"
                            onClick={() => PopConfirm('Joom导出', 
                            '确定导出当前搜索条件下的Joom订单数据吗？', 
                            ()=>this.exportJoomData())}
                            className="pull-right margin-sm-right"
                        >
                            <span>Joom导出</span>
                        </Button>
                    ) : null
                }
            </div>
        )
        return (
            <div className="tracknumbermanage-tablewrap">
                {buttons}
                {table}
            </div>
        )
    }

}