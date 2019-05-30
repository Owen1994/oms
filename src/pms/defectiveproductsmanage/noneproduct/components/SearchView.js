import React from 'react';
import {
    Form, Radio, Button, Input, Row, Col
} from 'antd';
import {
    Defective_Prdouct_State_List,
} from '../constants/index';
import CSelect from '../../../../components/cselect';
import { getLoginmsg } from '../../../../util/baseTool';
import { Get_Warehouse_List_Api } from '../constants/Api';
import { CONSIGNEE } from '../constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 },
};

/**
 * 头部搜索组件
 */
export default class SearchView extends React.Component {

    state = {
        consigneeVisible: false
    };

    list = [{ key: getLoginmsg().userName, label: getLoginmsg().personName }];

    WarehouseList = [{ key: 0, label: '全部' }];

    handleConsignee = (value) => {
        if (value[0].name === "其他") {
            this.setState({
                consigneeVisible: true
            })
        } else {
            this.setState({
                consigneeVisible: false
            })
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { consigneeVisible } = this.state;
        const searchView = (
            <div>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="处理状态"
                        >
                            {getFieldDecorator('state', {
                                initialValue: 0,
                            })(
                                <CSelect
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    list={Defective_Prdouct_State_List}
                                    placeholder="请选择"
                                />,
                            )}
                        </FormItem>
                    </Col>

                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="仓库"
                        >
                            {getFieldDecorator('warehouse', {
                                initialValue: 0,
                            })(
                                <CSelect
                                    code='key' // 列表编码字段
                                    name='label' // 列表名称字段
                                    url={Get_Warehouse_List_Api}
                                    list={this.WarehouseList}
                                    apiListType={0}
                                    placeholder={'请选择'}
                                    isNotCache
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <div className="clear" style={{ width: "570px"}}>
                            <div className="g-fl">
                                <FormItem
                                    {...formItemLayout}
                                    label="收货人"
                                >
                                    {getFieldDecorator('consignee', {
                                        initialValue: 0,
                                    })(
                                        <CSelect
                                            code="code" // 列表编码字段
                                            name="name" // 列表名称字段
                                            list={CONSIGNEE}
                                            formType={1}
                                            placeholder="请选择"
                                            onChange={this.handleConsignee}
                                        />,
                                    )}
                                </FormItem>
                            </div>
                            <div className="g-rt" style={{ width: "200px" }}>
                                {
                                    consigneeVisible ? <FormItem
                                        {...formItemLayout}
                                        label=""
                                    >
                                        {getFieldDecorator('consigneeContents', {
                                        })(
                                            <Input style={{ width: 100 }} />
                                            )}
                                    </FormItem> : ''
                                }
                            </div>
                        </div>
                    </Col>

                    <Col span={24}>
                        <div className="typeSearch">
                            <div className="typeSearch-l">
                                <FormItem
                                    label="搜索类型"
                                >
                                    {getFieldDecorator('searchType', {
                                        initialValue: 1,
                                    })(
                                        <RadioGroup size="small">
                                            <Radio value={1}>异常编码</Radio>
                                            <Radio value={2}>处理人</Radio>
                                            <Radio value={3}>物流单号</Radio>
                                        </RadioGroup>
                                        )}
                                </FormItem>
                                <div className="typeSearch-r">
                                    {
                                        getFieldDecorator('searchContents', {})(
                                            <Input
                                                placeholder="双击可批量查询"
                                                size="large"
                                                style={{ width: 270 }}
                                                onDoubleClick={() => this.props.showModal()}
                                            />,
                                        )
                                    }

                                    <Button
                                        type="primary"
                                        onClick={() => this.props.onSearch(1, 20)}
                                    >
                                        搜索
                                    </Button>
                                    <Button
                                        type="default"
                                        onClick={() => this.props.resetFields(
                                            this.setState({
                                                consigneeVisible: false
                                            })
                                        )}
                                    >
                                        重置
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>
        );

        return (
            <div className="select-type white">
                <Form layout="horizontal">
                    {searchView}
                </Form>
            </div>
        );


    }
}
