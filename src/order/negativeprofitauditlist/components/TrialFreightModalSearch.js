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
    InputNumber,
} from 'antd';
import Ctags from '../../../components/ctags'
import CSelect from '../../../components/cselect'
import { fetchPost } from 'util/fetch';
import { 
    GET_PACKAGE_WAREHOUSE_DELIVER,
    GET_PLATFORM,
    QUERY_COUNTRL_DATA
} from '../constants'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Search = Input.Search;
const RangePicker = DatePicker.RangePicker;


export default class SearchComponent extends React.Component {

    state = {
        whether: true    // 包裹单号是否必填
    }

    handleSku = () => {
        this.setState(prevState => ({
            whether: !prevState.whether
        }));
        this.props.form.resetFields();
    }

    onReset = () => {
        this.props.form.resetFields();
        this.setState({
            whether: true
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { whether } = this.state;
        const selectSearch = (
            <div className="selectSearch">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                                label="发货仓库"
                            >
                                {getFieldDecorator('warehouseCode', {
                                    rules: [{
                                        required: !whether,
                                        message: '请选择发货仓库',
                                    }],
                                })(
                                    <CSelect
                                        // list={[]}// 默认值列表
                                        code='id' // 列表编码字段
                                        name='name' // 列表名称字段
                                        url={GET_PACKAGE_WAREHOUSE_DELIVER}
                                        // mode='multiple' // 是否多选
                                        // maxCount={3} // 最多选择项数量
                                        // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                        params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                        apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                        placeholder={'请选择'}
                                        disabled ={whether}
                                    />
                                )}
                            </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="包裹单号"
                        >
                            {getFieldDecorator('packageCode',{
                                rules: [{
                                    required: whether,
                                    message: '请填写包裹单号',
                                }],
                            })(
                                <Input 
                                    placeholder={'请选择'}
                                    disabled ={!whether}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="销售平台"
                        >
                            {getFieldDecorator('platformName',{
                                rules: [{
                                    required: !whether,
                                    message: '请选择销售平台',
                                }],
                            })(
                                <CSelect
                                    // list={[]}// 默认值列表
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url={GET_PLATFORM}
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    disabled ={whether}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="国家全称"
                        >
                            {getFieldDecorator('countryCode', {
                                rules: [{
                                    required: !whether,
                                    message: '请选择国家全称',
                                }],
                            })(
                                <CSelect
                                    // list={[]}// 默认值列表
                                    code='id' // 列表编码字段
                                    name='name' // 列表名称字段
                                    url={QUERY_COUNTRL_DATA}
                                    // mode='multiple' // 是否多选
                                    // maxCount={3} // 最多选择项数量
                                    // formType={1}  // 表单数据类型，不填就是默认值，填1返回对象
                                    params={{ searchColumn: 'name', pageData: 20, pageNumber: 1 }} // 搜索参数
                                    apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
                                    placeholder={'请选择'}
                                    disabled ={whether}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" align="middle">
                    <Col span={8} >
                        <FormItem
                                label="sku重量"
                            >
                            {getFieldDecorator('skuWeight', {
                                rules: [{
                                    required: !whether,
                                    message: '请填写sku重量',
                                }],
                            })(
                               <InputNumber
                                    min={0} 
                                    placeholder={'请选择'}
                                    disabled ={whether}
                                    style={{width: 270}}
                               />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} style={{display: "flex", position: 'relative'}} className="skuWeight">
                        <FormItem
                                label="sku"
                            >
                            {getFieldDecorator('skuCode', {
                                rules: [{
                                    required: !whether,
                                    message: '请填写sku',
                                }],
                            })(
                                <Input 
                                   placeholder={'请选择'}
                                   disabled ={whether}
                                />
                            )}
                        </FormItem>
                        <div className="trial-freight">
                            <Button type="primary" onClick={() => this.props.onSearch()}>
                                搜索
                            </Button>
                            <Button type="default" onClick={() => this.onReset()}>
                                重置
                            </Button>
                            <span onClick={this.handleSku} className="sku">根据sku查询</span>
                            </div>
                    </Col>
                </Row>    
            </div>
        );

       

        return (
            <div >
                <Form>
                    <div className="select-type">
                        {selectSearch}
                    </div>
                </Form>
            </div>
        )
    }
}
