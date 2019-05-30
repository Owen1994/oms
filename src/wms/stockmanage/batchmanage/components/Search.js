import React from 'react';
import {
    Form, Input, Button, Row, Col, Radio,
} from 'antd';
import CTags from '../../../../components/ctags';
import { priority } from '../constants/Search';
import { getCommonData } from '../../../common/action';
import { GET_MAIN_PERMISSION_WAREHOUSE } from '../../../common/constants/Api';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const SearchInput = Input.Search;
export default class Search extends React.Component {
    state = {
        wareHouse: [
            {
                code: '',
                name: '全部',
            },
        ],
    };

    componentDidMount() {
        getCommonData(GET_MAIN_PERMISSION_WAREHOUSE, ((list) => {
            this.setState((state) => {
                list.forEach(item => state.wareHouse.push(item));
                return state;
            });
        }));
    }

    /**
     * 全局搜索
     * @param event
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
        const { wareHouse } = this.state;
        const typeSearch = (
            <div className="search_content">
                <Row type="flex" align="middle">
                    <FormItem
                        label="搜索类型"
                    >
                        {getFieldDecorator('searchType', {
                            initialValue: 1,
                        })(
                            <RadioGroup size="small">
                                <Radio value={1}>批次号</Radio>
                                <Radio value={2}>快递单号</Radio>
                                <Radio value={3}>采购单号</Radio>
                                <Radio value={4}>SKU</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                    <div className="content_right">
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
        /**
         * 筛选区域
         */
        const searchTag = (
            <div className="search_tag">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="仓库名称:"
                        >
                            {getFieldDecorator('warehouseCode', {
                                initialValue: [''],
                            })(
                                <CTags
                                    list={wareHouse}
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="优先级:"
                        >
                            {getFieldDecorator('priority', {
                                initialValue: [''],
                            })(
                                <CTags
                                    list={priority}
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="breadcrumb overflow-hidden erp-search">
                <Form layout="horizontal">
                    {typeSearch}
                    {searchTag}
                </Form>
            </div>
        );
    }
}
