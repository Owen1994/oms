import React, { Component } from 'react';
import { Form, Input, Select, Link, Upload, Button, Icon, message } from 'antd';
import * as API from '../../../../constants/Api';   //导入附件上传接口
import { fetchUpload } from '../../../../util/fetch'
import { parseUploadFileObj, parseNetErrorToMsg } from '../../../../util/baseTool'
const FormItem = Form.Item;
const Option = Select.Option;

/**
 * 意向供应商页面新增弹窗form表单
 */

class AddDetail extends Component {  

    constructor(props) {
        super(props);
        const { item } = this.props;
        console.log('item', item)
        if (item) {
            this.props.dataFetch('attachment1', [item.attachment[0]]);
            this.props.dataFetch('attachment2', [item.attachment[1]]);
            this.state = {
                loading: false,
                avatars: item.attachment[0]!=={}&&item.attachment[0].url ? [this.paramAttachment(item.attachment[0])] : [],
                files: item.attachment[1]!=={}&&item.attachment[1].url ? [this.paramAttachment(item.attachment[1])] : []
            }
        } else {
            this.state = {
                loading: false,
                avatars: [],
                files: []
            }
        }

        this.removeUpload = this.removeUpload.bind(this);
    }

    paramAttachment = (item) => {
        item.status = 'done';
        item.uid = Date.now();
        return item;
    }

    formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
    };

    uploadType = [
        "image/jpg",
        "image/png",
        "image/jpeg",
        "pplication/x-zip-compressed",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    uploadType1 = [
        "image/png",
        "image/jpg",
        "image/jpeg"
    ];
    uploadType2 = [
        "pplication/x-zip-compressed",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    setFormInitial = () => {
        if (this.props.item) {
            const { item } = this.props;
            this.props.form.setFields({
                vendorCode: {
                    value: item.vendorsCode
                },
                supplierName: {
                    value: item.supplierName
                },
                supplierCode: {
                    value: item.supplierCode
                },
                isArchiving: {
                    value: item.isArchiving
                },
                name: {
                    value: item.contactName
                },
                tel: {
                    value: item.contactTel
                },
                qq: {
                    value: item.contactQQ
                },
                address: {
                    value: item.address
                },
            })
        }
    }

    componentDidMount() {
        //编辑时导入表格行信息
        this.setFormInitial();
    }

    componentWillReceiveProps() {
        //修改后再次点击编辑，更新表格行信息
        if (!this.props.update) {
            this.setFormInitial();
        }

    }

    beforeUpload = (type, file, fileList) => {
        console.log(file.type);
        //判断格式
        let typeArr = this.uploadType.filter((v, i) => {
            return file.type === v;
        });
        if (typeArr.length === 0) {
            message.error("文件格式不正确");
            type === 'avatars' ? this.setState({ avatars: [] }) : this.setState({ files: [] });
            return false;
        }
        fetchUpload(API.UPLOAD_URL, fileList).then(data => {
            if (data.state === '000001') {
                this.setState(prevState => {
                    const item = parseUploadFileObj(data.data[0]);
                    if (type === 'avatars') {
                        item.name = '';
                    }
                    const files = type === 'avatars' ? [] : [...prevState.files];
                    files.push(item);
                    return {
                        [type]: files
                    }
                })
            }
            //把两个附件存入redux
            this.props.dataFetch('attachment1', this.state.avatars);
            this.props.dataFetch('attachment2', this.state.files);
        }).catch(error => console.log(error))

    }

    removeUpload = (name, file) => {
        if (!name || !file) {
            return;
        }
        const array = this.state[name];
        const newArray = array.filter((item, index) => item.uid !== file.uid)
        this.setState({
            [name]: newArray || []
        })

        this.props.dataFetch('attachment1', this.state.avatars);
        this.props.dataFetch('attachment2', this.state.files);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { avatars, files } = this.state;
        //上传按钮
        const uploadBtn = (
            <Button>
                <Icon type="upload" /> Upload
            </Button>
        );
        const addItem = this.props.item ? (
            <div style={{marginBottom: 20}}>
                <FormItem
                    {...this.formItemLayout}
                    label="供应商名称"
                >
                    {getFieldDecorator('supplierName', {
                        rules: [{
                            required: true, message: '请输入供应商名称.',
                        }],
                    })(
                        <Input maxLength={20} />
                    )}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="正式供应商编码"
                >
                    {getFieldDecorator('supplierCode', {
                        rules: [{
                            required: true, message: '请输入正式供应商编码.',
                        }],
                    })(
                        <Input maxLength={20} />
                    )}
                </FormItem>
                <FormItem
                    {...this.formItemLayout}
                    label="基础库是否已建档"
                >
                    {getFieldDecorator('isArchiving', {
                        rules: [{
                            required: true, message: '请选择基础库是否已建档.',
                        }],
                    })(
                        <Select placeholder="请选择">
                            <Option value={1} key={1}>是</Option>
                            <Option value={0} key={0}>否</Option>
                        </Select>
                    )}
                </FormItem>
            </div>
        ) : (
                <FormItem
                    {...this.formItemLayout}
                    label="意向供应商名称"
                >
                    {getFieldDecorator('vendorName', {
                        rules: [{
                            required: true, message: '请输入意向供应商名称.',
                        }],
                    })(
                        <Input maxLength={20} />
                    )}
                </FormItem>
            );

        return (
            <div className="npd-supplier-adddetail">
                <Form onLoad={this.onLoad}>
                    <FormItem
                        {...this.formItemLayout}
                        label="意向供应商编码"
                    >
                        {getFieldDecorator('vendorCode')(
                            <Input readOnly disabled />
                        )}
                    </FormItem>
                    {addItem}
                    <FormItem
                        {...this.formItemLayout}
                        label="联系人"
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入联系人姓名.' },
                            ],
                        })(
                            <Input maxLength={20} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="联系电话"
                    >
                        {getFieldDecorator('tel', {
                            rules: [
                                { required: true, message: '请输入联系电话.' },
                            ],
                        })(
                            <Input maxLength={20} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="QQ"
                    >
                        {getFieldDecorator('qq', {
                            rules: [
                                { required: true, message: '请输入联系QQ.' },
                            ],
                        })(
                            <Input maxLength={20} />
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="地址"
                    >
                        {getFieldDecorator('address', {
                            rules: [
                                { required: true, message: '请输入地址.' },
                            ],
                        })(
                            <Input maxLength={80}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="附件一"
                    >
                        {getFieldDecorator('attachment1')(
                            <Upload
                                listType="picture"
                                beforeUpload={(file, fileList) =>
                                    this.beforeUpload('avatars', file, fileList)
                                }
                                fileList={avatars}
                                onRemove={(file) => this.removeUpload('avatars', file)}
                                accept={this.uploadType1.join(',')}
                            >
                                {
                                    avatars.length >= 1 ? null : uploadBtn
                                }
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...this.formItemLayout}
                        label="附件二"
                    >
                        {getFieldDecorator('attachment2')(
                            <Upload
                                beforeUpload={(file, fileList) =>
                                    this.beforeUpload('files', file, fileList)
                                }
                                fileList={files}
                                onRemove={(file) => this.removeUpload('files', file)}
                                accept={this.uploadType2.join(',')}
                            >
                                {
                                    files.length >= 1 ? null : uploadBtn
                                }
                            </Upload>
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(AddDetail);