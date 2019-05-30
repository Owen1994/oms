import React from 'react';
import {Modal, Spin, Table, Pagination, Tooltip} from 'antd';

import {fetchPost} from '../../../../util/fetch';
import { Trajectory_Log_List_Api } from '../constants/Api';

export default class LogModal extends React.Component {

    state = {
        loading: false,
        pageNumber: 1,
        pageData: 20,
        datas: {list: [], total: 0},
    };

    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: 30,
            render: (value, record, index) => (
                (this.state.pageNumber-1)*this.state.pageData + index+1
            )
        },
        {
            title: '匹配关键词',
            dataIndex: 'content',
            width: 200,
            render: (value) => {
                let showMore = false;
                let keyWord = '';
                if (value) {
                    if (value.length > 60) {
                        showMore = true;
                        keyWord = value.substring(0, 60);
                    }
                }
                return showMore ? (
                    <div>
                        <span className="channel-state-key-word">
                            <Tooltip overlayClassName="channel-state-bounced" placement={"top"} title={value} overlayStyle={{overflowY:'scroll', maxHeight: '300px', maxWidth: '400px'}}>
                                {keyWord}
                                <a>{" >>"}</a>
                            </Tooltip>
                        </span>
                    </div>
                ) : (
                    <div>
                        <span className="channel-state-key-word">{value}</span>
                    </div>
                )
            },
        },
        {
            title: '操作人员',
            dataIndex: 'operator',
            width: 100,
        },
        {
            title: '操作时间',
            dataIndex: 'operatTime',
            width: 100,
        }
    ];

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
        const data = { pageData, pageNumber, key, type: 3 };
        fetchPost(Trajectory_Log_List_Api, { data: data }, 2)
            .then(result => {
                this.setState({loading: false})
                if (result.state === '000001') {
                    const data = this.conversionData(result.data);
                    this.setState({
                        datas: data,
                    })
                }
            })
    };

    conversionData = (dataLists) => {
        dataLists.list.forEach(t => {
            t.conversionKeyWord = t.content ? (t.content).replace(/,/g, '\n') : '';
            t.operatTime = t.operatTime ? t.operatTime : '--';
        })
        return dataLists;
    };


    render() {
        const {loading, datas, pageData, pageNumber} = this.state
        const {visible} = this.props;
        const dataSource = datas.list;
        return (
            <Modal
                destroyOnClose={true}
                title="日志"
                width={800}
                visible={visible}
                footer={null}
                onCancel={this.props.onCancel}
            >
                <Spin spinning={loading} delay={300} tip="Loading...">
                    <div className={"clear"}>
                        <Table
                            className="channel-state-table"
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
