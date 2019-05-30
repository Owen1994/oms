import React, { Component } from 'react'; // 在文件头部从 react 的包当中引入了 React 和 React.js 的组件父类 Component。写 React.js 组件，必须引入这两个东西。
import { render } from 'react-dom'; // ReactDOM 可以帮助我们把 React 组件渲染到页面上去
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Button,
    Select,
    Row,
    Col,
    Radio,
    DatePicker,
} from 'antd';
import Tablelist from './Tablelist';
import { isAdminArray, isActiveArray } from '../constants/index';
import Ctags from '../../../components/ctags';
import axios from '../../../util/axios';
import * as config from '../../../util/connectConfig';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;


const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Condition extends Component {
    constructor(props) {
        super(props);
    }

    formItemLayout2 = {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
    }

    formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    }

    state = {

    }

    /**
     *作者: 唐勇
     *功能描述: 重置按钮功能
     *参数说明:
     *时间: 2018/4/3 19:00
     */
    handleReset = () => {
        this
            .props
            .form
            .resetFields();
    }

    /**
     *作者: 唐勇
     *功能描述: 角色管理搜索提交
     *参数说明:
     *时间: 2018/7/3 14：00
     */
    handleSubmit = (e, pageNumber = 1, pageData = 20) => {
        const or = typeof e === 'object';
        or && e.preventDefault();

        const value = this.props.form.getFieldsValue();

        value.isActive = value.isActive[0];
        value.isAdmin = value.isAdmin[0];

        for (const k in value) {
            const data = value[k];
            if (data === undefined || data === '' || /^\s$/.test(data)) {
                delete value[k];
            }
        }

        if (!value.searchContent) {
            delete value.searchType;
        }

        value.pageData = pageData;
        value.pageNumber = pageNumber;

        axios
            .post(`${config.api_url}/urc/motan/service/api/IUrcService/getRolesByInfo`, value)
            .then((response) => {
                if (response.status == 200) {
                    this.props.Paginationmodelaction({ total: response.data.data.total, current: pageNumber });
                    this.props.roletableaction({ data: response.data.data.lst, value });
                }
            });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="roletop">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <Row>
                            <FormItem
                                label="是否管理员"
                                {...this.formItemLayout2}
                                className="ant-xs-row"
                            >
                                {getFieldDecorator('isAdmin', {
                                    initialValue: [''],
                                })(<Ctags
                                    list={isAdminArray}
                                    handleChange={this.handleChange} // 选择监听变化
                                />)}

                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem
                                label="状态"
                                {...this.formItemLayout2}
                                className="ant-xs-row"
                            >
                                {getFieldDecorator('isActive', {
                                    initialValue: [''],
                                })(<Ctags
                                    list={isActiveArray}
                                    handleChange={this.handleChange} // 选择监听变化
                                />)}
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem
                                label="搜索类型"
                                {...this.formItemLayout2}
                                className="ant-xs-row"
                            >
                                {getFieldDecorator('searchType', {
                                    initialValue: 0,
                                })(
                                    <RadioGroup size="small" onChange={this.handleSearchRadioChange}>
                                        <RadioButton value={0}>角色名称</RadioButton>
                                        <RadioButton value={1}>创建人</RadioButton>
                                        <RadioButton value={2}>角色Owner</RadioButton>
                                    </RadioGroup>,
                                )}
                            </FormItem>
                        </Row>
                        <Row className="mt5">
                            <Col span={8}>
                                <FormItem
                                    label="搜索内容"
                                    {...this.formItemLayout}
                                    className="ant-xs-row"
                                >
                                    {getFieldDecorator('searchContent')(
                                        <TextArea rows={3} placeholder="支持多个搜索条件换行模糊搜索" />,
                                    )}

                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <div className="typebtn">
                                    <FormItem>
                                        <Button type="primary" htmlType="submit">
                                            搜索
                                        </Button>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="default" onClick={this.handleReset}>
                                            重置
                                        </Button>
                                    </FormItem>
                                </div>
                            </Col>


                        </Row>
                    </Form>
                </div>

                <div className="rolemanagetable">
                    <Tablelist {...this.props} handleSubmit={this.handleSubmit} />
                </div>
            </div>
        );
    }
}

export default Condition;
