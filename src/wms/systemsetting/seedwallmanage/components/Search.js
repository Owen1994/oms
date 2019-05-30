import React from 'react';
import {
    Form, Row, Col, Select, Button,
} from 'antd';
import '../../../common/css/index.css';
import CSelect from '../../../../components/cselect';
import {
    GET_WAREHOUSE,
} from '../../../common/constants/Api';

const FormItem = Form.Item;
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
                                        handleChange={this.handleChange}
                                    />,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="播种车类型"
                            >
                                {getFieldDecorator('seedTruckType', {
                                    initialValue: '',
                                })(
                                    <Select>
                                        <Option value="">全部</Option>
                                        <Option value="10">移动播种车</Option>
                                        <Option value="20">固定播种车</Option>
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <Button type="primary" onClick={() => handleSubmit()}>搜索</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
