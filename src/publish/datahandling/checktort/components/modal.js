import React from 'react'
import ItemSelect from '@/common/components/itemSelect'
import {
    Modal,
    Form,
    Button,
    message,
    Radio,
    Select,
    Icon
} from 'antd'
import { fetchPost, fetchUpload } from '@/util/fetch';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class AddModal extends React.Component {
    state = {
        siteList: [],
        accountList: [],
        file: null,
        result: null,
        // 1 
        state: 1
    };

    falg = true

    reset = () => {
        this.props.form.resetFields()
        this.setState({
            file: null,
        })
    }
    //提交
    handleSubmit = () => {
        const { file } = this.state;
        this.props.form.validateFields((err, value) => {
            if (err) return;
            if(this.state.state == 2) return ;
            this.state.state = 2 ;
            this.fileUpload()
                .then(res => {
                    if (!res) {
                        message.warinig("文件上传失败，请重新尝试");
                        return Promise.reject(1)
                    }
                    return fetchPost('/pls/ebay/motan/service/api/IEbayService/importPriceOrStock', {
                        ...value,
                        file: res
                    }, 2)
                        .then(result => {
                            this.setState({
                                state: 1
                            })
                            if (result.state === '000001') {
                                if (result.data && result.data.url) {
                                    message.success("请点击下载文件，查看结果")
                                    this.setState({
                                        result: result.data.url
                                    })
                                } else {
                                    message.success(result.msg || "导入成功")
                                }
                            }
                            this.reset()
                        })
                })
                .catch(err => {
                    this.falg = true;
                    this.setState({
                        state: 1
                    })
                })
        })
    }
    componentWillMount() {
        // this.handleSiteChange()
        // this.handleAccountChange()
    }
    //获取站点列表
    handleSiteChange = (value) => {
        fetchPost('/pls/ebay/motan/service/api/IEbayService/ebaySite', {
            // pageData: 20,
            // pageNumber: 1
        }, 0)
            .then(res => {
                if (res.state === '000001' && res.data.length > 0) {
                    const list = res.data.map(item => {
                        return { id: item.id, name: item.name }
                    });
                    this.setState({
                        siteList: list
                    });
                }
            })
    }
    //获取账号列表
    handleAccountChange = () => {
        fetchPost('/pls/ebay/motan/service/api/IEbayService/ebayAccount', {}, 0)
            .then(res => {
                if (res.state === '000001' && res.data.length > 0) {
                    const list = res.data.filter(item => item.id);
                    this.setState({
                        accountList: list
                    });
                }
            })
    }
    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
    };

    // 文件上传
    fileUpload = () => {
        var { file } = this.state
        if (!file) {
            message.warning("请选择文件");
            return Promise.reject(1)
        }
        return fetchUpload('/yks/file/server/', [file])
            .then(result => {
                if (result.state == "000001" && result.data && result.data.length) {
                    var data = result.data[0];
                    return {
                        fileType: data.contentType,
                        filename: data.filename,
                        path: data.path
                    }
                } else {
                    message.error(result.msg)
                }

            })

    }

    getFile = (e) => {
        var { imgInfoAction } = this.props
        var files = e.target.files
        var file = files[0]
        var { type, size, name } = file
        let testArr = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]
        if (!testArr.includes(type)) return message.warning("文件格式只支持 XLS,XLSX")
        if (/\s/.test(name)) return message.warning("文件名不能包含空格")
        this.setState({
            file
        })
        e.target.value = "";
    }

    handleCancel = () => {
        const { state } = this.state;
        if (state === 2) return message.warinig("文件上传中，请勿关闭");
        this.reset()
        this.setState({
            result: null
        })
        this.props.onCancel()
    }

    render() {
        const { formItemLayout } = this;
        const { siteList, accountList, file, result, state } = this.state;
        const { visible } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const site = getFieldValue("site")
        return (
            <div>
                <Modal
                    visible={visible}
                    title={"导入修改价格库存"}
                    destroyOnClose={true}
                    okText="保存"
                    width={600}
                    maskClosable={false}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form>

                        <FormItem
                            {...formItemLayout}
                            label="修改类型"
                            className="margin-sm-bottom"
                        >
                            {getFieldDecorator('type', {
                                initialValue: 2,
                                rules: [{ required: true, message: "修改类型为必选项" }]
                            })(
                                <RadioGroup>
                                    <Radio value={2}>库存</Radio>
                                    <Radio value={1}>价格</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={<span className="ant-form-item-required">导入文件</span>}
                        >
                            <div className="queue-batch-upload-com">
                                <div className="queue-batch-upload-com-btn">
                                    <span><Icon type="plus" />选择文件</span>
                                    <input onChange={this.getFile} type="file" />
                                </div>
                                {
                                    file ? <a href="javascript:;" className="margin-ss-top breakwrod" style={{ display: "inline-block" }}>{file.name}</a> : null
                                }
                            </div>
                            <div className="queue-batch-upload-info">
                                <p><a href="https://erp.youkeshu.com/download/publish/inventory-price-templates.xlsx">下载导入模板</a></p>
                                <p>1. 文件支持xls、xlsx格式</p>
                                <p>2. 所导入文件不允许超过2000条SKU</p>
                            </div>
                            {
                                result ?
                                    <p className="red">部分成功，请点击<a href={result}>下载导入结果</a></p>
                                    : null
                            }
                        </FormItem>
                        <div className="text-right">
                            <Button className="margin-sm-right" type="primary" onClick={this.handleSubmit}>保存</Button>
                            <Button disabled={state === 2} onClick={this.handleCancel}>{result ? "返回" : "取消"}</Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default Form.create()(AddModal)


// <FormItem
//                             {...formItemLayout}
//                             label="站点"
//                             className="margin-sm-bottom"
//                         >
//                             {getFieldDecorator('site', {
//                                 rules: [{ required: true, message: "站点为必选项" }]
//                             })(
//                                 <Select
//                                     placeholder="请选择站点"
//                                 >
//                                     {
//                                         siteList.map(v => {
//                                             return <Option key={v.id} value={v.id}>{v.name}</Option>
//                                         })
//                                     }
//                                 </Select>
//                             )}
//                         </FormItem>
//                         <FormItem
//                             {...formItemLayout}
//                             label="账号"
//                             className="margin-sm-bottom"
//                         >
//                             {getFieldDecorator('saleAccount', {
//                                 rules: [{ required: true, message: "账号为必选项" }]
//                             })(
//                                 <Select

//                                     placeholder="请选择账号"
//                                     showSearch
//                                     disabled={!site}
//                                 >
//                                     {
//                                         accountList.map(v => {
//                                             return <Option key={v.id} value={v.id}>{v.id}</Option>
//                                         })
//                                     }
//                                 </Select>
//                             )}
//                         </FormItem>