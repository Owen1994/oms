import React from 'react'
import {
    Modal,
    Form,
    Input,
    Table, message,
} from 'antd';

import { randNum } from '@/util/baseTool';
import { fetchPost } from '../../../../util/fetch';
import {
    Handle_Way_List,
} from '../constants/index';
import CSelect from '../../../../components/cselect';
import { Save_Submit_None_Product_Api } from '../constants/Api';

const FormItem = Form.Item;

class HandleDPModal extends React.Component {

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
            dataIndex: 'handleWay',
            width: 80,
            render: () => {
                const { getFieldDecorator } = this.props.form;
                return (
                    <FormItem>
                        {getFieldDecorator('handleWay', {
                            initialValue: 1,
                        })(
                            <CSelect
                                code="code" // 列表编码字段
                                name="name" // 列表名称字段
                                list={Handle_Way_List}
                                onChange={value => this.onChangeValueName(value, 'handleWay')}
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
            render: (text, record) => {
                return (
                    <Input
                        onBlur={value => this.onChangeValueName(value, 'po')}
                        disabled={record.handleWay === 1}
                        defaultValue={text}
                    />
                )
            }
        },
        {
            title: '采购处理备注',
            dataIndex: 'note',
            width: 250,
            render: () => {
                return (
                    <Input
                        onBlur={value => this.onChangeValueName(value, 'note')}
                    />
                )
            }
        }
    ];

    dicInfo = [{
        key: randNum(),
        handleWay: 1,
        po: '',
        note: '',
    }];


    onChangeValueName = (event, key) => {
        if (key === 'handleWay') {
            this.dicInfo[0][key] = event;
            this.setState({});
        } else {
            this.dicInfo[0][key] = event.target.value;
            this.setState({});
        }
    };


    /**
     * 表单提交
     */
    handleSubmit = () => {

        if (this.dicInfo[0]['handleWay'] === 5) {
            if (this.dicInfo[0]['po'].length === 0) {
                message.error('采购单不能为空');
                return;
            }
        }

        const data = {
            data: {
                key: this.props.item['key'],
                handleWay: this.dicInfo[0]['handleWay'],
                note: this.dicInfo[0]['note'],
                po: this.dicInfo[0]['po'] + '',
                dataType: 1,
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
        this.dicInfo = [{
            key: randNum(),
            handleWay: 1,
            po: '',
            note: '',
        }];
        this.props.showModal(false, {});
    };

    render() {
        const { visible } = this.props;

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
                <Form>
                    <Table
                        bordered
                        rowKey={record => record.key}
                        size="small"
                        dataSource={this.dicInfo}
                        columns={this.columns}
                        pagination={false}
                    />
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(HandleDPModal)
