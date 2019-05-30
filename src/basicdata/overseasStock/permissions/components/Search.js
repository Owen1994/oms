import React from 'react';
import {
    Form,
    Col,
    Row,
    Radio,
    Button,
    Input,
} from 'antd';
import CSelect from '../../../../components/cselect';
import WAREHOUSETYPE from '../constants';
import OrderCommonSearchModal from '../../../../components/SearchModal/SearchModal';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;


/**
 * @author huangjianfeng
 * @description 搜索
 */
export default class SearchComponent extends React.Component {
    state = {
        visible: false,
    }

    toggleModal = () => {
        this.setState({
            visible: true,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible } = this.state;
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem label="仓库">
                            {getFieldDecorator('warehouseType')(
                                <CSelect
                                    list={WAREHOUSETYPE} // 默认值列
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                    apiListType={0}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder="请选择"
                                    // handleChange={this.handleChange} // 触发下拉事件
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const typeSearch = (
            <div className="typeSearch">
                <Row type="flex" align="middle">
                    <Col span={24}>
                        <div className="typeSearch-l">
                            <FormItem label="搜索类型">
                                {getFieldDecorator('searchType', {
                                    initialValue: 1,
                                })(
                                    <RadioGroup size="small">
                                        <Radio value={1}>SKU</Radio>
                                    </RadioGroup>,
                                )}
                            </FormItem>
                            <div>
                                {getFieldDecorator('searchContent', {
                                    rules: [{
                                        required: false,
                                        message: '请输入',
                                    }],
                                })(
                                    <Input
                                        placeholder="双击可批量查询"
                                        size="large"
                                        style={{ width: 280 }}
                                        onDoubleClick={this.toggleModal}
                                    />,
                                )}
                                <Button type="primary" onClick={() => this.props.onSearch()}>
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
            <div className="breadcrumb">
                <Form>
                    <div className="select-type">
                        {selectSearch}
                        {typeSearch}
                    </div>
                    <OrderCommonSearchModal
                        {...this.props}
                        visible={visible}
                        onCancel={() => this.setState({
                            visible: false,
                        })}
                        searchContent="searchContent"
                    />
                </Form>
            </div>
        );
    }
}
