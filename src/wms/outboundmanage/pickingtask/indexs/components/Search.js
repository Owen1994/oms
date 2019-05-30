import React from 'react';
import {
    Form, Input, Button, Radio, Row, Col,
} from 'antd';
import { taskPriority } from '../constants/search';
import '../../../../common/css/index.css';
import { GET_ALL_PERMISSION_WAREHOUSE, PICK_TYPE } from '../../../../common/constants/Api';
import CSelect from '../../../../../components/cselect';

const RadioGroup = Radio.Group;
const SearchInput = Input.Search;
const FormItem = Form.Item;
const initialState = [{ code: '', name: '全部' }];
export default class Search extends React.Component {
    /**
     * 搜索
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
        const searchSelect = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="仓库:"
                        >
                            {getFieldDecorator('warehouseCode', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    placeholder="请选择"
                                    url={GET_ALL_PERMISSION_WAREHOUSE}
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="拣货类型:"
                        >
                            {getFieldDecorator('orderType', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={initialState}
                                    code="code" // 列表编码字段
                                    name="name" // 列表名称字段
                                    placeholder="请选择"
                                    url={PICK_TYPE}
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="任务优先级:"
                        >
                            {getFieldDecorator('taskPriority', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={taskPriority}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
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
                                <Radio value={1}>波次单号</Radio>
                                <Radio value={2}>拣货员</Radio>
                                <Radio value={3}>容器</Radio>
                            </RadioGroup>,
                        )}
                    </FormItem>
                    <div>
                        {getFieldDecorator('searchContent', {
                            initialValue: '',
                            rules: [{
                                required: false,
                                message: '请输入',
                            }],
                        })(
                            <SearchInput
                                placeholder="请输入内容"
                                enterButton="搜索"
                                style={{ width: 280 }}
                                onSearch={this.onSubmit}
                            />,
                        )}
                        <Button type="default" onClick={this.reset}>
                            重置
                        </Button>
                    </div>
                </Row>
            </div>
        );
        // const searchTags = (
        //     <div className="search_tag">
        //         <Row type="flex" align="middle">
        //             <Col span={8}>
        //                 <FormItem
        //                     label="仓库:"
        //                 >
        //                     {getFieldDecorator('warehouseCode', {
        //                         initialValue: '',
        //                     })(
        //                         <CTags
        //                             list={this.state.wareHouse}
        //                             handleChange={this.onSubmit}
        //                         />,
        //                     )}
        //                 </FormItem>
        //             </Col>
        //             <Col span={8}>
        //                 <FormItem
        //                     label="任务优先级:"
        //                 >
        //                     {getFieldDecorator('taskPriority', {
        //                         initialValue: '',
        //                     })(
        //                         <CTags
        //                             list={taskPriority}
        //                             handleChange={this.onSubmit}
        //                         />,
        //                     )}
        //                 </FormItem>
        //             </Col>
        //         </Row>
        //     </div>
        // );
        return (
            <div className="wms-search breadcrumb overflow-hidden erp-search">
                <Form layout="horizontal">
                    {searchSelect}
                    {typeSearch}
                </Form>
            </div>
        );
    }
}
