import React from 'react';
import {
    Form,
    Row,
    Col,
    Input,
} from 'antd';
import {
    GET_PLACE_TYPE, GET_ALL_PERMISSION_WAREHOUSE,
} from '../../../../common/constants/Api';
import CSelect from '../../../../../components/cselect';


const SearchInput = Input.Search;
const FormItem = Form.Item;
const initialState = [{ code: '', name: '全部' }];
export default class Search extends React.Component {
    // state = {
    //     isSearch: false,
    //     warehouse: [initialState], // 仓库名称列表
    //     storageType: [initialState], // 储位类型列表
    // };

    // componentDidMount() {
    //     // 从公共接口请求数据
    //     this.getData(GET_ALL_PERMISSION_WAREHOUSE, 'warehouse', {});
    //     this.getData(GET_PLACE_TYPE, 'storageType', {});
    // }

    // // 请求函数封装
    // getData = (url, stateName, params) => {
    //     fetchPost(url, params, 2)
    //         .then((result) => {
    //             if (result.state === '000001') {
    //                 const data = result.data.list;
    //                 if (data && data.length > 0) {
    //                     data.map((v) => {
    //                         this.setState((prevState) => {
    //                             const dataList = prevState[stateName];
    //                             dataList.push(v);
    //                             return {
    //                                 [stateName]: dataList,
    //                             };
    //                         });
    //                         return true;
    //                     });
    //                 }
    //             }
    //         });
    // };

    // // 筛选搜索切换
    // showSearch = (event) => {
    //     if (event.target.value === 'select') {
    //         this.setState({
    //             isSearch: false,
    //         });
    //     } else {
    //         this.setState({ isSearch: true });
    //     }
    // };
    //
    // // 重置
    // resetFields = () => {
    //     this.props.form.resetFields();
    // };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this.props;
        // const {
        //     warehouse,
        //     storageType,
        // } = this.state;
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
        //         <FormItem
        //             {...formItemLayout}
        //             label="储位类型"
        //         >
        //             {getFieldDecorator('storageType', {
        //                 initialValue: [''],
        //             })(
        //                 <Ctags
        //                     list={storageType}
        //                     handleChange={() => handleSubmit()}
        //                 />,
        //             )}
        //         </FormItem>
        //     </div>
        // );
        // // 筛选搜索按钮模块
        // const searchTab = (
        //     <div className="wms-searchTab pull-right">
        //         <RadioGroup
        //             defaultValue="select"
        //             onChange={this.showSearch}
        //         >
        //             <RadioButton value="select">筛选</RadioButton>
        //             <RadioButton value="search">搜索</RadioButton>
        //         </RadioGroup>
        //     </div>
        // );
        // // 搜索模块
        // const heightSearch = this.state.isSearch ? (
        //     <div className="wms-newHeightSearch">
        //         <FormItem
        //             {...formItemLayout}
        //             label="货架编号"
        //         >
        //             {getFieldDecorator('goodShelvesNumber')(
        //                 // <CSelect
        //                 //     code="code" // 列表编码字段
        //                 //     name="name" // 列表名称字段
        //                 //     url={GET_GOOD_SHELVES_NUMBER}
        //                 //     // params={{ data: { searchColumn: 'name' } }} // 搜索参数
        //                 //     placeholder="请选择货架编码"
        //                 // // apiListType={2}// 数组取值名称 0 默认data -> list  1 data -> data 2 data
        //                 // // 其它字段同 Select组件配置
        //                 // />,
        //                 <Input
        //                     type="text"
        //                     style={{ width: 330 }}
        //                     placeholder="请输入货架编号"
        //                 />,
        //             )}
        //         </FormItem>
        //     </div>
        // ) : null;
        // // 搜索按钮模块
        // const searchBtn = this.state.isSearch ? (
        //     <Row>
        //         <Col offset={3}>
        //             <div className="wms-searchBtn">
        //                 <Button type="primary" onClick={() => handleSubmit()}>搜索</Button>
        //                 <Button onClick={this.resetFields}>重置</Button>
        //             </div>
        //         </Col>
        //     </Row>
        // ) : null;
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
                            label="储位类型:"
                        >
                            {getFieldDecorator('storageType', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    url={GET_PLACE_TYPE}
                                    placeholder="请选择"
                                    handleChange={() => handleSubmit()}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="货架编号:"
                        >
                            {getFieldDecorator('goodShelvesNumber', {
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
        return (
            <div className="wms-search erp-search">
                {searchSelect}
                {/* <Form> */}
                {/* {searchTab} */}
                {/* {defaultSearch} */}
                {/* {heightSearch} */}
                {/* {searchBtn} */}
                {/* </Form> */}
            </div>
        );
    }
}
