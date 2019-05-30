import React from 'react';
import { Radio, DatePicker, Input, Button, Form, Row, Col, Tooltip } from 'antd';
import { STATE_LIST } from '../constants/SearchFilter';
import RadioTags from '../../../common/components/radiotags'
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const TextArea = Input.TextArea;


export default class Search extends React.Component {
    state = {
        showSearch: 0
    }
    onChangeSearch = (e) => {
        const value = e.target.value;
        this.setState({
            showSearch: value === 'select' ? 0 : 1
        })
    }
    handleSubmit = () => {
        this.props.handleSubmit()
    }
    render() {
        const { resetFields } = this.props;
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
            <div className="list-filter-item default-search">
                <div className="list-filter-item-title">状态：</div>
                <FormItem>
                    <RadioTags
                        getFieldDecorator={getFieldDecorator}
                        onChange={this.handleSubmit}
                        list={STATE_LIST}
                        name='state'
                    />
                </FormItem>
            </div>
        );
        const textSearch = this.state.showSearch >= 1 ? (
            <div className="text-search ">
                <div className="background-grey margin-ss-top  padding-sm-top padding-ss-bottom">
                    <div className="list-filter-item">
                        <div className="list-filter-item-title">搜索类型：</div>
                        <FormItem>
                            {getFieldDecorator('searchType', {
                                rules: [{ required: false, message: '请选择' }],
                                initialValue: '1',
                            })(
                                <RadioGroup size="small">
                                    <RadioButton value="1">立项申请编码</RadioButton>
                                    <RadioButton value="2">项目流名称</RadioButton>
                                    <RadioButton value="3">销售员</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </div>
                    <div className="list-filter-item margin-ss-top">
                        <div className="list-filter-item-title">搜索内容：</div>
                        <FormItem>
                            {getFieldDecorator('searchContent')(
                                <TextArea  placeholder="请输入搜索条件" style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />
                            )}
                        </FormItem>
                    </div>
                </div>
                {this.state.showSearch === 1 ? (
                    <Row  className="margin-sm"  style={{marginLeft:"230px"}}>
                        <Button className="margin-sm-right" type="primary" onClick={this.handleSubmit}>搜索</Button>
                        <Tooltip className="margin-sm-right" placement="bottom" title={"清空已选的搜索条件"}>
                            <Button onClick={resetFields}>重置</Button>
                        </Tooltip>
                        <Button onClick={() => this.setState({ showSearch: 2 })}>高级搜索</Button>
                    </Row>
                ) : null
                }
            </div>
        ) : null;
        const heighSearch = this.state.showSearch === 2 ? (
            <div className="margin-ss-top">
                <div className="list-filter-item">
                    <div className="list-filter-item-title">提交时间：</div>
                    <FormItem>
                        {getFieldDecorator('time')(
                            <RangePicker style={{width:344}}/>
                        )}
                    </FormItem>
                </div>
                <Row className="margin-sm"  style={{marginLeft:"206px"}}>
                    <Button className="margin-sm-right" type="primary" onClick={this.handleSubmit}>搜索</Button>
                    <Tooltip className="margin-sm-right" placement="bottom" title={"清空已选的搜索条件"}>
                        <Button onClick={resetFields}>重置</Button>
                    </Tooltip>
                    <Button onClick={() => this.setState({ showSearch: 1 })}>取消高级搜索</Button>
                </Row>
            </div>
        ) : null;
        return (
            <div className="search breadcrumb padding-sm overflow-hidden npd-pd-hna_search_container">
                <div className="search-tab">
                    <RadioGroup
                        defaultValue="select"
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="select">筛选</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </div>
                <Form>
                    {defaultSearch}
                    {textSearch}
                    {heighSearch}
                </Form>
            </div>
        )
    }
}