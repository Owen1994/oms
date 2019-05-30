import React from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Row,
    Col,
} from 'antd';
import Ctags from '@/components/ctags'
import { IS_ENABLAD, REFRESH_RSLT } from '../constants/index'
import { strTrim } from '@/util/baseTool';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
};

export default class Search extends React.Component {
    state = {
        isSearch: false,
    };
    //筛选搜索切换
    showSearch = (event) => {
        if (event.target.value === 'select') {
            this.setState({
                isSearch: false,
            });
        } else {
            this.setState({ isSearch: true });
        }
    };
    //重置
    resetFields = () => {
        this.props.form.resetFields();
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this.props;
        const defaultSearch = (
            <div className="authorization-defaultSearch">
                <FormItem
                    {...formItemLayout}
                    label="授权状态"
                >
                    {getFieldDecorator('isEnabled', {
                        initialValue: [0]
                    })(
                        <Ctags
                            list={IS_ENABLAD}
                            handleChange={()=>handleSubmit()}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Token状态"
                >
                    {getFieldDecorator('refreshRslt', {
                        initialValue: [0]
                    })(
                        <Ctags
                            list={REFRESH_RSLT}
                            handleChange={()=>handleSubmit()}
                        />
                    )}
                </FormItem>
            </div>
        );
        const searchTab = (
            <div className="authorization-searchTab pull-right">
                <RadioGroup
                    defaultValue="select"
                    onChange={this.showSearch}
                >
                    <RadioButton value="select">筛选</RadioButton>
                    <RadioButton value="search">搜索</RadioButton>
                </RadioGroup>
            </div>
        );
        const textSearch = this.state.isSearch ? (
            <div className="authorization-textSearch">
                    <FormItem
                        {...formItemLayout}
                        label="销售账号"
                    >
                        {getFieldDecorator('sellerId')(
                            <Input style={{ width: 330 }} />
                        )}
                    </FormItem>
            </div>
        ) : null;
        const searchBtn = this.state.isSearch ? (
            <Row>
                <Col offset={3}>
                <div className="authorization-searchBtn">
                    <Button type="primary" onClick={() => handleSubmit()}>搜索</Button>
                    <Button onClick={this.resetFields}>重置</Button>
                </div>
                </Col>
            </Row>
        ) : null;
        return (
            <div className="authorization-search breadcrumb">
                <Form>
                    {searchTab}
                    {defaultSearch}
                    {textSearch}
                    {searchBtn}
                </Form>
            </div>
        )
    }
}