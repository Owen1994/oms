import React from 'react';
import {
    Table, Pagination, Spin, message, Form, Input,
} from 'antd';
import Tableoption from '../../../../components/Tableoption';
import Tableitem from '../../../../components/Tableitem';
import BtnOperation from '../../../../components/BtnOperation';
// import { filterRequest } from '../../../../utils';
import { page } from '../../../../constants';
import { MARK_AS_PLATFORM_REFUND } from '../constants';
import { fetchPost } from '../../../../util/fetch';
import { showConfirm } from '../../../../compliance/utils';
import { checkAddRefund } from '../../../common/request';

const FormItem = Form.Item;

class DisputeTablelist extends React.Component {
    state = {
        isExpanded: true,
        selectedRowKeys: [], // 用于重新请求列表后对之前批量操作项进行清空
        issueList: [],
        expandedRowKeys: [],
    }

    columns = [
        {
            title: '平台订单编号',
            dataIndex: 'orderNumber',
            align: 'center',
            render: (text, record) => <span className="complaintlist-theme" onClick={() => this.props.handleOperate('orderVisible', record)}>{text}</span>,
        },
        {
            title: '平台订单状态',
            align: 'center',
            dataIndex: 'orderStatus',
        },
        {
            title: '纠纷状态',
            align: 'center',
            dataIndex: 'disputeStatus',
        },
        {
            title: '买家账号',
            dataIndex: 'buyerAccount',
            align: 'center',
        },
        {
            title: '卖家账号',
            align: 'center',
            dataIndex: 'sellerAccount',
        },
        {
            title: '倒计时',
            align: 'center',
            dataIndex: 'operateCountDown',
            sorter: true,
            render: (text, record) => {
                if (record.status !== 1) return null;
                return (<span className="complaintlist-red">{text}</span>);
            },
        },
    ]

    btnOptions = {
        left: [
            {
                // name: '',
                type: 'dropdown',
                funcId: [],
                onChange: () => this.mutipleMarkAsPlatformRefund(),
                subs: [
                    {
                        name: '标记为平台退款',
                        funcId: '009-000003-000001-008',
                    },
                ],
            },
        ],
        right: [
            {
                name: '同步纠纷',
                onChange: () => this.props.handleOperate('syncDisputeVisible'),
                type: 'button',
                icon: 'sync',
                funcId: '009-000003-000001-002',
                subs: [],
            },
            {
                name: '同步卖家地址',
                onChange: () => this.props.handleOperate('syncAddVisible'),
                type: 'button',
                icon: 'sync',
                funcId: '009-000003-000001-003',
                subs: [],
            },
        ],
    }

    componentWillReceiveProps(nextProps) {
        const { isExpanded } = this.state;
        const list = nextProps.disputelist.list;
        const oldList = this.props.disputelist.list;
        if (list && list !== oldList) {
            this.setState({
                expandedRowKeys: isExpanded ? list.map(v => v.disputeId) : [],
            });
        }
    }

