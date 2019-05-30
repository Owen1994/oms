import React from 'react';
import {
    Form, Input, Button, Radio, Row, Col,
} from 'antd';
import CTags from '../../../../components/ctags';
import { exceptionState, processingScenarios } from '../constants/search';

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
            <div className="padding-sm border-bottom-line padding-sm padding-md-left">
                <Row type="flex" align="middle">
                    <FormItem
                        label="搜索类型"
                        style={{ display: 'flex' }}
                    >
                        {getFieldDecorator('searchType', {
                            initialValue: 1,
                        })(
                            <RadioGroup size="small">
                                <Radio value={1}>异常编码</Radio>
                                <Radio value={2}>快递单号</Radio>
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
        const searchTags = (
            <Row type="flex" align="middle" className="padding-sm padding-md-left">
                <Col span={8}>
                    <FormItem
                        label="异常状态:"
                    >
                        {getFieldDecorator('exceptionState', {
                            initialValue: [''],
                        })(
                            <CTags
                                list={exceptionState}
                                handleChange={this.onSubmit}
                            />,
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        label="处理方案:"
                    >
                        {getFieldDecorator('processingScenarios', {
                            initialValue: '',
                        })(
                            <CTags
                                list={processingScenarios}
                                handleChange={this.onSubmit}
                            />,
                        )}
                    </FormItem>
                </Col>
            </Row>
        );
        return (
            <div className="search breadcrumb overflow-hidden ">
                <Form layout="horizontal">
                    {typeSearch}
                    {searchTags}
                </Form>
            </div>
        );
    }
}
