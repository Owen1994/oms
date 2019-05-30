import React, { Component } from 'react';

import { Table, Divider } from 'antd';
import StandardItemRow from '../../../components/StandardItemRow';
import { getSkuLog, getSkuOptionsType ,getSinsitiveReason} from "../../../data";
import { getStateName, timestampFromat } from "../../../utils";
import Tableitem from '../../../components/Tableitem';

class App extends Component {
    state = {
        data: [],
        columns: [
            {
                title: '修改内容',
                dataIndex: 'editContent',
                key: 'editContent',
                width:200,
                render: (text, record) => {
                    return (
                        <div className="colon-separate">
                            <p><span>禁售信息：</span>{record.disableInfo}</p>
                            <p><span>敏感原因：</span>{
                                record.reason.map(v=>`${getSinsitiveReason[v.id] && getSinsitiveReason[v.id].name}(${v.remarks})`)
                            }</p>
                        </div>
                    )
                }
            }, {
                title: '操作类型',
                dataIndex: 'type',
                key: 'type',
                width:50,
                render: (text, record) => {
                    return (
                        <span>
                            {getStateName(text, getSkuOptionsType)}
                        </span>
                    )
                }
            }, {
                title: '修改人员',
                dataIndex: 'editions',
                key: 'editions',
                width:50,
                render: (text, record) => {
                    return (
                        <span>
                            {text}
                        </span>
                    )
                }
            }, {
                title: '修改时间',
                dataIndex: 'editTime',
                key: 'editTime',
                width:100,
                render: (text, record) => {
                    return (
                        <span>
                            {timestampFromat(text, 'yyyy-mm-dd hh:MM:ss')}
                        </span>
                    )
                }
            }
        ]
    }

    componentDidMount() {
        const { item } = this.props;
        getSkuLog({
            id: item.id
        }).then((result) => {
            this.setState({ data: result })
        });
    }

    render() {
        const { item } = this.props;
        const { data, columns } = this.state;
        return (
            <div>
                <Divider orientation="left">SKU：{item.sku}</Divider>
                <Table
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    rowKey={(record, index) => (index)}
                    size="small" />
            </div>
        );
    }
}

export default App;