import React from 'react'
import { Modal, Select, Form, Input, InputNumber, Button, message, Radio, Row, Col, Icon, Table } from 'antd'
import ItemSelect from '@/common/components/itemSelect'
import { fetchPost } from 'util/fetch'
import Apis from '../constants/Api'
import priceTypes, { minAndMax, modeList } from '../constants/PriceType'

const FormItem = Form.Item;
const Option = Select.Option
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 21 },
    },
};

/**
 * @author 黄建峰
 * @description 批量复制
 */
class CopyModal extends React.Component {
    salesMap = new Map()
    templateMap = new Map()
    uuid = 1
    state = {
        loading: 0,
        cpValue: 1, // 待复制的lisitng
        site: -1,
        radioDisabled: false,   //控制单选框1（选中的listing）是否可选
        res: '',
        list: [{ id: 0 }],
        accountsList: []
    }
    // 移除账号、刊登模板
    remove = (record) => {
        const { list } = this.state
        const i = list.findIndex(v => record === v)
        if (i !== -1) {
            list.splice(i, 1)
            this.setState({
                list: [...list]
            })
        }
    }
    //添加账号、刊登模板
    add = () => {
        const { list } = this.state
        if (list.length >= 5) {
            return message.warning('最多支持选择5个销售账号');
        }
        this.setState({
            list: [...list, { id: this.uuid++ }]
        })
    }

