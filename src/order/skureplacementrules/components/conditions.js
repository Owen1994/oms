import React from 'react';
import {
    Form,
    Input,
    Button, Col, Row,
} from 'antd';
import {
    PLATEFORM_LIST,
    RULES_STATUS,
} from "../constants/conditions";
const FormItem = Form.Item;
import CSelect from '@/components/cselect';
const Search = Input.Search;

class Conditions extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;

        return(
            <div className="erp-search">
                <Form>
                    <div className="search_select">
                        <Row type="flex" align="middle">
                            <Col span={8}>
                                <FormItem
                                    label="平台"
                                >
                                    {getFieldDecorator('data[plateformId]', {
                                        initialValue: undefined,
                                    })(

                                        <CSelect
                                            code="code"
                                            name="name"
                                            list={PLATEFORM_LIST}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="规则状态"
                                >
                                    {getFieldDecorator('data[rulesAndStatus]', {
                                        initialValue: undefined,
                                    })(
                                        <CSelect
                                            code="code"
                                            name="name"
                                            list={RULES_STATUS}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem
                                    label="规则名称"
                                    className="content_right"
                                >
                                    {getFieldDecorator('data[ruleName]', {})(

                                        <Search
                                            enterButton="搜索"
                                            allowClear
                                        />
                                    )}
                                    <Button type="default">
                                        重置
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </div>
        )
    }
}
export default Form.create()(Conditions);
