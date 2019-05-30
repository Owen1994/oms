import React from 'react';
import {
    Form, Row, Col, DatePicker, Button,
} from 'antd';
import moment from 'moment';
import '../../../../common/css/index.css';
import CSelect from '../../../../../components/cselect';
import {
    GET_ALL_PERMISSION_WAREHOUSE,
} from '../../../../common/constants/Api';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
// const initialState = [{ code: '', name: '全部' }];
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
                            label="仓库名称:"
                        >
                            {getFieldDecorator('warehouse', {
                                // initialValue: '',
                            })(
                                <CSelect
                                    // list={initialState}
                                    // code="code" // 列表编码字段
                                    // name="name" // 列表名称字段
                                    url={GET_ALL_PERMISSION_WAREHOUSE}
                                    placeholder="请选择"
                                    handleChange={this.onSubmit}
                                />,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            label="收货时间:"
                            className="content_right"
                        >
                            {getFieldDecorator('rangeTime', {
                                initialValue: [moment().startOf('day'), moment().endOf('day')],
                            })(
                                <RangePicker />,
                            )}
                            <Button type="primary" className="margin-ss-left" onClick={this.onSubmit}>
                                查询
                            </Button>
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
