import React, { Component } from 'react';
import { Button, Icon, Input } from 'antd';
import { fetchPost } from '../../../../util/fetch';
import { CONFIRM } from '../constants/Api';
import Functions from '../../../../components/functions';

class TableList extends Component {
    state = {
        skuList: [
            {
                sku: '',
                backQuantity: '',
            },
        ],
    };

    addItem = () => {
        this.setState((state) => {
            state.skuList.push({
                sku: '',
                backQuantity: '',
            });
            return state;
        });
    };

    removeItem = (index) => {
        this.setState((state) => {
            state.skuList.splice(index, 1);
            return state;
        });
    };

    confirm = () => {
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            const params = {
                data: {
                    ...value,
                    skuList: this.state.skuList,
                },
            };
            fetchPost(CONFIRM, params, 1)
                .then((result) => {
                    if (result.state === '000001') {
                        this.setState({
                            skuList: [
                                {
                                    sku: '',
                                    backQuantity: '',
                                },
                            ],
                        });
                    }
                });
        });
    };

    onFocus = () => {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    };

    createItem = (item, index) => (
        <div className="margin-ss-bottom" key={index.toString()}>
            <Input
                ref={(ref) => {
                    if (index === 0) {
                        this.inputRef = ref;
                    }
                }}
                placeholder="请输入SKU"
                style={{ width: 100 }}
                value={item.sku}
                onChange={(e) => {
                    const value = e.target.value;
                    this.setState((state) => {
                        state.skuList[index].sku = value;
                        return state;
                    });
                }}
            />
            <Input
                className="margin-ss-left"
                placeholder="请输入数量"
                style={{ width: 100 }}
                value={item.backQuantity}
                onChange={(e) => {
                    const value = e.target.value;
                    this.setState((state) => {
                        state.skuList[index].backQuantity = value;
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
        </div>
    );

    render() {
        return (
            <div className="breadcrumb padding-ss margin-ss-top">
                <div className="margin-ss-bottom">产品信息</div>
                <div>
                    <div>
                        {
                            this.state.skuList.map((item, index) => this.createItem(item, index))
                        }
                    </div>
                    <Functions
                        {...this.props}
                        functionkey="012-000007-000001-002"
                    >
                        <Button type="primary" style={{ marginLeft: 130 }} onClick={this.confirm}>确认收货</Button>
                    </Functions>
                </div>
            </div>
        );
    }
}

export default TableList;
