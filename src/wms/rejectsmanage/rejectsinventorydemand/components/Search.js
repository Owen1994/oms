import React from 'react';
import {
    Form,
    Input,
    Row,
    Col,
} from 'antd';
import {
    GET_ALL_PERMISSION_WAREHOUSE,
} from '../../../common/constants/Api';
import CSelect from '../../../../components/cselect';


const SearchInput = Input.Search;
const FormItem = Form.Item;
const initialState = [{ code: '', name: '全部' }];
// // const TextArea = Input.TextArea;
// const formItemLayout = {
//     labelCol: { span: 3 },
//     wrapperCol: { span: 16 },
// };
export default class Search extends React.Component {
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
                                    url={GET_ALL_PERMISSION_WAREHOUSE}
                                    placeholder="请选择"
                                    handleChange={() => handleSubmit()}
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
                                    onSearch={() => handleSubmit()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
        // // 筛选模块
        // const defaultSearch = (
        //     <div className="wms-defaultSearch">
        //         <FormItem
        //             {...formItemLayout}
        //             label="仓库名称"
        //         >
        //             {getFieldDecorator('warehouseCode', {
        //                 initialValue: [''],
        //             })(
        //                 <Ctags
        //                     list={warehouse}
        //                     handleChange={() => handleSubmit()}
        //                 />,
        //             )}
        //         </FormItem>
        //     </div>
        // );
        // // 搜索模块
        // const textSearch = (
        //     <div className="wms-textSearch">
        //         <FormItem
        //             {...formItemLayout}
        //             label="搜索类型"
        //         >
        //             {getFieldDecorator('searchType', {
        //                 initialValue: 1,
        //             })(
        //                 <RadioGroup size="small">
        //                     <RadioButton value={1}>SKU</RadioButton>
        //                     {/* <RadioButton value={2}>中文名称</RadioButton> */}
        //                 </RadioGroup>,
        //             )}
        //         </FormItem>
        //         <FormItem
        //             {...formItemLayout}
        //             label="搜索内容"
        //         >
        //             {getFieldDecorator('searchContent')(
        //                 // <TextArea
        //                 //     style={{ width: 330 }}
        //                 //     autosize={{ minRows: 2, maxRows: 6 }}
        //                 //     // placeholder="支持多个搜索条件换行精确搜索"
        //                 // />,
        //                 <Input
        //                     style={{ width: 330 }}
        //                     placeholder="请输入搜索内容"
        //                 />,
        //             )}
        //         </FormItem>
        //     </div>
        // );
        // // 搜索按钮模块
        // const searchBtn = ( // this.state.isSearch ?
        //     <Row>
        //         <Col offset={3}>
        //             <div className="wms-searchBtn">
        //                 <Button type="primary" onClick={() => handleSubmit()}>搜索</Button>
        //                 <Button onClick={this.resetFields}>重置</Button>
        //             </div>
        //         </Col>
        //     </Row>
        // ); // : null;
        return (
            <div className="wms-search breadcrumb erp-search">
                {searchSelect}
            </div>
        );
    }
}
