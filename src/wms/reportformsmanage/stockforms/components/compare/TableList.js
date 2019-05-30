import React from 'react';
import {
    Spin,
    Table,
    Pagination,
    Button, Drawer,
} from 'antd';
import moment from 'moment';

import PopConfirm from '../../../../../common/components/confirm';
import {
    fetchPost,
    downlodFile,
} from '../../../../../util/fetch';
import {
    EXPORT_COMPARE_LIST,
} from '../../constants/Api';
import Functions from '../../../../../components/functions';
import { GET_COMPARE_LIST } from '../../constants';
import CompareDrawer from '../../containers/CompareDrawer';

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
            title: '对图日期',
            dataIndex: 'compareImageTime',
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
            title: '已对图卡板数',
            dataIndex: 'compareImageCard',
            width: 100,
        },
        {
            title: '未对图量',
            children: [
                {
                    title: 'SKU数',
                    width: 100,
                    key: 'unAmountInfoSku',
                    render: (text, record) => <div>{record.unAmountInfo && record.unAmountInfo.sku}</div>,
                },
                {
                    title: 'PCS数',
                    width: 100,
                    key: 'unAmountInfoPcs',
                    render: (text, record) => <div>{record.unAmountInfo && record.unAmountInfo.pcs}</div>,
                },
            ],
        },
        {
            title: '已对图量',
            dataIndex: 'amountInfo',
            children: [
                {
                    title: 'SKU数',
                    width: 100,
                    key: 'amountInfoSku',
                    render: (text, record) => <div>{record.amountInfo && record.amountInfo.sku}</div>,
                },
                {
                    title: 'PCS数',
                    width: 100,
                    key: 'amountInfoPcs',
                    render: (text, record) => <div>{record.amountInfo && record.amountInfo.pcs}</div>,
                },
            ],
        },
        {
            title: '对图不良品',
            children: [
                {
                    title: 'SKU数',
                    dataIndex: 'sku',
                    key: 'compareImageBadSku',
                    render: (text, record) => <div>{record.compareImageBad && record.compareImageBad.sku}</div>,
                },
                {
                    title: 'PCS数',
                    dataIndex: 'pcs',
                    key: 'compareImageBadPcs',
                    render: (text, record) => <div>{record.compareImageBad && record.compareImageBad.pcs}</div>,
                },
            ],
        },
        {
            title: '待质检卡板数',
            dataIndex: 'qualitytestingCard',
            width: 100,
        },
        {
            title: '待质检SKU款数',
            dataIndex: 'qualitytestingSku',
            width: 100,
        },
    ];


    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList(GET_COMPARE_LIST);
    }

    // 导出Excel
    exportData = () => {
        const values = this.props.form.getFieldsValue();
        const { rangeTime } = values;
        fetchPost(EXPORT_COMPARE_LIST, {
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
                    <Functions {...this.props} functionkey="012-000010-000001-006">
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
                        showTotal={t => `共 ${t} 条`}
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
                    title="对图明细报表"
                    placement="right"
                    onClose={() => {
                        this.setState({
                            visible: false,
                        });
                    }}
                    width="auto"
                    visible={this.state.visible}
                >
                    <CompareDrawer
                        rangeTime={this.state.detailRangeTime}
                        menuInfos={this.props.menuInfos}
                    />
                </Drawer>
            </div>
        );
    }
}
