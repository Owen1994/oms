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
} from 'antd';
import { Link } from 'react-router-dom';
import Functions from '../../../../components/functions';


export default class table extends React.Component {
    state = {
        selectedRowKeys: [],
    }

    columns = [{
        title: '规则名称',
        dataIndex: 'ruleName',
        key: 'ruleName',
    }, {
        title: '最近修改人',
        dataIndex: 'lastModifer',
        key: 'lastModifer',
    }, {
        title: '最近修改时间',
        dataIndex: 'lastModifyTime',
        key: 'lastModifyTime',
    }, {
        title: '操作',
        dataIndex: 'editBefore',
        key: 'editBefore',
        render: (text, record) => (
            <Functions
            isPage
            {...this.props}
            functionkey="010-000004-000003-002"
        >
            <span>
                <Link className="colorBlue" to={`/pms/basicconfig/purchasecheckruleset/editrule/?id=${record.key}`}>编辑</Link>
            </span>
            </Functions>
        ),
    }];


    render() {
        const {
            data,
            onSearch,
            loadingState,
        } = this.props;
        const totalNum = data.total;
        const { pageNumber, pageSize } = this.props.paginationData;
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys) => {
                this.setState({
                    selectedRowKeys: rowKeys,
                });
            },
        };
        return (
            <div className="gallery-table breadcrumb margin-ts-top padding-sm">
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={this.columns}
                            dataSource={data.list}
                            onChange={this.props.sorter}
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
