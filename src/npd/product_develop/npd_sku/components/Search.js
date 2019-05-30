import React from 'react';
import { Radio, Input, Form, Button, Row, Col, Tooltip } from 'antd';
import { STATE_LIST, RECORD_STATE } from '../constants/SearchFilter';
import RadioTags from '../../../common/components/radiotags'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const TextArea = Input.TextArea;


export default class Search extends React.Component {
    state = {
        showSearch: 0,
    }
    onChangeSearch = (e) => {
        const value = e.target.value;
        this.setState({
            showSearch: Number.parseInt(value,10)
        })
    }
    // 更改帅选条件
    setFieldsValue = (param, name) => {
        this.props.form.setFieldsValue({
            [name]: param[0]
        })
        this.props.handleSubmit();
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 2 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 22 },
            },
        };
        const defaultSearch = (
            <div className="default-search">
                <div className="list-filter-item ">
                    <div className="list-filter-item-title">确认状态：</div>
                    <FormItem>
                        <RadioTags
                            getFieldDecorator={getFieldDecorator}
                            onChange={() => this.props.handleSubmit()}
                            list={STATE_LIST}
                            name='state'
                        />
                    </FormItem>
                </div>
                <div className="list-filter-item ">
                    <div className="list-filter-item-title">基础库是否建档：</div>
                    <FormItem>
                        <RadioTags
                            getFieldDecorator={getFieldDecorator}
                            onChange={() => this.props.handleSubmit()}
                            list={RECORD_STATE}
                            name='isNtsRecord'
                        />
                    </FormItem>
                </div>
            </div>
        );
        const textSearch = this.state.showSearch == 1 ? (
            <div className="text-search">
                <div className="background-grey margin-ss-top  padding-sm-top padding-ss-bottom">
                    <div className="list-filter-item ">
                        <div className="list-filter-item-title">搜索类型：</div>
                        <FormItem>
                            {getFieldDecorator('searchType', {
                                rules: [{ required: false, message: '请选择' }],
                                initialValue: '1',
                            })(
                                <RadioGroup size="small">
                                    <RadioButton value="1">SPU</RadioButton>
                                    <RadioButton value="2">SKU</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </div>
                    
                    <div className="list-filter-item margin-ss-top">
                        <div className="list-filter-item-title">搜索内容：</div>
                        <FormItem>
                            {getFieldDecorator('searchContent')(
                                <TextArea placeholder="请输入搜索条件" style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />
                            )}
                        </FormItem>
                    </div>
                </div>
                <Row  style={{marginLeft:"334px"}} className="margin-sm">
                    <Button className="margin-sm-right" type="primary" onClick={() => this.props.handleSubmit()}>搜索</Button>
                    <Button onClick={() => this.props.form.resetFields()}>重置</Button>
                </Row>
            </div>
        ) : null;

        return (
            <div className="search breadcrumb padding-sm overflow-hidden npd-sku">
                <div className="search-tab">
                    <RadioGroup
                        defaultValue="0"
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="0">筛选</RadioButton>
                        <RadioButton value="1">搜索</RadioButton>
                    </RadioGroup>
                </div>
                <Form>
                    {defaultSearch}
                    {textSearch}
                </Form>
            </div>
        )
    }
}