/**
 * 作者: pzt
 * 描述: 速卖通条件查询组件
 * 时间: 2018/4/18 20:23
 **/
import React, { Component } from 'react'
import Ctags from '../../../../components/ctags'
import { handleStatus, taskTypeStatus, fileTypeStatus } from '../constants/index'

import {
    Form,
    Input,
    Button,
    Row,
    Col,
    DatePicker,
    Radio,
} from 'antd'
import CSelect from '../../../../components/cselect';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;

class Condition extends Component {

    getList = () => {
        const { getParams, getList } = this.props;
        const value = getParams();
        value.pageNumber = 1;
        getList(value)
    };


    reset = ()=>{
        this.props.form.resetFields()
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const searchView = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="任务类型"
                        >
                            {getFieldDecorator('fileType')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    list={fileTypeStatus}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="任务模块"
                        >
                            {getFieldDecorator('taskType')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    list={taskTypeStatus}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="创建时间">
                            {getFieldDecorator('createTime')(
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    placeholder={['开始日期', '结束日期']}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        const typeSearch = (
            <div className="search_content">
                <FormItem label="搜索内容">
                    {getFieldDecorator('searchType', {
                        initialValue: 0,
                    })(
                        <RadioGroup
                            size="small"
                            onChange={this.handleSearchRadioChange}
                        >
                            <Radio value={0}>文件名称</Radio>
                            <Radio value={1}>创建人</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContent')(
                        <Search
                            placeholder="请输入搜索条件"
                            enterButton="搜索"
                            onSearch={this.getList}
                        />
                    )}
                    <Button
                        type="default"
                        onClick={this.reset}
                    >
                        重置
                    </Button>
                </div>
            </div>
        );

        const ctageSearch = (
            <div className="search_tag">
                <FormItem
                    label="处理状态"
                >
                    {getFieldDecorator('status', {
                        initialValue: [0]
                    })(
                        <Ctags
                            list={handleStatus}
                            handleChange={this.getList}
                        />
                    )}
                </FormItem>
            </div>
        );

        return (
            <div className="erp-search">
                <Form>
                    {searchView}
                    {typeSearch}
                    {ctageSearch}
                </Form>
            </div>
        );
    }
}

export default Form.create()(Condition)
