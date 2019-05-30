import React from 'react';
import {
    Table,
    Spin,
    Pagination,
    Menu,
    Dropdown,
    Button,
    Icon,
    message,
} from 'antd';
import { fetchPost } from '@/util/fetch';
import Functions from '../../../../components/functions';
import PopConfirm from '../../../../common/components/confirm';
import { DELETE,EXPORT } from '../constants/Api';
import { parseStrToArray } from '../../../../util/StrUtil';

export default class Tables extends React.Component {
    state = {
        selectedRowKeys: [],
    }
    columns =[
        {
            title: '角色类型',
            dataIndex: 'roleType',
        },
        {
            title: '人员名称',
            dataIndex: 'personnelName',
        },
        {
            title: '账号',
            dataIndex: 'accountNumber',
        },
        {
            title: '联系电话',
            dataIndex: 'contactNumber',
        },
        {
            title: '创建时间',
            dataIndex: 'creationTime',
        },
        {
            title: '最后编辑时间',
            dataIndex: 'lastTditingTime',
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
               <div>
                   <Functions
                       {...this.props}
                       functionkey="010-000004-000004-005"
                   >
                       <span
                           className="text-warning"
                           onClick={() => this.props.showAddUpdateModal(record)}
                       >
                           编辑
                       </span>
                   </Functions>

                   <Functions
                       {...this.props}
                       functionkey="010-000004-000004-006"
                   >
                       <span
                           className="text-warning margin-ss-left"
                           onClick={
                               () => PopConfirm('是否确认要删除？', '', () => this.onDeleteConfirm(record))}
                       >
                           删除
                       </span>
                   </Functions>
               </div>
            ),
        },
    ];

    // 删除
    onDeleteConfirm = (record) => {
        let keyArr = this.state.selectedRowKeys;
        if(record.key === null || record.key === undefined){
            if(keyArr.length === 0){
                message.warning("请先选择数据！");
                return false
            }
        }
        keyArr = record.key ?  [record.key] : keyArr;
        fetchPost(DELETE, {data: {keys:keyArr}}, 1)
            .then(result => {
                if(result.state === '000001') {
                    this.props.onSearch()
                }
            })
    }

    // 数据导出
    handleExport = () => {
        const formData = { ...this.props.form.getFieldsValue() };
        if (formData.searchContents) {
            formData.searchContents = formData.searchContents;
            formData.searchType = formData.searchType;
        } else {
            delete formData.searchType;
        }
        if (formData.searchContents) {
            formData.searchContents = parseStrToArray(formData.searchContents);
            if (formData.searchContents.length >= 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            }
        }
        this.onConfirm({data: { ...formData }});
    };

     // 确认弹窗
     onConfirm = (params) => {
        this.setState({ exportLoading: true });
        fetchPost(EXPORT, params, 2).then((result) => {
            this.setState({ exportLoading: false });
            if (result.state === '000001') {
                message.success(result.msg);
                setTimeout(() => {
                    window.open('/pms/importexportmanage/importexportlist/', '_blank');
                },2000)
            }
        });
    }

    render() {
        const {
            loadingState,
            data,
            onSearch,
            pageNumber,
            pageData,
        } = this.props;
        const total = data.total;
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
                        functionkey="010-000004-000004-006"
                    >
                        <span
                            className="text-warning"
                            style={{fontSize: '12px'}}
                            onClick={
                                () => {
                                    PopConfirm('是否确认要删除？', '', () => this.onDeleteConfirm({ purchaseId: null }));
                                }
                            }
                        >
                            删除
                        </span>
                    </Functions>

                </Menu.Item>
            </Menu>
        );

        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="overflow-hidden">
                    <div className="pull-left">
                        <Dropdown overlay={menu}>
                            <Button>批量操作<Icon type="down" /></Button>
                        </Dropdown>
                    </div>
                    <div className="pull-right">
                        <Functions
                            {...this.props}
                            functionkey="010-000004-000004-004"
                        >
                            <Button
                                onClick={() => this.props.showAddUpdateModal()}
                                className="margin-ss-right"
                            >
                                <Icon type="plus" />
                                新增用户
                            </Button>
                        </Functions>

                        <Functions
                            {...this.props}
                            functionkey="010-000004-000004-003"
                        >
                            <Button
                                onClick={this.handleExport}
                                className="margin-ss-right"
                            >
                                <Icon type="upload" />
                                数据导出
                            </Button>
                        </Functions>

                        <Functions
                            {...this.props}
                            functionkey="010-000004-000004-002"
                        >
                            <Button
                                onClick={() => this.props.showImportModal()}
                            >
                                <Icon type="download" />
                                数据导入
                            </Button>
                        </Functions>
                    </div>
                </div>
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={data.list}
                            pagination={false}
                            size="small"
                            bordered
                            rowSelection={rowSelection}
                        />
                        <Pagination
                            showTotal={num => `共 ${num} 条`}
                            pageSizeOptions={['20', '30', '40', '50']}
                            showSizeChanger
                            showQuickJumper={{ goButton: true }}
                            current={pageNumber}
                            defaultCurrent={1}
                            onShowSizeChange={onSearch}
                            total={total}
                            pageSize={pageData}
                            onChange={onSearch}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
