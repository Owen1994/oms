import React from 'react';
import {
    Form,
    Col,
    Row,
    Radio,
    Button,
    Input,
} from 'antd';
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
                                        <Radio value={1}>人员名称</Radio>
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
