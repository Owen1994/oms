import React, {Component} from 'react' //在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。写 React.js 组件，必须引入这两个东西。
import {render} from 'react-dom' //ReactDOM 可以帮助我们把 React 组件渲染到页面上去
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
import {platformsearchaction} from "../actions";
import {selectValues} from '../../../util/baseTool';
class Condition extends Component {

    constructor(props) {
        super(props);
    }

    state={
        platformVisible:false
    }
    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }

    formItemLayout2 = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    }

    formItemLayout3 = {
        labelCol: {span: 6},
        wrapperCol: {span: 18}
    }

    /**
    *作者: 唐勇
    *功能描述: 查询销售平台信息
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    handleSubmit = (e) => {
        const or = typeof e == 'object' ? true : false
        or && e.preventDefault();
        const newobj = {}
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
               newobj.salesPlatform = values.salesPlatform;
               newobj.pageData=20;
               newobj.pageNumber=1;
               this.props.fetchPosts({key: 'data', value: newobj});
            }
        });
        this.props.menudataaction({pageCache:{...this.props.menuInfos.pageCache,[`${location.pathname}${location.search}`]:newobj}})
        return newobj
    }
    /**
    *作者: 唐勇
    *功能描述: 清空列表数据
    *参数说明:
    *时间: 2018/4/3 19:00
    */
    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const salesPlatform = this.props.commonSelectData.salesPlatform || []
        const platformIdselect = salesPlatform.map((v, i) => <Option key={i} value={v.id}>{v.name}</Option>)
        return (
            <div className="newCluenk">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <div className="content">
                        <Row>
                            <Col span={5}>
                                <FormItem {...this.formItemLayout2}
                                          label="销售平台" className='ant-xs-row'
                                >
                                    {getFieldDecorator('salesPlatform', {
                                            rules: [{required: false, message: '销售平台'}], initialValue: ''
                                        },
                                    )(
                                        <Select className='ant-xs-row'>
                                            {platformIdselect}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={13}></Col>
                            <Col span={6}>
                                <div className='text-right'>
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
                                        <Button type="default" onClick={this.handleReset}>
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