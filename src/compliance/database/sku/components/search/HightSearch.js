import React, { Component } from 'react';
import { Form, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;
import { debounce } from '../../../../../util/baseTool'
import StandardFormRow from '../../../../../common/components/advancedSearchModel/StandardFormRow';
import { getPlatform, getSite, getCountry } from '../../../../data';

class HightSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            platform: [],   // 销售平台
            site: [],
            country: [],
            siteStatus: true,
            selectedSite: []
        };
    }

    componentDidMount() {
        getPlatform().then((result) => {
            this.setState({ platform: result })
        });
    }

    changePlatformToSite = (value) => {
        this.searchSite(null,value)
    }

    searchSite = debounce((value, platformId) => {
        let params = {
            // pageNumber: 1,
            // pageData: 30,
            platformId: platformId.toString() || this.props.form.getFieldValue("platform").toString()
        }
        if (value) {
            params.searchContent = value;
        }
        getSite(params).then((result) => {
            this.setState({ site: result })
        });
    }, 500)

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const platformValue = getFieldValue('platform')
        const { platform, site, country } = this.state;
        return (
            <div className="height-search">
                <StandardFormRow title="平台：">
                    <FormItem>
                        {getFieldDecorator('platform')(
                            <Select
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                allowClear
                                showSearch
                                onChange={this.changePlatformToSite}
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
                <StandardFormRow title="站点：">
                    <FormItem>
                        {getFieldDecorator('site')(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择"
                                allowClear
                                showSearch
                                onSearch={this.searchSite}
                                disabled={!platformValue}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    site.map((item, index) => (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    </FormItem>
                </StandardFormRow>
                {
                    //     <StandardFormRow title="注册国家：">
                    //     <FormItem>
                    //         {getFieldDecorator('country')(
                    //             <Select
                    //                 mode="multiple"
                    //                 style={{ width: '100%' }}
                    //                 placeholder="请选择"
                    //                 allowClear
                    //                 showSearch
                    //                 filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    //             >
                    //                 {
                    //                     country.map((item, index) => (
                    //                         <Option key={index} value={item.key}>{item.value}</Option>
                    //                     ))
                    //                 }
                    //             </Select>
                    //         )}
                    //     </FormItem>
                    // </StandardFormRow>
                }
            </div>
        );
    }
}

export default HightSearch;