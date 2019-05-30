import React from 'react';
import {
    Form, Input, Row, Col,
} from 'antd';
import { GET_ALL_PERMISSION_WAREHOUSE } from '../../../common/constants/Api';
import CSelect from '../../../../components/cselect';
import { stockType } from '../constants/Search';

const SearchInput = Input.Search;
const FormItem = Form.Item;
const initialState = [{ code: '', name: '全部' }];
export default class Search extends React.Component {
    state = {
        //     /**
        //      * 是否显示搜索
        //      */
        //     showSearch: true,
    };

    // componentDidMount() {
    //     getCommonData(GET_ALL_PERMISSION_WAREHOUSE, ((list) => {
    //         this.setState((state) => {
    //             list.forEach(item => state.wareHouse.push(item));
    //             return state;
    //         });
    //     }));
    // }


    /**
     * 全局搜索
     * @param event
     */
    onSubmit = () => {
        this.props.onSearchListener();
    };

    /**
     * 重置表单
     */
    reset = () => {
        this.props.form.resetFields();
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        // const { showSearch } = this.state;

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
                                    url={GET_ALL_PERMISSION_WAREHOUSE}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="库存类型:"
                        >
                            {getFieldDecorator('stockType', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={stockType}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="SKU:"
                        >
                            {getFieldDecorator('searchContent', {
                                rules: [{
                                    required: false,
                                    message: '请输入',
                                }],
                            })(
                                <SearchInput
                                    placeholder="请输入内容"
                                    enterButton="搜索"
                                    onSearch={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );

        // /**
        //  * 搜索区域
        //  */
        // const searchItem = (
        //     <div className="border-top-1">
        //         <FormItem
        //             {...formItemLayout}
        //             label="搜索类型:"
        //         >
        //             {
        //                 getFieldDecorator('searchType', {
        //                     initialValue: '1',
        //                 })(
        //                     <RadioGroup size="small">
        //                         <RadioButton value="1">SKU</RadioButton>
        //                         {/* <RadioButton value="2">中文名称</RadioButton> */}
        //                     </RadioGroup>,
        //                 )
        //             }
        //         </FormItem>
        //         <FormItem
        //             {...formItemLayout}
        //             label="搜索内容:"
        //         >
        //             <Row gutter={12}>
        //                 <Col span={12}>
        //                     {getFieldDecorator('searchContent')(
        //                         <Input placeholder="请输入内容" />,
        //                     )}
        //                 </Col>
        //                 <Col>
        //                     <Button
        //                         onClick={this.onSubmit}
        //                         type="primary"
        //                     >
        //                         搜索
        //                     </Button>
        //                     <Button
        //                         className="margin-ss-left"
        //                         onClick={this.reset}
        //                     >
        //                         重置
        //                     </Button>
        //                 </Col>
        //             </Row>
        //         </FormItem>
        //     </div>
        // );
        // /**
        //  * 筛选区域
        //  */
        // const screenItem = (
        //     <div>
        //         <FormItem
        //             {...formItemLayout}
        //             label="仓库名称:"
        //         >
        //             {getFieldDecorator('warehouseCode', {
        //                 initialValue: [''],
        //             })(
        //                 <CTags
        //                     list={this.state.wareHouse}
        //                     handleChange={this.onSubmit}
        //                 />,
        //             )}
        //         </FormItem>
        //         <FormItem
        //             {...formItemLayout}
        //             label="库存类型:"
        //         >
        //             {getFieldDecorator('stockType', {
        //                 initialValue: [''],
        //             })(
        //                 <CTags
        //                     list={stockType}
        //                     handleChange={this.onSubmit}
        //                 />,
        //             )}
        //         </FormItem>
        //     </div>
        // );

        return (
            <div className="wms-search breadcrumb erp-search">
                {searchSelect}
            </div>
        );
    }
}
