import React from 'react';
import {
    Form,
    Input,
    Icon,
    Button,
} from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
};

export default class Search extends React.Component {
    state = {
        inputVal: '',
    }

    handleSearchInputChange = (e) => {
        this.setState({ inputVal: e.target.value });
    }

    handleInputEmpty = () => {
        this.props.form.setFieldsValue({
            searchCode: '',
        });
        this.setState({ inputVal: '' });
    }

    render() {
        const { inputVal } = this.state;
        const suffix = inputVal ? <Icon type="close-circle" onClick={this.handleInputEmpty} /> : null;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="wms-search breadcrumb">
                    <Form>
                        <div className="wms-defaultSearch wms-basedata-defaultSearch">
                            <FormItem
                                {...formItemLayout}
                                label="标识"
                            >
                                {getFieldDecorator('searchCode')(
                                    <Input
                                        placeholder="请输入内容"
                                        onChange={this.handleSearchInputChange}
                                        suffix={suffix}
                                        style={{ width: 330 }}
                                    />,
                                )}
                                <Button
                                    type="primary"
                                    onClick={() => this.props.handleSubmit()}
                                    style={{ marginLeft: 20 }}
                                >
                                    搜索
                                </Button>
                            </FormItem>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
