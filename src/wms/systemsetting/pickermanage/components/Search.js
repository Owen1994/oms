import React from 'react';
import {
    Form, Input, Row, Col,
} from 'antd';
import '../../../common/css/index.css';
import CSelect from '../../../../components/cselect';
import { GET_WAREHOUSE } from '../../../common/constants/Api';
import PICKING_GROUP from '../constants/Search';

const FormItem = Form.Item;
const Search = Input.Search;
const initialState = [{ code: '', name: '全部' }];
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
                            {getFieldDecorator('warehouseCode', {
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
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="拣货组"
                        >
                            {getFieldDecorator('pickingGroup', {
                                initialValue: '',
                            })(
                                <CSelect
                                    list={PICKING_GROUP}
                                    placeholder="请选择仓库名称"
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="姓名"
                        >
                            {getFieldDecorator('name')(
                                <Search
                                    placeholder="请输入"
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
            <div className="wms-search breadcrumb erp-search">
                {searchSelect}
            </div>
        );
    }
}
