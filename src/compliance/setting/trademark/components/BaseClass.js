import React, { Component } from 'react';
import { Form, Icon, Select, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {getProductClass} from '../../../data';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oneClass: [],   // 一级公司产品分类
            twoClass: [],   // 二级公司产品分类
            parentId: null,    // 获取基础资料分类父级ID
        }
    }

    componentDidMount() {
        const { k, detail } = this.props;
        if(!detail.oneClass[k]){
            this.setState({
                parentId: null
            })
        }else{
            this.setState({
                parentId: detail.oneClass[k].key
            })
        }

    }

    // 删除基础资料分类
    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    // 获取一级分类
    onFocusOneClass = () => {
        getProductClass({
            parentId: 0
        }).then((result) => {
            this.setState({ oneClass: result });
        });
    }

    // 获取一级ID
    onSelectOneClass = (obj) => {
        const {k, detail} = this.props;
        detail.twoClass[k] = [];
        let key = obj.key;
        this.setState({
            parentId: key,
            initialValueTwoClass: [],
        })
        this.props.form.resetFields(`twoClass[${k}]`);
    }


    // 获取二级分类
    onFocusTwoClass = () => {
        const { parentId } = this.state;
        if(!parentId){
            message.warning('请选择一级分类');
            return false;
        }
        getProductClass({
            parentId: parentId
        }).then((result) => {
            this.setState({ twoClass: result })
        });
    }

    render() {
        const { k, index, detail, keys } = this.props;
        const { oneClass, twoClass } = this.state;
        const { getFieldDecorator } = this.props.form;
        const label = index === 0 ? (
            <label className="ant-form-item-required">基础资料分类</label>
        ) : null;
        return (
            <div className="basic-add2">
                <div className="ant-row ant-form-item">
                    <div className="ant-col-6 ant-form-item-label">
                        {label}
                    </div>
                    <div className="ant-col-18 ant-form-item-control-wrapper">
                        <FormItem className="one-class">
                            {getFieldDecorator(`oneClass[${k}]`, {
                                initialValue: detail.oneClass[k],
                                rules: [{
                                    required: true,
                                    message: "请选择一级分类.",
                                }],
                            })(
                                <Select
                                    style={{ width: 120, marginRight: 10 }}
                                    placeholder="一级分类"
                                    labelInValue
                                    onFocus={this.onFocusOneClass}
                                    onSelect={this.onSelectOneClass}
                                >
                                    {
                                        oneClass.map((item, index) => (
                                            <Option key={index} value={item.id}>{item.name}</Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                        <FormItem  className="two-class">
                            {getFieldDecorator(`twoClass[${k}]`, {
                                initialValue: detail.twoClass[k]
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: 200, marginRight: 10 }}
                                    placeholder="二级分类"
                                    labelInValue
                                    onFocus={() => this.onFocusTwoClass(detail.oneClass[k])}
                                >
                                    {
                                        twoClass.map((item, index) => (
                                            <Option key={index} value={item.id}>{item.name}</Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;