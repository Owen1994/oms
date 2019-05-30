import React from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    Row,
    Col,
    Select,
} from 'antd';
import CSelect from '@/components/cselect';
import {levelOptions} from '@/util/options';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const Search = Input.Search;

export default class SearchComponent extends React.Component {

    render() {
        const { getFieldDecorator, resetFields } = this.props.form;
        const { handleSubmit } = this.props;
        const selectSearch =  (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="渠道名称"
                        >
                            {getFieldDecorator('channelName')(
                                <CSelect
                                    code='name'
                                    name='name'
                                    url="/oms/order/manage/motan/IPackageApi/getLogisticsChannel"
                                    params={{searchColumn: 'likeName', pageData: 20, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}
                                    placeholder={'请选择'}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="渠道状态"
                        >
                            {getFieldDecorator('channelIsAvailable')(
                                <Select placeholder="请选择渠道状态">
                                    {levelOptions('渠道状态').map(item => {
                                        return (
                                            <Option key={item.value} value={item.value}>
                                                {item.label}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="渠道分组"
                        >
                            {getFieldDecorator('channelGroup')(
                                <Select placeholder="请选择渠道分组">
                                    {levelOptions('渠道分组').map(item => {
                                        return (
                                            <Option key={item.value} value={item.value}>
                                                {item.label}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="渠道类型"
                        >
                            {getFieldDecorator('channelType')(
                                <Select placeholder="请选择渠道类型">
                                    {levelOptions('渠道类型').map(item => {
                                        return (
                                            <Option key={item.value} value={item.value}>
                                                {item.label}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="是否追踪"
                        >
                            {getFieldDecorator('trackType')(
                                <Select placeholder="请选择是否追踪">
                                    {levelOptions('是否追踪').map(item => {
                                        return (
                                            <Option key={item.value} value={item.value}>
                                                {item.label}
                                            </Option>
                                        )
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        ) ;

        const typeSearch = (
            <div className="search_content">
                <FormItem label="搜索类型">
                    {getFieldDecorator('searchType', {
                        initialValue: 'channelNumber',
                    })(
                        <RadioGroup size="small">
                            <Radio value={'channelNumber'}>渠道编号</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <div className="content_right">
                    {getFieldDecorator('searchContent')(
                        <Search
                            placeholder="请输入精确内容"
                            enterButton="搜索"
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

        return (
            <div className="erp-search margin-sm-bottom">
                <Form>
                    {selectSearch}
                    {typeSearch}
                </Form>
            </div>
        )
    }
}
