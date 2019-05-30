import React from 'react';
import {
    Form, Button, Radio, Input, Row, Col,
} from 'antd';
import { AFTER_SALE_TREASURE, DISPUTE_TYPE, searchType } from '../constants';
import Ctags from '@/components/ctags';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;

export default class SearchCom extends React.Component {
    getDisputelist = () => {
        const { getDisputelist } = this.props;
        getDisputelist();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { disputelist, disputeLoading } = this.props;
        let disputeStatus = DISPUTE_TYPE;
        if (disputelist && disputelist.stateNumber) {
            disputeStatus = disputeStatus.map((v) => {
                if (!v.code) return v;
                return {
                    code: v.code,
                    name: `${v.name}（${disputelist.stateNumber[v.field]}）`,
                };
            });
        }
        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索类型">
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                        {
                                            searchType.map(v => <Radio value={v.id}>{v.name}</Radio>)
                                        }
                                    </RadioGroup>,
                                )}
                            </FormItem>
                            <div className="selectSearch position-relative">
                                <FormItem>
                                    {getFieldDecorator('searchContent', {
                                        initialValue: undefined,
                                    })(
                                        <Input placeholder='请输入' className='submit-btn-pd' style={{ width: 280 }} />,
                                    )}
                                </FormItem>
                                <div className="customer-submit-btns customer-submit-md-btns">
                                    <Button loading={disputeLoading} type='primary' onClick={() => this.getDisputelist()}>搜索</Button>
                                    <Button onClick={this.props.onReset} className='customer-reset-btn'>重置</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
        const ctageSearch = (
            <div className="ctageSearch ptb-5">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="纠纷状态"
                        >
                            {getFieldDecorator('disputeStatus', {
                                initialValue: [1],
                            })(
                                <Ctags
                                    list={disputeStatus}
                                    handleChange={this.getDisputelist}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem
                            label="状态类型"
                        >
                            {getFieldDecorator('afterSaleTreasure', {
                                initialValue: [0],
                            })(
                                <Ctags
                                    list={AFTER_SALE_TREASURE}
                                    handleChange={this.getDisputelist}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="complain-common-search breadcrumb overflow-hidden position-relative">
                <div className="yks-erp-search_order">
                    <div className="select-type pdt-none">
                        {typeSearch}
                    </div>
                    {ctageSearch}
                </div>
            </div>
        );
    }
}
