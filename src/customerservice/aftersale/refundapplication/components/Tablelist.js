import React from 'react';
import {
    Table, Pagination, Spin, message, Checkbox, Drawer
} from 'antd';
import Tableoption from '../../../../components/Tableoption';
import Tableitem from '../../../../components/Tableitem';
import BtnOperation from '../../../../components/BtnOperation';
import { page } from '../../../../constants';
import Modal2 from '../../../../components/Modal2';
import OrderDetailModal from '../../../common/components/OrderDetailModal';
import AddOrderModal from './AddOrderModal';
import AgreeOrRefuseModal from './AgreeOrRefuseModal';
import AddRefundFormModal from '../../../common/components/AddRefundFormModal';
import UploadAndTablelist from '../../../common/components/UploadAndTablelist';
import { filterPostdata } from '../../../common/components/AddRefundFormModal/filterData';
import { fetchPost, openDownloadFile } from '../../../../util/fetch';
import { showConfirm } from '../../../../utils';
import { checkAddRefund, commonRequest } from '../../../common/request';
import { EDIT_OR_ADD_REFUND } from '../../../common/constants';
import { REFUSE_REFUND, AGREEN_REFUND, DOWNLOAD_IMPORT_TEMPLAGGE, RETRY_REFUND } from '../constants';
import { randNum } from '../../../../util/baseTool';
import { ifShowAgreenOrRefuse, getStateText, filterSeachData } from '../selector';

export default class Tablelist extends React.Component {
    state = {
        refundsList: [],
        selectedRowKeys: [], // 控制外层rowSelection
        record: {}, // 操作项该项的数据
        refundIds: [], // 批量操作项id集合
        refundFormType: '', // 'edit' 编辑,'add' 新增
        modalTitle: '',
        isReview: false, // 是否为查看退款单弹框
        isExpanded: true,
        expandedRowKeys: [],
        orderVisible: false,
        addOrderVisible: false,
        addRefundVisible: false,
        agreenOrDisVisible: false,
        addOrderConfirmLoading: false,
        addRefundConfirmLoading: false,
        agreenOrDisConfirmLoading: false,
    }

    columns = [
        {
            title: '平台订单编号',
            dataIndex: 'orderNumber',
            align: 'center',
            render: (text, record) => <span className="refund-appl-theme" onClick={() => this.handleOpenModal('订单详情', 'orderVisible', record)}>{text}</span>,
        },
        {
            title: '平台订单状态',
            dataIndex: 'orderStatus',
            align: 'center',
        },
        {
            title: '订单金额',
            align: 'center',
            dataIndex: 'money',
            render: (text, record) => <div>{`${record.orderAmountCurrency} ${record.orderAmount}(实付：${record.paidAmountCurrency} ${record.paidAmount})`}</div>
        },
        {
            title: '订单时间',
            align: 'center',
            dataIndex: 'time',
            render: (text, record) => {
                return (
                    <div>
                        <div>创建时间：{record.orderCreateTime}</div>
                        <div>完成时间：{record.orderEndTime ? record.orderEndTime : '--'}</div>
                    </div>
                )
            }
        },
        {
            title: '账号信息',
            align: 'center',
            dataIndex: 'sellerAccount',
            render: (text, record) => {
                return (
                    <div>
                        <div>卖家账号：{record.sellerAccount}</div>
                        <div>买家账号：{record.buyerAccount}</div>
                    </div>
                )
            }
        }
    ]

    btnOptions = {
        left: [
            {
                // name: '',
                type: 'dropdown',
                funcId: [],
                onChange: clickData => this.handleMutipleAgreen(clickData),
                subs: [
                    {
                        name: '同意退款',
                        funcId: '009-000004-000002-003',
                    },
                    {
                        name: '拒绝退款',
                        funcId: '009-000004-000002-004',
                    },
                ],
            },
        ],
        right: [
            {
                name: '下载待补充汇款信息',
                type: 'button',
                icon: 'download',
                funcId: '009-000004-000002-005',
                onChange: () => this.downloadInfo('1'),
                subs: [],
            }, {
                name: '上传待补充汇款信息',
                type: 'button',
                icon: 'upload',
                funcId: '009-000004-000002-006',
                onChange: () => this.handleOpenDrawer('上传待补充汇款信息', 'uploadVisible'),
                subs: [],
            }, {
                name: '下载待补充登记信息',
                type: 'button',
                icon: 'download',
                funcId: '009-000004-000002-005',
                onChange: () => this.downloadInfo('2'),
                subs: [],
            }, {
                name: '上传待补充登记信息',
                type: 'button',
                icon: 'upload',
                funcId: '009-000004-000002-006',
                onChange: () => this.handleOpenDrawer('上传待补充登记信息', 'uploadVisible'),
                subs: [],
            }, {
                name: '添加退款单',
                type: 'button',
                icon: 'plus',
                funcId: '009-000004-000002-002',
                onChange: () => this.handleOpenModal('添加退款单', 'addOrderVisible'),
                subs: [],
            },
        ],
    }

