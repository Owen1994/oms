import React from 'react'
import {
    Form,
    Input,
    Button,
    Row,
    Col,
} from 'antd';
import * as API from '../../../common/constants/Api'
const FormItem = Form.Item;
const SearchButton = Input.Search;

import CSelect from '../../../../components/cselect';

export default class Search extends React.Component {
    state = {
        disabled: true,
    };

    list = [{id: 'ebay', name: 'ebay'}]

    // 站点选择
    handleSiteChange = (value) => {
        this.setState({
            disabled: false,
         });
    };

    // 重置
    resetFields = () => {
        this.props.form.resetFields();
        this.setState({disabled: true})
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this.props;

        const searchView = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="平台"
                        >
                            {getFieldDecorator('yksPlatformCode')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    list={this.list}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="站点"
                        >
                            {getFieldDecorator('yksSiteCode')(
                                <CSelect
                                    url={API.GET_YKS_SITE}
                                    code="yksSiteCode"
                                    name="yksSiteName"
                                    params={{
                                        yksPlatformCode: 'ebay',
                                        pageData: 20,
                                        pageNumber: 1,
                                    }}
                                    placeholder={'请选择'}
                                    onChange={this.handleSiteChange}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="销售账号"
                        >
                            {getFieldDecorator('sellerIdArr')(
                                <CSelect
                                    url={API.GET_EBAY_ACCOUNT}
                                    code="id"
                                    name="id"
                                    params={{
                                        searchColumn: 'searchContent',
                                    }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    mode="multiple"
                                    maxCount={10}
                                    disabled={this.state.disabled}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="规则名称"
                            className="content_right"
                        >
                            {getFieldDecorator('ruleName')(
                                <SearchButton
                                    enterButton="搜索"
                                    allowClear
                                    onSearch={() => handleSubmit()}
                                />
                            )}
                            <Button
                                type="default"
                                onClick={this.resetFields}
                            >
                                重置
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="erp-search">
                <Form>
                    {searchView}
                </Form>
            </div>
        )
    }
}
