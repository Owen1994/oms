import React from 'react';
import moment from 'moment';
import {
    Form,
    Input,
    Select,
    Radio,
    Modal,
} from 'antd';
import '@/components/jqueryfilter/css/all.css';
import '@/components/jqueryfilter/css/ligerui-all.css';
import $ from "@/components/jqueryfilter";
import '@/components/jqueryfilter/js/base';
import '@/components/jqueryfilter/js/ligeruiall';
import '@/components/jqueryfilter/js/ligerFilter';
import { fetchPost } from '@/util/fetch';
import {
    ADD_OR_RULE,
    GET_CONFIG_DETAIL,
    GET_PACKAGE_WAREHOUSE_DELIVER,
    GET_SKU_PREFIX_SUFFIX,
    GET_CHANNEL,
    GET_PLATFORM_LIST,
} from '../constants/Api';
import {
    CHANNEL_TYPE
} from '../constants';


const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class AddOrUpdateModal extends React.Component {

    state = {
        accountData: [],
        conditionFilter: '',
        deliveryWarehouse: [],  //发货仓库
        skuPrefix: [],  // sku前缀
        skuSuffix: [],  // sku后缀
        channelData: [],    // 物流渠道
        platformList: [],
    }

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
    }
    formItemLayout2 = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 }
    }

    componentDidUpdate(prevProps){
        const prevVisible = prevProps.visible;
        const { visible, id } = this.props;
        if(!prevVisible && visible) {
            fetchPost(GET_PLATFORM_LIST, {}, 2)
                .then(result => {
                    if(result.state === '000001') {
                        this.setState({platformList: result.data});
                    }
                })
            if(id){
                fetchPost(GET_CONFIG_DETAIL, {data: {id}}, 2)
                    .then(result => {
                        const { ruleName, priority, platform, isEnabled, conditionJson, actionCode } = result.data;
                        // 表单数据回显
                        this.props.form.setFieldsValue({
                            ruleName,
                            priority,
                            platformCode: platform.id,
                            isEnabled,
                            actionCode,
                        });
                        // 可选条件数据回显
                        if (conditionJson) {
                            this.handleSelectChange(platform.id, () => this.showConditionJson(conditionJson));
                        }
                    })
            }
        }
    }

    // 回显可选条件数据函数
    showConditionJson = (conditionJson) => {
        const { conditionFilter } = this.state;
        if (conditionFilter) {
            conditionFilter.setData(JSON.parse(conditionJson));
        }
    }

    // 可选条件选项配置
    setFilter = () => {
        const { accountData, deliveryWarehouse, skuPrefix, skuSuffix, channelData } = this.state;
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
                display: '发货仓库', name: 'warehouseCode', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: deliveryWarehouse, valueField: "id", textField: "name",
                    }
                }
            },
            {
                display: '渠道类型', name: 'channelType', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: CHANNEL_TYPE, valueField: "code", textField: "name",
                    }
                }
            },
            {
                display: 'SKU前缀', name: 'frontPosition', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: skuPrefix, valueField: "code", textField: "code",
                    }
                }
            },
            {
                display: 'SKU后缀', name: 'backPosition', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: skuSuffix, valueField: "code", textField: "code",
                    }
                }
            },
            {
                display: '渠道名称', name: 'channel', type: 'combobox', editor: {
                    type: 'combobox',
                    options: {
                        data: channelData, valueField: "id", textField: "name",
                    }
                }
            },
        ];
        const filter = $("#skureplacement_filter").ligerFilter({ fields });
        return filter;
    }

    // 平台选择事件
    handleSelectChange = (value, fn) => {
        // 选择平台后获取账号信息
        return fetchPost('/oms/order/manage/motan/service/api/IOrderManageService/getSellerIds', {data: {pageNumber: 1, pageData: 9999, platformCode: value}}, 2)
            .then(result => {
                this.setState({ accountData: result.data });
                // 获取发货仓库
                fetchPost(GET_PACKAGE_WAREHOUSE_DELIVER, {}, 2)
                    .then(result => {
                        this.setState({ deliveryWarehouse: result.data });
                        // 获取sku前缀
                        fetchPost(GET_SKU_PREFIX_SUFFIX, { platformCode: value, strPosition: 0 }, 2)
                            .then(result => {
                                this.setState({ skuPrefix: result.data });
                                // 获取sku后缀
                                fetchPost(GET_SKU_PREFIX_SUFFIX, { platformCode: value, strPosition: 2 }, 2)
                                    .then(result => {
                                        this.setState({ skuSuffix: result.data });
                                        // 获取物流渠道
                                        fetchPost(GET_CHANNEL, {name: '', pageNumber: 1, pageData: 9999}, 2)
                                            .then(result => {
                                                this.setState({ channelData: result.data }, () => {
                                                    document.querySelector('#skureplacement_filter').innerHTML="";
                                                    const conditionFilter = this.setFilter();
                                                    this.setState({ conditionFilter }, () => {
                                                        if(fn){
                                                            fn();
                                                        }
                                                    });
                                                });
                                            })
                                    })
                            })
                    })
            })
    }

    // 确定
    handleSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err){
                const { conditionFilter } = this.state;
                const { id, pageNumber, pageData, onSearch } = this.props;
                const val = $.ligerui.toJSON(conditionFilter.getData());  // 选择条件数据
                const newObj = values;
                newObj.conditionJson = val;
                if(id) {
                    newObj.id = id;
                }
                fetchPost(ADD_OR_RULE, { data: newObj }, 1)
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
        const { toggleModal } = this.props;
        toggleModal(false);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            visible,
            id,
        } = this.props;
        const { platformList } = this.state;
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
                                        onChange={(val) => this.handleSelectChange(val)}
                                        placeholder={'请选择'}
                                        style={{width: '100%'}}
                                    >
                                        {
                                            platformList ? platformList.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>) : null
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
                        <FormItem
                            label="流程规则"  {...this.formItemLayout2}
                        >
                            {getFieldDecorator('actionCode', {
                                rules: [{ required: true, message: '是否启用' }],
                                initialValue: 1
                            })(
                                <RadioGroup onChange={this.onChange} size="small">
                                    <p>发货优先级</p>
                                    <Radio value={1}>紧急</Radio>
                                    <Radio value={2}>中</Radio>
                                    <Radio value={3}>默认</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </div>
                </div>

            </Modal>
        );
    }
}

export default Form.create()(AddOrUpdateModal);
