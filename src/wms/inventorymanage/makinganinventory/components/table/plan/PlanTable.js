import React, { Component } from 'react';
import {
    Button,
    Pagination, Spin, Table,
} from 'antd';
import Tableoption from '../../../../../../components/Tableoption';
import UpLoadFileModal from '../../../../../common/components/modal/UpLoadFileModal';
import { UPLOAD_INFO_LIST } from '../../../constants/table';
import { downlodFile, fetchPost } from '../../../../../../util/fetch';
import { PLAN_CANCEL_INVENTORY, PLAN_DOWNLOAD_INVENTORYLIST } from '../../../constants/Api';
import CreatePlanModal from '../../modal/CreatePlanModal';
import PopConfirm from '../../../../../../common/components/confirm';
import { hasPerssion } from '../../../../../../util/baseTool';

// 盘点计划
class TableList extends Component {
    state = {
        showCreatePlanModal: false,
        showUpLoadModal: false,
        uploadInfo: {},
        uploadKey: undefined,
    };

    columns = [
        {
            title: '序号',
            key: 'index',
            render: (text, record, index) => (this.props.pageNumber - 1) * this.props.pageData + (index + 1),
        },
        {
            title: '仓库名称',
            width: 100,
            dataIndex: 'warehouseName',
        },
        {
            title: '盘点单号',
            dataIndex: 'inventoryNumber',
            render: (text, data) => (
                hasPerssion('012-000001-000002-002', this.props)
                    ? <a onClick={this.props.showDrawer.bind(null, data.inventoryNumber)}>{text}</a> : data.inventoryNumber
            ),
        },
        {
            title: '盘点类型',
            width: 100,
            dataIndex: 'inventoryType',
        },
        {
            title: '储位区间',
            dataIndex: 'storageInterval',
        },
        {
            title: '盘点状态',
            dataIndex: 'inventoryStatus',
        },
        {
            title: '复盘临界值',
            dataIndex: 'complexThreshold',
        },
        {
            title: '创建人',
            dataIndex: 'creator',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '完成时间',
            dataIndex: 'endTime',
        },
        {
            title: '操作',
            width: 150,
            render: (text, record) => {
                if (record.inventoryType === '循环盘点') {
                    return <div />;
                }
                const moreOptions = [
                    {
                        name: '下载',
                        funcId: '012-000001-000002-003',
                        onChange: () => {
                            this.downLoadInventoryList(record.key);
                        },
                        subs: [],
                    },
                    {
                        name: '上传初盘结果',
                        funcId: '012-000001-000002-004',
                        onChange: () => {
                            this.setState({
                                uploadInfo: UPLOAD_INFO_LIST[0],
                                uploadKey: record.key,
                                showUpLoadModal: true,
                            });
                        },
                        subs: [],
                    },
                    {
                        name: '上传复盘单',
                        subs: [],
                        funcId: '012-000001-000002-005',
                        onChange: () => {
                            this.setState({
                                uploadInfo: UPLOAD_INFO_LIST[1],
                                uploadKey: record.key,
                                showUpLoadModal: true,
                            });
                        },
                    },
                    {
                        name: '取消',
                        onChange: () => {
                            this.cancel(record.key);
                        },
                        funcId: '012-000001-000002-006',
                        subs: [],
                    },
                ];
                return (
                    <Tableoption
                        isRender
                        {...this.props}
                        options={moreOptions}
                    />
                );
            },
        },
    ];

    cancel = (key) => {
        PopConfirm('取消', '确定取消吗?', () => {
            fetchPost(PLAN_CANCEL_INVENTORY, {
                data: {
                    key,
                },
            }, 1).then((result) => {
                if (result.state === '000001') {
                    this.props.onChangeListener();
                }
            });
        });
    };

    downLoadInventoryList = (key) => {
        fetchPost(PLAN_DOWNLOAD_INVENTORYLIST, {
            data: {
                key,
            },
        }, 1).then((result) => {
            if (result.state === '000001') {
                downlodFile(result.data.fileUrl);
            }
        });
    };

    review = () => {
        this.setState({
            showUpLoadModal: true,
        });
    };

    // 上传成功后的回调
    uploadSuccess = (result) => {
        const { fileUrl } = result.data;
        if (fileUrl) {
            downlodFile(fileUrl);
        }
        const {
            pageNumber,
            pageData,
            onChangeListener,
        } = this.props;
        if (onChangeListener) {
            onChangeListener(pageNumber, pageData);
        }
    };

    render() {
        const {
            partList,
            loadingState,
            pageNumber,
            pageData,
            onChangeListener,
        } = this.props;
        const { uploadInfo } = this.state;
        return (
            <div className="breadcrumb padding-sm margin-ss-top">
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <div className="wms-addBtn">
                        <Button
                            icon="plus"
                            onClick={() => {
                                this.setState({
                                    showCreatePlanModal: true,
                                });
                            }}
                        >
                            盘点计划
                        </Button>
                    </div>
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
                <UpLoadFileModal // 上传复盘单
                    closeModal={() => {
                        this.setState({
                            showUpLoadModal: false,
                        });
                    }}
                    width={550}
                    sumbitSuccess={this.uploadSuccess}
                    params={{ key: this.state.uploadKey }}
                    submitUrl={uploadInfo.submitUrl || ''}
                    visible={this.state.showUpLoadModal}
                    title={uploadInfo.title}
                    hint="xls文件中一次上传的数量最好不要超过1000，文件大小最好不要超过500K"
                />
                <CreatePlanModal
                    cancel={() => this.setState({
                        showCreatePlanModal: false,
                    })}
                    visible={this.state.showCreatePlanModal}
                    ok={() => {
                        onChangeListener();
                    }}
                />
            </div>
        );
    }
}

export default TableList;
