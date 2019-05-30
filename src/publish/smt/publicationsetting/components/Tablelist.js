import React, { Component } from 'react'
import {
    Button,
    Form,
    Spin,
    Pagination,
    Table,
    Row,
    Col,
    Input,
    Upload,
    Icon
} from 'antd'
import '../css/css.css'
const FormItem = Form.Item
import Modalmodel from '../../../../components/modalmodel'
import { levelOptions } from "../../../../util/options";
import { datasaddkey, downloadUrl } from "@/util/baseTool";
import { message } from "antd/lib/index";
import * as API from '../../../../constants/Api';   //导入附件上传接口
import { fetchUpload, fetchPost, downlodFile } from 'util/fetch'
import { post } from "util/axios";


var accountData = [],   //用于存储账号数据
    fileUrl = '',       //用于存储文件上传到服务器后返回的url
    returnData = ''     //账号校验成功返回的校验码
    ;
class Tablelist extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 18
        }
    }
    state = {
        fileList: [],
        importLoading: false,
    }
    handleAClick = (batch_num) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        post(`/smtbatchlisting/api/sku/LogList/logList`, { batch_num: batch_num })
            .then(data => {
                if (data.state == '000001') {
                    let url = data.data;
                    downlodFile(url);
                } else {
                    message.error(data.msg);
                }
            }).catch(e => {
                console.log(e);
            })

    }
    handleChange = (e, record) => {
        let value = e.target.value;
        let newObj = {};
        newObj = { 'account': record.account, 'password': value };
        if (accountData.some(a => a.account === record.account)) {
            let index = 0;
            accountData.map((v, i) => {
                if (v.account === record.account) {
                    index = i;
                }
            })
            accountData.splice(index, 1, newObj);
        } else {
            accountData.push(newObj);
        }
        // console.log(accountData)
    }
    columns = [
        {
            title: '导入时间',
            dataIndex: 'time',
        }, {
            title: '导入人员',
            dataIndex: 'operator',
        }, {
            title: '失败原因',
            dataIndex: 'url',
            render: (text, record, index) => {
                return <a href="#" onClick={() => this.handleAClick(record.batch_num)}>失败原因下载</a>
            }
        }
    ]
    columns1 = [
        {
            title: '账号',
            dataIndex: 'account',
        }, {
            title: '密码',
            dataIndex: 'sellerPwd',
            render: (text, record, index) => {
                let val = this.setInputVal(accountData, record.account);
                if(val){
                    val = val.filter(item=>item!==null);
                }
                return (
                    <Input defaultValue={val?val:""} key={record.account} onChange={(e) => this.handleChange(e, record)} />
                )
            }
        }
    ]
    setInputVal = (accountData, account) => {
        const propsVal = datasaddkey(this.props.settingtantablemodule.data);
        if(accountData.length > 0){
            accountData.map((item, index)=>{
                propsVal.map((item2, index2)=>{
                    if(item.account === item2.account){
                        propsVal[index2].password = accountData[index].password;
                    }
                })
            })
            return propsVal.map(item=>{
                if(item.account===account && item.password){
                    return item.password;
                }else{
                    return null;
                }
            })
        }
        return null;
    }
    componentDidMount() {
        const newobj = {}
        newobj.pageData = 20;
        newobj.pageNumber = 1;
        this
            .props
            .fetchPosts({
                key: 'data',
                value: newobj
            });
    }
    Paginatihandle = (page, pageSize) => {
        let newobj = { pageNumber: page, pageData: pageSize }
        this
            .props
            .fetchPosts({
                key: 'data',
                value: newobj
            });
    }
    Paginatihandle2 = (page, pageSize) => {
        let newobj = { pageNumber: page, pageData: pageSize }
        this
            .props
            .fetchtanPosts({
                key: 'data',
                value: newobj
            });
    }

    importdata = () => {
        this.props.modalmodelaction({ visible: true })
        let newobj = { pageNumber: 1, pageData: 20, searchContent: '' }
        this
            .props
            .fetchtanPosts({
                key: 'data',
                value: newobj
            });
    }
    clearModal = () => {
        this.props.modalmodelaction({ visible: false })
        this.props.form.setFieldsValue({ account: "" });
        this.setState({
            fileList: [],
            importLoading: false
        });
        fileUrl = "";
        accountData = [];
    }
    formsubmit = () => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            const newobj = {}
            newobj.account = values.account;
            newobj.pageData = 20;
            newobj.pageNumber = 1;

            this
                .props
                .fetchtanPosts({
                    key: 'data',
                    value: newobj
                });
        });
    }
    // 批量标记相关 start
    downloadTemplate = (e) => {
        e.preventDefault();
        message.info("请求已发出，请等待下载！");
        downlodFile(downloadUrl('/download/publish/smt.xlsx'));
    }
    //弹窗导入操作
    handleImport = () => {
        this.setState({
            importLoading: true
        });
        if (accountData && accountData.length >= 1) {
            let obj = {
                accountData,
            }
            this.accountCheck(obj);
        } else {
            message.error('导入失败，请输入密码进行账号校验');
            this.setState({
                importLoading: false
            });
        }
    }
    accountCheck = (obj) => {
        //账号校验
        fetchPost(`/smtbatchlisting/api/account/AccountCheck/accountCheck`, obj)
            .then(data => {
                if (data.state == '000001') {
                    returnData = data.data;
                    if (returnData && fileUrl) {
                        message.success('账号校验成功');
                        let newObj = {
                            'batch_num': returnData,
                            'url': fileUrl
                        }
                        //把文件上传得到的url以及账号校验得到的校验号做参数，传到后台
                        this.skuImport(newObj);
                    } else if (!returnData && fileUrl) {
                        message.error('账号校验失败');
                        this.setState({
                            importLoading: false
                        });
                    }
                } else {
                    message.error('账号校验失败');
                    this.setState({
                        importLoading: false
                    });
                }
            }).catch(e => {
                console.log(e);
                this.setState({
                    importLoading: false
                });
            })
    }
    skuImport = (newObj) => {
        fetchPost(`/smtbatchlisting/api/sku/SkuImport/skuImport`, newObj)
            .then(data => {
                if (data.state == '000001') {
                    message.info('系统已受理你的数据，处理需要一定的时间，请20-30分钟后下载查看处理结果', 15);
                    this.setState({ importLoading: false });
                    this.clearModal();
                } else {
                    message.error('导入失败');
                    this.setState({
                        importLoading: false
                    });
                }
            }).catch(e => {
                console.log(e);
                message.error('导入失败 ' + e);
                this.setState({
                    importLoading: false
                });
            })
        accountData = [];
    }
    removeUpload = (file) => {
        this.setState(({ fileList }) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
        });
        fileUrl = "";
    };
    beforeUpload = (file, fileList) => {
        const reg = /\.(xls|xlsx)$/i;
        if (reg.test(file.name) && file.size <= 2097152) {
            fetchUpload(API.UPLOAD_URL, fileList).then(data => {
                if (data.state === '000001') {
                    this.setState({fileList: [file]})
                    fileUrl = data.data[0] && data.data[0].path;
                    message.success('文件上传成功');
                }
            }).catch(error => console.log(error))
        } else if (!reg.test(file.name) && file.size <= 2097152) {
            message.error("请上传Excel文件！")
            return false;
        } else {
            message.error("请上传不大于2M的Excel文件！")
            return false;
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { data } = this.props.settingtablemodule;
        const newdata = datasaddkey(data);
        const columns = this.columns;
        const columns1 = this.columns1;
        const tandata = this.props.settingtantablemodule.data
        const newdata1 = datasaddkey(tandata);
        const settext =
            <div className={'newCluenk setting-tan'}>
                <Row>
                    <Col span={12}>
                        <FormItem
                            {...this.formItemLayout2}
                            className='ant-xs-row'
                        >
                            {getFieldDecorator('account')(<Input placeholder={`请输入完整的账号名称，支持多个搜索，用","分隔`} maxLength="100" />)}
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem>
                            <Button type="primary" onClick={() => {this.formsubmit()}}>
                                搜索
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
                <Row className={'margin-ss-top'}>
                    <Table
                        rowSelection={null}
                        columns={columns1}
                        dataSource={newdata1}
                        bordered
                        pagination={false}
                    />
                </Row>

                <Row className={'setting-fen'}>
                    <Pagination
                        showTotal={total => `共 ${total} 条`} showTitle
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger showQuickJumper={{ goButton: true }}
                        current={this.props.Paginationmodel2.current}
                        defaultCurrent={1} onShowSizeChange={this.Paginatihandle2}
                        total={this.props.Paginationmodel2.total}
                        pageSize={this.props.Paginationmodel2.pageSize}
                        onChange={this.Paginatihandle2} />
                </Row>
                <Row>
                    <div className={'setting-tanall'}>
                        <div className="setting-order">
                            <Upload
                                beforeUpload={this.beforeUpload}
                                onRemove={this.removeUpload}
                                fileList={this.state.fileList}
                            >
                                <Button type="primary">
                                    +选择文件
                            </Button>
                            </Upload>
                        </div>
                        <div className="setting-tanbtn">
                            <Button onClick={this.clearModal}>
                                取消
                            </Button>
                            <Button
                                className={'let-btn'}
                                onClick={this.handleImport}
                                disabled={!this.state.fileList.length}
                                loading={this.state.importLoading}
                            >
                                导入
                            </Button>
                        </div>
                        <div className="setting-order2 down-btn">
                            <a onClick={this.downloadTemplate}><Icon type="download" />下载导入模板</a>
                        </div>
                    </div>
                </Row>
            </div>
        return (
            <div className="newCluenk amazonsetting-table">
                <div className="rightbtn">
                    <Button onClick={() => this.importdata()}>
                        导入
                    </Button>
                </div>
                <div className={'settingtablecen'}>
                    <Spin spinning={this.props.settingtablemodule.loading} delay={100} tip="Loading...">
                        <Table
                            rowSelection={null}
                            columns={columns}
                            dataSource={newdata}
                            bordered
                            pagination={false}
                        />
                    </Spin>
                    <Pagination
                        showTotal={total => `共 ${total} 条`} showTitle
                        pageSizeOptions={levelOptions('分页显示条数')}
                        showSizeChanger showQuickJumper={{ goButton: true }}
                        current={this.props.Paginationmodel.current}
                        defaultCurrent={1} onShowSizeChange={this.Paginatihandle}
                        total={this.props.Paginationmodel.total}
                        pageSize={this.props.Paginationmodel.pageSize}
                        onChange={this.Paginatihandle} />
                </div>
                <Modalmodel  {...{
                    ...this.props.modalmodelsetting,
                    visible: this.props.modalmodelsetting.visible,
                    ModalText: settext,
                }}
                    footer={null}
                    width={750}
                    onCancel={this.clearModal}
                />
            </div>
        );
    }
}

export default Tablelist