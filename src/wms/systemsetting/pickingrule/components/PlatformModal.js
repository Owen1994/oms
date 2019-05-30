import React from 'react';
import {
    Modal,
    Form,
    // Input,
    // Row,
    // Col,
    Table,
    Button,
    message,
    Spin,
    Dropdown,
    Menu,
    Icon,
    Select,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { timestampFromat } from '../../../../util/baseTool';
// import CSelect from '../../../../components/cselect';
import { PLATFORMS } from '../../../common/constants/Api';
import {
    GET_PLATFORM_LIST,
    SET_PLATFORM_PRIORITY,
    DELETE_PLATFORM_PRIORITY,
} from '../constants/Api';

const Option = Select.Option;

class PlatformModal extends React.Component {
    columns = [
        {
            title: '平台',
            dataIndex: 'platformName',
            key: 'platformName',
            align: 'center',
            render: (text, record, index) => {
                const { ifEditing, platform } = this.state;
                return (
                    <div>
                        {
                            index === 0 && ifEditing ? (
                                <Select
                                    style={{ width: 120 }}
                                    placeholder="请选择"
                                    onChange={val => this.handleSelectChange(val, 'platformName')}
                                >
                                    {
                                        platform.map(item => (<Option key={item.code} value={item.name}>{item.name}</Option>))
                                    }
                                </Select>
                            ) : text
                        }
                    </div>
                );
            },
        },
        {
            title: '优先级',
            dataIndex: 'priority',
            key: 'priority',
            align: 'center',
            render: (text, record, index) => {
                const { ifEditing } = this.state;
                return (
                    <div>
                        {
                            index === 0 && ifEditing ? (
                                <Select
                                    style={{ width: 120 }}
                                    placeholder="请选择"
                                    onChange={val => this.handleSelectChange(val, 'priority')}
                                >
                                    <Option value="1">高</Option>
                                    <Option value="2">普通</Option>
                                </Select>
                            ) : text
                        }
                    </div>
                );
            },
        },
        {
            title: '操作人',
            dataIndex: 'operator',
            key: 'operator',
            align: 'center',
        },
        {
            title: '操作时间',
            dataIndex: 'operationTime',
            align: 'center',
            key: 'operationTime',
            render: text => timestampFromat(parseInt(text, 10), 2),
        },
        {
            title: '操作',
            dataIndex: 'operation',
            align: 'center',
            render: (text, record, index) => {
                const { ifEditing } = this.state;
                const menu = (
                    <Menu>
                        <Menu.Item>
                            {
                                ifEditing ? <a onClick={() => this.handleSave(record)}>保存</a> : null
                            }
                        </Menu.Item>
                        <Menu.Item>
                            <a onClick={() => this.handleDelete(record.key ? [record.key] : '')}>删除</a>
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <div>
                        {
                            index === 0 ? (
                                <div>
                                    <a style={{ display: 'inline-block', margin: '0 4px' }} onClick={this.addNewItem}>新增</a>
                                    <Dropdown overlay={menu}>
                                        <a className="ant-dropdown-link">
                                            更多
                                            <Icon type="down" />
                                        </a>
                                    </Dropdown>
                                </div>
                            ) : <a onClick={() => this.handleDelete(record.key ? [record.key] : '')}>删除</a>
                        }
                    </div>
                );
            },
        },
    ];

    state = {
        spinning: false,
        ifEditing: false,
        selectedRowKeys: [],
        platform: [],
    };

    componentWillReceiveProps(nextProps) {
        const prevVisible = this.props.visible;
        const visible = nextProps.visible;
        if (prevVisible !== visible && visible && nextProps.priorityName === '平台') {
            // 打开弹窗时初始化数据
            this.setState({
                spinning: false,
                ifEditing: false,
                selectedRowKeys: [],
                platform: [],
            });
            this.initData(GET_PLATFORM_LIST);
            this.loadPlatform(PLATFORMS);
        }
    }

    // 加载平台数据
    loadPlatform = (url) => {
        fetchPost(url, {})
            .then((result) => {
                if (result.state === '000001') {
                    const data = result.data.list;
                    this.setState({ platform: data });
                }
            });
    }

    // 初始化数据
    initData = (url) => {
        this.setState({
            spinning: true,
        });
        fetchPost(url, {}, 2)
            .then((result) => {
                if (result.state === '000001') {
                    const data = result.data.list;
                    if (data.length > 0) {
                        const newData = [];
                        data.map((v) => {
                            newData.push({
                                key: v.key,
                                platformName: v.platformName,
                                priority: v.priority,
                                operator: v.operator,
                                operationTime: v.operationTime,
                            });
                            return true;
                        });
                        this.setState({
                            ifEditing: false,
                            selectedRowKeys: [],
                        }, () => {
                            this.props.initPlatformItem({ value: newData });
                        });
                    } else {
                        // 初始化时避免重复新增空白行
                        this.props.clearPlatformItem();
                        this.addNewItem();
                    }
                    this.setState({
                        spinning: false,
                    });
                }
            });
    }

    // 取消
    handleCancel = () => {
        this.props.closeModal('平台');
    };

    // 新增行
    addNewItem = () => {
        const { ifEditing } = this.state;
        if (ifEditing) {
            message.info('请先保存正在编辑行数据!');
        } else {
            this.setState({ ifEditing: true }, () => {
                this.props.addPlatformItem();
            });
        }
    }

    // 输入
    handleSelectChange = (value, inputType) => {
        this.props.modifyPlatformItem({
            inputType,
            value,
        });
    }

    // 保存
    handleSave = (item) => {
        const obj = {
            platformCode: item.platformName,
            priority: item.priority,
        };
        this.setState({ spinning: true });
        fetchPost(SET_PLATFORM_PRIORITY, { data: obj }, 1)
            .then((result) => {
                if (result.state === '000001') {
                    this.initData(GET_PLATFORM_LIST);
                }
                this.setState({ spinning: false });
            });
    }

    // 删除
    handleDelete = (keys) => {
        this.setState({ spinning: true });
        if (keys && keys.length > 0) {
            fetchPost(DELETE_PLATFORM_PRIORITY, { data: { keys } }, 2)
                .then((result) => {
                    if (result.state === '000001') {
                        // 接口保存成功后再保存reducer
                        // this.props.delPlatformItem({ index });
                        this.initData(GET_PLATFORM_LIST);
                    }
                });
        } else if (!keys && this.props.platformmodaldata.length > 1) {
            // 新增的行正在编辑时未保存可以直接删除
            this.props.delPlatformItem({ index: 0 });
            this.setState({ ifEditing: false });
        }
        this.setState({ spinning: false });
    }

    // 批量删除
    deleteDataes = () => {
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length < 1) {
            return message.info('未选中数据！');
        }
        if (selectedRowKeys.includes('')) {
            this.props.delPlatformItem({ index: 0 });
            if (selectedRowKeys.filter(v => v !== '').length > 0) {
                this.handleDelete(selectedRowKeys);
            }
            this.setState({
                ifEditing: false,
                selectedRowKeys: [],
            });
        } else {
            this.handleDelete(selectedRowKeys);
        }
    }

    render() {
        const { visible, platformmodaldata } = this.props;
        const { spinning } = this.state;
        // 多选项配置
        const rowSelection = {
            columnWidth: 30,
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({
                    selectedRowKeys,
                });
            },
            hideDefaultSelections: true,
        };
        // 下拉列表
        const menu = (
            <Menu>
                <Menu.Item>
                    {/* <Functions {...this.props} functionkey="012-000005-000001-003"> */}
                    <a onClick={this.deleteDataes}>
                        批量删除
                    </a>
                    {/* </Functions> */}
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="wms-modal">
                <Modal
                    visible={visible}
                    title="设置平台优先级"
                    destroyOnClose
                    width={800}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div>
                        <div style={{ overflow: 'hidden' }}>
                            <Dropdown overlay={menu}>
                                <Button style={{ float: 'left', margin: '0 0 10px' }}>批量操作<Icon type="down" /></Button>
                            </Dropdown>
                        </div>
                        <Spin spinning={spinning} delay={500} tip="Loading...">
                            <Table
                                bordered
                                size="small"
                                columns={this.columns}
                                dataSource={platformmodaldata}
                                pagination={false}
                                rowKey={record => record.key}
                                rowSelection={rowSelection}
                            />
                        </Spin>
                    </div>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(PlatformModal);
