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
    EXPORT_RECEIVIE_GOODS_LIST,
} from '../../constants/Api';
import Functions from '../../../../../components/functions';
import { GET_RECEIVIE_GOODS_LIST } from '../../constants';
import ReceivieGoodsDrawer from '../../containers/ReceivieGoodsDrawer';

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
            title: '收货日期',
            dataIndex: 'rejectedDate',
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
            title: '已收卡板数',
            dataIndex: 'card',
            width: 100,
        },
        {
            title: '已收SKU款数',
            dataIndex: 'receivingSkuStyles',
            width: 100,
        },
        {
            title: '已收SKU数量',
            dataIndex: 'receivingSku',
            width: 100,
        },
        {
            title: '待对图卡板数',
            dataIndex: 'waitingCompareImageCard',
            width: 100,
        },
        {
            title: '待对图SKU款数',
            dataIndex: 'waitingCompareImageSkuStyles',
            width: 100,
        },
        {
            title: '在途款数',
            dataIndex: 'tripsStyles',
            width: 100,
        },
        {
            title: '在途数量',
            dataIndex: 'inTransit',
            width: 100,
        },
    ];

    componentWillUnmount() {
        // 离开页面时清除列表数据
        this.props.clearRejectsList(GET_RECEIVIE_GOODS_LIST);
    }

    // 导出Excel
    exportData = () => {
        const values = this.props.form.getFieldsValue();
        const { rangeTime } = values;
        fetchPost(EXPORT_RECEIVIE_GOODS_LIST, {
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
                    <Functions {...this.props} functionkey="012-000010-000001-002">
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
                    title="收货明细报表"
                    placement="right"
                    onClose={() => {
                        this.setState({
                            visible: false,
                        });
                    }}
                    width="auto"
                    visible={this.state.visible}
                >
                    <ReceivieGoodsDrawer
                        menuInfos={this.props.menuInfos}
                        rangeTime={this.state.detailRangeTime}
                    />
                </Drawer>
            </div>
        );
    }
}
