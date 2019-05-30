import React, { Component } from 'react';
import { Table } from 'antd';
import { getStateName, timestampFromat } from '../../../../utils';
import { bindingState } from '../constants';

class App extends Component {
    state = {
        accountId: '',
    }

    columns = [
        {
            title: '绑定邮箱',
            dataIndex: 'bindingEmail',
            width: 200,
            align: 'center',
            render(text, record) {
                return (
                    <div>
                        <span>{ record.bindingEmail }</span>
                        <span>{ record.isEffective === 1 && (record.bindingEmailType === 1 ? '（主）' : '（辅）')}</span>
                    </div>
                );
            },
        }, {
            title: '邮箱状态',
            dataIndex: 'bindingEmailState',
            width: 100,
            align: 'center',
            render(text) {
                return (
                    <div>
                        { getStateName(text, bindingState, 'code') }
                    </div>
                );
            },
        }, {
            title: '绑定时间',
            dataIndex: 'bindingEmailTime',
            width: 150,
            align: 'center',
            render(text) {
                return (
                    <div>
                        { timestampFromat(text, 'yyyy-mm-dd hh:MM:ss') }
                    </div>
                );
            },
        }, {
            title: '操作',
            dataIndex: 'binding',
            width: 100,
            align: 'center',
            render: (text, record) => {
                const info = record.bindingEmailType === 1 ? '主' : '辅';
                let options = (
                    <span
                        onClick={() => {
                            this.props.onChangeSettingEmailType(
                                this.state.accountId,
                                record.bindingEmailId,
                                record.bindingEmailType,
                                `确定设置该邮箱为${info}邮箱？`,
                            );
                        }}
                        style={{ cursor: 'pointer', color: '#4D7BFE' }}
                    >{`设为${info}邮箱`}
                    </span>
                );
                if (record.isEffective === 1 || record.bindingEmailState === 4) {
                    options = [];
                }
                return (
                    <div>
                        {options}
                    </div>
                );
            },
        },
    ]

    componentDidMount() {
        const { item } = this.props;
        this.setState({
            accountId: item.accountId,
        });
        this.props.logListFetch(item.accountId);
    }

    render() {
        const { data } = this.props.logListReducer;
        return (
            <div>
                <Table
                    bordered
                    size="small"
                    columns={this.columns}
                    dataSource={data}
                    rowKey={(record, index) => (index)}
                    pagination={false}
                />
            </div>
        );
    }
}

export default App;