    componentWillReceiveProps(nextProps) {
        const { isExpanded } = this.state;
        const list = nextProps.refundList.data;
        const oldList = this.props.refundList.data;
        if (list && list !== oldList) {
            this.setState({
                expandedRowKeys: isExpanded ? list.map(v => v.orderNumber) : [],
            });
        }
    }

    // type 1-补充汇款信息，2-补充登记信息
    downloadInfo = (type) => {
        const loading = type === 1 ? 'amountLoading' : 'registerLoading';
        const searchData = this.props.form.getFieldsValue();
        const seachDataFiltered = filterSeachData(searchData);
        const params = {
            ...seachDataFiltered,
            type,
            group: '1',
        }
        message.info('正在处理下载操作，请稍等...');
        fetchPost(DOWNLOAD_IMPORT_TEMPLAGGE, params, 1)
            .then((data) => {
                if (data && data.state === '000001') {
                    openDownloadFile(data.data.fileUrl);
                }
            });
    }

    // 退款单内层rowSelection选择
    refundSelectionChange = (e, refundId, orderNumber) => {
        const checked = e.target.checked;
        const { data } = this.props.refundList;
        const { selectedRowKeys } = this.state;
        const refundItem = data.find(item => item.orderNumber === orderNumber);
        const orderRefunds = refundItem.orderRefunds;
        const targetItem = orderRefunds.find(item => item.refundId === refundId);
        targetItem.isChecked = checked;
        // 外层rowSelection处理
        const checkedArr = orderRefunds.filter(ele => ele.status === 10).map(item => item.isChecked);
        const orderIndex = selectedRowKeys.findIndex(item => item === orderNumber);
        if (orderIndex > -1 && checkedArr.includes(false)) {
            selectedRowKeys.splice(orderIndex, 1);
        }
        if(orderIndex <= -1 && !checkedArr.includes(false)) {
            selectedRowKeys.push(orderNumber);
        }
        this.setState({ selectedRowKeys });
    }

