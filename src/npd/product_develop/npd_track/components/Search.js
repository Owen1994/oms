import React from 'react';
import { Radio, DatePicker, Input, Form, Button, Row, Col, Tooltip,Select } from 'antd';
// import StandardFormRow from '../../../../common/components/advancedSearchModel/StandardFormRow';
// import TagSelect from '../../../../common/components/advancedSearchModel/TagSelect';
import RadioTags from '../../../common/components/radiotags'
import Choice from "../../../common/components/choice/index"
import {
    ORDER_NOT,
    PRODUCT_TYPE,
    SEARCH_TYPE,
} from '../constants/SearchFilter';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const TextArea = Input.TextArea;
const Option = Select.Option;


export default class Search extends React.Component {
    state = {
        showSearch: 0,
        option:[
            {
                v:"developer",
                n:"开发员",
                search:(v)=>{
                    var params = {
                        pageData:20,
                        pageNumber:1,
                        name:v
                    }
                    return this.props.searchUserList(params)
                    .then(result=>{
                        if(result&&result.length){
                            return result.map((item,k)=>{
                                return <Option value={item.userName} key={k}>{item.name + "(" + item.userName + ")"}</Option>
                            })
                        }
                        return []
                    })
                }
            },
        ]
    }
    onChangeSearch = (e) => {
        const value = e.target.value;
        this.setState({
            showSearch: Number.parseInt(value, 10)
        })
    }
    // 更改帅选条件
    setFieldsValue = () => {
        this.props.handleSubmit();
    }

    render() {
        const { handleSubmit } = this.props;
        const {option} = this.state
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
                
                <div className="list-filter-item">
                    <div className="list-filter-item-title">申请下单与否：</div>
                    <FormItem>
                        <RadioTags
                            getFieldDecorator={getFieldDecorator}
                            onChange={this.setFieldsValue}
                            list={ORDER_NOT}
                            name='recordState'
                        />
                    </FormItem>
                </div>
                <div className="list-filter-item">
                    <div className="list-filter-item-title">新品类型：</div>
                    <FormItem>
                        <RadioTags
                            getFieldDecorator={getFieldDecorator}
                            onChange={this.setFieldsValue}
                            list={PRODUCT_TYPE}
                            name='ntsType'
                        />
                    </FormItem>
                </div>
                
            </div>
        );
        const textSearch = this.state.showSearch >= 1 ? (
            <div className="text-search">
                <div className="background-grey  margin-ss-top  padding-sm-top padding-ss-bottom">
                    <div className="list-filter-item">
                        <div className="list-filter-item-title">搜索类型：</div>
                        <FormItem>
                            {getFieldDecorator('searchType',{
                                initialValue:1
                            })(
                                <RadioGroup size="small">
                                    {SEARCH_TYPE.map((item, index) =>
                                        <RadioButton value={item.id} key={index}>{item.name}</RadioButton>
                                    )}
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
                {
                    this.state.showSearch === 1 ?
                        <Row className="margin-sm" style={{marginLeft:"230px"}}>
                            <Button className="margin-sm-right" type="primary" onClick={() => handleSubmit()}>搜索</Button>
                            <Tooltip className="margin-sm-right" placement="bottom" title={"清空已选的搜索条件"}>
                                <Button onClick={() => this.props.form.resetFields()}>重置</Button>
                            </Tooltip>
                            <Button  onClick={() => this.setState({ showSearch: 2 })}>高级搜索</Button>
                        </Row>
                        :
                        null
                }
            </div>
        ) : null;
        const heighSearch = this.state.showSearch === 2 ? (
            <div className="margin-ss-top">
                <Choice className="npd-project-choice" option={option} {...this.props}></Choice>
                <div className="list-filter-item">
                    <div className="list-filter-item-title">提交时间：</div>
                    <FormItem>
                        {getFieldDecorator('time')(
                            <RangePicker style={{width: 344}} />
                        )}
                    </FormItem>
                </div>
                <div className="btn-search">
                    <Row className="margin-sm" style={{marginLeft:"206px"}}>
                        <Button className="margin-sm-right" type="primary" onClick={() => handleSubmit()}>搜索</Button>
                        <Tooltip className="margin-sm-right" placement="bottom" title={"清空已选的搜索条件"}>
                            <Button onClick={() => this.props.form.resetFields()}>重置</Button>
                        </Tooltip>
                        <Button onClick={() => this.setState({ showSearch: 1 })}>取消高级搜索</Button>
                    </Row>
                </div>
            </div>
        ) : null;
        return (
            <div className="search breadcrumb padding-sm overflow-hidden npd-track">
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