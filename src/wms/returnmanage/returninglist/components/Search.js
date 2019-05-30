import React from 'react';
import {
    Form, Input, Button, Radio, Row, Col,
} from 'antd';
import CTags from '../../../../components/ctags';
import '../../../common/css/index.css';
import { returnCategory } from '../constants/search';
import { getCommonData } from '../../../common/action';
import { GET_WAREHOUSE } from '../../../common/constants/Api';

const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
const FormItem = Form.Item;
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
        getCommonData(GET_WAREHOUSE, ((list) => {
            this.setState((state) => {
                state.wareHouse = state.wareHouse.concat(list);
                return state;
            });
        }));
    }

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
                    <FormItem
                        label="搜索类型"
                    >
                        {getFieldDecorator('searchType', {
                            initialValue: 1,
                        })(
                            <RadioGroup size="small">
                                <Radio value={1}>退货批次号</Radio>
                                <Radio value={2}>运单号</Radio>
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
        const searchTags = (
            <Row type="flex" className="padding-sm">
                <Col span={8}>
                    <FormItem
                        label="仓库名称:"
                    >
                        {getFieldDecorator('warehouseCode', {
                            initialValue: [''],
                        })(
                            <CTags
                                list={this.state.wareHouse}
                                handleChange={this.onSubmit}
                            />,
                        )}
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        label="退货类别:"
                    >
                        {getFieldDecorator('returnCategory', {
                            initialValue: '',
                        })(
                            <CTags
                                list={returnCategory}
                                handleChange={this.onSubmit}
                            />,
                        )}
                    </FormItem>
                </Col>
            </Row>
        );
        return (
            <div className="wms-search breadcrumb overflow-hidden ">
                <Form layout="horizontal">
                    {typeSearch}
                    {searchTags}
                </Form>
            </div>
        );
    }
}
