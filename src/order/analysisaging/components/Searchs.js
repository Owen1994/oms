import React from 'react';
import moment from 'moment';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    DatePicker,
    Select,
} from 'antd';
import CSelect from '@/components/cselect';
import CTags from '@/components/ctags';
import {
    GET_PLATFORMS,
    GET_ACCOUNTS,
    GRAB_TIME,
    dimensionalityArr,
} from '../constants';
import OrderCommonSearchModal from '@/components/SearchModal/SearchModal.js';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const SearchBtn = Input.Search;
const Option = Select.Option;

export default class Search extends React.Component {
    state = {
        hide: false,
        loading: false,
        platformCode: '',
        visible: false,
    };

    handlePurchaseStateChange = (value) => {
        if (parseInt(value) === 4) {
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
        this.props.handleSearch();
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

    // 维度选择
    handleDimensionalitySelect = () => {
        this.props.form.resetFields(['platforms', 'platform', 'sellerIds', 'orderIds']);
    }

    handleBatchCancel = () => {
        this.setState({ visible: false });
        const { getFieldValue, setFieldsValue } = this.props.form;
        setFieldsValue({
            'orderIds': getFieldValue('batchOrderIds')
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const rangeConfig = {
            rules: [{ type: 'array', required: false, message: 'Please select time!' }],
        };
        const { platformCode, visible } = this.state;
        const dimensionality = getFieldValue('dimensionality') || 'plat';
        const selectSearch = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="维度"
                        >
                            {getFieldDecorator('dimensionality', {
                                rules: [{required: true, message: '请选择维度'}],
                                initialValue: 'plat'
                            })(
                                <Select
                                    onSelect={this.handleDimensionalitySelect}
                                >
                                    {
                                        dimensionalityArr.map(v => <Option key={v.id} value={v.id}>{v.text}</Option>)
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="平台"
                        >
                            {getFieldDecorator( dimensionality === 'plat' ? 'platforms' : 'platform', {
                                rules: [{required:  dimensionality !== 'plat', message: '请选择平台'}]
                            })(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={GET_PLATFORMS}
                                    params={{ data: {searchColumn: 'name', pageData: 20, pageNumber: 1} }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    mode={ dimensionality === 'plat' ? "multiple" : null}
                                    count={20}
                                    localSearch={1}
                                    onSelect={this.handlePlatformSelect}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="账号"
                        >
                            {getFieldDecorator('sellerIds')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={GET_ACCOUNTS}
                                    mode='multiple'
                                    maxCount={20}
                                    params={{ data: {platformCode, searchColumn: 'sellerId', pageData: 20, pageNumber: 1} }}
                                    apiListType={2}
                                    placeholder={'请选择(不填为全部)'}
                                    disabled={ dimensionality !== 'account'}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="订单号"
                            className="content_right analysisaging_special"
                        >
                            {getFieldDecorator('orderIds', {
                                rules: [{ required: dimensionality === 'order', message: '请输入订单号'}]
                            })(
                                <Input
                                    placeholder="双击可批量查询"
                                    onDoubleClick={() => {
                                        this.setState({ visible: true })
                                    }}
                                    disabled={ dimensionality !== 'order'}
                                />
                            )}
                            <Button
                                type="primary"
                                onClick={this.onSubmit}
                                className="margin-sm-left"
                            >
                                搜索
                            </Button>
                            <Button
                                type="default"
                                onClick={this.onReset}
                            >
                                重置
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
                            label="抓单时间"
                            className="analysisaging_label_special"
                        >
                            {getFieldDecorator('gTime', {
                                rules: [{ required: true, message: '请选择抓单时间' }],
                                initialValue: [0],
                            })(
                                <CTags
                                    list={GRAB_TIME}
                                    handleChange={this.handlePurchaseStateChange}
                                />,
                            )}
                        </FormItem>
                        {
                            this.state.hide ? (
                                <FormItem
                                    style={{ marginLeft: "15px" }}
                                >
                                    {getFieldDecorator('grabTime', rangeConfig)(
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
            </div>
        );
        return (
            <div className="erp-search breadcrumb">
                <Form>
                    {selectSearch}
                    {ctageSearch}
                </Form>
                <OrderCommonSearchModal
                    {...this.props}
                    visible={visible}
                    onCancel={this.handleBatchCancel}
                    searchContent="batchOrderIds"
                    // count={1000}
                    count={100}
                />
            </div>
        );
    }
}
