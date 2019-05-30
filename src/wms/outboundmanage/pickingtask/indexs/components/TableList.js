import React, { Component } from 'react';
import {
    Pagination, Spin, Table, Button,
} from 'antd';
import { Link } from 'react-router-dom';
import UpLoadFileModal from '../../../../common/components/modal/UpLoadFileModal';
import { CREATE_TASK_ORDER, DOWNLOAD_URL } from '../constants/Api';
import Functions from '../../../../../components/functions';


class TableList extends Component {
    state = {
        showUpLoadModal: false,
    };

    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
        },
        {
            title: '仓库名称',
            dataIndex: 'warehouse',
        },
        {
            title: '波次单号',
            dataIndex: 'waveNumber',
            render: (text, record) => (
                <Link
                    to={`/wms/outboundmanage/pickingtask/detail/?key=${record.key}&waveNumber=${text}`}
                    style={{ textDecoration: 'underline' }}
                >{text}
                </Link>
            ),
        },
        {
            title: '拣货类型',
            dataIndex: 'orderType',
        },
        {
            title: '任务优先级',
            dataIndex: 'taskPriority',
        },
        {
            title: '生成时间',
            dataIndex: 'generatedTime',
        },
        {
            title: '拣货员',
            dataIndex: 'picker',
        },
        {
            title: '完成时间',
            dataIndex: 'overTime',
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
            <div className="breadcrumb padding-sm margin-ss-top">
                <Functions
                    {...this.props}
                    functionkey="012-000006-000002-002"
                >
                    <div className="text-right margin-sm-bottom">
                        <Button onClick={() => {
                            this.setState({
                                showUpLoadModal: true,
                            });
                        }}
                        > 手动生成任务
                        </Button>
                    </div>
                </Functions>
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
                <UpLoadFileModal
                    downLoadUrl={DOWNLOAD_URL}
                    closeModal={() => {
                        this.setState({
                            showUpLoadModal: false,
                        });
                    }}
                    width={550}
                    submitUrl={CREATE_TASK_ORDER}
                    visible={this.state.showUpLoadModal}
                    title="手动生成任务"
                    hint="xls文件中一次上传的数量最好不要超过1000，文件大小最好不要超过500K"
                />
            </div>
        );
    }
}

export default TableList;
