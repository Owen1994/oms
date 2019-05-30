import React from 'react';
import { Form, Cascader, Input } from 'antd';
import Screen from './Screen';
import BtnSearch from '../../../../components/BtnSearch';

const FormItem = Form.Item;

class Search extends React.Component {
    render() {
        const { tagList } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 10 },
        };
        const btn = [
            {
                name: '搜索',
                type: 'primary',
                htmlType: 'submit',
                onClick: null,
            }, {
                name: '重置',
                type: null,
                htmlType: null,
                onClick: this.props.onReset,
            },
        ];
        return (
            <div className="breadcrumb padding-sm-top padding-sm-bottom overflow-hidden position-relative">
                <Form onSubmit={this.props.onSubmit}>
                    <Screen {...this.props} />
                    <FormItem
                        {...formItemLayout}
                        label="模板名称"
                    >
                        {getFieldDecorator('tempName')(
                            <Input placeholder="请输入模板名称" />,
                        )}
                    </FormItem>
                    <div style={{ position: 'relative' }}>
                        <FormItem
                            {...formItemLayout}
                            label="模板分类"
                            className="select-temp-class"
                        >
                            {getFieldDecorator('tempClassId')(
                                <Cascader
                                    fieldNames={{ label: 'title', value: 'key' }}
                                    options={tagList}
                                    placeholder="请选择模板分类"
                                />,
                            )}
                        </FormItem>
                        <BtnSearch btn={btn} />
                    </div>
                    {/* <FormItem>
                        {getFieldDecorator('platformId', {
                            initialValue: item ? tempDetail.tempClass.key : platformId.toString(),
                        })(
                            <Input type="hidden" />,
                        )}
                    </FormItem> */}
                </Form>
            </div>
        );
    }
}
export default Form.create()(Search);
