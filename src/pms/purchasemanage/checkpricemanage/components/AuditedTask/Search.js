
import React, { Component } from 'react';
import {
    Row,
    Col,
    Form,
    Radio,
    Input,
    Button,
    Select,
    message,
} from 'antd';
import CSelect from '../../../../../components/cselect';
import { inquireOPEmployeeUrl,ORDER_DETAIL_SUPPLIER_LIST } from '../../constants/Api';
import { checkPriceTypeArr, statusArr } from '../../constants/index';
import { parseStrToArray } from '../../../../../util/StrUtil';
import { getLoginmsg, hasPerssion } from '../../../../../util/baseTool';
import CTags from '../../../../../components/ctags';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;


class Search extends Component {
    formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
    };

    checkPriceTypeArr = checkPriceTypeArr.map(v => (<Option key={v.id} value={v.id}>{v.name}</Option>))

    constructor(props) {
        super(props);
        this.state = {
            // 搜索类型
            searchType: 0,
            // 是否切换搜索
            isSearch: 1,
        };
    }

    componentDidMount() {
        this.searchHandle();
    }

    onChangeSearch = (e) => {
        const v = e.target.value;
        if (v === 'search') {
            this.setState({ isSearch: 2 });
        } else {
            this.props.form.resetFields();
            this.setState({
                isSearch: 1,
            });
        }
    }

    reset = () => {
        const { resetFields } = this.props.form;
        resetFields();
    }

    getList = (data) => {
        const { getAuditedTaskAsync, auditedTaskList } = this.props;
        let params = auditedTaskList.params;
        params = {
            ...params,
            ...data,
            pageNumber: 1,
        };
        getAuditedTaskAsync(params);
    }

    searchHandle = () => {
        const { validateFields } = this.props.form;
        validateFields((err, value) => {
            if (!value.searchContents) {
                value.searchContents = undefined;
                value.searchType = undefined;
            }
            value.state = Number.parseInt(String(value.state), 10);
            value.searchContents = parseStrToArray(value.searchContents);
            if (value.searchContents.length >= 10) {
                message.warning('搜索内容不能超过10个');
                return false;
            }
            this.getList(value);
        });
    }

    clear = (key) => {
        const { setFieldsValue } = this.props.form;
        setFieldsValue({ [key]: undefined });
    };

    list = [{key: getLoginmsg().userName, label: getLoginmsg().personName}];

    render() {
        const {
            searchType,
            isSearch,
            // userName,
        } = this.state;
        const userName = getLoginmsg().userName;
        const { getFieldDecorator } = this.props.form;
        const show = isSearch > 1;

        const isShwoInspector = !hasPerssion('010-000003-000002-002', this.props);
        const isSupplier = !hasPerssion('010-000003-000002-012', this.props);
        

        const filters = (
            <div className="audited-task-search-filters">
                <FormItem
                    className="mt8"
                    label="状态"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator('state', {
                        initialValue: [0],
                    })(
                        <CTags
                            list={statusArr}
                            handleChange={value => this.getList({ state: value[0] })}
                        />,
                    )}
                </FormItem>

                <FormItem
                    className="mt8"
                    label="核查员"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator('inspector', {
                        rules: [{ required: false, message: '请输入跟单员名称' }],
                        initialValue: userName,
                    })(
                        <CSelect
                            disabled={isShwoInspector}
                            code="key" // 列表编码字段
                            name="label" // 列表名称字段
                            url={inquireOPEmployeeUrl}
                            placeholder="请输入搜索条件"
                            onChange={value => this.getList({ inspector: value })}
                            clear={() => this.clear('purchaseDevelop')}
                            params={{
                                data: {
                                    searchColumn: 'name',
                                    procurementType: 4,
                                    pageData: 20,
                                    pageNumber: 1,
                                },
                            }} // 搜索参数
                            style={{ width: 344 }}
                            list={this.list}
                            isNotCache
                        />,
                    )}
                </FormItem>

                <FormItem
                    className="mt8"
                    label="核价类型"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator('checkPriceType', {
                        initialValue: 0,
                    })(
                        <Select
                            onChange={value => this.getList({ checkPriceTypestate: value })}
                            style={{ width: 344 }}
                        >
                            {
                                this.checkPriceTypeArr
                            }
                        </Select>,
                    )}
                </FormItem>

                <FormItem
                    className="mt8 audited-task-search-bottom"
                    label="供应商"
                    {...this.formItemLayout}
                >
                    {getFieldDecorator('supplier', {
                            })(
                                <CSelect
                                    disabled={isSupplier}
                                    list={this.props.item}
                                    code="key"
                                    name="name"
                                    url={ORDER_DETAIL_SUPPLIER_LIST}
                                    style={{ width: 344 }}
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1,
                                        },
                                    }} // 搜索参数
                                    apiListType={0}
                                    formType={0}
                                    placeholder="请选择"
                                />,
                            )}
                </FormItem>

               
            </div>
        );
        const searchTypeCom = (
            <div className="search-bgc">
                <Row type="flex" align="middle">
                    <Col className="text-right fsz12" span={2}>搜索类型：</Col>
                    <Col>
                        <FormItem>
                            {getFieldDecorator('searchType', {
                                initialValue: searchType,
                            })(
                                <RadioGroup size="small">
                                    <RadioButton value={0}>任务编号</RadioButton>
                                    <RadioButton value={1}>SKU</RadioButton>
                                    {/* <RadioButton value={2}>供应商</RadioButton> */}
                                </RadioGroup>,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle" className="mt8">
                    <Col className="text-right fsz12" span={2}>搜索内容：</Col>
                    <Col>
                        <FormItem>
                            {getFieldDecorator('searchContents')(
                                <TextArea placeholder="请输入搜索条件" style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const buttons = (
            <Row type="flex" align="middle" className="margin-ss-top margin-ss-bottom">
                <Col className="text-right" span={2} />
                <Col>
                    <div style={{ width: 344, textAlign: 'right' }}>
                        <Button
                            className="margin-sm-right"
                            onClick={this.searchHandle}
                            type="primary"
                        >
                            搜索
                        </Button>
                        <Button
                            onClick={this.reset}
                        >
                            重置
                        </Button>
                    </div>
                </Col>
            </Row>
        );
        return (
            <div className="search bgcfff overflow-hidden audited-task-search">
                <div className="search-tab">
                    <RadioGroup
                        defaultValue="select"
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="select">筛选</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </div>
                <Form layout="inline">
                    {filters}
                    {show ? searchTypeCom : null}
                    {show ? buttons : null}
                </Form>
            </div>
        );
    }
}

export default Form.create()(Search);
