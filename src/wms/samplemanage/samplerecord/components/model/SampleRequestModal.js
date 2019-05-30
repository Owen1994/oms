import React from 'react';
import {
    Button, Col, DatePicker,
    Form, Icon, Input, message,
    Modal, Row, Upload,
} from 'antd';
import moment from 'moment';
import CSelect from '../../../../../components/cselect';
import { PURCHASING_AGENT } from '../../../../common/constants/Api';
import { downlodFile, fetchPost, fetchUpload } from '../../../../../util/fetch';
import { ADD, DOWNLOAD_URL } from '../../constants/Api';
import { getLoginmsg } from '../../../../../util/baseTool';

/**
 * 样品申请
 */
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

class SampleRequestModal extends React.Component {
    state = {
        fileList: [],
        fileUrls: [],
    };

    onCancel = () => {
        this.setState({
            fileList: [],
            fileUrls: [],
        });
        const cancel = this.props.cancel;
        if (cancel) {
            cancel();
        }
    };

    onOk = () => {
        const { warehouse, ok } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    data: {
                        ...values,
                        fileUrl: this.state.fileUrls[0].path,
                        warehouseCode: warehouse.warehouseCode,
                        receiptDate: values.receiptDate && values.receiptDate.valueOf(),
                    },
                };

                fetchPost(ADD, params, 1)
                    .then((result) => {
                        if (result.state === '000001') {
                            if (ok) {
                                ok();
                            }
                            this.onCancel();
                        }
                    });
            }
        });
    };

    // 文件上传
    beforeUpload = (file, fileList) => {
        // 判断格式
        if (file.type !== 'application/vnd.ms-excel') {
            message.error('只允许上传.csv格式文件，请重新上传！');
            return false;
        }
        if (this.state.fileList.length >= 1) {
            message.error('只允许上传1个文件');
            return false;
        }
        fetchUpload('/yks/file/server/', fileList).then((data) => {
            if (data.state === '000001') {
                this.setState((prevState) => {
                    const prevFileList = [...prevState.fileList];
                    const prevUrls = [...prevState.fileUrls];
                    prevFileList.push(fileList[0]);
                    prevUrls.push({ uid: fileList[0].uid, path: data.data[0].path, size: fileList[0].size });
                    return {
                        fileList: prevFileList,
                        fileUrls: prevUrls,
                    };
                });
            }
        });
        return false;
    };

    // 文件移除
    removeUpload = (file) => {
        const {
            fileList,
            fileUrls,
        } = this.state;
        const newFileList = fileList.filter(v => v.uid !== file.uid);
        const newFileUrls = fileUrls.filter(v => v.uid !== file.uid);
        this.setState({
            fileList: newFileList,
            fileUrls: newFileUrls,
        });
    };

    // 下载
    downLoad = () => {
        downlodFile(DOWNLOAD_URL);
    };

    render() {
        const {
            visible, warehouse,
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        const form = (
            <div>
                <FormItem
                    {...formItemLayout}
                    label="仓库名称:"
                >
                    <div>{warehouse && warehouse.warehouseName}</div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="主体:"
                >
                    {getFieldDecorator('principal', {
                        rules: [{ required: true, message: '请选择' }],
                    })(
                        <CSelect
                            code="code" // 列表编码字段
                            name="name" // 列表名称字段
                            url={PURCHASING_AGENT}
                            placeholder="请选择"
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="申请人:"
                >
                    <div>{getLoginmsg().userName}</div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电话号码:"
                >
                    {getFieldDecorator('phoneNumber', {
                        rules: [{ required: true, message: '请输入' }],
                    })(
                        <Input
                            placeholder="请输入"
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="目的地:"
                >
                    {getFieldDecorator('destination', {
                        rules: [{ required: true, message: '请输入' }],
                    })(
                        <Input
                            placeholder="请输入"
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="申请理由:"
                >
                    {getFieldDecorator('reason', {
                        rules: [{ required: true, message: '请输入' }],
                    })(
                        <Input
                            placeholder="请输入"
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="期望收货日期:"
                >
                    {getFieldDecorator('receiptDate', {
                        initialValue: moment().add(1, 'days').startOf('day'),
                        rules: [{ required: true, message: '请选择' }],
                    })(
                        <DatePicker
                            size="default"
                            disabledDate={m => m < moment().add(1, 'days').startOf('day')}
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="使用时长:"
                >
                    {getFieldDecorator('usePeriod', {
                        rules: [{ required: true, message: '请输入' }],
                    })(
                        <Input
                            placeholder="请输入"
                        />,
                    )}
                </FormItem>
            </div>
        );
        const upload = (
            <div>
                <FormItem
                    {...formItemLayout}
                    label="产品详情"
                >
                    {
                        getFieldDecorator('uploadFile', {
                            rules: [{ required: true, message: '请上传文件' }],
                        })(
                            <div>
                                <Upload
                                    fileList={this.state.fileList}
                                    beforeUpload={(file, fileList2) => this.beforeUpload(file, fileList2)}
                                    onRemove={file => this.removeUpload(file)}
                                >
                                    <Button>
                                        <Icon type="upload" />
                                        Upload
                                    </Button>
                                </Upload>
                                <span>xls文件中一次上传的数量最好不要超过1000，文件大小最好不要超过500K。</span>
                                <Row>
                                    <Col>
                                        <Button onClick={this.downLoad}>
                                            <Icon type="download" />
                                            下载模板文件
                                        </Button>
                                    </Col>
                                </Row>
                            </div>,
                        )
                    }
                </FormItem>
            </div>
        );
        return (
            <Modal
                title="样品申请"
                width={500}
                visible={visible}
                onCancel={this.onCancel}
                onOk={this.onOk}
                maskClosable={false}
            >
                <div className="margin-ms-left margin-ms-right">
                    {form}
                    {upload}
                </div>
            </Modal>
        );
    }
}

export default Form.create()(SampleRequestModal);
