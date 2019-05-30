import React from 'react';
import {
    Table, Pagination, Spin, Rate,
} from 'antd';
import Modal2 from '../../../../components/Modal2';
import SyncModal from '../../../common/components/SyncModal';
import Tableoption from '../../../../components/Tableoption';
import Tableitem from '../../../../components/Tableitem';
import BtnOperation from '../../../../components/BtnOperation';
import CommentAllModal from './CommentAllModal';
import ReplyCommentModal from './ReplyCommentModal';
import { REPLY_ALL_EVALUATION, REPLY_EVALUATION, SYNC_EVALUATION } from '../constants';
import { page } from '../../../../constants';
import { fetchPost } from '../../../../util/fetch';

export default class CommentTablelist extends React.Component {
    state = {
        record: {},
        commentVisible: false,
        commentAllVisible: false,
        syncVisible: false,
        commentConfirmLoading: false,
        commentAllConfirmLoading: false,
        syncConfirmLoading: false,
        isExpanded: true,
        expandedRowKeys: [],
    }

    columns = [
        {
            title: '订单编号',
            dataIndex: 'orderNumber',
            align: 'center',
            render: (text, record) => <span className="complaintlist-theme" onClick={() => this.props.handleOperate('orderVisible', record)}>{text}</span>,
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
            title: '订单时间',
            align: 'center',
            dataIndex: 'orderDate',
        },
        {
            title: '倒计时',
            align: 'center',
            dataIndex: 'leftEvaluationTime',
            render: (text) => {
                const { getFieldsValue } = this.props.form;
                let { status } = getFieldsValue(['status']);
                status = status[0];
                if (status === 3 || status === 4) return null;
                return text;
            },
        },
    ]

    btnOptions = {
        left: [
            {
                name: '卖家评价所有',
                onChange: () => this.handleOpenModal('commentAllVisible'),
                type: 'button',
                funcId: '009-000003-000001-013',
                subs: [],
            },
        ],
        right: [
            {
                name: '同步评价',
                onChange: () => this.handleOpenModal('syncVisible'),
                type: 'button',
                icon: 'sync',
                funcId: '009-000003-000001-011',
                subs: [],
            },
        ],
    }

    componentWillReceiveProps(nextProps) {
        const { isExpanded } = this.state;
        const list = nextProps.commentlist.list;
        const oldList = this.props.commentlist.list;
        if (list && list !== oldList) {
            this.setState({
                expandedRowKeys: isExpanded ? list.map(v => v.orderNumber) : [],
            });
        }
    }

