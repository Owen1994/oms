import React from 'react';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
    message,
    Button,
    Select,
    Spin,
    Icon,
    Dropdown,
    Menu,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { strTrim } from '../../../../util/baseTool';
import {
    GET_WAREHOUSE_LIST,
    ADD_WAREHOUSE_LIST,
    DELETE_WAREHOUSE_LIST,
} from '../constants/Api';
import { GET_WAREHOUSE_TYPE } from '../../../common/constants/Api';
// import CSelect from '../../../../components/cselect';

// const FormItem = Form.Item;
const Option = Select.Option;

class WarehouseModal extends React.Component {
    state = {
        ifWareAbleToEdit: false,
        warehouseType: [],
        spinning: false,
    };

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    componentDidMount() {
        fetchPost(GET_WAREHOUSE_TYPE, {}, 2)
            .then((result) => {
                if (result.state === '000001') {
                    const data = result.data.list;
                    data.map((v) => {
                        this.setState((prevState) => {
                            const warehouseType = prevState.warehouseType;
                            warehouseType.push(v);
                            return {
                                ...prevState,
                                warehouseType,
                            };
                        });
                        return true;
                    });
                }
            });
    }

    componentWillReceiveProps(nextProps) {
        const prevVisible = this.props.visible;
        const visible = nextProps.visible;
        if (prevVisible !== visible && visible && nextProps.groupKey === 1) {
            this.initData(GET_WAREHOUSE_LIST);
        } else if (prevVisible === visible && visible && nextProps.warehousemodaldata.length === 0) { // 删除最后一条数据时生成空白行
            this.props.addWarehouseItem();
        }
    }

