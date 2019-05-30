import React from 'react';
import { Form, Row, Col } from 'antd';
import Ctags from '../../../../components/ctags';

import { returnGoodsType, refundModeType, refundStatusType, refundTypes } from '../constants';

const FormItem = Form.Item;

export default class Screen extends React.Component {
    render() {
        const { listFetch } = this.props;
        const { returnList, modeList, statusList, typeList } = this.props.refundList;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="ctageSearch ptb-5">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="是否退货"
                        >
                            {getFieldDecorator('returnGoods', {
                                initialValue: [0],
                            })(
                                <Ctags
                                    list={returnList || returnGoodsType}
                                    handleChange={() => listFetch()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem
                            label="退款方式"
                        >
                            {getFieldDecorator('refundMode', {
                                initialValue: [0],
                            })(
                                <Ctags
                                    list={modeList || refundModeType}
                                    handleChange={() => listFetch()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem
                            label="退款类型"
                        >
                            {getFieldDecorator('refundType', {
                                initialValue: [0],
                            })(
                                <Ctags
                                    list={typeList || refundTypes}
                                    handleChange={() => listFetch()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem
                            label="处理状态"
                        >
                            {getFieldDecorator('refundStatus', {
                                initialValue: [0],
                            })(
                                <Ctags
                                    list={statusList || refundStatusType}
                                    handleChange={() => listFetch()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}
