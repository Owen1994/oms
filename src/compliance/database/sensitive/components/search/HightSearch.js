import React, { Component } from 'react';
import { Form, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow';
import { getPlatform, getCountry, getTrademark } from '../../../../data';

class HightSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            platform: [],   // 销售平台
            country: [],    // 国家
            trademark: []
        };
    }

    componentDidMount() {
        getPlatform().then((result) => {
            this.setState({ platform: result })
        });
        getCountry().then((result) => {
            this.setState({ country: result })
        });
        getTrademark().then((result) => {
            this.setState({ trademark: result })
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { platform, country, trademark } = this.state;
        return (
            <div className="height-search">
                {/* <StandardFormRow title="禁售平台：">
                    <FormItem>
                        {getFieldDecorator('salePlatform')(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                allowClear
                                showSearch
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    platform.map((item, index) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
                 */}
                <StandardFormRow title="注册国家：">
                    <FormItem>
                        {getFieldDecorator('country')(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                allowClear
                                showSearch
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    country.map((item, index) => (
                                        <Option key={index} value={item.key}>{item.value}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
                <StandardFormRow title="商标商品分类：">
                    <FormItem>
                        {getFieldDecorator('trademarkType')(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                allowClear
                                showSearch
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    trademark.map((item, index) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
            </div>
        );
    }
}

export default HightSearch;