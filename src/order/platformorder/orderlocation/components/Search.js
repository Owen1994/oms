import React from 'react';
import CSelect from '@/components/cselect';
import {
    Form,
    Input,
    Row,
    Col,
    Button,
    message,
} from 'antd';
import { fetchPost } from 'util/fetch';

const FormItem = Form.Item;
const Search = Input.Search;

export default class SearchComponent extends React.Component {

    state = {
        dicSaleAccount: [],
    }

    componentDidMount() {
        this.handleDefaultSaleAccount();
    }

    // 初始化平台
    handleDefaultSaleAccount = () => {
        const data = {searchColumn: 'name', pageData: 50, pageNumber: 1 };
        fetchPost('/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform', data, 2)
            .then(result => {
                if (result.state === '000001') {
                    this.setState({ dicSaleAccount: result.data });
                }
            })
    };

    // 搜索
    handleSearch = () => {
        const values = this.props.form.getFieldsValue();
        if(!values.orderNumbers){
            message.warning('请输入平台单号');
            return;
        }
        values.orderNumbers = values.orderNumbers ? values.orderNumbers.split(',') : [];
        this.props.queryData({ data: values });
    }

    // 重置
    handleReset = () => {
        this.props.recoverAllColor();
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { dicSaleAccount } = this.state;
        return(
            <div className="prderlocation-search search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="销售平台"
                        >
                            {getFieldDecorator('platformCode', {
                                initialValue: dicSaleAccount ? (dicSaleAccount.length > 0 ? dicSaleAccount[0].id : undefined) : undefined,
                            })(
                                <CSelect
                                    code='id'
                                    name='name'
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    localSearch={1}
                                    list={dicSaleAccount}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="平台单号"
                            className="content_right"
                        >
                            {getFieldDecorator('orderNumbers')(
                                <Search
                                    placeholder="请输入平台单号"
                                    enterButton="搜索"
                                    onSearch={() => this.handleSearch()}
                                />
                            )}
                            <Button
                                type="default"
                                onClick={this.handleReset}
                            >
                                重置
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
} 