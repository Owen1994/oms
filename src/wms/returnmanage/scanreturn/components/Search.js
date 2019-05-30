import React from 'react';
import {
    Form, Input, Button, Radio, Row, Col,
} from 'antd';
import '../../../common/css/index.css';
import CSelect from '../../../../components/cselect';

const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
const FormItem = Form.Item;
export default class Search extends React.Component {
    /**
     * 搜索
     */
    onSubmit = () => {
        this.props.onSearchListener();
    };

    /**
     * 重置表单
     */
    reset = () => {
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const typeSearch = (
            <div className="padding-sm border-bottom-line padding-sm">
                <Row type="flex" align="middle">
                    <Col span={6}>
                        <FormItem
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            label="退件原因"
                        >
                            {getFieldDecorator('reasonForReturn', {
                                initialValue: '请选择',
                            })(
                                <CSelect
                                    list={[]}
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <FormItem
                        label="搜索类型"
                    >
                        {getFieldDecorator('searchType', {
                            initialValue: 1,
                        })(
                            <RadioGroup size="small">
                                <Radio value={1}>卡板号</Radio>
                                <Radio value={2}>面单</Radio>
                                <Radio value={3}>SKU</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                    <div>
                        {getFieldDecorator('searchContent', {
                            rules: [{
                                required: false,
                                message: '请输入',
                            }],
                        })(
                            <SearchInput
                                placeholder="请输入内容"
                                enterButton="搜索"
                                style={{ width: 280 }}
                                onSearch={this.onSubmit}
                            />,
                        )}
                        <Button type="default" onClick={this.reset}>
                            重置
                        </Button>
                    </div>
                </Row>
            </div>
        );
        return (
            <div className="wms-search breadcrumb overflow-hidden ">
                <Form layout="horizontal">
                    {typeSearch}
                </Form>
            </div>
        );
    }
}
