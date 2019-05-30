import React from 'react'
import {
    Modal,
    Form,
    Button,
    message,
    Radio,
    Select,
    Icon
} from 'antd'
import { fetchPost, fetchUpload } from '../../../../../util/fetch';
import {downloadUrl} from '@/util/baseTool';
const FormItem = Form.Item;

class AddModal extends React.Component {
    state = {
        siteList: [],
        accountList: [],
        file: null,
        result: null,
        // 1 
        state: 1
    };

    flag = true

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
            if (this.state.state == 2) return;
            this.state.state = 2;
            this.fileUpload()
                .then(res => {
                    if (!res) {
                        message.warinig("文件上传失败，请重新尝试");
                        return Promise.reject(1)
                    }
                    return fetchPost('/pls/ebay/motan/service/api/IEbayService/importListingListInfo', {
                        ...value,
                        file: res
                    }, 2)
                        .then(result => {
                            this.setState({
                                state: 1
                            })
                            if (result.state === '000001') {
                                message.success("导入成功，请在导入导出列表查看结果")
                                this.handleCancel()
                            }else {
                                message.error(result.msg || "导入成功，请在导入导出列表查看结果")
                                this.reset()
                            }
                        })
                })
                .catch(err => {
                    this.flag = true;
                    this.setState({
                        state: 1
                    })
                })
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
                        name: data.filename,
                        path: data.path
                    }
                } else {
                    message.error(result.msg)
                }

            })

    }

    getFile = (e) => {
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
        const { file, result, state } = this.state;
        const { visible } = this.props;
        return (
            <div>
                <Modal
                    visible={visible}
                    title={"数据导入"}
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
                                <p><a href={downloadUrl('/download/publish/ebay_listing_import.xlsx')}>下载导入模板</a></p>
                                <p>1. 文件支持xls、xlsx格式</p>
                                <p>2. 所导入文件不允许超过2000条SKU</p>
                            </div>
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