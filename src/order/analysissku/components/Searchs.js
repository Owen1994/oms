import React from 'react';
import moment from 'moment';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    DatePicker,
} from 'antd';
import CSelect from '../../../components/cselect';
import CTags from '../../../components/ctags';
import {
    FINDSTORELISTPUBLIC,
    GETPLATFORM,
    PAYMENTTIME,
    Time_Zone_TYPE,
} from '../constants';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;

const SearchBtn = Input.Search;


/**
 *作者: chennlin
 *功能描述: 其它设置搜索
 *时间: 2018/10/11 15:55
 */
export default class Search extends React.Component {
    state = {
        hide: false,
        loading: false,
        platformCode: '',
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
            this.onSubmit();
        }
    };

    // 全局搜索
    onSubmit = () => {
        this.props.onSearch();
    };

    onReset = () => {
        this.props.form.resetFields();
        this.setState({
            hide: false,
            platformCode: '',
        })
    };

    handleDownloadData = () => {
        this.props.onDownloadData();
    };

    // 平台选择事件
    handlePlatformSelect = (val) => {
        this.setState({ platformCode: val }, () => {
            // 清空账号
            this.props.form.resetFields(['sellerIds']);
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const rangeConfig = {
            rules: [{ type: 'array', required: false, message: 'Please select time!' }],
        };
        const { platformCode } = this.state;
        const selectSearch = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={7}>
                        <FormItem
                            label="平台"
                        >
                            {getFieldDecorator('platformCode')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={GETPLATFORM}
                                    params={{ data: {searchColumn: 'name', pageData: 20, pageNumber: 1} }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    localSearch={1}
                                    onSelect={this.handlePlatformSelect}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={7}>
                        <FormItem
                            label="账号"
                        >
                            {getFieldDecorator('sellerIds')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={FINDSTORELISTPUBLIC}
                                    mode='multiple'
                                    maxCount={20}
                                    params={{ data: {platformCode, searchColumn: 'sellerId', pageData: 20, pageNumber: 1} }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem
                            label="SKU"
                            className="content_right analysissku_special"
                        >
                            {getFieldDecorator('skuArr')(
                                <SearchBtn
                                    placeholder="多个输入以逗号分隔"
                                    enterButton="搜索"
                                    onSearch={this.onSubmit}
                                    allowClear
                                />
                            )}
                            <Button
                                type="default"
                                onClick={this.onReset}
                            >
                                重置
                            </Button>
                            <Button
                                type="default"
                                onClick={this.handleDownloadData}
                            >
                                数据下载
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const ctageSearch = (
            <div className="search_tag">
                <Row>
                    <Col
                        span={24}
                        style={{display: 'flex'}}
                    >
                        <FormItem
                            label="付款时间"
                            className="analysissku_label_special"
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
                            this.state.hide ? (
                                <FormItem
                                    style={{ marginLeft: "15px" }}
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
                            ) : null
                        }
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem
                            label="时区时间"
                            className="analysissku_label_special"
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
            <div className="erp-search">
                <Form>
                    {selectSearch}
                    {ctageSearch}
                </Form>
            </div>
        );
    }
}
