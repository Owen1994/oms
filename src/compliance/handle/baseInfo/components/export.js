import React, { Component } from 'react';
import { Row, Col, Form, message, Pagination } from 'antd';

import { exportContition, exportType } from "../constants";
import renderForm from '../../../common/utils/render-form';

class App extends Component {
    state = {

    }
    render() {
        const { timeVisible,form } = this.props;
        const type = form.getFieldValue("type");
        console.log(type)
        const formItemLayout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 12,
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
                    options: [
                        {
                            value: 1,
                            label: "导出当前搜索条件下的数据",

                        },
                        {
                            value: 2,
                            label: "导出选中的数据",
                            disabled: !this.props.ids.length
                        }
                    ],
                }
            },
        ]

        if (timeVisible && type !== 2) {
            firstFormItems.push({
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
            })
        }
        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        {renderForm(firstFormItems, this.props.form)}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(App);