import React from 'react';
import {
    Spin,
    Table,
    Pagination,
    // Tooltip,
    Button, Drawer,
} from 'antd';
import moment from 'moment';

import PopConfirm from '../../../../../common/components/confirm';
import {
    fetchPost,
    downlodFile,
} from '../../../../../util/fetch';
import {
    EXPORT_QUALITYTEST_LIST,
} from '../../constants/Api';
import Functions from '../../../../../components/functions';
import { GET_QUALITYTEST_LIST } from '../../constants';
import QualityTestDrawer from '../../containers/QualityTestDrawer';

const renderContent = (text, isTotal = false, span = 1) => {
    const obj = {
        children: text,
        props: {},
    };
    obj.props.colSpan = isTotal ? 0 : span;
    return obj;
};
export default class TableList extends React.Component {
    state = {
        visible: false,
        detailRangeTime: [],
    };

    columns = [
        {
            title: '序号',
            key: 'index',
            width: 60,
            render: (text, record, index) => renderContent(
                record.isTotalItem
                    ? <div>合计</div> : (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
                false,
                record.isTotalItem ? 3 : 1,
            ),
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouse',
            width: 100,
            render: (text, record) => renderContent(text, record.isTotalItem),
        },
        {
            title: '质检日期',
            dataIndex: 'qualitytestingDate',
            width: 100,
            render: (text, record) => renderContent(
                <a
                    onClick={() => {
                        this.setState({
                            visible: true,
                            detailRangeTime: [moment(text, 'YYYY-MM-DD').startOf('day'), moment(text, 'YYYY-MM-DD').endOf('day')],
                        });
                    }}
                >
                    {text}
                </a>,
                record.isTotalItem,
            ),
        },
        {
            title: '已质检卡板数',
            dataIndex: 'qualityCheckCards',
            width: 100,
        },
        {
            title: '已质检量',
            children: [
                {
                    title: 'SKU数',
                    width: 60,
                    key: 'amountInfoSku',
                    render: (text, record) => <div>{record.amountInfo && record.amountInfo.sku}</div>,
                },
                {
                    title: 'PCS数',
                    width: 60,
                    key: 'amountInfoPcs',
                    render: (text, record) => <div>{record.amountInfo && record.amountInfo.pcs}</div>,
                },
            ],
        },
        {
            title: '未质检量',
            children: [
                {
                    title: 'SKU数',
                    width: 60,
                    key: 'unAmountInfoSku',
                    render: (text, record) => <div>{record.unAmountInfo && record.unAmountInfo.sku}</div>,
                },
                {
                    title: 'PCS数',
                    width: 60,
                    key: 'unAmountInfoPcs',
                    render: (text, record) => <div>{record.unAmountInfo && record.unAmountInfo.pcs}</div>,
                },
            ],
        },
        {
            title: '质检不良品(合法)',
            children: [
                {
                    title: 'SKU数',
                    width: 60,
                    key: 'badGoodsSku',
                    render: (text, record) => <div>{record.badGoods && record.badGoods.sku}</div>,
                },
                {
                    title: 'PCS数',
                    width: 60,
                    key: 'badGoodsPcs',
                    render: (text, record) => <div>{record.badGoods && record.badGoods.pcs}</div>,
                },
            ],
        },
        {
            title: '裸装',
            children: [
                {
                    title: 'SKU数',
                    width: 60,
                    key: 'bareInfoSku',
                    render: (text, record) => <div>{record.bareInfo && record.bareInfo.sku}</div>,
                },
                {
                    title: 'PCS数',
                    width: 60,
                    key: 'bareInfoPcs',
                    render: (text, record) => <div>{record.bareInfo && record.bareInfo.pcs}</div>,
                },
            ],
        },
        {
            title: '待上架SKU款数',
            dataIndex: 'shelvesSku',
            width: 100,
        },
    ];


    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList(GET_QUALITYTEST_LIST);
    }

    // 导出Excel
    exportData = () => {
        const values = this.props.form.getFieldsValue();
        const { rangeTime } = values;
        fetchPost(EXPORT_QUALITYTEST_LIST, {
            data: {
                ...values,
                rangeTime: rangeTime && rangeTime.map(t => t.valueOf()),
            },
        }, 1).then((result) => {
            if (result.state === '000001') {
                downlodFile(result.data.fileUrl);
            }
        });
    };

    render() {
        const {
            partList = { list: [], total: 0 },
            pageNumber,
            pageData,
            loadingState,
        } = this.props;
        return (
            <div className="wms-tablelist breadcrumb">
                <div className="wms-addBtn">
                    <Functions {...this.props} functionkey="012-000010-000001-010">
                        <Button
                            icon="upload"
                            onClick={() => PopConfirm('导出Excel', '确定导出当前搜索条件所有数据吗？', () => this.exportData())}
                        >
                            导出Excel
                        </Button>
                    </Functions>
                </div>
                <div className="wms-table">
                    <Spin spinning={loadingState}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={partList.list}
                            pagination={false}
                            rowKey={record => record.dataIndex}
                            rowClassName={record => (record.isTotalItem ? 'total-row' : '')}
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
                        total={partList.total} // 数据总数
                        pageSize={pageData} // 每页条数
                        onChange={this.props.onChangeListener}
                        // size="small"
                        pageSizeOptions={['100']}
                    />
                </div>
                <Drawer
                    title="质检明细报表"
                    placement="right"
                    onClose={() => {
                        this.setState({
                            visible: false,
                        });
                    }}
                    width="auto"
                    visible={this.state.visible}
                >
                    <QualityTestDrawer
                        rangeTime={this.state.detailRangeTime}
                        menuInfos={this.props.menuInfos}
                    />
                </Drawer>
            </div>
        );
    }
}
