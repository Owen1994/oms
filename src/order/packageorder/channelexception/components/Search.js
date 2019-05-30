import React from 'react'
import moment from 'moment';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    Row,
    Col,
} from 'antd';
import Ctags from '@/components/ctags'
import CSelect from '@/components/cselect'
import { fetchPost } from 'util/fetch';
import {
    CHANNEL_ONLINE,
} from '../constants';
import { 
    GET_PLATFORM,
    FIND_STORELIST_PUBLIC,
    QUERY_CHANNEL_DATA,
} from '../constants/Api';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;


export default class SearchComponent extends React.Component {

    state = {
    };

    componentDidMount() {
        this.setDefaultTime();
        // 获取获取状态数据
        this.props.queryChannelObtainState();
        // 获取渠道异常类型数据
        this.props.queryExceptionType();
    }

    // 设置默认时间
    setDefaultTime = () => {
        let { setFieldsValue } = this.props.form;
        let end = moment().endOf('day').valueOf();
        let start = moment().subtract(30, 'day').startOf('day').valueOf();
        let momentData = [moment(start), moment(end)] || [];
        setFieldsValue({ "paymentTime": momentData });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleChange, paramePlatformId, toggleModal, onSearch, onReset, channelobtaindata, exceptiontypedata } = this.props;
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="销售平台"
                        >
                            {getFieldDecorator('platformCode')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={GET_PLATFORM}
                                    formType={1}
                                    params={{ searchColumn: 'name', pageData: 50, pageNumber: 1 }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    handleChange={handleChange}
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} className="multiple">
                        <FormItem
                            label="销售账号"
                        >
                            {getFieldDecorator('sellerIds')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={FIND_STORELIST_PUBLIC}
                                    mode='multiple'
                                    maxCount={10}
                                    params={{ data: {searchColumn: 'sellerId', platformCode: paramePlatformId, pageData: 20, pageNumber: 1 }}} // 搜索参数
                                    apiListType={2}
                                    placeholder={'多选'}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="物流渠道"
                        >
                            {getFieldDecorator('channelId')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url={QUERY_CHANNEL_DATA}
                                    formType={1}
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    localSearch={1} 
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="付款时间"
                        >
                            {getFieldDecorator('paymentTime')(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['开始日期', '结束日期']}
                                    style={{ width: 270 }}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem   label="搜索内容">
                                {getFieldDecorator('searchType', {
                                    initialValue: 1
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>平台单号</Radio>
                                        <Radio value={2}>包裹单号</Radio>
                                        {/* <Radio value={8}>固定电话</Radio>
                                        <Radio value={9}>移动电话</Radio>
                                        <Radio value={10}>邮编</Radio> */}
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <div className="typeSearch-r" style={{ left: "375px" }}>
                                {getFieldDecorator('searchContent')(
                                    <Search
                                        placeholder="双击可批量查询"
                                        enterButton="搜索"
                                        size="large"
                                        style={{ width: 270 }}
                                        onDoubleClick={() => toggleModal()}
                                        onSearch={() => onSearch()}
                                    />
                                    )}
                                <Button type="default" onClick={() => onReset()}>
                                    重置
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );

        const ctageSearch = (
            <div className="ctageSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="渠道类型"
                        >
                            {getFieldDecorator('channelOnline', {
                                initialValue: ['']
                            },
                            )(
                                <Ctags
                                    list={CHANNEL_ONLINE}
                                    handleChange={() => onSearch()}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="获取状态"
                        >
                            {getFieldDecorator('channelGetStatus', {
                                initialValue: ['']
                            },
                            )(
                                <Ctags
                                    list={channelobtaindata}
                                    handleChange={() => onSearch()}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="异常类型"
                        >
                            {getFieldDecorator('newExceptionType', {
                                initialValue: ['']
                            },
                            )(
                                <Ctags
                                    list={exceptiontypedata}
                                    handleChange={() => onSearch()}
                                />
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
                        {typeSearch}
                    </div>
                    {ctageSearch}
                </Form>
            </div>
        )
    }
}
