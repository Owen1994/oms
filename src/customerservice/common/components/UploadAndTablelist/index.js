import React from 'react';
import { Form, Table, Input, Upload, Button, message, Pagination, Row, Col, Spin } from 'antd';
import Tableoption from '../../../../components/Tableoption';

import { SAVE_BATCH_IMPORT, GET_BATCH_IMPORT } from './api';
import { fetchPost, fetchUpload, openDownloadFile } from '../../../../util/fetch';
import { page } from '../../../../constants';
import './index.css';
import { randNum, downloadUrl } from '../../../../util/baseTool';

const { TextArea } = Input;
const FormItem = Form.Item;

class AddModal extends React.Component {
    state = {
        logsData: [],
        uploadFileList:[],
        total: 0,
        current: 1,
        pageSize: 20,
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'index',
            align: 'center',
            width: 50,
            render: (text, record, index) => <span>{index+1}</span>
        },
        {
            title: '原文件名',
            dataIndex: 'sourceFileName',
            align: 'center',
            width: 300,
        },
        {
            title: '导入时间',
            dataIndex: 'importTime',
            align: 'center',
            width: 300,
        },
        {
            title: '导入状态',
            dataIndex: 'statusText',
            align: 'center',
            width: 100,
            render: (text, record) => {
                let clsName = '';
                if (text === '已导入') {
                    clsName = 'import-succ';
                } else if (text === '导入中') {
                    clsName = 'import-ing';
                } else if (text === '导入失败') {
                    clsName = 'import-fail';
                } else if (text === '部分导入') {
                    clsName = 'import-part';
                }
                return <div className={clsName}>{text}</div>
            }
        },
        {
            title: '导入数量',
            dataIndex: 'num',
            width: 200,
            align: 'center',
            render: (text, record) => <div>成功:{record.sucNum}，失败:{record.failNum}</div>
        },
        {
            title: '导入说明',
            dataIndex: 'desc',
            align: 'center',
            width: 300,
        },
        {
            title: '操作',
            dataIndex: 'option',
            width: 280,
            align: 'center',
            render: (text, record) => {
                const hasFailData = ['部分导入', '导入失败'];
                const options = [
                    {
                        name: '下载原文件',
                        onChange: () => openDownloadFile(record.sourceFile),
                        funcId: '009-000006-000001-004',
                        subs: [],
                    }, {
                        name: '下载失败数据',
                        funcId: '009-000006-000001-004',
                        onChange: () => openDownloadFile(record.failFile),
                        subs: [],
                    }
                ];
                if (!hasFailData.includes(record.statusText)) {
                    options.splice(1, 1);
                }
                return (
                    <Tableoption {...this.props} noAccessManage={true} options={options} />
                );
            },
        },
    ]

    componentDidMount() {
        this.getUploadLogs();
    }

    componentDidUpdate(preProps) {
        if (!preProps.visible && preProps.visible !== this.props.visible) {
            this.props.form.resetFields();
            this.setState({
                logsData: [],
                uploadFileList:[],
                total: 0,
                current: 1,
                pageSize: 20,
            })
            this.getUploadLogs();
        }
    }

    beforeUpload = (file, fileList) => {
        const reg = /\.(xlsx|xls)$/i;
        if (reg.test(file.name)) {
            message.info('文件正在上传，请稍候');
            fetchUpload('/yks/file/server/', fileList).then((data) => {
                if (data.state === '000001') {
                    const fileUrl = data.data[0] && data.data[0].path;
                    const params = {};
                    const arr = fileUrl.split('/');
                    params.url = fileUrl;
                    params.uid = file.uid;
                    params.name = arr[arr.length - 1];
                    this.setState({
                        uploadFileList: [...params],
                    });
                    message.success('文件上传成功');
                }
            });
        } else {
            message.error('请上传excel文件！');
            return false;
        }
    }

    // 文件移除
    removeUpload = (file) => {
        this.setState(({ uploadFileList }) => {
            const index = uploadFileList.indexOf(file);
            const newFileList = uploadFileList.slice();
            newFileList.splice(index, 1);
            return {
                uploadFileList: newFileList,
            };
        });
    };

    getUploadLogs = (pageNumber, pageData) => {
        let params = {};
        params.pageNumber = pageNumber || page.defaultCurrent;
        params.pageData = pageData || page.defaultPageSize;
        const refundParam = this.getOtherParam();
        this.setState({ uploadLoading: true });
        fetchPost(GET_BATCH_IMPORT, { ...params, ...refundParam}, 2)
            .then((res) => {
                if (res && res.state === '000001') {
                    const data = res.data;
                    this.setState({
                        logsData: data.data,
                        total: data.total,
                        current: params.pageNumber,
                        pageSize: params.pageData,
                    });
                    this.setState({ uploadLoading: false });
                }
            })
    }

    uploadInfo = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { uploadFileList } = this.state;
                if (!uploadFileList.length) {
                    message.warning('请重新上传文件!');
                }
                const refundParam = this.getOtherParam();
                values.fileName = uploadFileList[0].name;
                values.fileUrl = uploadFileList[0].url;
                delete values.uploadFileId;
                this.setState({ loading: true });
                fetchPost(SAVE_BATCH_IMPORT, { ...values, ...refundParam }, 1)
                    .then((res) => {
                        if (res && res.state === '000001') {
                            this.getUploadLogs();
                            this.props.form.resetFields();
                            this.setState({
                                uploadFileList: []
                            })
                        }
                        this.setState({ loading: false });
                    })
            }
        })
    }

    getOtherParam = () => {
        let params = {};
        const { uploadType, platformId } = this.props;
        if ([1, 2].includes(uploadType)) {
            params.platformId = platformId;
            params.group = '1';
            if (uploadType === 1) {
                params.type = 1;
            } else {
                params.type = 2;
            }
        } else if (uploadType === 3) {
            params.type = 3;
        }
        return params;
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12 },
        };
        const { uploadType } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { loading, uploadLoading, logsData, uploadFileList, total, current, pageSize } = this.state;
        const downloadBtn = uploadType === 3 ? (
            <Button onClick={() => openDownloadFile(downloadUrl('/download/customer/paypal_template.xlsx'))}>下载模板</Button>
        ) : null
        return (
            <div className='overflow-hidden'>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="请选择上传文件"
                    >
                        {getFieldDecorator('uploadFileId', {
                            rules: [{ required: true, message: '请选择上传文件' }],
                        })(
                            <Upload
                                beforeUpload={this.beforeUpload}
                                onRemove={this.removeUpload}
                                fileList={uploadFileList}
                            >
                                <Button>选择文件</Button>
                            </Upload>,
                        )}
                    </FormItem>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={21}>
                            <div style={{ marginTop: 10 }}>
                                <span className="customer-gray" style={{ paddingRight: 15 }}>温馨提示：文件类型只支持*.xls,*.xlsx格式</span>
                                {downloadBtn}
                            </div>
                        </Col>
                    </Row>
                    <FormItem
                        {...formItemLayout}
                        label="导入说明"
                        className="margin-sm-top"
                    >
                        {getFieldDecorator('importDesc')(
                            <TextArea rows={4} placeholder="请输入导入说明" />,
                        )}
                    </FormItem>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={12}>
                            <div className='customer-uploadpaypal-btn'>
                                <Button type='primary' loading={loading} onClick={() => this.uploadInfo()}>上传</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
                <Spin spinning={uploadLoading} delay={500}>
                    <Table
                        className="margin-sm-top"
                        bordered
                        size="small"
                        indentSize={0}
                        columns={this.columns}
                        dataSource={logsData}
                        pagination={false}
                        rowKey={() => randNum()}
                    />
                    <Pagination
                        className='upload-logs-pagination'
                        showTotal={totals => `共 ${totals} 条`}
                        pageSizeOptions={page.pageSizeOptions} // 指定显示页数的选项(数组) ['20', '30', '40', '50', '100', '200']
                        showSizeChanger // 是否可以改变 pageSize
                        defaultCurrent={page.defaultCurrent} // 默认的当前页数
                        current={current}
                        showQuickJumper={{ goButton: true }} // 是否可以快速跳转至某页
                        total={total} // 数据总数
                        pageSize={pageSize} // 每页条数
                        onChange={this.getUploadLogs} // 页码改变的回调，参数是改变后的页码及每页条数
                        onShowSizeChange={this.getUploadLogs} // pageSize 变化的回调
                    />
                </Spin>
            </div>
        );
    }
}
export default Form.create()(AddModal);
