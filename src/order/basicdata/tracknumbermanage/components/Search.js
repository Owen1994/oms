import React from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    Row,
    Col,
} from 'antd';
import { IS_USED, SOURCE_TYPE } from '../constants/index';
import CSelect from '@/components/cselect';
import Ctags from '@/components/ctags';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Search = Input.Search;

export default class SearchComponent extends React.Component {

    render() {
        const { getFieldDecorator, resetFields } = this.props.form;
        const { handleSubmit, toggleModal } = this.props;
        const selectSearch =  (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="使用平台"
                        >
                            {getFieldDecorator('usePlatform')(
                                <CSelect
                                    code='id'
                                    name='name'
                                    url="/oms/order/manage/motan/ICompanyOrderManageApi/getPlatform"
                                    params={{
                                        data: {
                                            searchColumn: 'name',
                                            pageData: 20,
                                            pageNumber: 1
                                        }
                                    }}
                                    apiListType={2}
                                    placeholder={'请选择'}
                                    localSearch={1}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="创建时间"
                        >
                            {getFieldDecorator('createDate')(
                                <RangePicker/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="使用时间"
                        >
                            {getFieldDecorator('useDate')(
                                <RangePicker/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="上网时间"
                        >
                            {getFieldDecorator('onlineDate')(
                                <RangePicker/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        ) ;

        const typeSearch = (
            <div className="search_content">
                <FormItem label="搜索内容">
                    {getFieldDecorator('searchType', {
                        initialValue: 1,
                    })(
                        <RadioGroup size="small">
                            <Radio value={1}>目的国</Radio>
                            <Radio value={2}>跟踪号</Radio>
                            <Radio value={3}>运输方式</Radio>
                            <Radio value={4}>老ERP订单号</Radio>
                            <Radio value={5}>平台订单号</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContent')(

                        <Search
                            placeholder="双击可批量查询"
                            enterButton="搜索"
                            onDoubleClick={toggleModal}
                            onSearch={() => handleSubmit()}
                            allowClear
                        />
                    )}
                    <Button type="default" onClick={() => resetFields()}>
                        重置
                    </Button>
                </div>
            </div>
        );

        const ctageSearch = (
            <div className="search_tag">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="是否使用"
                        >
                            {getFieldDecorator('isUsed', {
                                initialValue: [-1]
                            })(
                                <Ctags
                                    list={IS_USED}
                                    handleChange={() => handleSubmit()}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="来源方式"
                        >
                            {getFieldDecorator('sourceType', {
                                initialValue: [-1]
                            })(
                                <Ctags
                                    list={SOURCE_TYPE}
                                    handleChange={() => handleSubmit()}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="erp-search">
                <Form>
                    {selectSearch}
                    {typeSearch}
                    {ctageSearch}
                </Form>
            </div>
        )
    }
}
