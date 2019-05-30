import React from 'react'
import {
    Modal,
    Form,
    InputNumber,
    Table,
    Checkbox,
    message,
    Input,
} from 'antd'

import { randNum } from '@/util/baseTool';
import { fetchPost } from '../../../../util/fetch';
import {
    Handle_Way_One_List,
} from '../constants/index';
import CSelect from '../../../../components/cselect';
import { Save_Submit_Defective_Product_Api } from '../constants/Api';

const FormItem = Form.Item;

class HandleDPModal extends React.Component {

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible;
        const preVisible = this.props.visible;
        if (visible && !preVisible) {
            if (nextProps.item) {
                this.infoTwo[0]['po'] = nextProps.item['poNumber'];
                // this.infoOne[0]['number'] = Number.parseInt(nextProps.item['abnormalNonconformity'], 10);
                // if (Number.parseInt(nextProps.item['orderNumber'], 10) - Number.parseInt(nextProps.item['inventoryQuantity'], 10) >= Number.parseInt(nextProps.item['abnormalNonconformity'], 10)) {
                //     this.infoTwo[0]['number'] = Number.parseInt(nextProps.item['abnormalNonconformity'], 10);
                // } else {
                //     this.infoTwo[0]['number'] = Number.parseInt(nextProps.item['orderNumber'], 10) - Number.parseInt(nextProps.item['inventoryQuantity'], 10);
                // }
            }
        }
    }

    columnsTwo = [
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
            width: 150,
            render: (text, record, index) => {
                const { getFieldDecorator } = this.props.form;
                return (
                    <FormItem>
                        {
                            getFieldDecorator('handleWay' + record.key, {
                            initialValue: text,
                        })(
                            <CSelect
                                code="code" // 列表编码字段
                                name="name" // 列表名称字段
                                list={Handle_Way_One_List}
                                onChange={value => this.onChangeValueNameTwo(value, 'handleWay', index)}
                                placeholder="请选择"
                            />
                        )}
                    </FormItem>
                )
            }
        },
        {
            title: '数量',
            dataIndex: 'number',
            width: 50,
            render: (text, record, index) => {
                const { getFieldDecorator } = this.props.form;
                return (
                    <FormItem>
                        {
                            getFieldDecorator('number' + record.key, {
                                initialValue: text,
                            })(
                                <InputNumber
                                    onBlur={value => this.onChangeValueNameTwo(value, 'number', index)}
                                    min={0}
                                    precision={0}
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
                        {
                            getFieldDecorator('po' + record.key, {
                                initialValue: text,
                            })(
                                <Input
                                    onBlur={value => this.onChangeValueNameTwo(value, 'po', index)}
                                    disabled={ record.handleWay !== 5 && record.handleWay !== 6}
                                />
                            )}
                    </FormItem>
                )
            }
        },
        {
            title: '采购处理备注',
            dataIndex: 'note',
            width: 200,
            render: (text, record, index) => {
                return (
                    <Input
                        onBlur={value => this.onChangeValueNameTwo(value, 'note', index)}
                    />
                )
            }
        },
        {
            title: '操作',
            width: 60,
            render: (text, record, index) => {
                if (index === 0) {
                    return (
                        <a
                            style={{ "display": "block", "textAlign": "center" }}
                            onClick={() => this.handleAdd()}
                        >
                            增加
                        </a>
                    )
                }
                return (
                    <a
                        style={{ "display": "block", "textAlign": "center" }}
                        onClick={() => this.handleDelete(index)}
                    >
                        删除
                    </a>
                )
            }
        }
    ];


    infoTwo = [{
        key: randNum(),
        handleWay: 1, // 1-退回供应商 2-报废 3-原单入库 4-赠品 5-补发其他采购单 6-驳回（重新收货）
        number: 0,
        po: '',
        note: '',
    }];


    handleAdd = () => {
        let newNum = 0;
        for (let i = 0 ; i < this.infoTwo.length; i++){
            newNum +=  Number.parseInt(this.infoTwo[i].number, 10);
        }
        if (newNum >= this.props.item['abnormalNonconformity']){
            message.warning("已填写数量大于等于待决策数量，请修改填写数量后新增决策。")
            return false;
        }

        let infoTwo = this.infoTwo;
        infoTwo.push({
            key: randNum(),
            handleWay: 4,
            number: 0,
            po: this.props.item.poNumber,
            note: '',
        });
        this.setState({});


    };

    handleDelete = (index) => {
        this.infoTwo.splice(index, 1);
        this.setState({});
    };


    onChangeValueNameTwo = (event, key, index) => {
        if (key === 'handleWay') {
            this.infoTwo[index][key] = event;
            if (event === 5 || event === 6) {
                this.infoTwo[index]['po'] = '';
            } else {
                this.infoTwo[index]['po'] = this.props.item.poNumber;
            }

            this.setState({});
        } else {
            this.infoTwo[index][key] = event.target.value;
            this.setState({});
        }
    };

    /**
     * 表单提交
     */
    handleSubmit = () => {
        let count = 0;
        let iStorageCount = 0;

        for (let i = 0; i < this.infoTwo.length; i++) {
            if (this.infoTwo[i]['number'] === 0 || this.infoTwo[i]['number'] === '0') {
                message.error('处理不良品中的数量不能为0');
                return;
            }
            if (this.infoTwo[i]['handleWay'] === 5) {
                if (this.infoTwo[i]['po'].length === 0) {
                    message.error('处理方式为补发其他采购单中的‘采购单’不能为空');
                    return;
                }
            }

            if (this.infoTwo[i]['handleWay'] === 6) {
                if (this.infoTwo[i]['po'].length === 0) {
                    message.error('处理方式为驳回（重新收货）中的‘采购单’不能为空');
                    return;
                }
            }

            if (this.infoTwo[i]['handleWay'] === 3) {
                iStorageCount = iStorageCount + Number(this.infoTwo[i]['number']);
            }

            count = count + Number(this.infoTwo[i]['number']);
        }

        if (iStorageCount > this.props.item['orderNumber'] - this.props.item['inventoryQuantity']) {
            message.error('不良转良/原单入库数量不能大于 订货数量减去入库数量');
            return;
        }

        if (count !== this.props.item['abnormalNonconformity']) {
            message.error('不良转良品的数量之和，必须等于处理数量');
            return;
        }
        

        let info = [];
        for (let i = 0; i < this.infoTwo.length; i++) {
            info.push({
                handleWay: this.infoTwo[i]['handleWay'],
                note: this.infoTwo[i]['note'],
                number: parseInt(this.infoTwo[i]['number']),
                po: this.infoTwo[i]['po'] + '',
            })
        }

        const data = {
            data: {
                key: this.props.item['key'],
                handleProcess: 1,
                info,
                dataType: 1, // 1-新增 2-刷新
            }
        };

        fetchPost(Save_Submit_Defective_Product_Api, data, 1)
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
        this.infoTwo = [{
            key: randNum(),
            handleWay: 1,
            number: 0,
            po: '',
            note: '',
        }];
        this.props.showModal(false, {handleTypeCode: 'UNQUALIFIED'});
    };

    render() {
        const { visible } = this.props;

        return (
            <Modal
                visible={visible}
                title={'处理不良品'}
                destroyOnClose
                width={900}
                onCancel={this.handleCancel}
                onOk={this.handleSubmit}
                maskClosable={false}
            >
                <Form>
                    <Table
                        bordered
                        rowKey={record => record.key}
                        size="small"
                        dataSource={this.infoTwo}
                        columns={this.columnsTwo}
                        pagination={false}
                    />
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(HandleDPModal)
