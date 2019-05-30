import React from 'react'
import {
    Modal,
    Form,
    Input,
    Table,
    message,
    InputNumber,
} from 'antd'

import { randNum } from '@/util/baseTool';
import { fetchPost } from '../../../../util/fetch';
import {
    Handle_Way_Three_List,
} from '../constants/index';
import CSelect from '../../../../components/cselect';
import { Save_Submit_Defective_Product_Api } from '../constants/Api';

const FormItem = Form.Item;

class HandleDPTwoModal extends React.Component {

    componentWillReceiveProps(nextProps) {
        const visible = nextProps.visible;
        const preVisible = this.props.visible;
        if (visible && !preVisible) {
            if (nextProps.item && this.arrayInfo[0]['handleWay'] === 1) {
                this.arrayInfo[0]['number'] = nextProps.item['moreQualified'];
                this.arrayInfo[0]['po'] = nextProps.item['poNumber'];
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
                                initialValue: index === 0 ? 1 : text,
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={Handle_Way_Three_List}
                                    onChange={value => this.onChangeValueName(value, 'handleWay', index)}
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
                                    onBlur={value => this.onChangeValueName(value, 'number', index)}
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
                                    onBlur={value => this.onChangeValueName(value, 'po', index)}
                                    disabled={record.handleWay === 1 || record.handleWay === 4}
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
                        onBlur={value => this.onChangeValueName(value, 'note', index)}
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
                            onClick={this.handleAdd}
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

    arrayInfo = [{
        key: randNum(),
        handleWay: 1, // 1-退回供应商 4-赠品 5-补发其他采购单
        number: 0,
        po: '',
        note: '',
    }];


    handleAdd = () => {
        let newNum=0;
        for (let i = 0 ; i<this.arrayInfo.length; i++){
            newNum += Number.parseInt(this.arrayInfo[i].number, 10);
        }
        if (newNum >= this.props.item['moreQualified']){
            message.warning("已填写数量大于等于待决策数量，请修改填写数量后新增决策。")
            return false;
        }
        let arrayInfo = this.arrayInfo;
        arrayInfo.push({
            key: randNum(),
            handleWay: 4,
            number: 0,
            po: this.props.item.poNumber,
            note: '',
        });
        this.setState({});
    };

    handleDelete = (index) => {
        this.arrayInfo.splice(index, 1);
        this.setState({});
    };


    onChangeValueName = (event, key, index) => {
        if (key === 'handleWay') {
            this.arrayInfo[index][key] = event;
            if (event === 5) {
                this.arrayInfo[index]['po'] = '';
            }
            if (event === 4 || event === 1) {
                this.arrayInfo[index]['po'] = this.props.item.poNumber;
            }
            this.setState({});
        } else {
            this.arrayInfo[index][key] = event.target.value;
            this.setState({});
        }
    };


    /**
     * 表单提交
     */
    handleSubmit = () => {
        let count = 0;
        const reg=/^\d+$/;
        let isOnlyOneSupplier = 0;
        let isOnlyOneGifts = 0;

        for (let i = 0; i < this.arrayInfo.length; i++) {
            if (this.arrayInfo[i]['number'].length === 0) {
                message.error('处理不良品的数量不能为空');
                return;
            }
            if (this.arrayInfo[i]['number'] === 0 || this.arrayInfo[i]['number'] === '0') {
                message.error('处理不良品的数量不能为0');
                return;
            }

            if (!reg.test(this.arrayInfo[i]['number'])) {
                message.error('处理不良品的数量只能为数字');
                return;
            }

            if (this.arrayInfo[i]['handleWay'] === 5) {
                if (this.arrayInfo[i]['po'].length === 0) {
                    message.error('处理方式为补发其他采购单中的‘采购单’不能为空');
                    return;
                }
            }

            if (this.arrayInfo[i]['handleWay'] === 1) {
                isOnlyOneSupplier = isOnlyOneSupplier + 1;
            }
            if (this.arrayInfo[i]['handleWay'] === 4) {
                isOnlyOneGifts = isOnlyOneGifts + 1;
            }

            count = count + Number(this.arrayInfo[i]['number']);
        }

        if (isOnlyOneSupplier > 1) {
            message.error('“退回供应商” 选项最多只能有一个');
            return;
        }

        if (isOnlyOneGifts > 1) {
            message.error('“赠品” 处理方式选项最多只能有一个');
            return;
        }

        if (count !== this.props.item['moreQualified']) {
            message.error('处理不良品的数量之和，必须等于处理数量');
            return;
        }

        let info = [];
        for (let i = 0; i < this.arrayInfo.length; i++) {
            info.push({
                handleWay: this.arrayInfo[i]['handleWay'],
                note: this.arrayInfo[i]['note'],
                number: parseInt(this.arrayInfo[i]['number']),
                po: this.arrayInfo[i]['po'] + '',
            })
        }

        const data = {
            data: {
                key: this.props.item['key'],
                handleProcess: 2,
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
        this.arrayInfo = [{
            key: randNum(),
            handleWay: 1,
            number: 0,
            po: '',
            note: '',
        }];
        this.props.showModal(false, {handleTypeCode: 'QUALIFIED_EXCEED'});
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
                        dataSource={this.arrayInfo}
                        columns={this.columnsTwo}
                        pagination={false}
                    />
                </Form>
            </Modal>
        );
    }
}
export default Form.create()(HandleDPTwoModal)
