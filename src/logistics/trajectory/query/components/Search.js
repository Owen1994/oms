import React from 'react';
import {
    Form,
    Input,
    DatePicker,
    Button,
    Radio,
    Row,
    Col,
} from 'antd';
import CTags from '../../../../components/ctags';
import CSelect from '../../../../components/cselect';
import {
    PACKAGE_TYPE,
    TRAJECTORY_STATE,
    PACKAGE_STATE,
} from '../constants';
import {
    PLATFORM_SEARCH,
    SUPPLIER_SEARCH,
    CHANNEL_SEARCH,
    DEST_COUNTRY,
    SALE_ACCOUNT,
    WAREHOUSE_LIST,
} from '../constants/Api';
import moment from 'moment';


/**
 *作者: 黄建峰
 *功能描述: 搜索
 *时间: 2018/12/10 11:55
 */
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const SearchButton = Input.Search;

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};


export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
            isHightSearch: false,
            searchType: 1,
            logisticsChannelCode: [],
            logisticsServiceCode: '',
            logisticsChannels: [],
            logisticsServices: [],
            isDisableAccount: true,
        };
    }

    componentWillMount() {
        if (location.search) {
            let params = new URLSearchParams(decodeURIComponent(location.search).replace(/\s+/g,''));
            const logisticsChannel = params.get("logisticsChannel");
            let logisticsChannelCode = params.get("logisticsChannelCode");
            const logisticsService = params.get("logisticsService");
            let logisticsServiceCode = params.get("logisticsServiceCode");
            if (logisticsChannelCode) {
                if (/^\d+$/g.test(logisticsChannelCode)) {
                    logisticsChannelCode = Number.parseInt(logisticsChannelCode, 10);
                }
            }

            if (logisticsServiceCode) {
                if (/^\d+$/g.test(logisticsServiceCode)) {
                    logisticsServiceCode = Number.parseInt(logisticsServiceCode, 10);
                }
            }

            if (logisticsChannelCode || logisticsServiceCode) {
                this.setState({
                    isSearch: true,
                    isHightSearch: true,
                });
                if (logisticsChannel && logisticsChannel) {
                    this.setState({
                        logisticsChannelCode: [logisticsChannelCode],
                        logisticsChannels: [{ key: logisticsChannelCode, label: logisticsChannel }]
                    });
                    // this.props.form.setFieldsValue({logisticsChannels: logisticsChannelCode});
                }
                if (logisticsService && logisticsServiceCode) {

                    this.setState({
                        logisticsServiceCode: logisticsServiceCode,
                        logisticsServices: [{ key: logisticsServiceCode, label: logisticsService }]
                    });
                    // this.props.form.setFieldsValue({logisticsService: logisticsServiceCode});
                }
            }
        }
    }

    onChangeSearch = (event) => {
        if (event.target.value === 'search') {
            this.setState({ isSearch: true });
            this.setState({ isHightSearch: false });
        } else {
            this.setState({
                isSearch: false,
                isHightSearch: false,
            });
        }
    }

    onChangeHightSearch = () => {
        if (this.state.isHightSearch === false) {
            this.setState({ isHightSearch: true });
        } else {
            this.setState({ isHightSearch: false });
        }
    }

    // 全局搜索
    onSubmit = () => {
        this.props.onSearch();
    };

    handleReset = () => {
        this.setState({
            logisticsChannelCode: [],
            logisticsChannels: [],
            logisticsServiceCode: '',
            logisticsServices: [],
            isDisableAccount: true,
        });
        this.props.form.resetFields();
    };

    handleChange = () => {
        if (this.props.form.getFieldValue('logisticsChannels') !== undefined) {
            if (this.props.form.getFieldValue('logisticsChannels').length !== 0)
                this.props.form.setFieldsValue({logisticsChannels: []})
        }
    };

    handlePlatformChange = () => {
        if (this.props.form.getFieldValue('platform').length !== 0) {
            this.setState({
                isDisableAccount: false,
            });
        }
    };


    render() {
        const {
            logisticsChannels,
            logisticsServices,
            logisticsServiceCode,
            logisticsChannelCode,
            isDisableAccount,
        } = this.state;

        const newlogisticsService = this.props.form.getFieldValue('logisticsService');
        const { getFieldDecorator } = this.props.form;

        const searchSelect = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="平台"
                        >
                            {getFieldDecorator('platform')(
                                <CSelect
                                    code="key"
                                    name="label"
                                    url={PLATFORM_SEARCH}
                                    apiListType={2}
                                    handleChange={this.handlePlatformChange}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="销售账号"
                        >
                            {getFieldDecorator('saleAccount')(
                                <CSelect
                                    code="key"
                                    name="label"
                                    url={SALE_ACCOUNT}
                                    disabled={isDisableAccount}
                                    placeholder="请选择"
                                    params={
                                        {
                                            data: {
                                                platform: this.props.form.getFieldValue('platform'),
                                                searchColumn: 'name',
                                            }
                                        }
                                    }
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="物流服务商"
                        >
                            {getFieldDecorator('logisticsService', {
                                initialValue: logisticsServiceCode  ? logisticsServiceCode : undefined,
                            })(
                                <CSelect
                                    code="key"
                                    name="label"
                                    url={SUPPLIER_SEARCH}
                                    list={logisticsServices}
                                    handleChange={this.handleChange}
                                    placeholder="请选择"
                                    apiListType={2}
                                    isNotCache
                                    localSearch={1}
                                    params={
                                        {data: {type: 0}}
                                    }
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="物流渠道"
                        >
                            {getFieldDecorator('logisticsChannels', {
                                initialValue: logisticsChannelCode ? logisticsChannelCode : undefined,
                            })(
                                <CSelect
                                    code="key"
                                    name="label"
                                    url={CHANNEL_SEARCH}
                                    list={logisticsChannels}
                                    apiListType={2}
                                    isNotCache
                                    placeholder="请选择"
                                    mode={"multiple"}
                                    maxCount={10}
                                    localSearch={1}
                                    params={{
                                        data: {
                                            logticsService: newlogisticsService,
                                            type: 0,
                                        }
                                    }}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="目的国家"
                        >
                            {getFieldDecorator('destinationCountry')(
                                <CSelect
                                    code="key"
                                    name="label"
                                    url={DEST_COUNTRY}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="仓库"
                        >
                            {getFieldDecorator('warehouses')(
                                <CSelect
                                    code="key"
                                    name="label"
                                    url={WAREHOUSE_LIST}
                                    mode={"multiple"}
                                    maxCount={10}
                                    params={
                                        { data: { type: 0 } }
                                    }
                                    placeholder="请选择"
                                    apiListType={2}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="付款时间"
                        >
                            {getFieldDecorator('payTimes')(
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="发货时间"
                        >
                            {getFieldDecorator('sendTimes')(
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                    showTime={{defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const searchContent = (
            <div className="search_content">
                <FormItem label="搜索内容">
                    {getFieldDecorator('searchType', {
                        initialValue: 1,
                    })(
                        <RadioGroup
                            size="small"
                        >
                            <Radio value={1}>内单号</Radio>
                            <Radio value={2}>订单追踪码</Radio>
                            <Radio value={3}>订单追踪码1</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContents')(
                        <SearchButton
                            placeholder="双击可批量查询"
                            enterButton="搜索"
                            onDoubleClick={() => this.props.toggleModal()}
                            onSearch={this.onSubmit}
                            allowClear
                        />
                    )}
                    <Button
                        type="default"
                        onClick={this.handleReset}
                    >
                        重置
                    </Button>
                </div>
            </div>
        );

        const searchTag = (
            <div className="search_tag">

                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="包裹类型"
                        >
                            {getFieldDecorator('packageType', {
                                initialValue: [0],
                            })(
                                <CTags
                                    list={PACKAGE_TYPE}
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem
                            {...formItemLayout}
                            label="轨迹状态"
                        >
                            {getFieldDecorator('trajectoryState', {
                                initialValue: [0],
                            })(
                                <CTags
                                    list={TRAJECTORY_STATE}
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            {...formItemLayout}
                            label="包裹状态"
                        >
                            {getFieldDecorator('packageState', {
                                initialValue: [0],
                            })(
                                <CTags
                                    list={PACKAGE_STATE}
                                    handleChange={this.onSubmit}
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
                    {searchSelect}
                    {searchContent}
                    {searchTag}
                </Form>
            </div>
        );
    }
}
