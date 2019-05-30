import React from 'react';
import { Form, Button, Input } from 'antd';
import CTags from '../../../../components/ctags';
import { STATE } from '../constants';
import {
    SUPPLIER_SEARCH,
    CHANNEL_SEARCH,
} from '../constants/Api';

const FormItem = Form.Item;
const SearchButton = Input.Search;

export default class Search extends React.Component {

    handleReset = () => {
        this.props.form.resetFields();
    };

    onSubmit = () => {
        this.props.onSearch();
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const searchContent = (
            <div className="search_content">
                <div>
                    {getFieldDecorator('searchType', {
                        initialValue: 1
                    })(
                        <Input
                            type="hidden"
                        />,
                    )}
                </div>
                <div className="content_right">
                    <FormItem
                        label="关键词"
                    >
                        {getFieldDecorator('searchContent')(
                            <SearchButton
                                placeholder="支持模糊搜索"
                                enterButton="搜索"
                                onSearch={this.onSubmit}
                            />
                        )}

                        <Button
                            type="default"
                            onClick={this.handleReset}
                        >
                            重置
                        </Button>
                    </FormItem>
                </div>
            </div>
        );

        const searchTag = (
            <div className="search_tag">
                <FormItem
                    label="轨迹状态"
                >
                    {getFieldDecorator('trajectoryState', {
                        initialValue: [0],
                    })(
                        <CTags
                            list={STATE}
                            handleChange={this.onSubmit}
                        />,
                    )}
                </FormItem>
            </div>
        );


        return (
            <div className="erp-search">
                <Form>
                    {searchContent}
                    {searchTag}
                </Form>
            </div>
        );
    }
}
