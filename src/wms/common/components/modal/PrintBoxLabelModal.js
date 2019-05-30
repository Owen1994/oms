import React, { Component } from 'react';
import {
    Form, Icon, Input, Modal, Button, message,
} from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { PRINT_BOX_LABEL } from '../../constants/Api';
import { printDiv } from '../../util';
import { createBoxLabel } from '../../util/printUtils';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
// /**
//  * 打印箱唛打印条目样式
//  */
// const leftSpanSize = 8;
// const rightSpanSize = 16;

/**
 * 打印箱唛modal
 */
class PrintBoxLabelModal extends Component {
    state = {
        groups: [],
        boxData: {},
    };

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState((state) => {
                state.groups = [{
                    number: nextProps.defaultSum || 1,
                }];
                return state;
            });
        }
    }

    addItem = () => {
        this.setState((state) => {
            state.groups.push({
                number: 1,
            });
            return state;
        });
    };

    removeItem = (index) => {
        this.setState((state) => {
            state.groups.splice(index, 1);
            return state;
        });
    };

    onOk = () => {
        if (!this.state.boxData.list) {
            message.error('请生成标签');
            return;
        }
        printDiv(this.boxRef);
        this.onCancel();
    };

    onCancel = () => {
        this.setState({
            boxData: {},
        });
        const { cancel } = this.props;
        if (cancel) {
            cancel();
        }
    };

    /**
     * 请求获取sku标签数据
     */
    getBoxList = () => {
        this.setState({
            isCreateLoading: true,
        });

        const printLabels = [];
        this.state.groups.forEach((item) => {
            printLabels.push(item.number);
        });
        fetchPost(PRINT_BOX_LABEL, {
            data: {
                boxNumberArr: printLabels,
                ...this.props.params,
            },
        }, 1).then((result) => {
            this.setState({
                isCreateLoading: false,
            });
            if (result.state === '000001') {
                this.setState({
                    isCreateLoading: false,
                    boxData: result.data,
                });
            }
        });
    };

    render() {
        const {
            visible,
        } = this.props;
        const { groups, boxData } = this.state;
        const createLabelButton = (
            <Button
                onClick={this.getBoxList}
                className="margin-ss-left"
                loading={this.state.isCreateLoading}
                type="primary"
            >
                生成标签
            </Button>
        );
        const type2 = (
            <div>
                {
                    groups.map((item, index) => (
                        <FormItem
                            {...formItemLayout}
                            key={index.toString()}
                            label={`第 ${index + 1} 箱:`}
                        >
                            <Input
                                style={{ width: 100 }}
                                value={item.number}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    this.setState((state) => {
                                        state.groups[index].number = value;
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
                            {index === groups.length - 1 ? createLabelButton : null}
                        </FormItem>
                    ))
                }
            </div>
        );
        return (
            <Modal
                title="打印箱唛标签"
                width={600}
                visible={visible}
                onOk={this.onOk}
                onCancel={this.onCancel}
                okText="打印"
                maskClosable={false}
            >
                {type2}
                <div className="wms-print-box-group">
                    <div className="print display-inline-block">
                        <div ref={ref => this.boxRef = ref}>
                            {boxData.list ? boxData.list.map(item => createBoxLabel(item, item.partNumber)) : null}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default PrintBoxLabelModal;
