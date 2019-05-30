import React from 'react';
import { Radio, DatePicker, Input, Form, Button,Row, Col, Tooltip } from 'antd';
import { STATE_LIST } from '../constants/SearchFilter';
import RadioTags from '../../../common/components/radiotags'

const { RangePicker } = DatePicker;
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
    // // 更改帅选条件
    // setFieldsValue = (param, name) => {
    //     if (name === 'state') {
    //         this.props.form.setFieldsValue({
    //             [name]: param[0]
    //         })
    //     } else {
    //         this.props.form.setFieldsValue({
    //             [name]: param
    //         })    
    //     }
    //     this.props.handleSubmit();
    // }

    render(){
        const { handleSubmit } = this.props;
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
                    <div className="list-filter-item-title">状态：</div>
                    <FormItem>
                        <RadioTags
                            getFieldDecorator={getFieldDecorator}
                            onChange={() => handleSubmit()}
                            list={STATE_LIST}
                            name='state'
                        />
                    </FormItem>
                </div>
            </div>
        );
        const textSearch = this.state.showSearch >= 1 ? (
            <div className="text-search">
                <div className="background-grey padding-sm-top padding-ss-bottom">
                    <div className="list-filter-item ">
                        <div className="list-filter-item-title">搜索类型：</div>
                        <FormItem>
                            {getFieldDecorator('searchType', {
                                rules: [{ required: false, message: '请选择' }],
                                initialValue: '1',
                            })(
                                <RadioGroup size="small">
                                    <RadioButton value="1">样品单号</RadioButton>
                                    <RadioButton value="2">立项单号</RadioButton>
                                    <RadioButton value="3">意向供应商编码</RadioButton>
                                    <RadioButton value="4">意向供应商名称</RadioButton>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </div>
                    <div className="list-filter-item  margin-ss-top ">
                        <div className="list-filter-item-title">搜索内容：</div>
                        <FormItem>
                            {getFieldDecorator('searchContent')(
                                <TextArea placeholder="请输入搜索条件" style={{ width: 344 }} autosize={{ minRows: 2, maxRows: 6 }} />
                            )}
                        </FormItem>
                    </div>
                </div>
                {this.state.showSearch === 1 ? (
                    <Row  style={{width: 450, textAlign: 'right'}} className="margin-sm">
                        <Button className="margin-sm-right" type="primary" onClick={() => handleSubmit()}>搜索</Button>
                        <Tooltip className="margin-sm-right" placement="bottom" title={"清空已选的搜索条件"}>
                            <Button onClick={() => this.props.form.resetFields()}>重置</Button>
                        </Tooltip>
                        <Button onClick={() => this.setState({showSearch: 2})}>高级搜索</Button>
                    </Row>
                    ):null
                }

            </div>
        ) : null;
        const heighSearch = this.state.showSearch === 2 ? (
            <div>
                <div className="list-filter-item  margin-ss-top" >
                    <div className="list-filter-item-title">提交时间：</div>
                    <FormItem>
                        {getFieldDecorator('time')(
                            <RangePicker />
                        )}
                    </FormItem>
                </div>
                 <div className="btn-search">
                    <Row style={{width: 450, textAlign: 'right'}} className="margin-sm">
                        <Button className="margin-sm-right" type="primary" onClick={() => handleSubmit()}>搜索</Button>
                        <Tooltip className="margin-sm-right" placement="bottom" title={"清空已选的搜索条件"}>
                            <Button onClick={() => this.props.form.resetFields()}>重置</Button>
                        </Tooltip>
                        <Button onClick={() => this.setState({showSearch: 1})}>取消高级搜索</Button>
                    </Row>
                </div>
            </div>
        ) : null;

        return (
            <div className="search breadcrumb padding-sm overflow-hidden npd-specimen">
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
                    {heighSearch}
                </Form>
            </div>
        )
    }
}