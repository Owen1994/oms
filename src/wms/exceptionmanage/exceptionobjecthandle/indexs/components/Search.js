import React from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Row,
    Col,
} from 'antd';
import {
    GET_SPECIAL_STATE_LIST,
    GET_SPECIAL_TYPE_LIST,
    GET_TREATMENT_PLAN_LIST, GET_MAIN_PERMISSION_WAREHOUSE,
} from '../../../../common/constants/Api';
import CSelect from '../../../../../components/cselect';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
const initialState = [{ code: '', name: '全部' }];
export default class Search extends React.Component {
    // state = {
    //     errorTypeCode: '', // 当前异常类型
    // };

    // 重置
    resetFields = () => {
        this.props.form.resetFields();
        // this.setState({
        //     errorTypeCode: '',
        // });
    };

    // // 异常类型改变时，显示处理方案筛选项并重新请求处理方案数据
    // handleErrorTypeChange = (value) => {
    //     this.setState({
    //         errorTypeCode: value,
    //     });
    // };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this.props;
        const searchSelect = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="仓库名称:"
                        >
                            {getFieldDecorator('warehouseCode', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={GET_MAIN_PERMISSION_WAREHOUSE}
                                    placeholder="请选择"
                                    handleChange={() => handleSubmit()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="异常状态:"
                        >
                            {getFieldDecorator('errorState', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={GET_SPECIAL_STATE_LIST}
                                    placeholder="请选择"
                                    handleChange={() => handleSubmit()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="异常类型:"
                        >
                            {getFieldDecorator('errorType', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={GET_SPECIAL_TYPE_LIST}
                                    placeholder="请选择"
                                    onChange={this.handleErrorTypeChange}
                                    handleChange={() => handleSubmit()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="处理方案:"
                        >
                            {getFieldDecorator('treatmentPlan', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    params={{ errorTypeCode: this.props.form.getFieldValue('errorType') }}
                                    url={GET_TREATMENT_PLAN_LIST}
                                    placeholder="请选择"
                                    handleChange={() => handleSubmit()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        const typeSearch = (
            <div className="search_content">
                <Row type="flex" align="middle">
                    <FormItem
                        label="搜索类型"
                    >
                        {getFieldDecorator('searchType', {
                            initialValue: 1,
                        })(
                            <RadioGroup size="small">
                                <Radio value={1}>异常编码</Radio>
                                <Radio value={2}>SKU</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                    <div className="ant-form-item-control">
                        {getFieldDecorator('searchContent', {
                            rules: [{
                                required: false,
                                message: '请输入',
                            }],
                        })(
                            <SearchInput
                                placeholder="请输入内容"
                                enterButton="搜索"
                                style={{ width: 280 }}
                                onSearch={() => handleSubmit()}
                            />,
                        )}
                        <Button type="default" onClick={this.reset}>
                            重置
                        </Button>
                    </div>
                </Row>
            </div>
        );

        return (
            <div className="wms-search erp-search">
                {searchSelect}
                {typeSearch}
            </div>
        );
    }
}
