import React from 'react';
import {
    Form, Input, Row, Col, Select,
} from 'antd';
import '../../../common/css/index.css';
import CSelect from '../../../../components/cselect';
import {
    GET_WAREHOUSE,
} from '../../../common/constants/Api';

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const initialState = [{ code: '', name: '全部' }];
export default class SearchComponent extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this.props;

        return (
            <div className="wms-search breadcrumb overflow-hidden padding-sm ">
                <Form>
                    <Row type="flex" align="middle">
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="仓库名称"
                            >
                                {getFieldDecorator('warehouseCode', {
                                    initialValue: '',
                                })(
                                    <CSelect
                                        list={initialState}
                                        code="code" // 列表编码字段
                                        name="name" // 列表名称字段
                                        url={GET_WAREHOUSE}
                                        params={{ searchColumn: 'name' }} // 搜索参数
                                        placeholder="请选择"
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="容器类型"
                            >
                                {getFieldDecorator('containerType', {
                                    initialValue: '',
                                })(
                                    <Select>
                                        <Option value="">全部</Option>
                                        <Option value="10">普通容器</Option>
                                        <Option value="20">小框</Option>
                                        <Option value="30">多品多件大容器</Option>
                                        <Option value="40">移动播种墙</Option>
                                        <Option value="50">多品多件</Option>
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="容器状态"
                            >
                                {getFieldDecorator('containerStatus', {
                                    initialValue: '',
                                })(
                                    <Select>
                                        <Option value="">全部</Option>
                                        <Option value="10">待使用</Option>
                                        <Option value="20">使用中</Option>
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="容器编号"
                            >
                                {getFieldDecorator('containerNumber')(
                                    <Search
                                        placeholder="请输入"
                                        enterButton="搜索"
                                        onSearch={() => handleSubmit()}
                                        allowClear
                                    />,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
