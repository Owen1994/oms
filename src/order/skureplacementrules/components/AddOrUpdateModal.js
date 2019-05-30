import React from 'react';
import moment from 'moment';
import {
    Form,
    Icon,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    Cascader,
    Upload,
    Table,
    Popconfirm,
    Modal,
    DatePicker,
    message,
    Spin,
    Menu,
    Dropdown,
} from 'antd';
import * as config from "@/util/connectConfig";
import { datasaddkey, timestampFromat, strTrim } from "@/util/baseTool";
// import '../css/css.css'
import '@/components/jqueryfilter/css/all.css'
import '@/components/jqueryfilter/css/ligerui-all.css'
import $ from "@/components/jqueryfilter";
import '@/components/jqueryfilter/js/base'
import '@/components/jqueryfilter/js/ligeruiall'
import '@/components/jqueryfilter/js/ligerFilter'
import CSelect from '@/components/cselect';
import { fetchPost } from '@/util/fetch';
import {
    ADD_RULE,
    GET_DETAIL,
    UPDATE_RULE,
} from '../constants/Api';

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const paramArr = [];
const wishAccountData = [];

class AddOrUpdateModal extends React.Component {

    state = {
        countryData: [],
        accountData: [],
        siteData: [],
        conditionFilter: '',
        platformData: [],
    }

    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
    }

    componentDidUpdate(prevProps){
        const prevVisible = prevProps.visible;
        const { visible, id, actionData, addItem } = this.props;
        if(!prevVisible && visible && id) {
            fetchPost(GET_DETAIL, {data: {id}})
                .then(result => {
                    const { ruleName, priority, platformCode, isEnabled, validStart, validEnd, conditionJson, actionJson } = result.data;
                    // 表单数据回显
                    this.props.form.setFieldsValue({
                        ruleName,
                        priority,
                        platformCode,
                        isEnabled,
                        validStart: validStart ? moment(validStart) : null,
                        validEnd: validEnd ? moment(validEnd) : null,
                    });
                    // 可选条件数据回显
                    if (conditionJson) {
                        this.handleSelectChange(platformCode);
                        setTimeout(() => {
                            const { conditionFilter } = this.state;
                            if (conditionFilter) {
                                conditionFilter.setData(JSON.parse(conditionJson));
                            }
                        }, 500);
                    }
                    // 执行动作数据回显
                    this.props.initItem({data: Array.isArray(actionJson) ? actionJson : []});
                })
        }
        if(actionData.length === 0) {
            addItem();
        }
    }

    componentDidMount(){
        // 获取国家信息
        fetchPost('/oms/order/manage/motan/CommonBasicsDataApi/queryCountrlData', {})
            .then(result => {
                this.setState({ countryData: result.data });
            });
        // 获取销售平台信息
        fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform', {})
            .then(result => {
                this.setState({ platformData: result.data });
            });
    }

    // 可选条件选项配置
    setFilter = () => {
        const { accountData, countryData, siteData } = this.state;
        const fields = [
            {
                display: '账号', name: 'sellerId', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: accountData, valueField: "id", textField: "name",
                    }
                }
            },
            {
                display: '目的国', name: 'countryCode', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: countryData, valueField: "id", textField: "name",
                    }
                }
            },
            {
                display: '站点', name: 'siteCode', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: siteData, valueField: "key", textField: "label",
                    }
                }
            },
        ];
        const filter = $("#skureplacement_filter").ligerFilter({ fields });
        return filter;
    }

    // 平台选择事件
    handleSelectChange = (value) => {
        // 选择平台后获取账号信息
        fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/getSellerIds', {data: {pageNumber: 1, pageData: 9999, platformCode: value}}, 2)
            .then(result => {
                this.setState({ accountData: result.data });
            })
            .then(() => {
                // 选择平台后获取站点
                fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/getPlatformSite', {pageNumber: 1, pageData: 9999, platform: value}, 2)
                    .then(result => {
                        this.setState({ siteData: result.data });
                    })
                    .then(() => {
                        document.querySelector('#skureplacement_filter').innerHTML="";
                        const conditionFilter = this.setFilter();
                        this.setState({ conditionFilter });
                    });
            })
    }

    // 确定
    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                const { conditionFilter } = this.state;
                const { actionData, id, pageNumber, pageData, onSearch } = this.props;
                const val = $.ligerui.toJSON(conditionFilter.getData());  // 选择条件数据
                const newAc = actionData.filter(v => !v.ifEditing); // 执行动作数据
                newAc.map(v => delete v.ifEditing);
                values.validStart = new Date(values.validStart).getTime() || null;
                values.validEnd = new Date(values.validEnd).getTime() || null;
                const newObj = values;
                newObj.conditionJson = val;
                newObj.actionJson = newAc;
                if(id) {
                    newObj.id = id;
                }
                fetchPost(id ? UPDATE_RULE : ADD_RULE, { data: newObj }, 1)
                    .then(result => {
                        if (result.state === '000001') {
                            this.closeModal();
                            onSearch(pageNumber, pageData);
                        }
                    });
            }
        })
    }

    // 关闭弹窗
    closeModal = () => {
        const { toggleModal, clearItem } = this.props;
        toggleModal(false);
        clearItem();
    }

    // 执行动作 - 新增行
    AddNewItem = () => {
        const ifExistEditingRow = this.ifExistEditingRow();
        const { actionData } = this.props;
        if (actionData.length >= 60) {
            message.info('最多可增加60条!');
            return;
        }
        if (ifExistEditingRow || ifExistEditingRow === 0) {
            message.info('请先保存正在编辑行数据!');
        } else {
            this.props.addItem();
        }
    }

    // 执行动作 - 输入
    handleInputChange = (e, index, inputType) => {
        const val = strTrim(e.target.value);
        this.props.modifyItem({
            index, inputType, value: val,
        });
    }

    // 执行动作 - 编辑
    handleEdit = (index, item) => {
        const ifExistEditingRow = this.ifExistEditingRow();
        if (typeof ifExistEditingRow === 'number' && ifExistEditingRow !== index) {
            message.info('请先保存正在编辑行数据!');
        } else {
            this.props.editItem({ index });
        }
    }

    // 执行动作 - 保存
    handleSave = (index) => {
        const { actionData } = this.props;
        if (!actionData[index].srcSku || !actionData[index].desSku) {
            message.warning('请填写必填项!');
            return;
        }
        this.props.saveItem({ index });
    }

    // 执行动作 - 删除
    handleDelete = (index) => {
        const { actionData } = this.props;
        this.props.delItem({ index });
        if (actionData.length === 0) {
            this.props.addItem();
        }
    }

    // 执行动作 - 是否有正在编辑行
    ifExistEditingRow = () => {
        const { actionData } = this.props;
        let result = false;
        actionData.map((item, index) => {
            if (item.ifEditing) {
                result = index;
            }
            return true;
        });
        return result;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            visible,
            id,
            actionData,
        } = this.props;
        const { platformData } = this.state;
        const rowItems = actionData ? actionData.map((item, index) => {
            return (
                <Row>
                    <Col span={6} className="skureplacement-modal-col">
                        {
                            item.ifEditing ? (
                                <Input
                                    value={item.srcSku}
                                    onChange={e => this.handleInputChange(e, index, 'srcSku', item.key)}
                                    placeholder="请输入"
                                />
                            ) : <span>{item.srcSku}</span>
                        }
                    </Col>
                    <Col span={6} className="skureplacement-modal-col">
                        {
                            item.ifEditing ? (
                                <Input
                                    value={item.desSku}
                                    onChange={e => this.handleInputChange(e, index, 'desSku', item.key)}
                                    placeholder="请输入"
                                />
                            ) : <span>{item.desSku}</span>
                        }
                    </Col>
                    <Col span={6} className="skureplacement-modal-col">
                        {
                            item.ifEditing ? (
                                <Input
                                    value={item.desPrefixSuffix}
                                    onChange={e => this.handleInputChange(e, index, 'desPrefixSuffix', item.key)}
                                    placeholder="请输入"
                                />
                            ) : <span>{item.desPrefixSuffix}</span>
                        }
                    </Col>
                    <Col span={6}>
                        <div>
                            {
                                index === 0 ? <a className="skureplacement-marginRight" onClick={this.AddNewItem}>新增</a> : null
                            }
                            {
                                item.ifEditing ? (
                                    <a className="skureplacement-marginRight" onClick={() => this.handleSave(index, item)}>保存</a>
                                ) : (
                                    <a className="skureplacement-marginRight" onClick={() => this.handleEdit(index, item)}>编辑</a>
                                )
                            }
                            <a onClick={() => this.handleDelete(index)}>
                                删除
                            </a>
                        </div>
                    </Col>
                </Row>
            );
        }) : null;
        return (
            <Modal
                visible={visible}
                title={!id ? '新增' : '编辑'}
                destroyOnClose={true}
                width={600}
                onCancel={this.closeModal}
                onOk={this.handleSubmit}
                okText={'确定'}
                maskClosable={false}
            >
                <div>
                    <div className="newCluenk">
                        <div className="content">
                            <FormItem
                                label="规则名称"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator('ruleName', {
                                    rules: [{ required: true, message: '配置名称' }],
                                })(
                                    <Input placeholder="配置名称" />
                                )}
                            </FormItem>
                            <FormItem
                                label="优先级"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator('priority', {
                                    rules: [{ required: true, message: '优先级' }],
                                })(
                                    <Input placeholder="优先级" type="number" min={1} />
                                )}
                            </FormItem>
                            <FormItem
                                label="销售平台"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator('platformCode', {
                                    rules: [{ required: true, message: '销售平台' }],
                                })(
                                    <Select
                                        onChange={this.handleSelectChange}
                                        placeholder={'请选择'}
                                        style={{width: '100%'}}
                                    >
                                        {
                                            platformData ? platformData.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>) : null
                                        }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label="状态"  {...this.formItemLayout}
                            >
                                {getFieldDecorator('isEnabled', {
                                    rules: [{ required: false, message: '是否启用' }],
                                    initialValue: 1
                                })(
                                    <RadioGroup onChange={this.onChange}>
                                        <Radio value={1}>启用</Radio>
                                        <Radio value={2}>停用</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <FormItem
                                label="生效时间"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator('validStart')(
                                    <DatePicker
                                        style={{width: '100%'}}
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="失效时间"
                                {...this.formItemLayout}
                            >
                                {getFieldDecorator('validEnd')(
                                    <DatePicker
                                        style={{width: '100%'}}
                                    />
                                )}
                            </FormItem>
                        </div>
                    </div>

                    <div className="skureplacement-condition">
                        <h3>可选条件</h3>
                        <div>
                            <div id="skureplacement_filter"><span style={{color: 'lightgrey'}}>{`(选择销售平台后显示可选条件)`}</span></div>
                            <input id="txtGroup" type="hidden" />
                        </div>
                    </div>

                    <div className="skureplacement-action">
                        <h3>执行动作</h3>
                        <div className="skureplacement-modal-div skureplacement-modal-body-div">
                            <Row className="skureplacement-modal-row">
                                <Col span={6} className="skureplacement-modal-col"><span className="skureplacement-modal-span">*</span>替换前SKU</Col>
                                <Col span={6} className="skureplacement-modal-col"><span className="skureplacement-modal-span">*</span>替换后SKU</Col>
                                <Col span={6} className="skureplacement-modal-col">前后缀</Col>
                                <Col span={6}>操作</Col>
                            </Row>
                            {rowItems}
                        </div>
                    </div>
                </div>

            </Modal>
        );
    }
}

export default Form.create()(AddOrUpdateModal);
