import React from 'react';
import {
    Form,
    Button,
    Radio,
    Input,
    Select,
    message,
    DatePicker,
    Checkbox,
    Upload,
    Col,
    Row
} from 'antd';
import Presetform from './Presetform';
import moment from 'moment';
import { fetchUpload } from '../../../../util/fetch';
// import CUpload from '../../../../components/cupload';
import { popUpImage, angentPicUrl, randNum } from '@/util/baseTool';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

class FilterType extends React.Component {
    state = {
        uploadFileList: {}, // 上传组件的文件列表的集合
    }

    // 图片后缀名
    extensionsImg = ['JPG', 'JPEG', 'PNG', 'BMP', 'GIF']

    componentWillReceiveProps(nextProps) {
        const nextFieldInfo = nextProps.fieldInfo;
        const nextType = nextProps.type;
        if (nextType === 'edit' && nextFieldInfo !== this.props.fieldInfo) {
            const targetArr = nextFieldInfo.filter(item => item.fieldType === 'file' && item.fieldValue);
            const newTargetArr = {};
            if (targetArr.length > 0) {
                targetArr.forEach((item) => {
                    const value = item.fieldValue;
                    const arr = value.split('/');
                    const str = arr[arr.length - 1].split('.');
                    newTargetArr[`uploadlist${item.fieldId}`] = [{
                        uid: item.fieldId,
                        url: value,
                        name: str[0].slice(0, str[0].length - 14),
                        extension: str[1]
                    }];
                });
            }
            this.setState({
                uploadFileList: newTargetArr,
            });
        }
    }

    beforeUpload = (file, fileList, fieldId) => {
        const uploadFileLists = this.state.uploadFileList[`uploadlist${fieldId}`] ? this.state.uploadFileList[`uploadlist${fieldId}`] : [];
        const reg = /\.(jpg|jpeg|gif|png|bmp)$/i;
        if (!reg.test(file.name)) {
            message.error('请上传图片！');
            return false;
        }
        if (uploadFileLists.length >= 1) {
            message.error('附件不能超过1个');
            return false;
        }
        if (file.size > 5242880) {
            message.error('文件大小不得超过5MB！');
            return false;
        }
        message.info('文件正在上传，请稍候');
        fetchUpload('/yks/file/server/', fileList).then((data) => {
            if (data.state === '000001') {
                const { uploadFileList } = this.state;
                const cfile = data.data[0];
                const fileUrl = cfile && cfile.path;
                const arr = fileUrl.split('/');
                const str = arr[arr.length - 1].split('.')[0];
                const uploadFileListPart = {
                    uid: file.uid,
                    url: fileUrl,
                    extension: cfile.extension,
                    name: str.slice(0, str.length - 14),
                };
                this.props.form.setFieldsValue({ [`fieldData.data${fieldId}.fieldValue`]: fileUrl });
                this.setState({
                    uploadFileList: {
                        ...uploadFileList,
                        [`uploadlist${fieldId}`]: [uploadFileListPart],
                    },
                });
                message.success('文件上传成功');
            }
        });
    }

    // 文件移除
    removeUpload = (file, fieldId) => {
        this.props.form.setFieldsValue({ [`fieldData.data${fieldId}.fieldValue`]: '' });
        this.setState({
            uploadFileList: { [`uploadlist${fieldId}`]: [] },
        });
    };

    // 文件预览
    preview = (v) => {
        const { extension, url } = v;
        const e = extension.toUpperCase();
        if (this.extensionsImg.includes(e)) {
            popUpImage(url, true);
        }
    }

