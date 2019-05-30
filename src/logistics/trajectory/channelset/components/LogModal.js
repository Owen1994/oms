import React from 'react';
import {Modal, Spin, Table, Pagination } from 'antd';
import PropTypes from 'prop-types';

import { fetchPost } from '../../../../util/fetch';
import { parseLogData1 } from '../seclector';
import { LOG_LIST_API } from '../constants/Api';

export default class LogModal extends React.Component {

    state = {
        loading: false,
        datas: {list: [], total: 0}
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: 50,
            render: (value, record, index) => (
                (this.state.pageNumber-1)*this.state.pageData + index+1
            )
        },
        {
            title: '操作内容',
            dataIndex: 'contents',
            width: 300,
            render: (value, record) => (
                <div>
                    <div className="yks-erp-column-label-wrap">
                        <span className="column-label-wrap_left">启用状态:</span>
                        <span className="column-label-wrap_right">{record.state}</span>
                    </div>
                    <div className="yks-erp-column-label-wrap">
                        <span className="column-label-wrap_left">仓库:</span>
                        <span className="column-label-wrap_right">{record.warehouse}</span>
                    </div>
                </div>
            )
        },
        {
            title: '操作人员',
            dataIndex: 'operator',
            width: 100,
        },
        {
            title: '操作时间',
            dataIndex: 'operatTime',
            width: 150,
        }
    ]

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible;
        const preVisible = this.props.visible;
        const item = nextProps.item;
        if (visible && !preVisible && item) {
            this.setState({
                key: item.key
            }, function(){
                this.queryLogDatas(1, 20);
            });
        }
    }

    queryLogDatas = (pageNumber=1, pageData=20) => {
        this.setState({loading: true, pageNumber, pageData});
        const key = this.state.key;
        const data = { pageData, pageNumber, key};
        fetchPost(LOG_LIST_API, { data }, 2)
            .then(result => {
                this.setState({loading: false})
                if (result.state === '000001') {
                    this.setState({
                        datas: parseLogData1(result.data)
                    })
                }
            })
    }

    render() {
        const {loading, datas, pageData, pageNumber} = this.state
        const {visible} = this.props;
        const dataSource = datas.list;
        return (
            <Modal
                destroyOnClose={true}
                title="日志"
                width={1000}
                visible={visible}
                footer={null}
                onCancel={this.props.onCancel}
            >
                <Spin spinning={loading} delay={300} tip="Loading...">
                    <div className={"clear"}>
                        <Table
                            className="channelset-log-table"
                            dataSource={dataSource}
                            columns={this.columns}
                            size="small"
                            bordered={true}
                            pagination={false}
                        />
                        <div className="pull-right">
                            <Pagination
                                showTotal={logTotal => `共 ${logTotal} 条`}
                                pageSizeOptions={['10', '20', '30', '40', '50']}
                                showSizeChanger
                                showQuickJumper={{goButton: true}}
                                current={pageNumber}
                                defaultCurrent={1}
                                onShowSizeChange={this.queryLogDatas}
                                total={datas.total}
                                pageSize={pageData}
                                onChange={this.queryLogDatas}/>
                        </div>
                    </div>
                </Spin>
            </Modal>
        )
    }
}

LogModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired
}
