import React from 'react';
import { Input, Form, Radio, Button } from 'antd';
import { status } from '../constants';
import BtnSearch from '../../../common/components/BtnSearch'
import StandardFormRow from '../../../../components/StandardFormRow';
import RadioTags from '../../../common/components/radiotags'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false
        }
    }

    // 筛选、搜索切换
    onChangeSearch = (event) => {
        if (event.target.value === 'select') {
            this.setState({ isSearch: false });
        } else {
            this.setState({ isSearch: true });
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 21 },
            }
        };
        const { listFetch } = this.props;
        const { getFieldDecorator } = this.props.form;
        const defaultSearch = (
            <div className="npd-depot-defaultSearch">
                <StandardFormRow title="状态">
                    <FormItem>
                        <RadioTags
                            getFieldDecorator={getFieldDecorator}
                            onChange={() => listFetch()}
                            list={status}
                            name='state'
                        />
                    </FormItem>
                </StandardFormRow>
            </div>
        );
        const textSearch = this.state.isSearch ? (
            <div className="npd-depot-textSearch">
                <StandardFormRow title="仓库名称">
                    <FormItem>
                        {getFieldDecorator('name')(
                            <Input placeholder="请输入仓库名称" style={{ width: 306 }} />
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        ) : null;
        const btnSearch = this.state.isSearch ? (
            <div className="npd-depot-btnSearch">
                <Button type="primary" onClick={()=>listFetch()}>搜索</Button>
                <Button onClick={this.props.onReset}>重置</Button>
            </div>
        ) : null;
        const tabSearch = (
            <div className="npd-depot-tabSearch">
                    <RadioGroup
                        defaultValue="select"
                        onChange={this.onChangeSearch}
                    >
                        <RadioButton value="select">筛选</RadioButton>
                        <RadioButton value="search">搜索</RadioButton>
                    </RadioGroup>
                </div>
        )
        return (
            <div className="search breadcrumb padding-sm overflow-hidden npd-depot-search-area">
                {tabSearch}
                <Form layout="inline">
                    {defaultSearch}
                    {textSearch}
                    {btnSearch}
                </Form>
            </div>
        )
    }
}