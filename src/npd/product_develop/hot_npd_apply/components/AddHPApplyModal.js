import React from 'react';
import { Form, Input, Select, Row, Col, Modal, Button, InputNumber, Tooltip ,message} from 'antd';
import ItemSelect from '../../../../common/components/itemSelect'
import { post } from '../../../../util/axios'
import { filterParams, parseNetErrorToMsg } from '../../../../util/baseTool'
import { PROJECT_FLOW_LIST_API, USER_LIST_API, GET_PRODUCT_CATEGORY_API,AUDIT_FLOW_API } from '../../../constants/Api'
import { CURRENCY_LIST } from '../../constants'
import { ADD_AND_EDIT_API } from '../constants/Api'


const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

class App extends React.Component {

    state = {
        categoryList: [],
        category1: {},
        category2: {},
        category3: {},
    }
    componentDidMount() {
        post(GET_PRODUCT_CATEGORY_API).then(data => {
            if (data.state === '000001') {
                this.setState({
                    categoryList: data.data
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        const item = nextProps.item;
        const prevItem = this.props.item;
        const visible = nextProps.visible;
        if (visible && item && !this.props.visible) {
            setTimeout(() => {
                this.initForm(item);
            }, 500)
        } else if (visible && prevItem !== item) {
            nextProps.form.resetFields()
            this.setState({
                category1: undefined,
                category2: undefined,
                category3: undefined
            })
        }
    }

    initForm = (item) => {
        this.props.form.setFieldsValue({
            'classifyCode1': item.classifyCode1,
            'classifyCode2': item.classifyCode2,
            'classifyCode3': item.classifyCode3,
            'developManager': item.developManagerUserName,
            'sellPrice': item.sellPrice,
            'sellCurrency': item.sellCurrency,
            'sellLink': item.sellLink,
            'hotsellPrice': item.hotsellPrice,
            'hotsellCurrency': item.hotsellCurrency,
            'hotsellLink1': item.hotsellLink1,
            'hotsellLink2': item.hotsellLink2,
            'procurementPrice': item.procurementPrice,
            'procurementCurrency': item.procurementCurrency,
            'projectflowCode': item.projectflowCode,
            'remark': item.remark
        })
        this.initCategorySelect(item)
    }
    initCategorySelect = (item) => {
        if (!item) {
            return;
        }
        const categoryList = this.state.categoryList;
        if (categoryList.length < 1) {
            post(GET_PRODUCT_CATEGORY_API).then(data => {
                if (data.state === '000001') {
                    this.setState({
                        categoryList: data.data
                    }, function () {
                        return Promise.resolve();
                    })
                }
                return Promise.reject();
            }).then(() => this.handleCategorySelect(item.classifyCode1, 'c1'))
                .then(() => this.handleCategorySelect(item.classifyCode2, 'c2'))
                .then(() => this.handleCategorySelect(item.classifyCode3, 'c3'));
        } else {
            this.handleCategorySelect(item.classifyCode1, 'c1')
                .then(() => this.handleCategorySelect(item.classifyCode2, 'c2'))
                .then(() => this.handleCategorySelect(item.classifyCode3, 'c3'))
        }
    }
    handleSubmit = (type) => {
        this.props.form.validateFields((err, values) => {
            if(err){
                try {
                    var arr = Object.keys(err)
                    var errMessage = err[arr[0]].errors[0].message
                    return message.warning(errMessage)
                }catch(error){
                    message.warning("请核实必填字段是否填写")
                }
                return
            }
            const { category1, category2, category3 } = this.state;
            const formData = {
                ...values,
                'classify1': category1 ? category1.cateNameCn : '',
                'classify2': category2 ? category2.cateNameCn : '',
                'classify3': category3 ? category3.cateNameCn : '',
            }
            const params = filterParams(formData)
            params.type = type;
            const item = this.props.item;
            if (item) {
                params.id = item.id;
            }
            if (!err) {
                post(ADD_AND_EDIT_API, { data: params, type }).then(data => {
                    if (data.state === '000001') {
                        this.props.handleSubmit();
                        this.props.handleCancel();
                    }
                    parseNetErrorToMsg(data)
                })
            }
        });
    }
    handleCategorySelect = (value, type) => {
        const that = this;
        return new Promise((resolve, reject) => {
            if (type === 'c1') {
                const categoryList = that.state.categoryList;
                categoryList.forEach(item => {
                    if (item.cateId === value) {
                        that.setState({
                            category1: item
                        }, function () {
                            resolve()
                        })
                        return false
                    }
                })
            } else if (type === 'c2') {
                const subCategorys = that.state.category1.subCategorys;
                subCategorys.forEach(item => {
                    if (item.cateId === value) {
                        that.setState({
                            category2: item
                        }, function () {
                            resolve()
                        })
                        return false
                    }
                })
            } else {
                const subCategorys = that.state.category2.subCategorys;
                subCategorys.forEach(item => {
                    if (item.cateId === value) {
                        that.setState({
                            category3: item
                        }, function () {
                            resolve()
                        })
                        return false
                    }
                })
            }
        })
    }
    render() {
        const { categoryList = [], category1 = {}, category2 = {} }= this.state;
        const { handleCancel, visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const item = this.props.item || {};
        const currencyListElement = CURRENCY_LIST.map((item) =>
            <Option key={item.key} value={item.key}>{item.name}</Option>
        );
        // const formItemLayout = {
        //     labelCol: {
        //         xs: { span: 24 },
        //         sm: { span: 8 },
        //     },
        //     wrapperCol: {
        //         xs: { span: 24 },
        //         sm: { span: 16 },
        //     },
        // };
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        return (
            <Modal
                title="新增热销申请"
                destroyOnClose
                visible={visible}
                width={600}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>取消</Button>,
                    <Button key="save" onClick={() => this.handleSubmit(1)}>保存</Button>,
                    <Tooltip placement="bottom" title={"允许修改当前数据"} key="submitTip">
                        <Button key="submit" type="primary" onClick={() => this.handleSubmit(2)}>
                            提交
                        </Button>
                    </Tooltip>
                ]}
            >
                <Form className="hot-npd-apply-addHPApplyModal" style={{padding:"0 100px"}}>
                    <FormItem
                        {...formItemLayout}
                        label={<span className="ant-form-item-required">项目流信息</span>}
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='projectflowCode'
                            dName={item.projectflowInfo}
                            dValue={item.projectflowCode}
                            searchColumn={'projectName'}
                            url={AUDIT_FLOW_API}
                            code={"projectCode"}
                            name={"projectName"}
                            params={{'pageData': 20, 'pageNumber': 1}}
                            rules={{
                                rules: [{ required: true, message: '项目流信息必填' }],
                            }}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<span>一级分类</span>}
                    >
                        {getFieldDecorator('classifyCode1',{
                                rules: [{ required: true, message: '一级分类必填' }],
                            })(
                            <Select
                                onSelect={(value) => this.handleCategorySelect(value, 'c1')}
                                showSearch
                                placeholder="请选择"
                                filterOption={(inputValue, option) => {
                                    let regExp = new RegExp(inputValue, 'gi');
                                    return regExp.test(option.props.children)
                                }}
                            >
                                {categoryList.map(item =>
                                    <Option value={item.cateId} key={item.cateId}>{item.cateNameCn}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="二级分类:"
                    >
                        {getFieldDecorator('classifyCode2')(
                            <Select
                                onSelect={(value) => this.handleCategorySelect(value, 'c2')}
                                showSearch
                                placeholder="请选择"
                                filterOption={(inputValue, option) => {
                                    let regExp = new RegExp(inputValue, 'gi');
                                    return regExp.test(option.props.children)
                                }}
                            >
                                {category1.subCategorys&&category1.subCategorys.filter(item => 
                                            item.cateId&&item.cateNameCn).map(item =>
                                    <Option value={item.cateId} key={item.cateId}>{item.cateNameCn}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="三级分类"
                    >
                        {getFieldDecorator('classifyCode3')(
                            <Select
                                onSelect={(value) => this.handleCategorySelect(value, 'c3')}
                                showSearch
                                placeholder="请选择"
                                filterOption={(inputValue, option) => {
                                    let regExp = new RegExp(inputValue, 'gi');
                                    return regExp.test(option.props.children)
                                }}
                            >
                                {category2.subCategorys&&category2.subCategorys.filter(item => 
                                            item.cateId&&item.cateNameCn).map(item =>
                                    <Option value={item.cateId} key={item.cateId}>{item.cateNameCn}</Option>)
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="市场最低价:"
                    >
                        <Row>
                            <Col span={15}>
                                <div className="npd-modal_line margin-ss-left" style={{paddingLeft:"3px"}}>
                                    <span style={{display:"inline-block",paddingRight:"8px"}}>售价：</span>
                                    <div>
                                        {getFieldDecorator('sellPrice')(
                                            <InputNumber style={{width:"100%"}} min={0} precision={2} />
                                        )}
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} offset={1}>
                                {getFieldDecorator('sellCurrency',{
                                    rules: [{ required: true, message: '市场最低价币种必填' }],
                                })(
                                    <Select
                                        showSearch
                                        placeholder="请选择币种"
                                    >
                                        {currencyListElement}
                                    </Select>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className="npd-modal_line margin-ss-left"  style={{paddingLeft:"3px"}}>
                                    <span style={{display:"inline-block",paddingRight:"8px"}}>链接：</span>
                                    <div>
                                        {getFieldDecorator('sellLink')(
                                            <Input />
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </FormItem>
                        <Row>
                            <FormItem
                                {...formItemLayout}
                                label={<span>热销最低价</span>}
                            >
                                <Col span={15}>
                                    <div className="npd-modal_line margin-ss-left"  style={{paddingLeft:"3px"}}>
                                        <span style={{display:"inline-block",paddingRight:"8px"}}>售价：</span>
                                        <div>
                                            {getFieldDecorator('hotsellPrice',{
                                                rules: [{ required: true, message: '热销最低价必填' }],
                                            })(
                                                <InputNumber style={{width:"100%"}} min={0} precision={2} />
                                            )}
                                        </div>
                                    </div>
                                </Col>
                                <Col span={8} offset={1}>
                                    {getFieldDecorator('hotsellCurrency',{
                                        rules: [{ required: true, message: '热销最低价币种必填' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="请选择币种"
                                        >
                                            {currencyListElement}
                                        </Select>
                                    )}
                                </Col>
                            </FormItem>
                        </Row>
                       
                        <Row>
                            <Col span={5} offset={5} >
                                <span className="text-right display-inline-block ant-form-item-required">链接一：</span>
                            </Col>
                            <Col style={{paddingLeft:"3px"}} span={14}>
                                {getFieldDecorator('hotsellLink1',{
                                    rules: [{ required: true, message: '热销链接一必填' }],
                                })(
                                    <Input />
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4} offset={6} >
                                链接二：
                            </Col>
                            <Col style={{paddingLeft:"3px"}} span={14}>
                                {getFieldDecorator('hotsellLink2')(
                                    <Input />
                                )}
                            </Col>
                        </Row>
                    <FormItem
                        {...formItemLayout}
                        label={<span>预估采购成本</span>}
                    >
                        <Row>
                            <Col span={15}>
                                {getFieldDecorator('procurementPrice',{
                                    rules: [{ required: true, message: '预估采购成本必填' }],
                                })(
                                    <InputNumber style={{width:"100%"}} min={0} precision={2} />
                                )}
                            </Col>
                            <Col span={8} offset={1}>
                                {getFieldDecorator('procurementCurrency',{
                                    rules: [{ required: true, message: '预估采购成本币种必填' }],
                                })(
                                    <Select
                                        showSearch
                                        placeholder="请选择币种"
                                    >
                                        {currencyListElement}
                                    </Select>
                                )}
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={<span className="ant-form-item-required">指定开发经理</span>}
                    >
                        <ItemSelect
                            getFieldDecorator={getFieldDecorator}
                            formName='developManager'
                            url={USER_LIST_API}
                            dName={item.developManager}
                            dValue={item.developManagerUserName}
                            code={"userName"}
                            name={"name"}
                            params={{'pageData': 20, 'pageNumber': 1}}
                            rules={{
                                rules: [{ required: true, message: '指定开发经理必填' }],
                            }}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注:"
                    >
                        {getFieldDecorator('remark')(
                            <TextArea rows={4} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(App)