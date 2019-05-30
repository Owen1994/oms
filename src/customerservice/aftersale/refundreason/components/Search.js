import React from 'react';
import { Form, Input, Button } from 'antd';
// import BtnSearch from '../../../../components/BtnSearch';

const FormItem = Form.Item;

class Search extends React.Component {
    onSubmit = (e) => {
        e.preventDefault();
        this.props.refundReasonFetch();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { refundReasonLoading } = this.props;
        return (
            <div className="refund-search padding-sm-top breadcrumb position-relative">
                <Form layout="inline" onSubmit={this.onSubmit}>
                    <div className="refund-category-input list-filter-item">
                        <div className="list-filter-item-title">分类名称：</div>
                        <FormItem>
                            {getFieldDecorator('category')(
                                <Input placeholder="请输入分类名称" />,
                            )}
                        </FormItem>
                    </div>
                    <FormItem>
                        {getFieldDecorator('group', {
                            initialValue: '1',
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem>
                    <div className='refund-search-submit'>
                        <Button loading={refundReasonLoading} type='primary' htmlType='submit'>搜索</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
export default Form.create()(Search);
