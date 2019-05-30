import React from 'react';
import {
    Form,
    // Button,
    Input,
    Row,
    Col,
} from 'antd';
import CSelect from '../../../../../components/cselect';
import {
    GET_WAREHOUSE,
} from '../../../../common/constants/Api';

const FormItem = Form.Item;
const initialState = [{ code: '', name: '全部' }];
const Search = Input.Search;
export default class SearchComponent extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const { handleSubmit } = this.props;
        const searchSelect = (
            <div className="search_select">
                <Row type="flex" align="middle">
                    <Col span={8}>
                        <FormItem
                            label="仓库名称"
                        >
                            {
                                getFieldDecorator('warehouseCode', {
                                    initialValue: '',
                                })(
                                    <CSelect
                                        list={initialState}
                                        code="code" // 列表编码字段
                                        name="name" // 列表名称字段
                                        url={GET_WAREHOUSE}
                                        params={{ searchColumn: 'name' }} // 搜索参数
                                        placeholder="请选择"
                                    />,
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="SKU"
                        >
                            {getFieldDecorator('sku')(
                                <Search
                                    placeholder="请输入内容"
                                    enterButton="搜索"
                                    onSearch={() => handleSubmit()}
                                    allowClear
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
            </div>
        );
    }
}