    // 请求的表单数据映射的对应表单数据
    getForm = (item) => {
        const {
            type,
            isReview,
            cancelRefundLoading,
        } = this.props;
        let intialFileList = [];
        const { uploadFileList } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        let initialValue;
        let postField = `fieldData.data${item.fieldId}.fieldValue`;
        if (type === 'edit') {
            initialValue = item.fieldValue;
            // 处理特殊字段
            if (item.fieldType === 'checkbox') {
                initialValue = initialValue.split('|');
            } else if (item.fieldType === 'date') {
                initialValue = initialValue ? moment(+initialValue) : undefined;
            } else if (item.fieldType === 'file') {
                intialFileList = uploadFileList[`uploadlist${item.fieldId}`];
            }
        } else {
            if (item.fieldType === 'radio') {
                initialValue = item.fieldOption.split('|')[0];
            }
        }
        return (
            // 生成表格(区分上传表单类型)
            item.fieldType !== 'file'
                ? (
                    <FormItem
                        {...formItemLayout}
                        label={item.fieldName}
                    >
                        {getFieldDecorator(postField, {
                            rules: [{
                                required: item.isRequire !== 1,
                                message: `需填写${item.fieldName}`,
                            }],
                            initialValue,
                        })(
                            this.filterType(item),
                        )}
                    </FormItem>
                )
                : (
                    <div>
                        <FormItem
                            {...formItemLayout}
                            label={item.fieldName}
                        >
                            {getFieldDecorator(postField, {
                                rules: [{
                                    required: item.isRequire !== 1 && !isReview,
                                    message: `需填写${item.fieldName}`,
                                }],
                                initialValue: intialFileList,
                            })(
                                <Upload
                                    beforeUpload={(file, fileList) => this.beforeUpload(file, fileList, item.fieldId)}
                                    onRemove={file => this.removeUpload(file, item.fieldId)}
                                    // config={{
                                    //     beforeUpload: (file, fileList) => this.beforeUpload(file, fileList, item.fieldId),
                                    // }}
                                    // onRemove={file => this.removeUpload(file, item.fieldId)}
                                    fileList={[]}
                                >
                                    <Button
                                        disabled={isReview}
                                        onChange={cancelRefundLoading}
                                    >
                                        点击上传
                                    </Button>
                                </Upload>,
                            )}
                        </FormItem>
                        <Row type="flex" align="middle">
                            <Col span={5}></Col>
                            <Col span={16}>
                                {
                                    uploadFileList[`uploadlist${item.fieldId}`] && uploadFileList[`uploadlist${item.fieldId}`].map((v) => {
                                        const {
                                            name, extension,
                                        } = v;
                                        return (
                                            <div className="preview-selected-file" key={v.uid}>
                                                {name}.{extension}
                                                <span className="margin-sm-left" onClick={() => this.removeUpload('file', item.fieldId)}> 删除</span>
                                                <i className="margin-sm">|</i>
                                                <span onClick={() => this.preview(angentPicUrl(v))}>预览</span>
                                            </div>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                    </div>
                )
        );
    }

    // 获取请求的表单数据映射的对应表单类型
    filterType = (item) => {
        let fieldForm;
        let option;
        let fieldOption = item.fieldOption;
        const { cancelRefundLoading, isReview } = this.props; // 增加onChange时间，在内容改变时取消确定按钮的loading状态 cwc 2019年1月30日09:30:22
        switch (item.fieldType) {
        case 'input':
            fieldForm = (
                <Input disabled={isReview} placeholder={`请输入${item.fieldName}`} onChange={cancelRefundLoading} />
            );
            break;
        case 'radio':
            fieldOption = fieldOption.split('|');
            fieldForm = (
                <RadioGroup disabled={isReview} onChange={cancelRefundLoading}>
                    {fieldOption.map(items => <Radio key={items} value={items}>{items}</Radio>)}
                </RadioGroup>
            );
            break;
        case 'select':
            fieldOption = fieldOption.split('|');
            fieldForm = (
                <Select disabled={isReview} placeholder="请选择" onChange={cancelRefundLoading}>
                    {fieldOption.map(items => <Option key={randNum()} value={items}>{items}</Option>)}
                </Select>
            );
            break;
        case 'textarea':
            fieldForm = (
                <TextArea disabled={isReview} autosize={{ minRows: 4, maxRows: 4 }} onChange={cancelRefundLoading} />
            );
            break;
        case 'checkbox':
            fieldOption = fieldOption.split('|');
            option = fieldOption.map(items => ({ label: items, value: items }));
            fieldForm = (
                <CheckboxGroup disabled={isReview} options={option} onChange={cancelRefundLoading} />
            );
            break;
        case 'date':
            fieldForm = (
                <DatePicker showTime disabled={isReview} format="YYYY-MM-DD HH:mm:ss" onChange={cancelRefundLoading} />
            );
            break;
        default:
            fieldForm = <Input disabled={isReview} placeholder={`请输入${item.fieldName}`} onChange={cancelRefundLoading} />;
            break;
        }
        return fieldForm;
    }

    render() {
        const { fieldInfo } = this.props;
        const { getFieldDecorator } = this.props.form;
        let formData = [];
        formData = fieldInfo;
        return (
            <div className="add-refund-item">
                <div className="add-label">退款信息</div>
                <div className="add-content refund-form-info">
                    <Presetform {...this.props}>
                        {formData.map(item => (
                            <div key={item.fieldId}>
                                {this.getForm(item)}
                                <FormItem>
                                    {getFieldDecorator(`fieldData.data${item.fieldId}.fieldId`, {
                                        initialValue: item.fieldId,
                                    })(
                                        <Input type="hidden" />,
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator(`fieldData.data${item.fieldId}.type`, {
                                        initialValue: item.fieldType,
                                    })(
                                        <Input type="hidden" />,
                                    )}
                                </FormItem>
                            </div>
                        ))}
                    </Presetform>
                </div>
            </div>
        );
    }
}
export default FilterType;
