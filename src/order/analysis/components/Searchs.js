
/**
 * 订单 - 业绩看板 - 订单分析 - 搜索模块
 */
import React from 'react';
import moment from 'moment';
import {
    Form,
    Button,
    Row,
    Col,
    DatePicker,
} from 'antd';
import CSelect from '@/components/cselect';
import CTags from '@/components/ctags';
import {
    FINDSTORELISTPUBLIC,
    GETPLATFORM,
    PAYMENTTIME,
    LOGISTICS_TYPE,
    Time_Zone_TYPE,
} from '../constants';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;

export default class Search extends React.Component {
    state = {
        platform: '',
        hide: false,
    };


    handlePurchaseStateChange = (value) => {
        if (Number.parseInt(String(value)) === 4) {
            this.setState({
                hide: true,
            })
        } else {
            this.setState({
                hide: false,
            });
            this.props.onSearch();
        }
    };

    onReset = () => {
        this.props.form.resetFields();
        this.setState({
            hide: false,
            platform: '',
        })
    };

    // 平台选择事件
    handlePlatformSelect = (val) => {
        this.setState({ platform: val }, () => {
            // 清空账号
            this.props.form.resetFields(['sellerIds']);
        });
    };

    handleDownloadData = () => {
        this.props.onDownloadData();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { platform } = this.state;
        const rangeConfig = {
            rules: [{ type: 'array', required: false, message: 'Please select time!' }],
        };
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="平台"
                        >
                            {getFieldDecorator('platformCode')(
                                <CSelect
                                    code="id"
                                    name="name"
                                    url={GETPLATFORM}
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1,
                                        },
                                    }}
                                    apiListType={2}
                                    placeholder="请选择"
                                    localSearch={1}
                                    onSelect={this.handlePlatformSelect}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={16}>
                        <FormItem
                            label="账号"
                            className="multiple analysis-dib"
                        >
                            {getFieldDecorator('sellerIds')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={FINDSTORELISTPUBLIC}
                                    mode='multiple'
                                    maxCount={20}
                                    params={{ data: {platformCode: platform, searchColumn: 'sellerId', pageData: 20, pageNumber: 1} }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                />,
                            )}
                        </FormItem>
                        <div className="analysis-dib">
                            <Button type="primary" onClick={() => this.props.onSearch()}>搜索</Button>
                            <Button onClick={this.onReset} style={{marginLeft: 10}}>重置</Button>
                            <Button onClick={this.handleDownloadData} style={{marginLeft: 10}}>数据下载</Button>
                        </div>
                    </Col>
                    <Col span={8}>
                    </Col>
                </Row>
            </div>
        );
        const ctageSearch = (
            <div className="ctageSearch">
                <Row>
                    <Col span={24}>
                        <FormItem
                            label="付款时间"
                            style={{display: 'inline-block', width: 360}}
                        >
                            {getFieldDecorator('paytime', {
                                initialValue: [0],
                            })(
                                <CTags
                                    list={PAYMENTTIME}
                                    handleChange={this.handlePurchaseStateChange}
                                />,
                            )}
                        </FormItem>
                    {
                        this.state.hide ?
                            <FormItem
                                style={{display: 'inline-block'}}
                            >
                                {getFieldDecorator('payDt', rangeConfig)(
                                    <RangePicker
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                        placeholder={['开始日期', '结束日期']}
                                        style={{ width: 270 }}
                                    />,
                                )}
                            </FormItem>
                        : null
                    }
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem
                            label="订单类型"
                        >
                            {getFieldDecorator('logisticsType', {
                                initialValue: [''],
                            })(
                                <CTags
                                    list={LOGISTICS_TYPE}
                                    handleChange={() => this.props.onSearch()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="时区时间"
                        >
                            {getFieldDecorator('timeZone', {
                                initialValue: [1],
                            })(
                                <CTags
                                    list={Time_Zone_TYPE}
                                    handleChange={() => this.props.onSearch()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="breadcrumb">
                <Form>
                    <div className="select-type">
                        {selectSearch}
                    </div>
                    {ctageSearch}
                </Form>
            </div>
        );
    }
}
