/**
 *作者: 任贸华
 *功能描述: 查询模块
 *参数说明:
 *时间: 2018/4/16 11:00
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {
    Form,
    Input,
    Button,
    Select,
    Tag,
    Row,
    Col,
    DatePicker,
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;
import {levelOptions} from '../../../util/options';
import {objTodata} from '../../../util/baseTool';

class Condition extends Component {

    constructor(props) {
        super(props);
    }

    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 0},
        wrapperCol: {span: 24}
    }

    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        const {url, tags ,searchField,transformData} = this.props.searchValues;
        or && e.preventDefault();
        const newobj = {}
        let value = this.props.form.getFieldValue('name')
        value = value ? value.replace(/(^\s*)|(\s*$)/g, '') : ''
        searchField ? newobj[searchField] = value : newobj["name"] = value
        newobj.pageData = 20;
        newobj.pageNumber = 1;
        this.props.fetchsearchValues({url, key: 'data', value: newobj, tags, transformData})
    }


    handleReset = () => {
        this.props.form.resetFields();
    }

    platformSelect = () => {
        this.props.searchVluesaction({visible: true})
    }


    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;


        return (

            <Form layout="inline">

                <Row>
                    <Col span={24}>
                        <FormItem  {...this.formItemLayout}
                                   label="" className="wfull ptb5"
                        >

                            {getFieldDecorator('name', {
                                rules: [{
                                    required: false,
                                    message: `搜索条件`
                                }],
                            })(
                                <Search onSearch={this.handleSubmit}
                                        placeholder="查询条件" enterButton="查询" maxLength="100"/>
                            )}

                        </FormItem>
                    </Col>


                </Row>


            </Form>
        );
    }
}

export default Condition