import React from 'react';
import { Form, Input, Button } from 'antd';
import BtnSearch from '../../../../components/BtnSearch';
import { GET_ACCOUNT_INFO } from '../constants';
import { fetchPost } from '../../../../util/fetch';
import Functions from '../../../../components/functions';

const FormItem = Form.Item;

class AccountSearch extends React.Component {
    onSubmit = (e) => {
        const { platformId } = this.props;
        e.preventDefault();
        const values = this.props.form.getFieldsValue();
        this.props.handleSetAccountData({ loading: true });
        fetchPost(GET_ACCOUNT_INFO, { ...values, platformId }, 2)
            .then((data) => {
                if (data && data.state === '000001') {
                    this.props.handleSetAccountData({ sellerAccount: values.sellerAccount, accountData: data.data, loading: false });
                } else {
                    this.props.handleSetAccountData({ loading: false });
                }
            });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { accountLoading } = this.props;
        return (
            <div className="account-search padding-sm-top padding-sm-bottom breadcrumb position-relative">
                <Form layout="inline" onSubmit={this.onSubmit}>
                    <div className="list-filter-item account-seller-account">
                        <div className="list-filter-item-title">卖家账号：</div>
                        <FormItem>
                            {getFieldDecorator('sellerAccount')(
                                <Input placeholder="请输入卖家账号" />,
                            )}
                        </FormItem>
                    </div>
                    <div className='account-search-submit'>
                        <Button loading={accountLoading} type='primary' htmlType='submit'>搜索</Button>
                    </div>
                </Form>
                <Functions {...this.props} functionkey="009-000003-000001-015">
                    <Button
                        type="primary"
                        className="complain-export-btn"
                        onClick={() => this.props.handleOperate('exportVisible')}
                    >导出报表
                    </Button>
                </Functions>
            </div>
        );
    }
}
export default Form.create()(AccountSearch);
