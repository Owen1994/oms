import React, { Component } from 'react';
import { Form } from 'antd';
// import StandardFormRow from '../../../../components/StandardFormRow';
import CTags from '../../../../components/ctags';
import { DISPUTE_TYPE, AFTER_SALE_TREASURE } from '../constants';

const FormItem = Form.Item;

class DisputeScreen extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="list-filter-item">
                    <div className="list-filter-item-title">纠纷状态：</div>
                    <FormItem>
                        {getFieldDecorator('disputeStatus', {
                            initialValue: [1],
                        })(
                            <CTags
                                list={DISPUTE_TYPE}
                                handleChange={() => this.props.getDisputelist()}
                            />,
                        )}
                    </FormItem>
                </div>
                <div className="list-filter-item">
                    <div className="list-filter-item-title">售后宝订单：</div>
                    <FormItem>
                        {getFieldDecorator('afterSaleTreasure', {
                            initialValue: [0],
                        })(
                            <CTags
                                list={AFTER_SALE_TREASURE}
                                handleChange={() => this.props.getDisputelist()}
                            />,
                        )}
                    </FormItem>
                </div>
            </div>
        );
    }
}

export default DisputeScreen;
