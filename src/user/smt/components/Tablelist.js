import React, {Component} from 'react'
import Modalmodel from '../components/Modalmodel'
import {
    Form,
    Button,
    Select,
    Input,
    Row,
    Col,
    Radio,
    Table,
    Pagination,
    Spin,
    Modal,
    message,
    DatePicker,
    Menu,
    Dropdown,
    Icon
} from 'antd'
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
import '../css/css.css'
const FormItem = Form.Item
const Option = Select.Option
import {levelOptions} from '@/util/options';
import * as config from "@/util/connectConfig";
import axios from "@/util/axios";
import {timestampFromat, datasaddkey} from '@/util/baseTool';
class Tablelist extends Component {
    constructor(props) {
        super(props);
    }
    formItemLayout = {
        labelCol: {
            span: 7
        },
        wrapperCol: {
            span: 17
        }
    }
    state = {
        visible: false,
        value: 1,
        value1: 1,
        platformAccountvalue: '',
        shopownervalue: '',
        pagenum: 1,
        shopId: '',
        title: ''
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'sid',
            width: 50,
        }, {
            title: '平台账号',
            dataIndex: 'platformAccounts'
        }, {
            title: '账号类型',
            dataIndex: 'accountTypes',
            render: (text, record, index) => {
                var txt = text.initialValue;
                if (txt == 1) {
                    txt = '主账号'
                } else {
                    txt = '子账号'
                }
                return txt;
            }

        }, {
            title: '启用状态',
            dataIndex: 'authStates',
            render: (text, record, index) => {
                var txt = text.initialValue;
                if (txt == 1) {
                    txt = '启用'
                } else {
                    txt = '停用'
                }
                return txt;
            }
        }, {
            title: '密钥有效期',
            dataIndex: 'Keyvalidityperiods',
            render: (text, record, index) => {
                var text = text + '';
                var value;
                var value2;
                (text + '')
                    .split('-')
                    .map((v, i) => {
                        if (i == 0) {
                            value = timestampFromat(v * 1, 2)
                        } else {
                            value2 = timestampFromat(v * 1, 2)
                        }
                    });
                return (
                    <div>
                        <div >{value}</div>
                        <div>至</div>
                        <div>{value2}</div>
                    </div>
                )
            }
        }, {
            title: '操作人',
            dataIndex: 'operators'
        }, {
            title: '操作时间',
            dataIndex: 'operationTimes',
            render: (text, record, index) => timestampFromat(text, 2)
        }, {
            title: '操作',
            dataIndex: 'operating',
            width: 250,
            render: (text, record, index) => {
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <a className='viewbtn ml5' onClick={this.updatetablelist(record)}>编辑</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a className='viewbtn' onClick={this.deletetablelist(record, index)}>删除</a>
                        </Menu.Item>
                    </Menu>);
                return (
                    <div>
                        <span>
                            <a className='viewbtn' onClick={this.newauthstart(record)}>更新授权</a>
                        </span>
                        <span className="margin-ss-left margin-ss-right v-line">|</span>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link">
                                更多 <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                )
            }
        }
    ]

    componentDidMount() {}

    /**
     *作者: 唐勇
     *功能描述: 分页功能
     *参数说明:1.page 当前页码 2.pageSize：多少条数据
     *时间: 2018/4/3 19:00
     */
    Paginatihandle = (page, pageSize) => {
        this.setState({pagenum: page})
        var newobj={
            platformAccount:this.props.Paginationmodel.platformAccount,
            authState:this.props.Paginationmodel.authState,
            pageNumber: page,
            pageData: pageSize
        }
        this
            .props
            .fetchPosts({
                key: 'data',
                value:newobj
            });
        this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:newobj}})
        this
            .props
            .tablemodelaction({selectedRowKeys: []});
    }

    /**
     *作者: 唐勇
     *功能描述: 授权店铺按钮打开弹窗
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    authorizeBtn = () => {
        this.setState({visible: true, title: '新增店铺'});
        this
            .props
            .form
            .setFieldsValue({
                accountType1: 1, authState1: 1, //授权状态
                platformAccount1: '',

            })
        this.props.tablemodelaction2({'shopId': ''})
    }

    /**
     *作者: 唐勇
     *功能描述: 重新授权
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    newauthstart = (record) => () => {
        window.open(record.url);
    }

    /**
     *作者: 唐勇
     *功能描述: 新增和修改的取消按钮功能
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    handleCancel = () => {
        this.setState({visible: false});
        this
            .props
            .form
            .setFieldsValue({
                accountType1: '', authState1: '', //授权状态
                platformAccount1: '',

            })

    }
    /**
     *作者: 唐勇
     *功能描述: 授权店铺弹窗里的账号类型单选
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    onChange = (e) => {
        this.setState({value: e.target.value});
    }

    /**
     *作者: 唐勇
     *功能描述: 授权店铺弹窗里的授权状态单选
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    onChange1 = (e) => {
        this.setState({value1: e.target.value});
    }

    /**
     *作者: 唐勇
     *功能描述: 修改列表信息
     *参数说明:当前行列表集合数据
     *时间: 2018/4/3 19:00
     */
    updatetablelist = (record) => () => {
        let shopid = record.shopId;
        let accountType = record.accountTypes;
        let authState = record.authStates;
        let platformAccount = record.platformAccounts;
        const tablelist = {
            accountType1: accountType.initialValue,
            authState1: authState.initialValue,
            platformAccount1: platformAccount,
        }
        this.setState({visible: true, title: '修改店铺'});
        this
            .props
            .form
            .setFieldsValue(tablelist)
        this
            .props
            .tablemodelaction2({'shopId': shopid})
    }

    /**
     *作者: 唐勇
     *功能描述: 删除列表信息
     *参数说明:当前行列表集合数据
     *时间: 2018/4/3 19:00
     */
    deletetablelist = (record) => () => {
        this
            .props
            .modalmodelaction({visible2: true})
        this.setState({shopId: record.shopId});

    }

    /**
     *作者: 唐勇
     *功能描述: 确认删除确认
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    ModalhandleOk2 = () => {
        let shopid = this.state.shopId;
        const pramsObj = {
            shopId: ''
        }
        pramsObj['shopId'] = shopid;
        const newobj = {}
        axios
            .post(`${config.api_url}/oms/order/grab/motan/SellStoreAccountApi/deleteStore`, pramsObj)
            .then(response => {
                if (response.status == 200) {
                    if (response.data.state == '000001') {
                        newobj.pageNumber = 1
                        newobj.pageData = 20
                        message.success(response.data.msg);
                        this
                            .props
                            .fetchPosts({key: 'data', value: newobj})
                        this
                            .props
                            .modalmodelaction({visible2: false, confirmLoading: false});
                    } else {
                        message.error(response.data.msg);
                    }

                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    /**
     *作者: 唐勇
     *功能描述: 确认删除取消按钮
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    ModalhandleCancel = (value) => () => {
        this
            .props
            .modalmodelaction({[value]: false})
    }

    /**
     *作者: 唐勇
     *功能描述: 新增授权和修改授权确认按钮
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    handleOk = (e) => {
        const pramsObj = {
            accountType: '',
            authState: '', //授权状态
            platformAccount: '',
            shopId: ''
        }
        //获取弹窗列表的信息
        this
            .props
            .form
            .validateFieldsAndScroll((err, values) => {
                if (!err) {
                    pramsObj['accountType'] = values.accountType1;
                    pramsObj['authState'] = values.authState1;
                    pramsObj['platformAccount'] = values.platformAccount1;
                    pramsObj['shopId'] = this.props.tablemodel2.shopId;
                }
            })

        if (pramsObj) {
            const newobj = {}
            axios
                .post(`${config.api_url}/oms/order/grab/motan/SellStoreAccountApi/addStore`, pramsObj)
                .then(response => {
                    if (response && response.data.state === '000001') {
                        message.success(response.data.msg);
                        if (this.props.tablemodel2.shopId == "") {
                            // window.open(response.data.data.url);
                            newobj.pageNumber = 1;
                        } else {
                            newobj.pageNumber = 1;
                            newobj.platformAccount=this.props.Paginationmodel.platformAccount;
                            newobj.authState=this.props.Paginationmodel.authState;
                        }
                        if(response.data.data.url){
                            window.open(response.data.data.url);
                        }
                        newobj.pageData = 20;
                        this.props.fetchPosts({key: 'data', value: newobj})
                        this.setState({visible: false});
                        this.props.form.setFieldsValue({
                            accountType1: '',
                            authState1: '', //授权状态
                            platformAccount1: '',

                        });
                    }
                })
        } else {
            message.error("请检查传入的参数！");
        }

        this.setState({visible: false});

    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const {data} = this.props.tablemodel;

        const newdata = datasaddkey(data);
        const columns = this.columns;
        const {visible} = this.state;
        return (
            <div className="newCluenk">

                <div className="title rightbtn" style={{textAlign: 'right'}}>
                    <Button
                        type="primary"
                        icon="plus"
                        onClick={() => {
                            this.authorizeBtn()
                        }}>
                        新增授权
                    </Button>
                </div>

                <div className="content">

                    <Spin spinning={this.props.tablemodel.loading} delay={100} tip="Loading...">
                        <Table
                            rowSelection={null}
                            columns={columns}
                            dataSource={newdata}
                            bordered
                            pagination={false}/>
                    </Spin>

                    <Pagination
                        showTotal={total => `共 ${total} 条`} showTitle
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger showQuickJumper={{goButton:true}}
                        current={this.props.Paginationmodel.current}
                        defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                        total={this.props.Paginationmodel.total}
                        pageSize={this.props.Paginationmodel.pageSize}
                        onChange={this.Paginatihandle}/>

                </div>

                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <div className='add-all'>
                        <div>
                            <Form layout="inline" onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col span={24} className='addauthorize'>
                                        <FormItem
                                            {...this.formItemLayout}
                                            label="*平台账号"
                                            className='ant-xs-row'>
                                            {getFieldDecorator('platformAccount1', {
                                                rules: [
                                                    {
                                                        required: false,
                                                        message: '平台账号'
                                                    }
                                                ],
                                                initialValue: this.props.tablemodel2.platformAccount1
                                            })(<Input placeholder={`请输入`} maxLength="100"/>)}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24} className='addauthorize'>
                                        <FormItem
                                            {...this.formItemLayout}
                                            label="*账号类型"
                                            className='ant-xs-row'>
                                            {getFieldDecorator('accountType1', {
                                                rules: [
                                                    {
                                                        required: false,
                                                        message: '账号类型'
                                                    }
                                                ],
                                                initialValue: this.props.tablemodel2.accountType1
                                            })(
                                                <RadioGroup onChange={this.onChange} defaultChecked={this.state.value}>
                                                    <Radio value={1}>主账号</Radio>
                                                    <Radio value={2}>子账号</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={24} className='addauthorize'>
                                        <FormItem
                                            {...this.formItemLayout}
                                            label="*授权状态"
                                            className='ant-xs-row'>
                                            {getFieldDecorator('authState1', {
                                                rules: [
                                                    {
                                                        required: false,
                                                        message: '授权状态'
                                                    }
                                                ],
                                                initialValue: this.props.tablemodel2.authState1
                                            })(
                                                <RadioGroup onChange={this.onChange1} defaultChecked={this.state.value1}>
                                                    <Radio value={1}>启用</Radio>
                                                    <Radio value={2}>停用</Radio>
                                                </RadioGroup>
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>


                            </Form>

                        </div>

                    </div>
                </Modal>

                <Modalmodel
                    {...{ ...this.props.modalmodel, visible: this.props.modalmodel.visible2, ModalText: '确认删除吗?', }}
                    onOk={this.ModalhandleOk2}
                    onCancel={this.ModalhandleCancel('visible2')}/>

            </div>
        );
    }
}

export default Tablelist