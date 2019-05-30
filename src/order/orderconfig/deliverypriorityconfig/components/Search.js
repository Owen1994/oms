import React from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
} from 'antd';
import Ctags from '@/components/ctags';
import {
    RULE_STATE,
} from '../constants'
import { GET_PLATFORM_LIST } from '../constants/Api';
import { fetchPost } from 'util/fetch';
const FormItem = Form.Item;
const Search = Input.Search;

export default class SearchComponent extends React.Component {

    state = {
        platformList: [{ 'code': '', 'name': '全部' }],
    }

    componentDidMount(){
        // 获取平台列表
        fetchPost(GET_PLATFORM_LIST, {}, 2)
            .then(result => {
                if(result.state === '000001') {
                    result.data.map(it => {
                        this.setState(prevState => {
                            return {platformList: [...prevState.platformList, {'code': it.id, 'name': it.name}]}
                        });
                    })
                }
            })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { onSearch } = this.props;
        const { platformList } = this.state;

        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <FormItem
                            label="规则名称"
                        >
                            {getFieldDecorator('ruleName')(
                                    <Search
                                        enterButton="搜索"
                                        // style={{ width: 280 }}
                                        onSearch={() => onSearch()}
                                        allowClear
                                    />
                                )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const ctageSearch = (
            <div className="ctageSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="规则状态"
                        >
                            {getFieldDecorator('isEnabled', {
                                initialValue: ['']
                            })(
                                <Ctags
                                    list={RULE_STATE}
                                    handleChange={() => onSearch()}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={16}>
                        <FormItem
                            label="平台"
                        >
                            {getFieldDecorator('platformCode', {
                                initialValue: ['']
                            })(
                                <Ctags
                                    list={platformList}
                                    handleChange={() => onSearch()}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="breadcrumb">
                <Form>
                    <div className="select-type">
                        {selectSearch}
                    </div>
                    {ctageSearch}
                </Form>
            </div>
        )
    }
}