    expandedRowRender = (records) => {
        const skuData = records.orderItems;
        const refundData = records.orderRefunds;
        const platformData = records.platformRefunds;
        const skuColumns = [
            {
                title: '订单刊登SKU',
                dataIndex: 'sku',
                key: 'sku',
                align: 'center',
                width: 340,
            },
            {
                title: '订单产品名称',
                dataIndex: 'productName',
                key: 'productName',
                align: 'center',
                width: 340,
            },
            {
                title: '订单SKU单价',
                dataIndex: 'prices',
                key: 'prices',
                align: 'center',
                width: 340,
                render: (text, record) => <div>{record.currency} {record.price}</div>
            },
            {
                title: '订单SKU数量',
                dataIndex: 'quantity',
                key: 'quantity',
                align: 'center',
                width: 340,
            }
        ];
        const refundColumn = [
            {
                title: '',
                dataIndex: 'checkBox',
                align: 'center',
                render: (text, record) => {
                    const status = record.status;
                    if (status === 110) {
                        return {
                            children: <span href="javascript:;">暂无操作退款信息</span>,
                            props: {
                                colSpan: 5,
                            },
                        }
                    }
                    return <Checkbox disabled={record.status !== 10} checked={record.isChecked} onChange={(e) => this.refundSelectionChange(e, record.refundId, records.orderNumber)} />
                }
            },
            {
                title: '操作退款信息',
                dataIndex: 'refundInfo',
                key: 'refundInfo',
                align: 'left',
                // width: 330,
                render: (text, record) => {
                    const status = record.status;
                    if (status === 110) {
                        return {
                            children: <span href="javascript:;">暂无操作退款信息</span>,
                            props: {
                                colSpan: 0,
                            },
                        }
                    }
                    return (
                        <div className="refund-appl-return">
                            <Tableitem
                                title="退款流水"
                                content={
                                    <span>{record.refundSn}</span>
                                }
                                left={100}
                                right={180}
                            />
                            <Tableitem
                                title="退款原因"
                                content={
                                    <span>{record.refundReason}</span>
                                }
                                left={100}
                                right={180}
                            />
                            <Tableitem
                                title="退款SKU"
                                content={
                                    <span>{record.refundSkus && record.refundSkus.length && record.refundSkus.map((item, index) => {
                                        return `${index === 0 ? '' : ','}${item.sku} × ${item.quantity}`
                                    })}</span>
                                }
                                left={100}
                                right={180}
                            />
                            <Tableitem
                                title="退款金额"
                                content={
                                    <span>{record.refundId ? `${record.currency} ${record.refundAmount}` : ''}</span>
                                }
                                left={100}
                                right={180}
                            />
                            {record.paymentAccount ? (
                                <Tableitem
                                    title="收款账号"
                                    content={
                                        <span>{record.paymentAccount}</span>
                                    }
                                    left={100}
                                    right={180}
                                />
                            ) : null}
                            {record.refundNumber ? (
                                <Tableitem
                                    title="退款凭证"
                                    content={
                                        <span>{record.refundNumber}</span>
                                    }
                                    left={100}
                                    right={180}
                                />
                            ) : null}
                            {record.refundDetail ? (
                                <Tableitem
                                    title="退款详情"
                                    content={
                                        <span>{record.refundDetail}</span>
                                    }
                                    left={100}
                                    right={180}
                                />
                            ) : null}
                        </div>
                    )
                },
            },
            {
                title: '状态信息',
                dataIndex: 'statusInfo',
                key: 'statusInfo',
                align: 'left',
                // width: 315,
                render: (text, record) => {
                    const status = record.status;
                    if (status === 110) {
                        return {
                            children: <span href="javascript:;">暂无操作退款信息</span>,
                            props: {
                                colSpan: 0,
                            },
                        }
                    }
                    let trackingNumber = '';
                    if (record.returnGoods && record.trackingNumber) {
                        trackingNumber = `(退款跟踪号：${record.trackingNumber})`;
                    }
                    return (
                        <div className="refund-appl-status">
                            <Tableitem
                                title="退款方式"
                                content={
                                    <span>{getStateText({type: 'refundModeType', code: record.refundMode + 1})}</span>
                                }
                                left={100}
                                right={180}
                            />
                            <Tableitem
                                title="退款类型"
                                content={
                                    <span>{getStateText({type: 'refundType', code: record.refundType})}</span>
                                }
                                left={100}
                                right={180}
                            />
                            <Tableitem
                                title="是否退货"
                                content={
                                    <span>{record.refundId ? `${getStateText({type: 'returnGoodsType', code: record.returnGoods + 1})}${trackingNumber}` : ''}</span>
                                }
                                left={100}
                                right={180}
                            />
                            <Tableitem
                                title="处理状态"
                                content={
                                    <span>{getStateText({type: 'refundStatus', code: record.status})}</span>
                                }
                                left={100}
                                right={180}
                            />
                            <Tableitem
                                title="申请人"
                                content={
                                    <span>{record.operator}</span>
                                }
                                left={100}
                                right={180}
                            />
                            {
                                record.reviewer
                                    ? (
                                        <Tableitem
                                            title="审核人"
                                            content={
                                                <span className="refund-appl-red">{record.reviewer}</span>
                                            }
                                            left={100}
                                            right={180}
                                        />
                                    ) : null}
                            <Tableitem
                                title="处理说明"
                                content={
                                    <span>{record.content}</span>
                                }
                                left={100}
                                right={180}
                            />
                            {record.refundMode === 2 && record.status === 50
                                ? (
                                    <Tableitem
                                        title="失败原因"
                                        content={
                                            <span className='customer-red'>{record.failedMsg}</span>
                                        }
                                        left={100}
                                        right={180}
                                    />
                                ) : null}
                        </div>
                    )
                },
            },
            {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                align: 'center',
                // width: 100,
                render: (text, record) => {
                    const status = record.status;
                    if (status === 110) {
                        return {
                            children: <span>暂无操作退款信息</span>,
                            props: {
                                colSpan: 0,
                            },
                        }
                    }
                    const options = [
                        {
                            name: '查看',
                            onChange: () => this.handleOpenModal('查看退款单', 'addRefundVisible', record),
                            funcId: '009-000004-000002-002',
                            subs: [],
                        }
                    ];
                    const agreenOrRefuseBtnShow = ifShowAgreenOrRefuse(record);
                    // 编辑显示条件：订单状态为已拒绝
                    if (record.status === 30) {
                        options.push({
                            name: '编辑',
                            onChange: () => this.handleOpenModal('编辑退款单', 'addRefundVisible', record),
                            funcId: '009-000004-000002-002',
                            subs: [],
                        });
                    }
                    // 同意/拒绝退款显示条件：待审批，且预设表单及自定义表单必填字段都不为空
                    else if (record.status === 10) {
                        if (agreenOrRefuseBtnShow) {
                            options.push({
                                name: '同意退款',
                                onChange: () => this.handleOpenModal('同意退款', 'agreenOrDisVisible', record),
                                funcId: '009-000004-000002-003',
                                subs: [],
                            }, {
                                name: '拒绝退款',
                                onChange: () => this.handleOpenModal('拒绝退款', 'agreenOrDisVisible', record),
                                funcId: '009-000004-000002-004',
                                subs: [],
                            });
                        }
                    } 
                    // 重试退款显示条件：平台退款，且订单状态为已同意-退款失败
                    else if (record.status === 50) {
                        if (record.refundMode === 2) {
                            options.push({
                                name: '重试退款',
                                onChange: () => this.retryRefund(record.refundId),
                                funcId: '009-000004-000002-007',
                                subs: [],
                            });
                        }
                    }
                    return (
                        <Tableoption {...this.props} options={options} />
                    );
                },
            }
        ]
        const platformColumns = [
            {
                title: '平台退款信息原因',
                dataIndex: 'refundReason',
                key: 'refundReason',
                align: 'center',
                width: 340,
            },
            {
                title: '平台退款信息金额',
                dataIndex: 'amount',
                key: 'amount',
                align: 'center',
                width: 340,
                render: (text, record) => <div>{record.currency} {record.refundAmount}</div>
            },
            {
                title: '平台退款时间',
                dataIndex: 'refundTime',
                key: 'refundTime',
                align: 'center',
                width: 340,
            }
        ];
        return (
            <div>
                <Table
                    bordered={false}
                    columns={skuColumns}
                    dataSource={skuData}
                    pagination={false}
                    rowKey={() => randNum()}
                />
                <Table
                    bordered={false}
                    columns={refundColumn}
                    dataSource={refundData}
                    pagination={false}
                    rowKey={() => randNum()}
                />
                <Table
                    bordered={false}
                    columns={platformColumns}
                    dataSource={platformData}
                    pagination={false}
                    rowKey={() => randNum()}
                />
            </div>
        );
    };

