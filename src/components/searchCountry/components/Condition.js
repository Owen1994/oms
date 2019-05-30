/**
 *作者: 任贸华
 *功能描述: 暂未用到
 *参数说明:
 *时间: 2018/4/16 11:15
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

class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        countryVisible: false
    }
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 0},
        wrapperCol: {span: 24}
    }

    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        or&&e.preventDefault();
        const newobj = {}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (let i in values) {
                    if (values[i]) {
                        if (i == 'searchcountrykeyword') {
                            newobj[i] = values[i]
                        }
                    }
                }
                this.props.fetchsearchcountry({key: 'data', value: newobj})

            }
        });
        return newobj
    }


    handleReset = () => {
        this.props.form.resetFields();
    }

    countrySelect = () => {
        this.props.countrysearchaction({visible: true})
    }

    closehaddle = (i) => {
        const data=this.props.countrysearch.data;
        data[i].checked=false;
        this.props.countrysearchaction({data})
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const taglist = this.props.countrysearch.data ? this.props.countrysearch.data.map((v,i) => {
            return v.checked?<Tag key={i} closable onClose={()=>{this.closehaddle(i)}}>{v.name}</Tag>:''
        }):[]

        return (

            <Form layout="inline">

                <Row style={{'padding': '8px 0px'}}>
                    <Col span={24}>
                        <FormItem  {...this.formItemLayout}
                                   label="" style={{"width": "100%", paddingRight: '5px'}}
                        >

                            {getFieldDecorator('searchcountrykeyword', {
                                rules: [{
                                    required: false,
                                    message: `搜索条件`
                                }],
                            })(
                                <Search onSearch={this.handleSubmit} disabled={this.hasErrors(getFieldsError())}  placeholder="查询条件" enterButton="查询" maxLength="100"/>
                            )}

                        </FormItem>
                    </Col>


                </Row>

                <Row style={{'padding': '0px 0px 8px'}}>

                    <Col span={24}>
                        {taglist}
                    </Col>

                </Row>
            </Form>
        );
    }
}

export default Condition