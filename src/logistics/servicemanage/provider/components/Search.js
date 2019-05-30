import React from 'react';
import {
    Form,
    Button,
    Row,
    Col,
} from 'antd';
import CTags from '../../../../components/ctags';
import CSelect from '../../../../components/cselect';
import {
    CHANNEL_TYPE,
    CHANNEL_STATE,
} from '../constants';
import {
    SUPPLIER_SEARCH,
    CHANNEL_SEARCH,
} from '../constants/Api';
const FormItem = Form.Item;
/**
 *作者: 黄建峰
 *功能描述: 搜索
 *时间: 2018/12/10 11:55
 */


export default class Search extends React.Component {

    // 全局搜索
    onSubmit = () => {
        this.props.onSearch();
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    handleChange = () => {
        if (this.props.form.getFieldValue('logisticsChannel') !== undefined) {
            if (this.props.form.getFieldValue('logisticsChannel').length !== 0)
                this.props.form.setFieldsValue({logisticsChannel: []})
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const searchSelet = (
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
                                    apiListType={2}
                                    localSearch={1}
                                    handleChange={this.handleChange}
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
                            {getFieldDecorator('logisticsChannel')(
                                <CSelect
                                    code="key"
                                    name="label"
                                    url={CHANNEL_SEARCH}
                                    apiListType={2}
                                    mode={"multiple"}
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
                    label="渠道状态"
                >
                    {getFieldDecorator('channelState', {
                        initialValue: [0]
                    })(
                        <CTags
                            list={CHANNEL_STATE}
                            handleChange={this.onSubmit} // 选择监听变化
                        />,
                    )}
                </FormItem>
            </div>
        );



        return (
            <div className="erp-search">
                <Form>
                    {searchSelet}
                    {searchTag}
                </Form>
            </div>
        );
    }
}
