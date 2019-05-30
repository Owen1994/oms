import React from 'react'
import {
    Modal,
    Form,
    Input,
    Table,
    message,
    InputNumber, Spin,
} from 'antd';

import { randNum } from '@/util/baseTool';
import { fetchPost } from '../../../../util/fetch';
import {
    Handle_Way_Three_List,
} from '../constants/index';
import CSelect from '../../../../components/cselect';
import { Defective_Product_Details_List_Api, Save_Submit_Defective_Product_Api } from '../constants/Api';

const FormItem = Form.Item;

class ModifyDPTwoModal extends React.Component {

    state = {
        loadingState: false,
        data: [],
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
            fetchPost(Defective_Product_Details_List_Api, data, 2)
                .then(result => {
                    if (result.state === '000001') {
                        this.setState({
                            loadingState: false,
                            data: result.data.list,
                        })
                    } else {
                        this.setState({
                            loadingState: false,
                        })
                    }
                })
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
            dataIndex: 'handleWayCode',
            width: 150,
            render: (text, record, index) => {
                const { getFieldDecorator } = this.props.form;
                return (
                    <FormItem>
                        {
                            getFieldDecorator('handleWay' + record.key, {
                                initialValue: Number(text),
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={Handle_Way_Three_List}
                                    onChange={value => this.onChangeValueName(value, 'handleWayCode', index)}
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
                                    disabled={Number(record.handleWayCode) === 1 || Number(record.handleWayCode) === 4}
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
                const { getFieldDecorator } = this.props.form;
                return (
                    <FormItem>
                        {
                            getFieldDecorator('note' + record.key, {
                                initialValue: text,
                            })(
                                <Input
                                    onBlur={value => this.onChangeValueName(value, 'note', index)}
                                />
                            )}
                    </FormItem>

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

    handleAdd = () => {

        const data = this.state.data;

        let newNum = 0;
        for (let i = 0 ; i < data.length; i++){
            newNum += Number.parseInt(data[i].number, 10);
        }
        if (newNum >= this.props.item['moreQualified']){
            message.warning("已填写数量大于等于待决策数量，请修改填写数量后新增决策。")
            return false;
        }

        data.push({
            key: randNum(),
            handleWayCode: 4,
            number: 0,
            po: this.props.item.poNumber,
            note: '',
        });
        this.setState({
            data,
        });
    };

    handleDelete = (index) => {
        const data = this.state.data;

        data.splice(index, 1);
        this.setState({
            data,
        });
    };


    onChangeValueName = (event, key, index) => {
        const data = this.state.data;

        if (key === 'handleWayCode') {
            data[index][key] = event;
            if (event === 5) {
                data[index]['po'] = '';
            }
            if (event === 4 || event === 1) {
                data[index]['po'] = this.props.item.poNumber;
            }
            this.setState({
                data,
            });
        } else {
            data[index][key] = event.target.value;
            this.setState({
                data,
            });
        }
    };


    /**
     * 表单提交
     */
    handleSubmit = () => {
        let count = 0;
        let isOnlyOneSupplier = 0;
        let isOnlyOneGifts = 0;

        const listData = this.state.data;

        for (let i = 0; i < listData.length; i++) {
            if (listData[i]['number'].length === 0) {
                message.error('处理不良品的数量不能为空');
                return;
            }
            if (listData[i]['number'] === 0 || listData[i]['number'] === '0') {
                message.error('处理不良品的数量不能为0');
                return;
            }

            if (listData[i]['handleWayCode'] === 5) {
                if (listData[i]['po'].length === 0) {
                    message.error('处理方式为补发其他采购单中的‘采购单’不能为空');
                    return;
                }
            }

            if (listData[i]['handleWayCode'] === 1) {
                isOnlyOneSupplier = isOnlyOneSupplier + 1;
            }
            if (listData[i]['handleWayCode'] === 4) {
                isOnlyOneGifts = isOnlyOneGifts + 1;
            }

            count = count + Number(listData[i]['number']);
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
        for (let i = 0; i < listData.length; i++) {
            info.push({
                handleWay: listData[i]['handleWayCode'],
                note: listData[i]['note'],
                number: parseInt(listData[i]['number']),
                po: listData[i]['po'] + '',
            })
        }

        const data = {
            data: {
                key: this.props.item['key'],
                handleProcess: 2,
                info,
                dataType: 2, // 1-新增 2-刷新
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

        this.setState({
            data : [],
        });
        this.props.showModal(false, {handleTypeCode: 'QUALIFIED_EXCEED'});
    };

    render() {

        const { visible } = this.props;

        const { data, loadingState } = this.state;

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
                <Spin spinning={loadingState} delay={500} tip="Loading...">
                    <Form>
                        <Table
                            bordered
                            rowKey={record => record.key}
                            size="small"
                            dataSource={data}
                            columns={this.columnsTwo}
                            pagination={false}
                        />
                    </Form>
                </Spin>
            </Modal>
        );
    }
}
export default Form.create()(ModifyDPTwoModal)
