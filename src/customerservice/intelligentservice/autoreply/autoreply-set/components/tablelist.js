import React from 'react';
import {
    Button,
    Spin,
    Table,
    Pagination,
    Menu,
    Dropdown,
    Icon,
    Switch,
    message,
    Modal,
} from 'antd';
import { page } from '@/constants/page';
import PopConfirm from '../../../../../common/components/confirm';
import { fetchPost } from '../../../../../util/fetch';
import Functions from '@/components/functions';
import { functions } from '@/util/baseTool';
import {
    GET_DEL_RULE_API,
} from '../constants/Api';
import { sendTypeData } from '../constants/index';

const confirm = Modal.confirm;

export default class Tablelist extends React.Component {
    state = {}
    
    columns = [
        {
            title: '适用平台',
            key: 'platform',
            dataIndex: 'platform',
            align: 'center',
            width: 100,
        },
        {
            title: '规则名称',
            key: 'ruleName',
            dataIndex: 'ruleName',
            align: 'center',
            width: 100,
        },
        {
            title: '适用板块',
            key: 'plateName',
            dataIndex: 'plateName',
            align: 'center',
            width: 100,
        },
        {
            title: '发送方式',
            dataIndex: 'sendType',
            key: 'sendType',
            align: 'center',
            width: 100,
            render: (text) => {
                const data = sendTypeData.find(v => v.key === text);
                return data ? data.label : '';
            },
        },
        {
            title: '适用模块名称',
            key: 'templateName',
            dataIndex: 'templateName',
            align: 'center',
            width: 100,
        },
        {
            title: '规则状态',
            key: 'ruleState',
            dataIndex: 'ruleState',
            align: 'center',
            width: 100,
            render: (text, record) => {
                const checked = text === 1;
                const { switchDisable } = this.state;
                return (
                    <Switch
                        disabled={switchDisable}
                        checkedChildren="启用"
                        unCheckedChildren="停用"
                        checked={checked}
                        onClick={() => this.toggleRule({ ruleId: record.ruleId, ruleState: checked ? 0 : 1 })}
                    />
                );
            },
        },
        {
            title: '操作',
            align: 'center',
            key: 'options',
            width: 100,
            render: (text, record) => {
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="009-000005-000001-002">
                                <a onClick={() => this.props.openModal(2, record)}>
                                    编辑
                                </a>
                            </Functions>
                        </Menu.Item>
                        <Menu.Item>
                            <Functions {...this.props} functionkey="009-000005-000001-004">
                                <a onClick={() => PopConfirm('提示',
                                    '确定删除吗？',
                                    () => this.synchronizeOrder(record.ruleId))}
                                >
                                    删除
                                </a>
                            </Functions>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div>
                        <Functions {...this.props} functionkey="009-000005-000001-001">
                            <a style={{ display: 'inline-block', marginRight: 10 }} onClick={() => this.props.openModal(3, record)}>
                                查看
                            </a>
                        </Functions>
                        {
                            record.ruleState === 0 ? (
                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link">
                                        更多
                                        <Icon type="down" />
                                    </a>
                                </Dropdown>
                            ) : null
                        }
                    </div>
                );
            },
        },
    ];

    componentDidMount() {
        const { menuInfos } = this.props;
        const pathname = location.pathname;
        const keys = menuInfos.functions[pathname] || [];
        this.setState({ switchDisable: !keys.includes('009-000005-000001-008') })
    }

    synchronizeOrder = (ruleId) => {
        const { pageNumber, pageData } = this.props;
        fetchPost(GET_DEL_RULE_API, { ruleId }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.props.handleSubmit(pageNumber, pageData);
                }
            });
    }

    toggleRule = (params) => {
        if (!functions(this, '009-000005-000001-002')) return;
        const { toggleRuleAsync, handleSubmit } = this.props;
        const { ruleState } = params;
        const title = ruleState ? '开启' : '关闭';
        confirm({
            title: '提示',
            content: `是否${title}当前规则`,
            onOk: () => {
                toggleRuleAsync(params)
                    .then((result) => {
                        if (result) {
                            message.success('规则状态切换成功');
                            handleSubmit();
                        }
                    });
            },
        });
    }

    render() {
        const {
            list, total, pageNumber, pageData, handleSubmit, loading, openModal,
        } = this.props;
        return (
            <div className="autoreply-set-tablelist">
                <Functions {...this.props} functionkey="009-000005-000001-002">
                    <div className="autoreply-set-addBtn">
                        <Button icon="plus" onClick={() => openModal(1)}>新增规则</Button>
                    </div>
                </Functions>
                <div className="ebayorder-table">
                    <Spin spinning={loading}>
                        <Table
                            bordered
                            size="small"
                            columns={this.columns}
                            dataSource={list}
                            pagination={false}
                            rowKey={record => record.ruleId}
                        />
                    </Spin>
                </div>
                <Pagination
                    showTotal={t => `共 ${t} 条`}
                    pageSizeOptions={page.pageSizeOptions}
                    showSizeChanger // 是否可以改变 pageSize
                    current={pageNumber}
                    showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                    total={total} // 数据总数
                    pageSize={pageData} // 每页条数
                    onChange={handleSubmit} // 页码改变的回调，参数是改变后的页码及每页条数
                    onShowSizeChange={handleSubmit} // pageSize 变化的回调
                    size="small"
                />
            </div>
        );
    }
}
