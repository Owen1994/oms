import React from 'react';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
    message,
    Button,
    Spin,
    Icon,
    Dropdown,
    Menu,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { strTrim } from '../../../../util/baseTool';
import {
    GET_CHILD_LIST,
    ADD_CHILD_LIST,
    DELETE_CHILD_LIST,
} from '../constants/Api';

class BodyModal extends React.Component {
    state = {
        spinning: false,
    };

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    componentWillReceiveProps(nextProps) {
        const prevVisible = this.props.visible;
        const visible = nextProps.visible;
        if (prevVisible !== visible && visible && nextProps.groupKey && nextProps.groupKey !== 1) {
            this.initData(GET_CHILD_LIST, nextProps.groupKey);
        } else if (prevVisible === visible && visible && nextProps.bodymodaldata.length === 0) { // 删除最后一条数据时生成空白行
            this.props.addBodyItem();
        }
    }

    // 初始化数据
    initData = (url, groupKey) => {
        fetchPost(url, { data: { groupKey } }, 2)
            .then((result) => {
                if (result.state === '000001') {
                    const data = result.data.list;
                    if (data.length > 0) {
                        const newData = [];
                        data.map((v) => {
                            newData.push({
                                itemKey: Date.now(),
                                key: v.key,
                                code: v.code,
                                name: v.name,
                                ifEditing: false,
                            });
                            return true;
                        });
                        this.props.initBodyItem({ value: newData });
                    } else if (this.props.bodymodaldata.length < 1) { // 初始化时避免重复新增空白行
                        this.props.addBodyItem();
                    }
                }
            });
    }

    // 取消
    handleCancel = () => {
        this.props.form.resetFields();
        this.props.closeModal();
    };

    // 新增行
    AddNewItem = () => {
        const ifExistEditingRow = this.ifExistEditingRow();
        if (ifExistEditingRow || ifExistEditingRow === 0) {
            message.info('请先保存正在编辑行数据!');
        } else {
            this.props.addBodyItem();
        }
    }

    // 输入
    handleInputChange = (e, index, inputType, key) => {
        const val = strTrim(e.target.value);
        this.props.modifyBodyItem({
            index, inputType, key, value: val,
        });
    }

    // 编辑
    handleEdit = (index, item) => {
        const ifExistEditingRow = this.ifExistEditingRow();
        if (typeof ifExistEditingRow === 'number' && ifExistEditingRow !== index) {
            message.info('请先保存正在编辑行数据!');
        } else {
            this.props.editBodyItem({ index, key: item.key });
        }
    }

    // 保存
    handleSave = (index, item) => {
        const obj = {
            groupKey: this.props.groupKey,
            code: item.code,
            name: item.name,
        };
        this.setState({ spinning: true });
        if (item.ifEditing && item.key) { // 编辑后保存
            obj.key = item.key;
            fetchPost(ADD_CHILD_LIST, { data: obj }, 1)
                .then((result) => {
                    if (result.state === '000001') { // 接口保存成功后再保存reducer
                        this.props.saveBodyItem({ index, key: item.key });
                        this.setState({ spinning: false });
                    } else {
                        this.setState({ spinning: false });
                    }
                });
        } else if (item.ifEditing && !item.key) { // 新增后保存
            fetchPost(ADD_CHILD_LIST, { data: obj }, 1)
                .then((result) => {
                    if (result.state === '000001') { // 接口保存成功后再保存reducer
                        this.props.saveBodyItem({ index });
                        this.initData(GET_CHILD_LIST, this.props.groupKey);
                        this.setState({ spinning: false });
                    } else {
                        this.setState({ spinning: false });
                    }
                });
        }
    }

    // 删除
    handleDelete = (index, item) => {
        if (item.key) {
            fetchPost(DELETE_CHILD_LIST, { data: { key: item.key } }, 2)
                .then((result) => {
                    if (result.state === '000001') { // 接口保存成功后再保存reducer
                        this.props.delBodyItem({ index });
                    }
                });
        } else {
            this.props.delBodyItem({ index });
        }
    }

    // 是否有正在编辑行
    ifExistEditingRow = () => {
        const { bodymodaldata } = this.props;
        let result = false;
        bodymodaldata.map((item, index) => {
            if (item.ifEditing) {
                result = index;
            }
            return true;
        });
        return result;
    }

    render() {
        const { visible, bodymodaldata, bodyTitle } = this.props;
        const rowItems = bodymodaldata ? bodymodaldata.map((item, index) => {
            const menu = (
                <Menu>
                    <Menu.Item>
                        {
                            item.ifEditing ? (
                                <a onClick={() => this.handleSave(index, item)}>
                                保存
                                </a>
                            ) : (
                                <a onClick={() => this.handleEdit(index, item)}>
                                编辑
                                </a>
                            )
                        }
                    </Menu.Item>
                    <Menu.Item>
                        <a onClick={() => this.handleDelete(index, item)}>
                            删除
                        </a>
                    </Menu.Item>
                </Menu>
            );
            return (
                <Row>
                    <Col span={9} className="wms-modal-col">
                        {
                            item.ifEditing ? (
                                <Input
                                    value={item.code}
                                    onChange={e => this.handleInputChange(e, index, 'code', item.key)}
                                    placeholder="请输入代码"
                                />
                            ) : <span>{item.code}</span>
                        }
                    </Col>
                    <Col span={9} className="wms-modal-col">
                        {
                            item.ifEditing ? (
                                <Input
                                    value={item.name}
                                    onChange={e => this.handleInputChange(e, index, 'name', item.key)}
                                    placeholder="请输入代码"
                                />
                            ) : <span>{item.name}</span>
                        }
                    </Col>
                    <Col span={6}>
                        {
                            index === 0 ? (
                                <div>
                                    <a
                                        className="wms-marginRight"
                                        onClick={this.AddNewItem}
                                    >
                                        新增
                                    </a>
                                    <Dropdown overlay={menu}>
                                        <a className="ant-dropdown-link">
                                            更多
                                            <Icon type="down" />
                                        </a>
                                    </Dropdown>
                                </div>
                            ) : (
                                <div>
                                    {
                                        item.ifEditing ? (
                                            <a
                                                className="wms-marginRight"
                                                onClick={() => this.handleSave(index, item)}
                                            >
                                            保存
                                            </a>
                                        ) : (
                                            <a
                                                onClick={() => this.handleEdit(index, item)}
                                                className="wms-marginRight"
                                            >
                                            编辑
                                            </a>
                                        )
                                    }
                                    {
                                        <a
                                            onClick={() => this.handleDelete(index, item)}
                                        >
                                            删除
                                        </a>
                                    }
                                </div>
                            )
                        }
                    </Col>
                </Row>
            );
        }) : null;
        return (
            <div className="wms-modal">
                <Modal
                    visible={visible}
                    title={bodyTitle}
                    destroyOnClose
                    width={600}
                    onCancel={this.handleCancel}
                    footer={
                        <Button onClick={() => this.handleCancel()}>关闭</Button>
                    }
                >
                    <Spin
                        size="small"
                        indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
                        spinning={this.state.spinning}
                    >
                        <div className="wms-modal-div wms-modal-body-div">
                            <Row className="wms-modal-row">
                                <Col span={9} className="wms-modal-col">代码</Col>
                                <Col span={9} className="wms-modal-col">名称</Col>
                                <Col span={6}>操作</Col>
                            </Row>
                            {rowItems}
                        </div>
                    </Spin>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(BodyModal);
