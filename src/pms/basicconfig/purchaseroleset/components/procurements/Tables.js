/**
 *作者: chenlin
 *功能描述: PRtable
 *时间: 2018/10/27 11:55
 */
import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Icon,
    Button,
    Menu,
    Dropdown,
    message,
} from 'antd';
import PopConfirm from '../../../../../common/components/confirm';
import {
    PROCUREMENT_ROLE_CONFIGUR_ATION_DELETE,
} from '../../constants';
import { fetchPost } from '../../../../../util/fetch';
import Functions from '../../../../../components/functions';
import {  PROCUREMENT_ROLE_CONFIGURATION_EXPORT } from '../../constants';
import { parseStrToArray } from '../../../../../util/StrUtil';

export default class table extends React.Component {
    state = {
        selectedRowKeys: [],
    }

    columns = [{
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
    }, {
        title: '采购名称',
        dataIndex: 'purchaseName',
        key: 'purchaseName',
    }, {
        title: '角色类型',
        dataIndex: 'roleType',
        key: 'roleType',
    }, {
        title: '采购员ID',
        dataIndex: 'purchaseId',
        key: 'purchaseId',
    }, {
        title: '人员名称',
        dataIndex: 'purchaseUserName',
        key: 'purchaseUserName',
    }, {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
    }, {
        title: '业务线',
        dataIndex: 'businessLine',
        key: 'businessLine',
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    }, {
        title: '最后编辑时间',
        dataIndex: 'lastModifyTime',
        key: 'lastModifyTime',
    }, {
        title: '操作',
        dataIndex: 'purchaseNumbers',
        key: 'purchaseNumbers',
        render: (text, record) => (
            <div>
                <Functions
                    {...this.props}
                    functionkey="010-000004-000001-004"
                >
                    <a
                        onClick={
                            () => {
                                PopConfirm(
                                    '是否确认要删除？',
                                    '',
                                    () => this.onDeleteConfirm(record));
                                }
                            }
                    >
                        删除
                    </a>
                </Functions>
            </div>
        ),
    }];


    onDeleteConfirm = (record) => {
        let purchaseId = this.state.selectedRowKeys;
        if (record.purchaseId === null || record.purchaseId === undefined) {
            if (purchaseId.length === 0) {
                message.warning('请先选择数据！');
                return false;
            }
        }
        purchaseId = record.key ? [record.key] : purchaseId;
        fetchPost(PROCUREMENT_ROLE_CONFIGUR_ATION_DELETE, { data: { keys: purchaseId } }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.setState({
                        selectedRowKeys: [],
                    });
                    this.props.onSearch();
                }
            });
    };

    // 数据导出
    handleExport = () => {
        const params = {};
        const data = { ...this.props.form.getFieldsValue() };
        data.roleType = Number.parseInt(data.roleType, 10);
        data.searchType = Number.parseInt(data.searchType, 10);
        data.searchContents = parseStrToArray(data.searchContents);
        if (data.searchContents.length >= 10) {
            message.warning('搜索内容不能超过10个');
            return false;
        }
        params.data = data;
        this.onConfirm(params);
    }

     // 确认弹窗
     onConfirm = (params) => {
        this.setState({ exportLoading: true });
        fetchPost(PROCUREMENT_ROLE_CONFIGURATION_EXPORT, params).then((result) => {
            this.setState({ exportLoading: false });
            if (result.state === '000001') {
                message.success(result.msg);
                setTimeout(() => {
                    window.location.href = '/pms/importexportmanage/importexportlist/';
                },2000)
            } else if (result.state === '000000') {
                message.warning(result.msg);
            }
        });
    }



    render() {
        const {
            procurementData,
            onSearch,
            loadingState,
        } = this.props;
        const totalNum = procurementData.total;
        const { pageNumber, pageSize } = this.props;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys) => {
                this.setState({
                    selectedRowKeys: rowKeys,
                });
            },
        };
        const menu = (
            <Menu>
                <Menu.Item>
                    <Functions
                        {...this.props}
                        functionkey="010-000004-000001-004"
                    >
                        <a
                            onClick={
                                () => {
                                    PopConfirm(
                                        '是否确认要删除？',
                                        '',
                                        () => this.onDeleteConfirm(
                                            { purchaseId: null }
                                            )
                                    );
                                }
                            }
                        >
                            删除
                        </a>
                    </Functions>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="gallery-table breadcrumb padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-left">
                        <Dropdown overlay={menu}>
                            <Button>批量操作<Icon type="down" /></Button>
                        </Dropdown>
                    </div>
                    <div className="pull-right">
                        <Functions
                            {...this.props}
                            functionkey="010-000004-000001-005"
                        >
                            <Button
                                onClick={this.handleExport}
                                className="margin-ss-right"
                                icon="upload"
                            >
                                数据导出
                            </Button>
                        </Functions>

                       <Functions
                           {...this.props}
                           functionkey="010-000004-000001-002"
                       >
                           <Button
                               onClick={() => this.props.toggleModal()}
                           >
                               <Icon type="plus" />新增
                           </Button>
                       </Functions>
                    </div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={procurementData.list}
                            pagination={false}
                            size="small"
                            bordered
                            rowSelection={rowSelection}
                        />
                        <Pagination
                            showTotal={total => `共 ${total} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={totalNum}
                            pageSize={pageSize}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