    retryRefund = (refundId) => {
        const platformId = this.props.form.getFieldValue('platformId');
        const params = {
            platformId,
            refundId: [refundId]
        }
        showConfirm(
            '提示！',
            '确认要重试退款？',
            () => commonRequest(RETRY_REFUND, params, this.props.listFetch),
        );
    }

    /**
     * @param <String> modalTitle: 弹框标题
     * @param <String> visible: 控制弹框显示变量 
     * @param <Object> record: 该退款单的退款信息数据(orderRefunds)
     */
    handleOpenModal = (modalTitle, visible, record) => {
        this.setState({
            modalTitle,
            [visible]: true,
            record: record || {},
            refundIds: record ? [record.refundId] : [],
            refundFormType: record ? 'edit' : 'add',
            isReview: modalTitle === '查看退款单' ? true : false
        });
    }

    // 打开抽屉
    handleOpenDrawer = (modalTitle, visible) => {
        this.setState({
            modalTitle,
            [visible]: true,
            uploadType: modalTitle === '上传待补充汇款信息' ? 1 : 2,
        });
    }

    // 取消弹出框
    handleCancel = (visible) => {
        this.setState({
            [visible]: false,
        });
    }

    // 添加退款单校验
    handleAddOrderOk = () => {
        this.addOrderRef.validateFields((err, values) => {
            if (!err) {
                const platformId = this.props.form.getFieldValue('platformId');
                this.setState({ addOrderConfirmLoading: true });
                checkAddRefund({
                    platformId,
                    orderNumber: values.orderNumber,
                }, () => {
                    this.setState({
                        addOrderVisible: false,
                        addRefundVisible: true,
                        record: { orderNumber: values.orderNumber },
                    });
                }, () => {
                    this.setState({ addOrderConfirmLoading: false });
                });
            }
        });
    }