    expandedRowRender = (records) => {
        const data = [records];
        const columns = [
            {
                title: '订单信息',
                dataIndex: 'orderInfo',
                key: 'orderInfo',
                align: 'left',
                // width: 315,
                render: (text, record) => (
                    <div className="order-info">
                        <Tableitem
                            title="订单创建时间"
                            content={
                                <span>{record.orderDate}</span>
                            }
                            left={100}
                            right={190}
                        />
                        <Tableitem
                            title="订单结束时间"
                            content={
                                <span>{record.orderEndTime}</span>
                            }
                            left={100}
                            right={190}
                        />
                        <Tableitem
                            title="订单金额"
                            content={
                                <span>{record.orderMoney === '无'
                                    ? '无'
                                    : `${record.totalAmountCurrency}${record.totalAmount}(实付:${record.payAmountCurrency}${record.payAmount})`}</span>
                            }
                            left={100}
                            right={190}
                        />
                        <Tableitem
                            title="平台发货时间"
                            content={
                                <span>{record.deliveryTime}</span>
                            }
                            left={100}
                            right={190}
                        />
                        <Tableitem
                            title="冻结状态"
                            content={
                                <span>{record.freezingStatus}</span>
                            }
                            left={100}
                            right={190}
                        />
                        {/* <Tableitem
                            title="发货时间"
                            content={
                                <span>{record.deliveryTime}</span>
                            }
                            left={100}
                            right={190}
                        /> */}
                        <Tableitem
                            title="收件人地址"
                            content={
                                <span>{record.addresseeAddr}</span>
                            }
                            left={100}
                            right={190}
                        />
                        <Tableitem
                            title="订单留言"
                            content={
                                <span>{record.orderMessage}</span>
                            }
                            left={100}
                            right={190}
                        />
                        {
                            record.orderStatus === '等待买家收货'
                                ? (
                                    <Tableitem
                                        title="剩余收货时间"
                                        content={
                                            <span className="complaintlist-red">{record.delayCountDown}</span>
                                        }
                                        left={100}
                                        right={190}
                                    />
                                ) : null
                        }
                    </div>
                ),
            },
            {
                title: '物流信息',
                dataIndex: 'logisticsInfo',
                key: 'logisticsInfo',
                align: 'left',
                // width: 315,
                render: (text, record) => {
                    const packageList = record.packageList;
                    return (
                        <div className="logistics-info">
                            <Tableitem
                                title="老ERP物流信息"
                                content={
                                    (packageList && Object.keys(packageList).length)
                                        ? (packageList.map((item,index) => {
                                            // to do:oms接口暂无每个包裹的物流渠道信息，以后有此字段时进行替换
                                            // return `包裹${index+1}：${item.logisticsChannel}，${item.trackCode1 ? item.trackCode1 : ''}${item.trackCode2 ? '、' + item.trackCode2 : ''}，${item.actualTime}； `;
                                            return `包裹${index+1}：${item.trackCode1}${(item.trackCode1 && item.trackCode2) ? '、' : ''}
                                                ${item.trackCode2}${(!item.trackCode1 && !item.trackCode2) ? '' : ','}${item.actualTime}${item.erpShippingStatus ? ',' : ''}${item.erpShippingStatus}； `;
                                        })).join('')
                                        : '无'
                                    }
                                left={100}
                                right={190}
                            />
                            <Tableitem
                                title="平台物流单号"
                                content={
                                    <span>{record.logisticsNumber}</span>
                                }
                                left={100}
                                right={190}
                            />
                            <Tableitem
                                title="平台物流渠道"
                                content={
                                    <span><a href="https://www.17track.net/zh-cn" target="_blank" rel="noopener noreferrer">{record.logisticsChannel}</a></span>
                                }
                                left={100}
                                right={190}
                            />
                            <Tableitem
                                title="平台物流状态"
                                content={
                                    <span>{record.logisticsStatus}</span>
                                }
                                left={100}
                                right={190}
                            />
                        </div>
                    )
                },
            },
            {
                title: '纠纷信息',
                dataIndex: 'disputeInfo',
                key: 'disputeInfo',
                align: 'left',
                // width: 315,
                render: (text, record) => (
                    <div className="dispute-info">
                        <Tableitem
                            title="是否售后宝订单"
                            content={
                                <span>{record.isAfterSaleTresure}</span>
                            }
                            left={100}
                            right={190}
                        />
                        <Tableitem
                            title="纠纷开始时间"
                            content={
                                <span>{record.disputeCreateTime}</span>
                            }
                            left={100}
                            right={190}
                        />
                        <Tableitem
                            title="纠纷原因"
                            content={
                                <span>{record.reason}</span>
                            }
                            left={100}
                            right={190}
                        />
                        <Tableitem
                            title="产品名称"
                            content={
                                <span>{record.productName}</span>
                            }
                            left={100}
                            right={190}
                        />
                        <Tableitem
                            title="纠纷产品价格"
                            content={
                                <span className="complaintlist-red">{record.productPrice}</span>
                            }
                            left={100}
                            right={190}
                        />
                        <Tableitem
                            title="平台退款上限"
                            content={
                                <span className="complaintlist-red">{record.refundLimit}</span>
                            }
                            left={100}
                            right={190}
                        />
                    </div>
                ),
            },
            {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                align: 'center',
                width: 100,
                render: (text, record) => {
                    const options = [
                        {
                            name: '联系',
                            onChange: () => { this.props.handleOperate('replyVisible', record); },
                            funcId: '009-000003-000001-004',
                            subs: [],
                        },
                        {
                            name: '纠纷详情',
                            onChange: () => { this.props.handleOperate('disputeDetailVisible', record); },
                            funcId: '009-000003-000001-006',
                            subs: [],
                        },
                        {
                            name: '标记为平台退款',
                            onChange: () => { this.markAsPlatformRefund(record); },
                            funcId: '009-000003-000001-008',
                            subs: [],
                        },
                    ];
                    // v 1.2.3.2 如果纠纷状态为已取消或已完结，纠纷处理按钮不做显示
                    // 状态为 已发货或已撤单并且退款金额大于0
                    if (![4, 5, 6, 7].includes(record.status)) {
                        options.splice(1, 0, {
                            name: '纠纷处理',
                            onChange: () => { this.props.handleOperate('disputeVisible', record); },
                            funcId: '009-000003-000001-005',
                            subs: [],
                        });
                    }
                    if ((record.omsOrderStatusDict === '5' || record.omsOrderStatusDict === '6') && record.refundAmount > 0) {
                        options.push({
                            name: '登记退款单',
                            onChange: () => { this.handleCheckRefund(record); },
                            funcId: '009-000003-000001-009',
                            subs: [],
                        });
                    }
                    return (
                        <Tableoption {...this.props} options={options} />
                    );
                },
            },
        ];
        return (
            <Table
                bordered={false}
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey={record => (record.disputeId)}
            />
        );
    };

