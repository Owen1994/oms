/**
 *作者: chenlin
 *功能描述: PRtable
 *时间: 2018/10/27 11:55
 */
import React from 'react';
import {
    Table,
    Spin,
} from 'antd';


export default class table extends React.Component {

    state = {
        sortedInfo: {},
    }

    handleChange = (pagination, filter, sorter) => {
        this.setState({ sortedInfo: sorter });
    }

    render() {
        const {
            dataList,
            loadingState,
        } = this.props;
        const { sortedInfo } = this.state;
        const columns = [{
            title: '排名',
            dataIndex: 'rankingIdx',
            key: 'rankingIdx',
            // sorter: (a, b) => a.rankingIdx - b.rankingIdx,
            // sortOrder: sortedInfo.columnKey === 'rankingIdx' && sortedInfo.order,
        }, {
            title: 'sku',
            dataIndex: 'sku',
            key: 'sku',
            sorter: (a, b) => a.sku.charCodeAt(0) - b.sku.charCodeAt(0),
            sortOrder: sortedInfo.columnKey === 'sku' && sortedInfo.order,
        }, {
            title: '中文名',
            dataIndex: 'cnName',
            key: 'cnName',
            sorter: (a, b) => {
                // return a.cnName.charCodeAt(0) - b.cnName.charCodeAt(0)
                // const aa = a.cnName ? a.cnName.charCodeAt(0) : 0;
                // const bb = b.cnName ? b.cnName.charCodeAt(0) : 0;
                // return aa - bb;
                const aa = a.cnName ? a.cnName : '';
                const bb = b.cnName ? b.cnName : '';
                return aa.localeCompare(bb);
            },
            sortOrder: sortedInfo.columnKey === 'cnName' && sortedInfo.order,
        }, {
            title: '销量',
            dataIndex: 'skuCount',
            key: 'skuCount',
            sorter: (a, b) => a.skuCount - b.skuCount,
            sortOrder: sortedInfo.columnKey === 'skuCount' && sortedInfo.order,
        }];
        return (
            <div className="gallery-table breadcrumb margin-ms-top padding-sm">
                <div className="margin-ss-top">
                    <Spin spinning={loadingState} delay={500} tip="Loading...">
                        <Table
                            columns={columns}
                            dataSource={dataList}
                            onChange={this.props.sorter}
                            pagination={false}
                            size="small"
                            bordered
                            onChange={this.handleChange}
                        />
                    </Spin>
                </div>
            </div>
        );
    }
}
