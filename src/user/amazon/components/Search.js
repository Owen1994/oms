import React from 'react';
import {
    Form,
    Radio,
    Button,
    Row,
    Col,
} from 'antd';
import CTags from '@/components/ctags';
import { Authorization_Type } from '../constants/index';
import { Review_Get_Account_Api } from '../constants/Api';
import CSelect from '@/components/cselect';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

export default class Search extends React.Component {
    state = {
        // 是否显示搜索
        showSearch: false,
    };

    /**
     * 切换搜索与筛选
     */
    switchSearchTab = (e) => {
        const showSearch = e.target.value === 'search';
        this.setState({
            showSearch,
            showHighSearch: false,
        });
    };

    /**
     * 全局搜索
     * @param event
     */
    onSubmit = () => {
        this.props.onSearch();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { showSearch } = this.state;

        // 切换筛选-搜索tab
        const tab = (
            <div className="search-tab">
                <RadioGroup
                    defaultValue={showSearch ? 'search' : 'screen'}
                    onChange={this.switchSearchTab}
                >
                    <RadioButton value="screen">筛选</RadioButton>
                    <RadioButton value="search">搜索</RadioButton>
                </RadioGroup>
            </div>
        );

        // 筛选区域
        const screenItem = (
            <div className="search-top">
                <FormItem
                    {...formItemLayout}
                    label="授权状态:"
                >
                    {getFieldDecorator('authorizeState', {
                        initialValue: [-1],
                    })(
                        <CTags
                            handleChange={this.onSubmit}
                            list={Authorization_Type}
                        />,
                    )}
                </FormItem>
            </div>
        );

        // 搜索区域
        const searchItem = (
            <div className="search-bottom">
                <FormItem
                    {...formItemLayout}
                    label="销售账号:"
                >
                    {
                        getFieldDecorator('sellerAccount', {
                            rules: [{ required: false, message: '销售账号不能为空' }],
                        })(
                            <CSelect
                                code='key'
                                name='label'
                                mode='multiple'
                                maxCount={10}
                                url={Review_Get_Account_Api}
                                apiListType={2}
                                params={{data: {searchColumn: 'name', pageNumber: 1, pageData: 20}}}
                            />
                        )
                    }
                </FormItem>
            </div>
        );

        /**
         * 搜索按钮
         */
        const searchButton = (
            <Row type="flex" align="middle">
                <Col span={2} />
                <Col>
                    <div className="btn-search">
                        <Button type="primary" onClick={this.onSubmit}>
                            搜索
                        </Button>
                        <Button onClick={() => {this.props.form.resetFields();}}>
                            重置
                        </Button>
                    </div>
                </Col>
            </Row>
        );

        return (
            <div className="amazon-authorization-search">
                <Form layout="horizontal">
                    {tab}
                    {screenItem}
                    {showSearch ? searchItem : null}
                    {showSearch ? searchButton : null}
                </Form>
            </div>
        );
    }
}
