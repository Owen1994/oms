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
import Ctags from '../../../../components/ctags'
import { ORDER_TYPE, ONLINE_STATE } from '../constants/index'
import { datasaddkey } from '../../../../util/baseTool';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

const SearchButton = Input.Search;

var TAG_STATE = [];     //标记状态

export default class SearchComponent extends React.Component {

    // 重置
    resetFields = () => {
        this.props.form.resetFields();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.tagstate !== this.props.tagstate) {
            const tagstate = nextProps.tagstate;
            if (tagstate && tagstate !== []) {
                TAG_STATE = [];
                TAG_STATE.push({ 'code': -1, 'name': '全部' });
                tagstate.map(it => {
                    TAG_STATE.push({ 'code': it.id, 'name': `${it.name}(${it.num})` });
                });
                datasaddkey(TAG_STATE);
            }
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit, activeKey } = this.props;

        const selectSearch =  (
            <div className="search_select">
                <Row type="flex" align="middle">
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
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="抓单时间"
                        >
                            {getFieldDecorator('grabTime')(
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
        ) ;

        const typeSearch = (
            <div className="search_content">
                <FormItem label="搜索内容"
                >
                    {getFieldDecorator('searchType', {
                        initialValue: 1,
                    })(
                        <RadioGroup size="small">
                            <Radio value={1}>平台单号</Radio>
                            <Radio value={2}>销售账号</Radio>
                            <Radio value={3}>交易号</Radio>
                            <Radio value={4}>跟踪号</Radio>
                            <Radio value={5}>平台SKU</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContent', {
                        rules: [{
                            required: false,
                            message: `请输入`
                        }],
                    })(
                        <SearchButton
                            placeholder="双击可批量查询"
                            enterButton="搜索"
                            onSearch={() => this.props.handleSubmit()}
                            onDoubleClick={() => this.props.toggleModal()}
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
                            label="创建类型"
                        >
                            {getFieldDecorator('orderType', {
                                initialValue: [-1]
                            })(
                                <Ctags
                                    list={ORDER_TYPE}
                                    handleChange={() => handleSubmit()}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="上网信息"
                        >
                            {getFieldDecorator('onLineState', {
                                initialValue: [0]
                            })(
                                <Ctags
                                    list={ONLINE_STATE}
                                    handleChange={() => handleSubmit()}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                {
                    activeKey === '2' ?
                        <Row type="flex" align="middle">
                            <Col span={24}>
                                <FormItem
                                    label="标记状态"
                                >
                                    {getFieldDecorator('tagState', {
                                        initialValue: [-1]
                                    })(
                                        <Ctags
                                            list={TAG_STATE}
                                            handleChange={() => handleSubmit()}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    : null
                }
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
