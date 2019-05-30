import React from 'react'
import {
    Modal,
    Form,
    Input,
    Table,
    message,
    Spin,
} from 'antd';

import { fetchPost } from '../../../../util/fetch';

import {
    Handle_Way_List,
} from '../constants/index';
import CSelect from '../../../../components/cselect';
import { None_Product_List_Api, Save_Submit_None_Product_Api } from '../constants/Api';

const FormItem = Form.Item;

class ModifyNPModal extends React.Component {

    state = {
        data: [],
        loadingState: false,
    };

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible;
        const preVisible = this.props.visible;
        if (visible && !preVisible && nextProps.item) {
            const data = {
                data: {
                    key: nextProps.item['key']
                }
            };
            this.setState({
                loadingState: true,
            });
            fetchPost(None_Product_List_Api, data, 2)
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({
                            loadingState: false,
                            data: [result.data],
                        })
                    } else {
                        this.setState({
                            loadingState: false,
                        })
                    }
                })
        }
    }

    columns = [
        {
            title: '序号',
            dataIndex: 'key',
            width: 50,
            render: (text, record, index) => (
                <div style={{textAlign: 'center'}}>
                    {index + 1}
                </div>
            )
        },
        {
            title: '处理方式',
            dataIndex: 'handleWayCode',
            width: 80,
            render: (text, record, index) => {
                const { getFieldDecorator } = this.props.form;
                return (
                    <FormItem>
                        {getFieldDecorator('handleWay' + index, {
                            initialValue: text ? Number(text) : 1,
                        })(
                            <CSelect
                                code="code" // 列表编码字段
                                name="name" // 列表名称字段
                                list={Handle_Way_List}
                                onChange={value => this.onChangeValueName(value, 'handleWayCode')}
                                placeholder="请选择"
                            />
                        )}
                    </FormItem>
                )
            }
        },
        {
            title: '采购单',
            dataIndex: 'po',
            width: 150,
            render: (text, record, index) => {
                const { getFieldDecorator } = this.props.form;
                return (
                    <FormItem>
                        {getFieldDecorator('po' + index, {
                            initialValue: text,
                        })(
                            <Input
                                onBlur={value => this.onChangeValueName(value, 'po')}
                                disabled={Number(record.handleWayCode) === 1}
                            />
                        )}
                    </FormItem>

                )
            }
        },
        {
            title: '采购处理备注',
            dataIndex: 'note',
            width: 250,
            render: (text, record, index) => {
                const { getFieldDecorator } = this.props.form;
                return (
                    <FormItem>
                        {getFieldDecorator('note' + index, {
                            initialValue: text,
                        })(
                            <Input
                                onBlur={value => this.onChangeValueName(value, 'note')}
                            />
                        )}
                    </FormItem>
                )
            }
        }
    ];

    onChangeValueName = (event, key) => {
        const data  = this.state.data;
        if (key === 'handleWayCode') {
            data[0][key] = event;
            this.setState({
                data,
            });
        } else {
            data[0][key] = event.target.value;
            this.setState({
                data,
            });
        }
    };


    /**
     * 表单提交
     */
    handleSubmit = () => {

        const listData  = this.state.data;

        if (listData[0]['handleWayCode'] === 5) {
            if (listData[0]['po'].length === 0) {
                message.error('采购单不能为空');
                return;
            }
        }

        const data = {
            data: {
                key: this.props.item['key'],
                handleWay: listData[0]['handleWayCode'],
                note: listData[0]['note'],
                po: listData[0]['po'] + '',
                dataType: 2,
            }
        };

        fetchPost(Save_Submit_None_Product_Api, data, 1)
            .then(result => {
                if (result.state === '000001') {
                    this.handleCancel();
                    this.props.loadData();
                }
            })
    };


    /**
     * 取消
     */
    handleCancel = () => {
        this.setState({
            data: [],
        });
        this.props.showModal(false, {});
    };

    render() {
        const { visible } = this.props;

        const { loadingState, data } = this.state;
        return (
            <Modal
                visible={visible}
                title={'处理三无产品'}
                destroyOnClose
                width={700}
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                maskClosable={false}
            >
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Form>
                        <Table
                            bordered
                            rowKey={record => record.key}
                            size="small"
                            dataSource={data}
                            columns={this.columns}
                            pagination={false}
                        />
                    </Form>
                </Spin>
            </Modal>
        );
    }
}
export default Form.create()(ModifyNPModal)