    // 初始化数据
    initData = (url) => {
        fetchPost(url, {}, 2)
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
                                address: v.address,
                                contact: v.contact,
                                contactPhone: v.contactPhone,
                                remarks: v.remarks,
                                warehouseType: v.warehouseType,
                                warehouseTypeName: v.warehouseTypeName,
                                ifEditing: false,
                            });
                            return true;
                        });
                        this.props.initWarehouseItem({ value: newData });
                    } else if (this.props.warehousemodaldata.length < 1) { // 初始化时避免重复新增空白行
                        this.props.addWarehouseItem();
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
            this.setState({ ifWareAbleToEdit: true }); // 新增时可编辑仓库类别、代码
            this.props.addWarehouseItem();
        }
    }

    // 输入
    handleInputChange = (e, index, inputType, key) => {
        let val;
        if (inputType === 'warehouseType') {
            val = e;
        } else {
            val = strTrim(e.target.value);
        }
        this.props.modifyWarehouseItem({
            index, inputType, key, value: val,
        });
    }

    // 编辑
    handleEdit = (index, item) => {
        const ifExistEditingRow = this.ifExistEditingRow();
        if (typeof ifExistEditingRow === 'number' && ifExistEditingRow !== index) {
            message.info('请先保存正在编辑行数据!');
        } else {
            this.setState({ ifWareAbleToEdit: false }); // 编辑时禁止编辑仓库类别、代码
            this.props.editWarehouseItem({ index, key: item.key });
        }
    }

    // 保存
    handleSave = (index, item) => {
        const obj = {
            groupKey: this.props.groupKey,
            code: item.code,
            name: item.name,
            address: item.address,
            contact: item.contact,
            contactPhone: item.contactPhone,
            remarks: item.remarks,
            warehouseType: item.warehouseType,
        };
        this.setState({ spinning: true });
        if (item.key) { // 编辑后保存
            obj.key = item.key;
            fetchPost(ADD_WAREHOUSE_LIST, { data: obj }, 1)
                .then((result) => {
                    if (result.state === '000001') { // 接口保存成功后再保存reducer
                        this.props.saveWarehouseItem({ index, key: item.key });
                        this.setState({ spinning: false });
                    } else {
                        this.setState({ spinning: false });
                    }
                });
        } else { // 新增后保存
            fetchPost(ADD_WAREHOUSE_LIST, { data: obj }, 1)
                .then((result) => {
                    if (result.state === '000001') { // 接口保存成功后再保存reducer
                        this.props.saveWarehouseItem({ index });
                        this.initData(GET_WAREHOUSE_LIST);
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
            fetchPost(DELETE_WAREHOUSE_LIST, { data: { keys: [item.key] } }, 2)
                .then((result) => {
                    if (result.state === '000001') { // 接口保存成功后再保存reducer
                        this.props.delWarehouseItem({ index });
                    }
                });
        } else {
            this.props.delWarehouseItem({ index });
        }
    }

    // 是否有正在编辑行
    ifExistEditingRow = () => {
        const { warehousemodaldata } = this.props;
        let result = false;
        warehousemodaldata.map((item, index) => {
            if (item.ifEditing) {
                result = index;
            }
            return true;
        });
        return result;
    }

    render() {
        const { visible, warehousemodaldata } = this.props;
        const rowItems = warehousemodaldata ? warehousemodaldata.map((item, index) => {
            const warehouseType = this.state.warehouseType.filter(v => v.code === item.warehouseType);
            const warehouseTypeName = warehouseType.length > 0 ? warehouseType[0].name : null;
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
                    <Col span={2} className="wms-modal-col">
                        {
                            item.ifEditing && this.state.ifWareAbleToEdit ? (
                                <Select
                                    // value={item.warehouseType}
                                    style={{ width: 90 }}
                                    placeholder="请选择仓库类别"
                                    onChange={e => this.handleInputChange(e, index, 'warehouseType', item.key)}
                                >
                                    {
                                        this.state.warehouseType.map(v => (
                                            <Option key={v.code} value={v.code}>{v.name}</Option>
                                        ))
                                    }
                                </Select>
                            ) : <span>{item.warehouseTypeName ? item.warehouseTypeName : warehouseTypeName}</span>
                        }
                    </Col>
                    <Col span={2} className="wms-modal-col">
                        {
                            item.ifEditing && this.state.ifWareAbleToEdit ? (
                                <Input
                                    value={item.code}
                                    onChange={e => this.handleInputChange(e, index, 'code', item.key)}
                                    placeholder="请输入仓库代码"
                                    style={{ width: 90 }}
                                />
                            ) : <span>{item.code}</span>
                        }
                    </Col>
                    <Col span={3} className="wms-modal-col">
                        {
                            item.ifEditing ? (
                                <Input
                                    value={item.name}
                                    onChange={e => this.handleInputChange(e, index, 'name', item.key)}
                                    placeholder="请输入仓库名称"
                                />
                            ) : <span>{item.name}</span>
                        }
                    </Col>
                    <Col span={5} className="wms-modal-col">
                        {
                            item.ifEditing ? (
                                <Input
                                    value={item.address}
                                    onChange={e => this.handleInputChange(e, index, 'address', item.key)}
                                    placeholder="请输入仓库地址"
                                    style={{ width: 230 }}
                                />
                            ) : <span>{item.address}</span>
                        }
                    </Col>
                    <Col span={3} className="wms-modal-col">
                        {
                            item.ifEditing ? (
                                <Input
                                    value={item.contact}
                                    onChange={e => this.handleInputChange(e, index, 'contact', item.key)}
                                    placeholder="请输入联系人"
                                />
                            ) : <span>{item.contact}</span>
                        }
                    </Col>
                    <Col span={3} className="wms-modal-col">
                        {
                            item.ifEditing ? (
                                <Input
                                    value={item.contactPhone}
                                    onChange={e => this.handleInputChange(e, index, 'contactPhone', item.key)}
                                    placeholder="请输入联系电话"
                                />
                            ) : <span>{item.contactPhone}</span>
                        }
                    </Col>
                    <Col span={3} className="wms-modal-col">
                        {
                            item.ifEditing ? (
                                <Input
                                    value={item.remarks}
                                    onChange={e => this.handleInputChange(e, index, 'remarks', item.key)}
                                    placeholder="请输入备注"
                                />
                            ) : <span>{item.remarks}</span>
                        }
                    </Col>
                    <Col span={3}>
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
                    title="设置仓库项"
                    destroyOnClose
                    width={1200}
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
                        <div className="wms-modal-div wms-modal-warehouse-div">
                            <Row className="wms-modal-row">
                                <Col span={2} className="wms-modal-col">仓库类别</Col>
                                <Col span={2} className="wms-modal-col">仓库代码</Col>
                                <Col span={3} className="wms-modal-col">仓库名称</Col>
                                <Col span={5} className="wms-modal-col">仓库地址</Col>
                                <Col span={3} className="wms-modal-col">联系人</Col>
                                <Col span={3} className="wms-modal-col">联系电话</Col>
                                <Col span={3} className="wms-modal-col">备注</Col>
                                <Col span={3}>操作</Col>
                            </Row>
                            {rowItems}
                        </div>
                    </Spin>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(WarehouseModal);
