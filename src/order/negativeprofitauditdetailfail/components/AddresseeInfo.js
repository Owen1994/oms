import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {
    Form,
    Select,
    Row,
    Col,
    Radio,
} from 'antd'


const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class AddresseeInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 19}
    }
    formItemLayout3 = {
        labelCol: {span: 11},
        wrapperCol: {span: 13}
    }

    render() {
        const { exceptionInfo } = this.props;
        return (
            <div className="newCluenk">
                <div className="title">失败原因</div>
                <div className="content">
                    <Row className="text-center">
                        <Col span={24}>
                           <p  className="text-danger font-lg-weight">{exceptionInfo}</p>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default AddresseeInfo