    handleOk = (type) => {
        const { loading } = this.state
        if (loading) return
        this.props.form.validateFields((err, value) => {
            if (err) {
                try {
                    let errMessage;
                    while (!(errMessage = err.message)) {
                        let arr = Object.keys(err)
                        err = err[arr[0]]
                    }
                    return message.warning(errMessage)
                } catch (error) {
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            const params = { ...value }
            const { items, getParmas, state } = this.props;
            const newSearchColumn = getParmas();
            if (value.cpType === 0) {
                params.cpValue = JSON.stringify(items.map(item => item.listingId))
            } else {
                params.cpValue = JSON.stringify(newSearchColumn)
            }
            params.operateType = type;
            params.state = state;
            params.list = params.list && params.list.filter(v => v) || []
            this.setState({ loading: type })
            fetchPost(Apis.ADDCP_API, params, 1).then(result => {
                if (result.state === '000001') {
                    this.props.onSearch()
                    this.onCancel()
                }
            })
                .finally(() => {
                    this.setState({ loading: 0 })
                })
        })
    }

    // 缓存销售账号
    handleSalesChange = (value, id) => {
        const { setFieldsValue } = this.props.form
        setFieldsValue({
            [`list[${id}][template]`]: undefined
        })
        this.salesMap.set(id, value)
        this.templateMap.delete(id)
    }
    //过滤重复的
    handleSalesFilters = (list = []) => {
        return list.filter(item => {
            let flag = true
            for (const value of this.salesMap.values()) {
                if (value === item.id) {
                    flag = false
                    break;
                }
            }
            return flag
        })
    }
    handleTemplateChange = (value, record) => {
        this.templateMap.set(record, value)
    }

    handleTemplateFilters = (list = []) => {
        return list.filter(item => {
            let flag = true
            for (const value of this.templateMap.values()) {
                if (value === item.publishTemplId) {
                    flag = false
                    break;
                }
            }
            return flag
        })
    }

    componentDidUpdate(prevProps) {
        const visible = this.props.visible
        const preVisible = prevProps.visible
        if (visible && !preVisible) {
            if (this.props.items.length > 0) {
                let it = this.state.res.filter(it => it.name === this.props.items[0].site)
                this.setState({ //勾选选项时
                    site: it[0].id
                });
                this.props.form.setFieldsValue({ 'cpType': 0 });
            } else {  //未勾选选项时
                let it = this.state.res.filter(it => it.name === this.props.allItems[0].site)
                this.setState({
                    site: it[0].id,
                    radioDisabled: true,
                });
                this.props.form.setFieldsValue({ 'cpType': 1 });
            }
        }
    }

    onAccountFocus = () => {
        const { accountsList } = this.state
        if (accountsList && accountsList.length) return
        fetchPost(Apis.EBAY_ACCOUNT_API).then(res => {
            this.setState({ accountsList: res.data });
        })
    }
    onAccountfilterOption = (value, option) => {
        const v = option.props.value
        if (!v) return true
        return v.includes(value)
    }

    componentDidMount() {
        fetchPost(Apis.EBAY_SITE).then(res => {
            this.setState({ res: res.data });
        })
    }

    columns = [
        {
            title: <span className="list-filter-item-title_required">目标销售账号</span>,
            dataIndex: 'account',
            key: 'account',
            width: 90,
            render: (text, record) => {
                const { getFieldDecorator } = this.props.form
                const { accountsList } = this.state
                const list = this.handleSalesFilters(accountsList)
                return (
                    <FormItem>
                        {getFieldDecorator(`list[${record.id}][account]`, {
                            rules: [{
                                required: true, message: '请选择销售账号'
                            }]
                        })(
                            <Select
                                showSearch
                                allowClear
                                onChange={(value) => this.handleSalesChange(value, record.id)}
                                onFocus={this.onAccountFocus}
                                filterOption={this.onAccountfilterOption}
                                placeholder={"请选择销售账号"}
                            >
                                {
                                    list.map(v => {
                                        return <Option key={v.id} value={v.id}>{v.id}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                )
            }
        },
        {
            title: '刊登模板',
            dataIndex: 'template',
            key: 'template',
            width: 90,
            render: (text, record) => {
                const { getFieldDecorator, getFieldValue } = this.props.form
                const account = getFieldValue(`list[${record.id}][account]`)
                const templateParams = {
                    site: this.state.site,
                    saleAccount: account
                }
                return (
                    <FormItem>
                        <ItemSelect
                            allowClear
                            formName={`list[${record.id}][template]`}
                            onChange={(value) => this.handleTemplateChange(value, record.id)}
                            params={templateParams}
                            disabled={!account}
                            getFieldDecorator={getFieldDecorator}
                            url={Apis.PUBLISH_TEMPL_LIST_API_BY_ACCOUNT}
                            apiListType={2}
                            code='id'
                            name="name"
                            searchColumn="name"
                            onFilters={this.handleTemplateFilters}
                            placeholder={"请选择刊登模板"}
                        />
                    </FormItem>
                )
            }
        },
        {
            title: '零售价变更',
            dataIndex: 'priceChangeType',
            key: 'priceChangeType',
            width: 150,
            render: (text, record) => {
                const { getFieldDecorator, getFieldValue } = this.props.form
                const str = `list[${record.id}][priceChangeType]`
                const value = getFieldValue(str)
                let limit = minAndMax[value] || {}
                return (
                    <Row>
                        <Col span={13} >
                            <FormItem>
                                {getFieldDecorator(str)(
                                    <Select
                                        allowClear
                                        style={{ width: "100%" }}
                                    >
                                        {priceTypes.map(item => <Option value={item.code} key={item.code}>{item.name}</Option>)}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={10} offset={1}>
                            <FormItem>
                                {getFieldDecorator(`list[${record.id}][priceChangeValue]`)(
                                    <InputNumber
                                        {...limit}
                                        precision={2}
                                        style={{ width: '100%' }}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                )
            }
        },
        {
            title: '标题后缀变更',
            dataIndex: 'titleChangeValue',
            key: 'titleChangeValue',
            width: 80,
            render: (text, record) => {
                const { getFieldDecorator, getFieldValue } = this.props.form
                return (
                    <FormItem>
                        {getFieldDecorator(`list[${record.id}][titleChangeValue]`)(
                            <Input
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                )
            }
        },
        {
            title: '库存变更',
            dataIndex: 'inventoryChangeValue',
            key: 'inventoryChangeValue',
            width: 80,
            render: (text, record) => {
                const { getFieldDecorator, getFieldValue } = this.props.form
                return (
                    <FormItem>
                        {getFieldDecorator(`list[${record.id}][inventoryChangeValue]`)(
                            <InputNumber
                                min={0}
                                max={999}
                                precision={0}
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                )
            }
        },
        {
            title: 'Seller SKU变更',
            dataIndex: 'sellerSkuMode',
            key: 'sellerSkuMode',
            width: 150,
            render: (text, record) => {
                const { getFieldDecorator, getFieldValue } = this.props.form
                const str = `list[${record.id}][sellerSkuMode]`
                const mode = getFieldValue(str)
                return (
                    <Row>
                        <Col span={13} >
                            <FormItem>
                                {getFieldDecorator(str)(
                                    <Select
                                        allowClear
                                        style={{ width: "100%" }}
                                    >
                                        {modeList.map(item => <Option value={item.code} key={item.code}>{item.name}</Option>)}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        {
                            mode === 2 ? (
                                <Col span={10} offset={1}>
                                    <FormItem>
                                        {getFieldDecorator(`list[${record.id}][sellerSkuChangeValue]`, {
                                            rules: [{
                                                required: true, message: '请输入前缀'
                                            }]
                                        })(
                                            <Input
                                                placeholder="示例：UU"
                                                style={{ width: '100%' }}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                            ) : null
                        }

                    </Row>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 50,
            render: (text, record) => {
                const { list } = this.state
                return <div className="text-center">
                    {
                        record === list[0] ? <a onClick={this.add} href="javascript:;">新增</a> : <a onClick={() => this.remove(record)} href="javascript:;">删除</a>
                    }
                </div>
            }
        }];

    onCancel = () => {
        this.props.form.resetFields();
        this.salesMap.clear();
        this.templateMap.clear();
        this.setState({
            loading: 0,
            cpValue: 1, // 待复制的lisitng
            site: -1,
            radioDisabled: false,   //控制单选框1（选中的listing）是否可选
            // res: '',
            list: [{ id: 0 }],
        })
        this.uuid = 1

        this.props.onCancel();
    };
    setMin = () => {
        let priceType = this.props.form.getFieldValue('priceChangeType') || 1;
        return minAndMax[priceType].min;
    };
    setMax = () => {
        let priceType = this.props.form.getFieldValue('priceChangeType') || 1;
        return minAndMax[priceType].max;
    };
    handleRadioChange = () => {
        this.setState({ loading: 0 })
    }
    render() {
        const { loading, list } = this.state
        const { visible } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Modal
                title='批量复制'
                visible={visible}
                onCancel={this.onCancel}
                width={1200}
                maskClosable={false}
                footer={[
                    // 1：保存为草稿 2：刊登)
                    <Button key="1" type="primary" onClick={() => this.handleOk(1)} loading={loading === 1}>保存为草稿</Button>,
                    <Button key="2" type="primary" onClick={() => this.handleOk(2)} loading={loading === 2}>刊登</Button>,
                    <Button key="3" onClick={this.onCancel}>取消</Button>,

                ]}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="待复制的LISTING："
                    >
                        {getFieldDecorator('cpType', {
                            rules: [{ required: true, message: '请选择待复制的LISTING：' }]
                        })(
                            <RadioGroup onChange={this.handleRadioChange}>
                                <Radio value={0} disabled={this.state.radioDisabled} >选中的listing</Radio>
                                <Radio value={1} disabled={this.props.total > 3000} >当前搜索条件下的listing</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="重复listing处理策略："
                    >
                        {getFieldDecorator('duplicationStrategy', {
                            rules: [{ required: true, message: '请选择待重复listing处理策略' }],
                            initialValue: 0,
                        })(
                            <RadioGroup onChange={this.handleRadioChange}>
                                <Radio value={0}>跳过</Radio>
                                <Radio value={1}>新增</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>

                    <Table
                        className="table-fixed margin-sm-top"
                        columns={this.columns}
                        dataSource={list}
                        pagination={false}
                        bordered={true}
                        size="small"
                        rowKey={record => record.id}
                    />
                    <div style={{ marginTop: '15px', fontSize: '12px' }}>
                        <p style={{ paddingLeft: "25px" }}>注：</p>
                        <ol>
                            <li>仅支持同站点复制</li>
                            <li>重复listing，是指Seller SKU完全一致的listing</li>
                            <li>最多支持选择5个销售账号；若“刊登模板”为空，则按照规则自动匹配相应的模板</li>
                            <li>若”零售价“为空，则默认采用被复制listing的零售价</li>
                            <li>若”标题后缀变更“为空，则系统自动生成后缀；</li>
                            <li>标题后缀代表最后一个空格后的字符</li>
                            <li>若”库存变更“为空，则默认采用原listing的库存不做变更。</li>
                            <li>若”Seller SKU变更“为空，则默认采用原listing的Seller SKU不做变更。</li>
                            <li>若设置国内发货模式，即为公司SKU加特殊字符前后缀；若设置专线模式/分仓模式，则会替换/加上填写的专线/分仓前缀</li>
                        </ol>
                    </div>
                </Form>
            </Modal>
        )
    }
}
export default Form.create()(CopyModal)
