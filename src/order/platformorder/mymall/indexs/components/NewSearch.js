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
    Select,
} from 'antd';
import Ctags from '@/components/ctags';
import CSelect from '@/components/cselect';
import {getrangetime} from 'util/baseTool';
import { GET_SELLER_ACCOUNT } from '../constants/Api';
import {
    CREATE_TYPE,
    MARK_INFO,
    CARRIER_TYPE,
    IS_PUSHED,
} from '../constants'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const SearchButton = Input.Search;

export default class SearchComponent extends React.Component {

    componentDidMount () {
        this.setDefaultTime();
    }

    // 设置默认时间
    setDefaultTime = () => {
        let { setFieldsValue } = this.props.form;
        var times = getrangetime(15);
        var momentData = [moment(times.start),moment(times.end)]
        setFieldsValue({ "orderTime": momentData });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { onSearch } = this.props;
        const selectInit = [{key: '', label: '全部'}];
        const selectSearch = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="创建类型"
                        >
                            {getFieldDecorator('createType', {
                                initialValue: ''
                            })(
                                <Select>
                                    {
                                        CREATE_TYPE.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="下单时间"
                        >
                            {getFieldDecorator('orderTime')(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['开始日期', '结束日期']}
                                />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="发货截止时间"
                        >
                            {getFieldDecorator('deliverDeadline')(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['开始日期', '结束日期']}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="标记信息"
                            >
                                {getFieldDecorator('markInfo', {
                                    initialValue: ''
                                })(
                                    <Select>
                                        {
                                            MARK_INFO.map(v => <Option key={v.id} value={v.id}>{v.name}</Option>)
                                        }
                                    </Select>
                                )}
                            </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...this.formItemLayout}
                            label="销售账号"
                        >
                            {
                                getFieldDecorator('sellerIds', {
                                    initialValue: ['']
                                })(
                                    <CSelect
                                        list={selectInit}
                                        code='key'
                                        name='label'
                                        url={GET_SELLER_ACCOUNT}
                                        params={{
                                            data: {
                                                searchColumn: 'name',
                                                pageData: 30,
                                                pageNumber: 1}
                                        }}
                                        apiListType={2}
                                        placeholder={'请选择'}
                                    />
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="抓单时间"
                        >
                            {getFieldDecorator('grapTime')(
                                <RangePicker
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['开始日期', '结束日期']}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const typeSearch = (
            <div className="search_content">
                <FormItem label="搜索类型"
                >
                    {getFieldDecorator('searchType', {
                        initialValue: 1,
                    })(
                        <RadioGroup size="small">
                            <Radio value={1}>交易号</Radio>
                            <Radio value={2}>平台单号</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContent')(

                        <SearchButton
                            placeholder="双击可批量查询"
                            enterButton="搜索"
                            onDoubleClick={() => this.props.toggleModal()}
                            onSearch={() => onSearch()}
                            allowClear
                        />
                    )}
                    <Button type="default" onClick={() => this.props.onReset()}>
                        重置
                    </Button>
                </div>
            </div>
        );

        const ctageSearch = (
            <div className="search_tag">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="发货类型"
                        >
                            {getFieldDecorator('carrierType', {
                                initialValue: ['']
                            })(
                                <Ctags
                                    list={CARRIER_TYPE}
                                    handleChange={() => onSearch()}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={16}>
                        <FormItem
                            label="是否推送"
                        >
                            {getFieldDecorator('isPushedToOm', {
                                initialValue: ['']
                            })(
                                <Ctags
                                    list={IS_PUSHED}
                                    handleChange={() => onSearch()}
                                />
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
                    {typeSearch}
                    {ctageSearch}
                </Form>
            </div>
        )
    }
}
