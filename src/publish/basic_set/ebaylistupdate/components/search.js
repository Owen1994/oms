import React from 'react'
import StandardFormRow from '../../../../components/StandardFormRow';
import ItemSelect from '../../../../common/components/itemSelect'
import {
    Form,
    Input,
    Button,
    message,
    Select,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { GET_YKS_PLATFORM, GET_YKS_SITE, GET_YKS_SELLERID, GET_EBAY_ACCOUNT } from '../../../common/constants/Api'

export default class Search extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        platformCode: '',
        siteCode: '',
        disabled: true,
    }
    //平台改变事件
    handlePlatformChange = (value) => {
        this.setState({ platformCode: value });
    }
    //站点改变事件
    handleSiteChange = (value) => {
        this.setState({
            siteCode: value,
            disabled: false,
         });
    }
    //重置
    resetFields = () => {
        this.props.form.resetFields();
        this.setState({disabled: true})
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { resetFields, handleSubmit } = this.props;
        const { platformCode, siteCode } = this.state;
        const params = { 'yksPlatformCode': 'ebay','pageData': 20, 'pageNumber': 1 };
        if (siteCode) {
            params.yksSiteCode = siteCode;
        }
        return (
            <div className="update-search">
                <div className="update-heightSearch">
                    <StandardFormRow title="平台">
                        <FormItem>
                            {getFieldDecorator('yksPlatformCode')(
                                <Select
                                    style={{ width: 260 }}
                                    placeholder="请选择"
                                    onChange={this.handlePlatformChange}
                                    style={{width:'344px'}}
                                >
                                    <Option value="ebay">ebay</Option>
                                </Select>
                            )}

                        </FormItem>
                    </StandardFormRow>
                    <StandardFormRow title="站点">
                        <FormItem>
                            <div style={{width: '344px'}}>
                            <ItemSelect
                                getFieldDecorator={getFieldDecorator}
                                formName='yksSiteCode'
                                url={GET_YKS_SITE}
                                code="yksSiteCode"
                                name="yksSiteName"
                                // searchColumn="yksSiteCode"
                                params={{ 'yksPlatformCode': 'ebay', 'pageData': 20, 'pageNumber': 1 }}
                                onChange={this.handleSiteChange}
                            />
                            </div>
                        </FormItem>
                    </StandardFormRow>
                    <StandardFormRow title="销售账号">
                        <FormItem>
                            <div style={{width: '344px'}}>
                            <ItemSelect
                                getFieldDecorator={getFieldDecorator}
                                formName='sellerIdArr'
                                url={GET_EBAY_ACCOUNT}
                                code="id"
                                name="id"
                                // searchColumn="sellerIdArr"
                                // params={params}
                                searchColumn='searchContent'
                                mode="multiple"
                                maxCount={10}
                                disabled={this.state.disabled}
                                apiListType={2}
                            />
                            </div>
                        </FormItem>
                    </StandardFormRow>
                </div>
                <div className="update-searchBtn">
                    <Button type="primary" onClick={()=>handleSubmit()}>搜索</Button>
                    <Button onClick={this.resetFields}>重置</Button>
                </div>
            </div>
        )
    }
}