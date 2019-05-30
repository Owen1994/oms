import React, { Component } from 'react';
import {
    Button,
    Pagination, Spin, Table,
} from 'antd';
import Functions from '@/components/functions';
import { downlodFile } from '../../../../util/fetch';
import UpLoadFileModal from '../../../common/components/modal/UpLoadFileModal';
import { UPLOAD_VERSION } from '../constants/Api';

class TableList extends Component {
    state = {
        showUpLoadModal: false,
    };

    columns = [
        {
            title: '序号',
            key: 'index',
            render: (text, record, index) => <div>{index + 1}</div>,
        },
        {
            title: 'APK名称',
            dataIndex: 'versionName',
        },
        {
            title: 'APK版本',
            dataIndex: 'versionCode',
        },
        {
            title: '上传人',
            dataIndex: 'uploader',
        },
        {
            title: '上传时间',
            dataIndex: 'uploadTime',
        },
        {
            title: '操作',
            key: 'option',
            render: (text, record) => (
                <Functions {...this.props} functionkey="012-000005-000011-002">
                    <a onClick={() => downlodFile(record.downUrl)}>下载</a>
                </Functions>
            ),
        },
    ];


    render() {
        const {
            partList,
            loadingState,
            handleSubmit,
        } = this.props;
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Functions {...this.props} functionkey="012-000005-000011-003">
                        <div className="wms-addBtn">
                            <Button
                                onClick={() => {
                                    this.setState({
                                        showUpLoadModal: true,
                                    });
                                }}
                                icon="upload"
                            >
                                上传
                            </Button>
                        </div>
                    </Functions>
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
                        onChange={handleSubmit}
                    />
                </Spin>
                <UpLoadFileModal // 上传apk
                    closeModal={() => {
                        this.setState({
                            showUpLoadModal: false,
                        });
                    }}
                    width={550}
                    submitUrl={UPLOAD_VERSION}
                    visible={this.state.showUpLoadModal}
                    title="上传"
                    type="application/vnd.android.package-archive"
                    hint="仅上传apk文件"
                />
            </div>
        );
    }
}

export default TableList;
