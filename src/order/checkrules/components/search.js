import React from 'react'
import {
    Form,
    Input,
    Button,
    Radio,
    Row,
    Col,
} from 'antd';
import Ctags from '../../../components/ctags';
import { IS_ENABLAD } from '../constants/index';
import * as API from '../constants/api';
import { fetchPost } from '../../../util/fetch';
import { strTrim } from '../../../util/baseTool';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
};
var platformList = [];

export default class Search extends React.Component {
    state = {
        isHeightSearch: false,
        isSearch: false,
    };
    //高级搜索
    showHeightSearch = () => {
        this.setState({ isHeightSearch: !this.state.isHeightSearch });
    };
    //筛选搜索切换
    showSearch = (event) => {
        if (event.target.value === 'select') {
            this.setState({
                isSearch: false,
                isHeightSearch: false,
            });
        } else {
            this.setState({ isSearch: true });
        }
    };
    //重置
    resetFields = () => {
        this.props.form.resetFields();
    };
    componentDidMount() {
        fetchPost(API.GET_PLATFORM, {}, 2)
            .then(result => {
                platformList.push({ 'code': 0, 'name': '全部' });
                if (result.state === '000001') {
                    result.data.map(it => {
                        platformList.push({ 'code': it.id, 'name': it.name });
                    })
                }
            })
    }
    componentWillUnmount() {
        platformList = [];
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this.props;
        const defaultSearch = (
            <div className="checkrules-defaultSearch">
                <FormItem
                    {...formItemLayout}
                    label="平台"
                >
                    {getFieldDecorator('platformId', {
                        initialValue: [0]
                    })(
                        <Ctags
                            list={platformList}
                            handleChange={() => handleSubmit()}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="规则状态"
                >
                    {getFieldDecorator('isEnabled', {
                        initialValue: [0]
                    })(
                        <Ctags
                            list={IS_ENABLAD}
                            handleChange={() => handleSubmit()}
                        />
                    )}
                </FormItem>
            </div>
        );
        const searchTab = (
            <div className="checkrules-searchTab pull-right">
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
            <div className="checkrules-textSearch">
                <FormItem
                    {...formItemLayout}
                    label="规则名称"
                >
                    {getFieldDecorator('ruleName')(
                        <Input style={{ width: 330 }} />
                    )}
                </FormItem>
            </div>
        ) : null;
        const searchBtn = this.state.isSearch ? (
            <Row>
                <Col offset={3}>
                    <div className="checkrules-searchBtn">
                        <Button type="primary" onClick={() => handleSubmit()}>搜索</Button>
                        <Button onClick={this.resetFields}>重置</Button>
                    </div>
                </Col>
            </Row>
        ) : null;
        return (
            <div className="checkrules-search">
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