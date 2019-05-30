/**
*作者: 任贸华
*功能描述: 指定发货仓平台搜索组件
*参数说明:
*时间: 2018/4/16 11:21
*/
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import Modalmodel from '../components/Modalmodel'
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
    Checkbox,
} from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
import {levelOptions} from '../../../util/options';
import {selectValues} from "../../../util/baseTool";

class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        platformVisible: false
    }
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }


    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        const newobj = {}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {

                newobj.salesPlatform = values.salesPlatform;
                or && this.props.fetchPosts({key: 'data', value: newobj});
            }
        });
        return newobj
    }


    rangeConfig = {
        rules: [{type: 'array', required: false, message: '请选择'}],
    }


    handleReset = () => {
        this.props.form.resetFields();
    }

    platformSelect = () => {
        this.props.platformsearchaction({visible: true,})
        this.props.fetchsearchplatform({key: 'data',})
    }


    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const platformId = this.props.commonSelectData.platformId || []
        const platformIdselect = platformId.map((v, i) => <Option key={i} value={v.id}>{v.name}</Option>)
        return (

            <div className="newCluenk">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">
                        <Row>
                            <Col span={5}>

                                <FormItem {...this.formItemLayout}
                                          label="选择平台" className={'wfull'}
                                >
                                    {getFieldDecorator('salesPlatform', {
                                            rules: [{required: false, message: '选择平台'}], initialValue: ''
                                        },
                                    )(
                                        <Select className={'wfull'}>
                                            {platformIdselect}
                                        </Select>
                                    )}

                                </FormItem>

                            </Col>


                            <Col span={19}>
                                <div style={{textAlign: 'right'}}>
                                    <FormItem>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            disabled={this.hasErrors(getFieldsError())}
                                        >
                                            查询
                                        </Button>
                                    </FormItem>
                                    <FormItem>
                                        <Button
                                            type="default"
                                            onClick={this.handleReset}
                                        >
                                            重置
                                        </Button>
                                    </FormItem>
                                </div>
                            </Col>
                        </Row>

                    </div>
                </Form>
            </div>
        );
    }
}

export default Condition