    expandedRowRender = (records) => {
        const data = records.product;
        const columns = [
            {
                title: '订单详情',
                dataIndex: 'orderInfo',
                key: 'orderInfo',
                align: 'left',
                width: 400,
                render: (text, record) => (
                    <div className="order-info">
                        <div className="ant-row">
                            <div className="ant-col-12">
                                <Tableitem
                                    title="参考SKU"
                                    content={
                                        <span>{record.skuName}</span>
                                    }
                                    left={75}
                                    right={135}
                                />
                            </div>
                            <div className="ant-col-12">
                                <Tableitem
                                    title="productId"
                                    content={
                                        <span>{record.productId}</span>
                                    }
                                    left={75}
                                    right={135}
                                />
                            </div>
                        </div>
                        <div className="comment-product-name">{record.name}</div>
                        <div className="ant-row">
                            <div className="ant-col-12">
                                <Tableitem
                                    title="金额"
                                    content={
                                        <span>{record.currency} {record.price}</span>
                                    }
                                    left={50}
                                    right={135}
                                />
                            </div>
                            <div className="ant-col-12">
                                <Tableitem
                                    title="数量"
                                    content={
                                        <span>{record.quality}</span>
                                    }
                                    left={50}
                                    right={135}
                                />
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                title: '评价信息',
                dataIndex: 'commentInfo',
                key: 'commentInfo',
                align: 'left',
                width: 400,
                render: (text, record) => (
                    <div className="comment-info">
                        <div className="complaintlist-evaluation">
                            <div className="message-evaluation">
                                <div className="pd-ssm">我留言的评价</div>
                                <Rate disabled defaultValue={record.messageEvaluation ? record.messageEvaluation.stars : null} className="pd-ssm" />
                            </div>
                            <div className="comment-box">
                                <div>{record.messageEvaluation ? record.messageEvaluation.content : null}</div>
                                <div className="complaintlist-evaluation-time">
                                    {record.messageEvaluation.sellerFeedbackTime} &nbsp; {record.messageEvaluation.name}
                                </div>
                                {
                                    record.messageEvaluation && record.messageEvaluation.customerName
                                        ? <div className="evaluation-customer-name">{record.messageEvaluation.customerName}</div>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="complaintlist-evaluation">
                            <div className="received-evaluation">
                                <div>我收到的评价</div>
                                <Rate disabled defaultValue={record.receivedEvaluation ? record.receivedEvaluation.stars : null} />
                            </div>
                            <div className="comment-box">
                                {record.receivedEvaluation ? record.receivedEvaluation.content : null}
                                <div className="complaintlist-evaluation-time">
                                    {record.receivedEvaluation.buyerFbDate}
                                </div>
                            </div>
                        </div>
                        <div className="complaintlist-evaluation">
                            <div className="complaintlist-my-reply">
                                <div>我的回复</div>
                            </div>
                            <div className="comment-box">
                                <div>{record.replyContent ? record.replyContent.content : null}</div>
                                {
                                    record.replyContent && record.replyContent.customerName
                                        ? (
                                            <div className="evaluation-customer-name-time">
                                                <div className="evaluation-customer-name">{record.replyContent.customerName}</div>
                                                <div className="pull-right">{record.replyContent.sellerReplyTime}</div>
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                title: '操作',
                dataIndex: 'operate',
                key: 'operate',
                align: 'center',
                width: 100,
                render: () => {
                    const status = this.props.form.getFieldValue('status')[0];
                    const options = [
                        {
                            name: '回复评价',
                            onChange: () => { this.handleOpenModal('commentVisible', records); },
                            funcId: '009-000003-000001-012',
                            subs: [],
                        },
                    ];
                    // product need to open
                    if (status === 1) {
                        if (!records.isSupportReply) {
                            return <span className="complaintlist-red">多个product不支持回评</span>;
                        }
                        return <Tableoption {...this.props} options={options} />;
                    }
                    return null;
                },
            },
        ];
        return (
            <Table
                bordered={false}
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey={r => (r.productId)}
            />
        );
    };

    handleOpenModal = (visible, record) => {
        this.setState({
            [visible]: true,
            record: record || {},
        });
    }

    handleCancel = (visible) => {
        this.setState({ [visible]: false });
    }

    handleCommentOk = () => {
        this.commentRef.validateFields((err, values) => {
            if (!err) {
                this.setState({ commentConfirmLoading: true });
                fetchPost(REPLY_EVALUATION, values, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.props.getCommentlist();
                            this.setState({
                                commentVisible: false,
                            });
                        }
                        this.setState({
                            commentConfirmLoading: false,
                        });
                    });
            }
        });
    }

    handleCommentAllOk = () => {
        this.commentAllRef.validateFields((err, values) => {
            if (!err) {
                this.setState({ commentAllConfirmLoading: true });
                fetchPost(REPLY_ALL_EVALUATION, values, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.props.getCommentlist();
                            this.setState({
                                commentAllVisible: false,
                            });
                        }
                        this.setState({
                            commentAllConfirmLoading: false,
                        });
                    });
            }
        });
    }

    handleSyncOk = () => {
        this.syncRef.validateFields((err, values) => {
            if (!err) {
                const { platformId } = this.props;
                this.setState({ syncConfirmLoading: true });
                fetchPost(SYNC_EVALUATION, { ...values, platformId }, 1)
                    .then((data) => {
                        if (data && data.state === '000001') {
                            this.props.getCommentlist();
                            this.setState({
                                syncVisible: false,
                            });
                        }
                        this.setState({
                            syncConfirmLoading: false,
                        });
                    });
            }
        });
    }

    // 切换是否全部展开  或 关闭
    toggleAllExpanded = () => {
        const list = this.props.commentlist.list;
        const { isExpanded } = this.state;
        this.setState({
            expandedRowKeys: isExpanded ? [] : list.map(v => v.orderNumber),
            isExpanded: !isExpanded,
        });
    }

    // table 展开 收起的函数
    onExpand = (expanded, record) => {
        const { expandedRowKeys } = this.state;
        const orderNumber = record.orderNumber;
        if (expanded) {
            expandedRowKeys.push(orderNumber);
        } else {
            const index = expandedRowKeys.indexOf(orderNumber);
            if (index !== -1) {
                expandedRowKeys.splice(index, 1);
            }
        }
        this.setState({
            expandedRowKeys,
        });
    }

    render() {
        const {
            record,
            commentVisible,
            commentAllVisible,
            commentConfirmLoading,
            commentAllConfirmLoading,
            syncVisible,
            syncConfirmLoading,
            expandedRowKeys,
            isExpanded,
        } = this.state;
        const {
            commentPageData, commentPageNumber, getCommentlist, platformId, platform,
        } = this.props;

        const { getFieldValue } = this.props.form;
        const status = getFieldValue('status')[0];
        const btnOptions = status === 4 ? {
            left: [],
            right: this.btnOptions.right,
        } : this.btnOptions;
        const loading = this.props.commentLoading;
        const data = this.props.commentlist.list;
        const commentStatuIndex = this.props.form.getFieldValue('status')[0];
        const total = (this.props.commentCount.totalNumber && this.props.commentCount.totalNumber[commentStatuIndex-1]) || 0;
        return (
            <div className="breadcrumb padding-sm overflow-hidden margin-sm-top">
                <Spin spinning={loading} delay={500}>
                    <BtnOperation
                        btnOptions={btnOptions}
                        {...this.props}
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
                            expandedRowRender={this.expandedRowRender}
                            onExpand={this.onExpand}
                            pagination={false}
                            rowKey={records => (records.orderNumber)}
                        />
                    </div>
                    <Pagination
                        className="pull-right"
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定显示页数的选项(数组) ['20', '30', '40', '50', '100', '200']
                        showSizeChanger // 是否可以改变 pageSize
                        // defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={commentPageNumber}
                        onChange={getCommentlist} // 页码改变的回调，参数是改变后的页码及每页条数
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={commentPageData} // 每页条数
                        onShowSizeChange={getCommentlist} // pageSize 变化的回调
                    />
                </Spin>
                {/* 卖家评价所有 */}
                <Modal2
                    component={
                        (
                            <CommentAllModal
                                platformId={platformId}
                                ref={comment => this.commentAllRef = comment}
                            />
                        )
                    }
                    title="评价"
                    visible={commentAllVisible}
                    handleOk={this.handleCommentAllOk}
                    handleCancel={() => this.handleCancel('commentAllVisible')}
                    confirmLoading={commentAllConfirmLoading}
                />
                {/* 回复评价 */}
                <Modal2
                    component={
                        (
                            <ReplyCommentModal
                                platformId={platformId}
                                orderNumber={record.orderNumber}
                                sellerAccount={record.sellerAccount}
                                ref={comment => this.commentRef = comment}
                            />
                        )
                    }
                    title="评价"
                    visible={commentVisible}
                    handleOk={this.handleCommentOk}
                    handleCancel={() => this.handleCancel('commentVisible')}
                    confirmLoading={commentConfirmLoading}
                />
                {/* 同步评价 */}
                <Modal2
                    component={
                        (
                            <SyncModal
                                platformId={platformId}
                                platform={platform}
                                ref={sync => this.syncRef = sync}
                                noDatePicker
                            />
                        )
                    }
                    title="同步评价"
                    visible={syncVisible}
                    handleOk={this.handleSyncOk}
                    handleCancel={() => this.handleCancel('syncVisible')}
                    confirmLoading={syncConfirmLoading}
                />
            </div>
        );
    }
}
