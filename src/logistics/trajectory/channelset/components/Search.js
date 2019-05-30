import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import CTags from '../../../../components/ctags';
import CSelect from '../../../../components/cselect';
import { STATE } from '../constants';
import {
    SUPPLIER_SEARCH,
    CHANNEL_SEARCH,
} from '../constants/Api';

const FormItem = Form.Item;


export default class Search extends React.Component {

    onSubmit = () => {
        this.props.onSearch();
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    handleChange = () => {
        if (this.props.form.getFieldValue('logisticsChannels') !== undefined) {
            if (this.props.form.getFieldValue('logisticsChannels').length !== 0)
            this.props.form.setFieldsValue({logisticsChannels: []})
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const searchSelect = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="物流服务商"
                        >
                            {getFieldDecorator('logisticsService')(
                                <CSelect
                                    code="key"
                                    name="label"
                                    url={SUPPLIER_SEARCH}
                                    handleChange={this.handleChange}
                                    apiListType={2}
                                    localSearch={1}
                                    params={
                                        {data: {type: 0}}
                                    }
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col
                        span={12}
                        style={{display: 'flex', alignItems: 'center'}}
                    >
                        <FormItem
                            label="物流渠道"
                        >
                            {getFieldDecorator('logisticsChannels')(
                                <CSelect
                                    code="key"
                                    name="label"
                                    url={CHANNEL_SEARCH}
                                    mode={"multiple"}
                                    apiListType={2}
                                    maxCount={10}
                                    localSearch={1}
                                    params={
                                        {
                                            data: {
                                                logticsService: this.props.form.getFieldValue('logisticsService'),
                                                type: 0,
                                            }
                                        }
                                    }
                                />,
                            )}
                        </FormItem>

                        <div
                            className="content_right"
                            style={{marginBottom: '2px', marginLeft: '15px'}}
                        >
                            <Button
                                type="primary"
                                onClick={this.onSubmit}
                            >
                                搜索
                            </Button>

                            <Button
                                type="default"
                                onClick={this.handleReset}
                            >
                                重置
                            </Button>
                        </div>

                    </Col>
                </Row>
            </div>
        );



        const searchTag = (
            <div className="search_tag">
                <FormItem
                    label="启用状态"
                >
                    {getFieldDecorator('state', {
                        initialValue: [0],
                    })(
                        <CTags
                            list={STATE}
                            handleChange={this.onSubmit}
                        />,
                    )}
                </FormItem>
            </div>
        );


        return (
            <div className="erp-search">
                <Form>
                    {searchSelect}
                    {searchTag}
                </Form>
            </div>
        );
    }
}