    // table 展开 收起的函数
    onExpand = (expanded, record) => {
        const { expandedRowKeys } = this.state;
        const disputeId = record.disputeId;
        if (expanded) {
            expandedRowKeys.push(disputeId);
        } else {
            const index = expandedRowKeys.indexOf(disputeId);
            if (index !== -1) {
                expandedRowKeys.splice(index, 1);
            }
        }
        this.setState({
            expandedRowKeys,
        });
    }

    // 检测是否退款单可被添加
    handleCheckRefund = (record) => {
        message.warning('正在进行检测，请稍等');
        const { platformId } = this.props;
        checkAddRefund({
            platformId,
            orderNumber: record.orderNumber,
        }, () => {
            this.props.handleOperate('refundVisible', record);
        });
    }

    // 批量标记为平台退款
    mutipleMarkAsPlatformRefund = () => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length === 0) {
            message.warning('请选择需要批量同意的订单');
            return;
        }
        this.markAsPlatformRefund();
    }

    // 标记为平台退款
    markAsPlatformRefund = (record) => {
        let issueList;
        const { platformId, getDisputelist } = this.props;
        if (!record) {
            issueList = this.state.issueList;
        } else {
            issueList = [record.disputeId];
        }
        showConfirm(
            '提示！',
            '确认要标记为平台退款？',
            () => fetchPost(MARK_AS_PLATFORM_REFUND, { issueList, platformId }, 1)
                .then((data) => {
                    if (data && data.state === '000001') {
                        getDisputelist();
                        this.setState({
                            selectedRowKeys: [],
                        });
                    }
                }),
        );
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        const issueList = selectedRows.map(item => item.disputeId);
        this.setState({
            selectedRowKeys,
            issueList,
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            buyerLastOrder: sorter.order === 'descend' ? '2' : '1',
        }, () => {
            this.props.getDisputelist();
        });
    }

    // 切换是否全部展开  或 关闭
    toggleAllExpanded = () => {
        const list = this.props.disputelist.list;
        const { isExpanded } = this.state;
        this.setState({
            expandedRowKeys: isExpanded ? [] : list.map(v => v.disputeId),
            isExpanded: !isExpanded,
        });
    }

    render() {
        const {
            selectedRowKeys, expandedRowKeys, isExpanded, buyerLastOrder,
        } = this.state;
        const { disputePageNumber, disputePageData, getDisputelist } = this.props;
        const { getFieldDecorator } = this.props.form;
        const loading = this.props.disputeLoading;
        const data = this.props.disputelist.list;
        const total = this.props.disputelist.total;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <BtnOperation
                        btnOptions={this.btnOptions}
                        {...this.props}
                    />
                    <div className="position-relative">
                        <div onClick={this.toggleAllExpanded} className="tablelist-expand-all-btn">
                            {
                                isExpanded ? <div className="ant-table-row-expand-icon ant-table-row-expanded" /> : <div className="ant-table-row-expand-icon ant-table-row-collapsed" />
                            }
                        </div>
                        <Table
                            // className="components-table-demo-nested"
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data}
                            onChange={this.handleTableChange}
                            expandedRowKeys={expandedRowKeys}
                            expandedRowRender={this.expandedRowRender}
                            onExpand={this.onExpand}
                            rowSelection={rowSelection}
                            pagination={false}
                            rowKey={record => (record.disputeId)}
                        />
                    </div>
                    <Pagination
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定显示页数的选项(数组) ['20', '30', '40', '50', '100', '200']
                        showSizeChanger // 是否可以改变 pageSize
                        // defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={disputePageNumber}
                        onChange={getDisputelist} // 页码改变的回调，参数是改变后的页码及每页条数
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={disputePageData} // 每页条数
                        onShowSizeChange={getDisputelist} // pageSize 变化的回调
                    />
                </Spin>
                <FormItem>
                    {getFieldDecorator('buyerLastOrder', {
                        initialValue: buyerLastOrder,
                    })(
                        <Input type="hidden" />,
                    )}
                </FormItem>
            </div>
        );
    }
}
export default Form.create()(DisputeTablelist);
