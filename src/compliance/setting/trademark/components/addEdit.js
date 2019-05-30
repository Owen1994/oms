import React, { Component } from 'react';
import { Form, Icon, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {getProductClass, getTradeDetail} from '../../../data';
import BaseClass from './BaseClass';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},     // 详情
        };
    };

    componentDidMount() {
        // 获取商标商品分类详情
        getTradeDetail({
            id: this.props.id
        }).then((result) => {
            this.setState({ detail: result })
        });
    }

    // 增加基础资料分类
    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        let uuid = keys[keys.length-1];
        uuid++;
        const nextKeys = keys.concat(uuid);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { detail } = this.state;
        if(JSON.stringify(detail) === '{}'){
            return false
        }
        // 布局
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 18, offset: 0 },
                sm: { span: 18, offset: 6 },
            },
        };

        // 循环基础资料分类
        var initialValue = detail.oneClass.length !== 0 ? [] : [0];
        for(var key in detail.oneClass){
            initialValue.push(parseInt(key));
        }
        getFieldDecorator('keys', { initialValue: initialValue });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <BaseClass
                    {...this.props}
                    k={k}
                    index={index}
                    detail={detail}
                    keys={keys}
                    key={index}
                />
            );
        });
        return (
            <Form  className="sensitive-setting-detail" style={{position: 'relative', top: '-10px'}}>
                <FormItem
                    { ...formItemLayout }
                    label="商标商品分类"
                >
                    {detail.trademarkCode}-{detail.trademarkName}
                </FormItem>
                { formItems }
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: 330 }}>
                        <Icon type="plus" /> 新增分类
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(Detail);