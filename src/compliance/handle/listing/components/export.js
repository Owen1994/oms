import React, { Component } from 'react';
import { Row, Col, Form, message, Pagination } from 'antd';

import { exportContition, exportType } from "../constants";
import renderForm from '../../../common/utils/render-form';

class App extends Component {
    state = {
    
    }
    componentDidMount() {
    
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 18,
            },
        }
        const firstFormItems = [
            {
                label: '导出对象',
                type: 'RadioGroup',
                key: 'type',
                colSpan: 24,
                formItemLayout,
                style: { width: '200px' },
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                    initialValue: 1,
                },
                otherProps: {
                    options: exportType,
                }
            },{
                label: '导出条件',
                type: 'RadioGroup',
                key: 'condition',
                colSpan: 24,
                formItemLayout,
                style: { width: '200px' },
                option: {
                    rules: [
                        { required: true, message: '必填' },
                    ],
                    initialValue: 1,
                },
                otherProps: {
                    options: exportContition,
                }
            },
        ]
        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        { renderForm(firstFormItems, this.props.form) }
                    </Col>
                   </Row>
            </div>
        );
    }
}

export default Form.create()(App);