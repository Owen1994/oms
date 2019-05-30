import React from 'react'
import {
    Form,
    Input,
    Row,
    Col,
} from 'antd'
const FormItem = Form.Item;
const Search = Input.Search;

class Condition extends React.Component {

    hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

    formItemLayout = {
        labelCol: {span: 0},
        wrapperCol: {span: 24}
    };

    handleSubmit = (value) => {
        // console.log(`handleSubmit... e:`, e);
        // const or = typeof e == 'object' ? true : false
        const { url } = this.props.searchValues;
        // or && e.preventDefault();
        const newobj = {};
        // let value = this.props.form.getFieldValue('name');
        value = value ? value.replace(/[\s]/g, '') : '';
        newobj.name = value;
        newobj.pageData = 20;
        newobj.pageNumber = 1;
        this.props.searchVluesaction({ searchValue: value });
        this.props.fetchsearchValues({url, key: 'data', value: newobj })
    };

    render() {
        return (
            <Form layout="inline">
                <Row>
                    <Col span={24}>
                        <FormItem {...this.formItemLayout} label=""  className="wfull ptb5">
                            <Search onSearch={this.handleSubmit} placeholder="查询条件" enterButton="查询" maxLength="100"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Condition