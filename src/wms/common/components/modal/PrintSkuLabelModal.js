import React, { Component } from 'react';
import {
    Button,
    Form, Icon, Input, Modal, Radio,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { printDiv } from '../../util';
import { PRINT_SKU_LABEL } from '../../constants/Api';
import { parseSkuLabelArr } from '../../selectors';
import { createSkuPrintContent, printSkuStyle } from '../../util/printUtils';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
};

/**
 * 打印skumodal
 * printSum 默认打印数量
 */
class PrintSkuLabelModal extends Component {
    state = {
        type: 1,
        type2Info: [{
            number: '10',
        }],
        type1Info: {
            groupNumber: 1,
            number: '10',
        },
        skuData: {},
        isCreateLoading: false,
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.printSum !== nextProps.printSum) {
            this.setState({
                type1Info: {
                    groupNumber: 1,
                    number: nextProps.printSum,
                },
                type2Info: [
                    {
                        number: nextProps.printSum,
                    },
                ],
            });
        }
    }

    addItem = () => {
        this.setState((state) => {
            state.type2Info.push({
                number: '100',
            });
            return state;
        });
    };

    removeItem = (index) => {
        this.setState((state) => {
            state.type2Info.splice(index, 1);
            return state;
        });
    };

    onOk = () => {
        printDiv(this.skuRef, 100, 21, false);
        this.onCancel();
    };

    onCancel = () => {
        this.setState({
            skuData: {},
        });
        const { cancel } = this.props;
        if (cancel) {
            cancel();
        }
    };

    /**
     * 请求获取sku标签数据
     */
    getSkuList = () => {
        this.setState({
            isCreateLoading: true,
        });

        const printLabels = [];
        if (this.state.type === 1) {
            const groupNumber = this.state.type1Info.groupNumber;
            const number = this.state.type1Info.number;
            for (let i = 0; i < groupNumber; i++) {
                printLabels.push(number);
            }
        } else {
            this.state.type2Info.forEach((item) => {
                printLabels.push(item.number);
            });
        }

        fetchPost(PRINT_SKU_LABEL, {
            data: {
                ...this.props.params,
                printLabels,
            },
        }, 1).then((result) => {
            this.setState({
                isCreateLoading: false,
            });
            if (result.state === '000001') {
                result.data.printInfoArr = parseSkuLabelArr(result.data.printInfoArr);
                this.setState({
                    skuData: result.data,
                });
            }
        });
    };

    render() {
        const {
            visible,
        } = this.props;
        const {
            type1Info, type2Info, type, skuData,
        } = this.state;
        const createLabelButton = (
            <Button
                onClick={this.getSkuList}
                className="margin-ss-left"
                loading={this.state.isCreateLoading}
                type="primary"
            >
                生成标签
            </Button>
        );
        const type1 = (
            <div>
                <FormItem
                    {...formItemLayout}
                    label="打印组数"
                >
                    <Input
                        style={{ width: 200 }}
                        value={type1Info.groupNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            this.setState((state) => {
                                state.type1Info.groupNumber = value;
                                return state;
                            });
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="每组打印标签数"
                >
                    <div>
                        <Input
                            style={{ width: 200 }}
                            value={type1Info.number}
                            onChange={(e) => {
                                const value = e.target.value;
                                this.setState((state) => {
                                    state.type1Info.number = value;
                                    return state;
                                });
                            }}
                        />
                        {createLabelButton}
                    </div>
                </FormItem>
            </div>
        );
        const type2 = (
            <div>
                {
                    type2Info.map((item, index) => (
                        <FormItem
                            {...formItemLayout}
                            key={index.toString()}
                            label={`第 ${index + 1} 组:`}
                        >

                            <Input
                                style={{ width: 100 }}
                                value={item.number}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState((state) => {
                                        state.type2Info[index].number = value;
                                        return state;
                                    });
                                }}
                            />
                            {index === 0 ? (
                                <Icon
                                    className="margin-ss-left"
                                    type="plus-circle"
                                    onClick={this.addItem}
                                />
                            ) : (
                                <Icon
                                    className="margin-ss-left"
                                    type="minus-circle"
                                    onClick={() => this.removeItem(index)}
                                />
                            )}
                            {index === type2Info.length - 1 ? createLabelButton : null}
                        </FormItem>
                    ))
                }
            </div>
        );
        return (
            <Modal
                title="打印SKU标签"
                width={680}
                visible={visible}
                onOk={this.onOk}
                onCancel={this.onCancel}
                okText="打印"
                maskClosable={false}
            >
                <RadioGroup
                    className="margin-sm-bottom"
                    defaultValue={type}
                    onChange={(e) => {
                        this.setState({
                            type: e.target.value,
                        });
                    }}
                >
                    <Radio value={1}>打印方式1</Radio>
                    <Radio value={2}>打印方式2</Radio>
                </RadioGroup>
                {type === 1 ? type1 : type2}
                <div className="wms-print-sku-content print">
                    <div
                        style={printSkuStyle.wmsPrintSkuBody}
                        ref={(ref) => {
                            this.skuRef = ref;
                        }}
                    >
                        {createSkuPrintContent(skuData.printInfoArr, skuData.number)}
                    </div>
                </div>
            </Modal>
        );
    }
}

export default PrintSkuLabelModal;