    // 提交退款单
    handleAddRefundOk = () => {
        this.addRefundRef.validateFields((err, values) => {
            const { record, refundFormType } = this.state;
            const platformId = this.props.form.getFieldValue('platformId');
            // TODO 全额申请数量拦截
            // if (values.product) {
            //     const orderIsFull = Objectvalues.(values.product).find(item => item.quantity !== item.availableQuantity);
            //     if (!orderIsFull) {
            //         message.error('该订单普通退款申请已全额申请，无法添加');
            //         return;
            //     }
            // }
            if (!err) {
                if (values.refundAmount <= 0) {
                    message.warning('退款金额不能为0!');
                    return;
                }
                const postData = filterPostdata(values);
                postData.group = '1';
                postData.platformId = platformId;
                postData.refundId = refundFormType === 'edit' ? record.refundId : undefined;
                this.setState({ addRefundConfirmLoading: true });
                fetchPost(EDIT_OR_ADD_REFUND, postData, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.props.listFetch();
                            this.setState({
                                addRefundVisible: false,
                            });
                        }
                        this.setState({ addRefundConfirmLoading: false });
                    });
            }
        });
    }

    // 同意退款
    handleAgreenOk = () => {
        this.agreenRef.validateFields((err, values) => {
            if (!err) {
                const { modalTitle, refundIds } = this.state;
                const postApi = modalTitle === '同意退款' ? AGREEN_REFUND : REFUSE_REFUND;
                this.setState({ agreenOrDisConfirmLoading: true });
                fetchPost(postApi, {
                    ...values,
                    group: '1',
                    refundId: refundIds,
                }, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.props.listFetch();
                            this.setState({
                                selectedRowKeys: [],
                                agreenOrDisVisible: false,
                            });
                        }
                        this.setState({
                            agreenOrDisConfirmLoading: false,
                        });
                    });
            }
        });
    }

    // 批量同意/拒绝
    handleMutipleAgreen = (clickData) => {
        const { data } = this.props.refundList;
        let checkedOrder = [];
        data.forEach(item => {
            checkedOrder.push(...item.orderRefunds);
        })
        checkedOrder = checkedOrder.filter(item => item.isChecked);
        const ids = checkedOrder.map(item => item.refundId);
        if (!ids.length) {
            message.warning('请选择需要批量同意的订单');
            return;
        }
        if (clickData.item.props.children === '同意退款') {
            this.setState({ modalTitle: '同意退款' });
        } else {
            this.setState({ modalTitle: '拒绝退款' });
        }
        this.setState({
            agreenOrDisVisible: true,
            refundIds: ids,
        });
    }

    onRowChange = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys,
        });
    }

    onSelectChange = (record, selected) => {
        const { data } = this.props.refundList;
        const operateData = data.filter(item => item.orderNumber === record.orderNumber);
        this.checkedReRender(selected, operateData);
    }

    onSelectAllChange = (selected, selectedRows, changeRows) => {
        const { data } = this.props.refundList;
        const orderNumberArr = changeRows.map(item => item.orderNumber);
        const operateData = data.filter(item => orderNumberArr.includes(item.orderNumber));
        this.checkedReRender(selected, operateData);
    }

    checkedReRender = (selected, data) => {
        data.forEach(item => {
            // 过滤出待审批状态的数据
            const orderRefunds = item.orderRefunds.filter(v => v.status === 10)
            if (selected) {
                orderRefunds.forEach(element => {
                    if (element.status === 10) {
                        element.isChecked = true;
                    }
                });
            } else {
                orderRefunds.forEach(element => {
                    element.isChecked = false;
                });
            }
        });
    }

    // 取消退款单loading状态
    cancelRefundLoading = () => {
        this.setState({ addRefundConfirmLoading: false });
    }

    // 切换是否全部展开或关闭
    toggleAllExpanded = () => {
        const { data } = this.props.refundList;
        const { isExpanded } = this.state;
        this.setState({
            expandedRowKeys: isExpanded ? [] : data.map(v => v.orderNumber),
            isExpanded: !isExpanded,
        });
    }

    // table展开/收起
    onExpand = (expanded, record) => {
        const { expandedRowKeys } = this.state;
        const orderNumber = record.orderNumber;
        if (expanded) {
            expandedRowKeys.push(orderNumber);
        } else {
            const index = expandedRowKeys.indexOf(orderNumber);
            if (index > -1) {
                expandedRowKeys.splice(index, 1);
            }
        }
        this.setState({
            expandedRowKeys,
        });
    }

    render() {
        const {
            selectedRowKeys,
            refundFormType,
            record,
            uploadType,
            modalTitle,
            isReview,
            isExpanded,
            expandedRowKeys,
            orderVisible,
            uploadVisible,
            addOrderVisible,
            addRefundVisible,
            agreenOrDisVisible,
            addOrderConfirmLoading,
            addRefundConfirmLoading,
            agreenOrDisConfirmLoading,
        } = this.state;
        const { pageNumber, pageData, listFetch, platform } = this.props;
        const refundLoading = this.props.refundLoading;
        const { data, total } = this.props.refundList;
        const platformId = this.props.form.getFieldValue('platformId');
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onRowChange,
            onSelect: this.onSelectChange,
            onSelectAll: this.onSelectAllChange,
            getCheckboxProps: records => ({   // 当退款单全是非待审批状态时禁用
                disabled: !records.orderRefunds.filter(item => item.status === 10).length,
            }),
        };
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={refundLoading} delay={500}>
                    <BtnOperation
                        {...this.props}
                        btnOptions={this.btnOptions}
                    />
                    <div className="position-relative">
                        <div onClick={this.toggleAllExpanded} className="tablelist-expand-all-btn">
                            {
                                isExpanded ? <div className="ant-table-row-expand-icon ant-table-row-expanded" /> : <div className="ant-table-row-expand-icon ant-table-row-collapsed" />
                            }
                        </div>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={data}
                            expandedRowKeys={expandedRowKeys}
                            onExpand={this.onExpand}
                            expandedRowRender={this.expandedRowRender}
                            rowSelection={rowSelection}
                            pagination={false}
                            rowKey={refundList => refundList.orderNumber}
                        />
                    </div>
                    <Pagination
                        className="pull-right"
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定显示页数的选项(数组) ['20', '30', '40', '50', '100', '200']
                        showSizeChanger // 是否可以改变 pageSize
                        // defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={pageNumber}
                        onChange={listFetch} // 页码改变的回调，参数是改变后的页码及每页条数
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={pageData} // 每页条数
                        onShowSizeChange={listFetch} // pageSize 变化的回调
                    />
                </Spin>
                {/* 订单详情弹窗 */}
                <Modal2
                    component={(
                        <OrderDetailModal
                            platformId={platformId}
                            orderNumber={record.orderNumber}
                            buyerAccount={record.buyerAccount}
                            sellerAccount={record.sellerAccount}
                        />
                    )}
                    title={modalTitle}
                    visible={orderVisible}
                    handleCancel={() => this.handleCancel('orderVisible')}
                    footer={null}
                />
                {/* 上传信息弹窗 */}
                <Drawer
                    title={modalTitle}
                    placement="right"
                    visible={uploadVisible}
                    onClose={() => this.handleCancel('uploadVisible')}
                    width={'80%'}
                >
                    <UploadAndTablelist
                        uploadType={uploadType}
                        visible={uploadVisible}
                        platformId={platformId}
                        menuInfos={this.props.menuInfos}
                    />
                </Drawer>
                {/* 添加退款单弹窗 */}
                <Modal2
                    component={(<AddOrderModal platformId={platformId} ref={addOrder => this.addOrderRef = addOrder} />)}
                    title={modalTitle}
                    visible={addOrderVisible}
                    handleOk={this.handleAddOrderOk}
                    handleCancel={() => this.handleCancel('addOrderVisible')}
                    confirmLoading={addOrderConfirmLoading}
                />
                {/* 登记退款单弹窗 */}
                <Modal2
                    component={
                        (
                            <AddRefundFormModal
                                record={record}
                                isReview={isReview}
                                type={refundFormType}
                                platformId={platformId}
                                ref={refund => this.addRefundRef = refund}
                                cancelRefundLoading={this.cancelRefundLoading}
                            />
                        )
                    }
                    title={modalTitle}
                    visible={addRefundVisible}
                    handleOk={this.handleAddRefundOk}
                    handleCancel={() => this.handleCancel('addRefundVisible')}
                    confirmLoading={addRefundConfirmLoading}
                    width={800}
                    footer={modalTitle === '查看退款单' ? null : undefined}
                />
                {/* 同意或拒绝退款弹窗 */}
                <Modal2
                    component={
                        (
                            <AgreeOrRefuseModal
                                record={record}
                                title={modalTitle}
                                platform={platform}
                                platformId={platformId}
                                ref={agreen => this.agreenRef = agreen}
                            />
                        )
                    }
                    title={modalTitle}
                    visible={agreenOrDisVisible}
                    handleOk={this.handleAgreenOk}
                    handleCancel={() => this.handleCancel('agreenOrDisVisible')}
                    confirmLoading={agreenOrDisConfirmLoading}
                />
            </div>
        );
    }
}
