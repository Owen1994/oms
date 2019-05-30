import React from 'react';
import { Input, Button, Form, Row, Col } from 'antd';
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow';


const FormItem = Form.Item;


export default class Search extends React.Component {
    resetFields = () => {
        this.props.form.resetFields();
    }

    render(){
        const { onSearch } = this.props;
        const { getFieldDecorator } = this.props.form;
        const defaultSearch = (
            <div className="default-search">
                <StandardFormRow title="用户名：">
                    <FormItem>
                        {getFieldDecorator('name')(
                            <Input placeholder="" style={{ width: 287 }} />
                        )}
                    </FormItem>
                </StandardFormRow>
                <Row gutter={8} type="flex" justify="start" className="margin-sm">
                    <Col span={3}>
                    </Col>
                    <Col>
                        <Button onClick={this.resetFields}>重置</Button>
                    </Col>
                    <Col>
                        <Button onClick={() => onSearch()} type="primary">搜索</Button>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="search breadcrumb padding-sm overflow-hidden">
                <Form>
                    {defaultSearch}
                </Form>
            </div>
        )
    }
}