/**
 * 作者: pzt
 * 描述: 速卖通条件查询组件
 * 时间: 2018/4/18 20:23
 **/
import React from 'react'
import moment from 'moment';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    Row,
    Col,
    Select
} from 'antd';
import {
    GET_EBAY_SITE,
    SEARCH_SHOPEE_ACCOUNT,
} from '../constants/Api'
import Ctags from '@/components/ctags'
import CSelect from '@/components/cselect';
import { authState } from '../constants/index'
import { shopeeSiteList } from '../constants/Api'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
export default class SearchComponent extends React.Component {
    state = {
    };
    //重置
    resetFields = () => {
        this.props.form.resetFields();
    };

    handleSubmit = ()=>{
        const {getList,getParams } = this.props;
        let params = getParams();
        params.pageNumber = 1;
        getList(params)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this;
        const selectSearch = (
                <Row className="selectSearch" type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="站点"
                        >
                            {getFieldDecorator('site')(
                                <CSelect
                                    code='key' // 列表编码字段
                                    name='key' // 列表名称字段
                                    url={shopeeSiteList}
                                    params={{ data: { searchColumn: 'name', pageData: 30, pageNumber: 1 } }} // 搜索参数
                                    apiListType={3}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="状态"
                        >
                            {getFieldDecorator('state')(
                                <Select 
                                    style={{width:286}}
                                    placeholder="请选择"
                                >
                                    {
                                        authState.map(v=>{
                                            return <Option value={v.code} key={v.code}>{v.name}</Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
        );

        const typeSearch = (
            <div className="typeSearch bt1px">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索类型">
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                        <Radio value={1}>销售账号</Radio>
                                        <Radio value={2}>Shop_id</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            <div>
                                {getFieldDecorator('searchContent', {
                                    rules: [{
                                        required: false,
                                        message: `请输入`
                                    }],
                                })(
                                    <Input
                                        placeholder="双击可批量查询"
                                        enterButton="搜索"
                                        size="large"
                                        style={{ width: 280 }}
                                        onDoubleClick={this.props.toggleModal}
                                    />
                                )}
                                <Button type="primary" onClick={handleSubmit}>
                                        搜索
                                </Button>
                                <Button type="default" onClick={this.props.onReset}>
                                    重置
                                </Button>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );
        return (
            <div className="select-type bgcfff">
                {selectSearch}
                {typeSearch}
            </div>
        )
    }
}