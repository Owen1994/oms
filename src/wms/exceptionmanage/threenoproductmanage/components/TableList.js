import React, { Component } from 'react';
import {
    Button,
    Pagination, Spin, Table,
} from 'antd';
import Tableitem from '../../../../components/Tableitem';
import UpLoadModal from './model/UpLoadModal';
import CGallery from '../../../../components/cgallery';
import EditTableCell from '../../../../common/components/editable/EditableCell';

// const renderContent = (text, record) => {
//     const obj = {
//         children: text,
//         props: {},
//     };
//     obj.props.rowSpan = record.rowSpanSize ? record.rowSpanSize : 0;
//     return obj;
// };

class TableList extends Component {
    state = {
        showUpLoadModal: false,
        imgs: [],
    };

    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: 50,
            render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouseName',
        },
        {
            title: '异常单据',
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={80}
                        right={120}
                        title="异常编码"
                        content={record.exceptionCoding}
                    />
                    <Tableitem
                        left={80}
                        right={120}
                        title="所属仓库"
                        content={record.ownWarehouse}
                    />
                    <Tableitem
                        left={80}
                        right={120}
                        title="快递单号"
                        content={record.trackingNumber}
                    />
                </div>),
        },
        {
            title: '异常状态',
            dataIndex: 'exceptionalState',
        },
        {
            title: '异常类型',
            dataIndex: 'exceptionType',
        },
        {
            title: '关联操作记录',
            render: (text, record) => (
                <div>
                    <Tableitem
                        left={100}
                        right={120}
                        title="异常生成人"
                        content={record.exceptionCreator}
                    />
                    <Tableitem
                        left={100}
                        right={120}
                        title="异常生成时间"
                        content={record.exceptionCreateTime}
                    />
                    <Tableitem
                        left={100}
                        right={120}
                        title="决策人"
                        content={record.decisionMaker}
                    />
                    <Tableitem
                        left={100}
                        right={120}
                        title="决策时间"
                        content={record.decisionTime}
                    />
                </div>
            ),
        },
        {
            title: '产品图片',
            dataIndex: 'imageList',
            render: text => (
                <div
                    onClick={() => {
                        this.setState({
                            imgs: text,
                        });
                    }}
                >
                    <img
                        className="group-img"
                        src={text && text[0].src}
                        alt=""
                        width="80px"
                        height="80px"
                    />
                </div>),
        },
        {
            title: '方案',
            dataIndex: 'planName',
        },
        {
            title: '操作',
            render: (text, record) => (
                record.planCode === '1'
                    ? (
                        <EditTableCell
                            {...this.props}
                            type="number"
                            isEditable
                            value="录入快递单号"
                            name={record.key}
                        />
                    ) : <a>收货</a>
            ),
        },
    ];

    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            onChangeListener,
        } = this.props;
        return (
            <div className="breadcrumb padding-sm margin-sm-top">
                <div className="text-right margin-sm-bottom margin-ss-top">
                    <Button
                        type="default"
                        icon="upload"
                        onClick={() => {
                            this.setState({
                                showUpLoadModal: true,
                            });
                        }}
                    >产品上传
                    </Button>
                </div>
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Table
                        bordered
                        size="small"
                        columns={this.columns}
                        dataSource={partList.list}
                        pagination={false}
                    />
                    <Pagination
                        pageSizeOptions={['100']}
                        showTotal={t => `共${t}条`}
                        showSizeChanger
                        showQuickJumper={{ goButton: true }}
                        total={partList.total}
                        current={pageNumber}
                        pageSize={pageData}
                        onChange={onChangeListener}
                    />
                </Spin>
                <UpLoadModal
                    {...this.props}
                    cancel={() => {
                        this.setState({
                            showUpLoadModal: false,
                        });
                    }}
                    visible={this.state.showUpLoadModal}
                />
                <CGallery
                    handleClose={() => {
                        this.setState({
                            imgs: undefined,
                        });
                    }}
                    imgs={this.state.imgs}
                />
            </div>
        );
    }
}

export default TableList;
