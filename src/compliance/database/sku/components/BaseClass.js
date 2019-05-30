import React, { Component } from 'react';
import {getAccount, getPlatform, getSite} from "../../../data";
import { Form, Select, Icon, message } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class App extends Component {
    constructor(props) {
        super(props);
        const { k, data, item } = this.props;
        this.state = {
            platform: [],   // 平台
            site: [],       // 站点
            account: [],    // 账号
            platformId: null, // 平台ID
            siteId: null,     // 站点ID
            display: 'none'
        }
    }

    componentDidMount(){
        const { k, data } = this.props;
        if(JSON.stringify(data) !== '{}'){
            if(!data.platform[k]){
                this.setState({
                    platformId: null,
                    siteId: null
                })
            }else{
                if(!data.site[k]){
                    this.setState({
                        siteId: null,
                    })
                }else{
                    this.setState({
                        siteId: data.site[k].key,
                    })
                }
                this.setState({
                    platformId: data.platform[k].key,
                })
                let platformId = data.platform[k].key
                if(platformId === 22 || platformId === 1 || platformId === 26 || platformId === 8){
                    this.setState({
                        display: 'block'
                    })
                }
            }
        }
    }

    // 删除
    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    // 获取平台
    onFocusPlatForm = () => {
        getPlatform().then((result) => {
            this.setState({
                platform: result,
                siteId: '',
                site: [],
                account: []
            });
        });
    }

    // 获取站点
    onFocusSite = () => {
        getSite({
            pageData: 999,
            pageNumber: 1,
            platformId: this.state.platformId
        }).then((result) => {
            this.setState({
                site: result,
                account: []
            })
        });
    }

    // 获取销售账号
    onFocusAccount = () => {
        const { platformId, siteId } = this.state;
        if(!platformId){
            message.warning('平台不能为空.');
            return false;
        }else{
            getAccount({
                pageData: 999,
                pageNumber: 1,
                paltformSiteID: siteId,
                platformID: platformId,
            }).then((result) => {
                if(result){
                    this.setState({ account: result })
                }else{
                    this.setState({ account: [] })
                }
            });
        }
    }

    // 获取平台ID或者站点ID
    onSelectId = (value, name) => {
        const { k, data } = this.props;
        let key = value.key;
        this.setState({
            [name]: key,
        })
        if(name === 'platformId'){
            if(key === 22 || key === 1 || key === 26 || key === 8){
                this.setState({
                    display: 'block'
                })
            }else{
                this.setState({
                    display: 'none'
                })
            }
            if(JSON.stringify(data) !== '{}'){
                data.site[k] = [];
                data.sellerAccount[k] = [];
            }
            this.props.form.resetFields(`site[${k}]`);
            this.props.form.resetFields(`sellerAccount[${k}]`);
        }else if(name === 'siteId'){
            if(JSON.stringify(data) !== '{}'){
                data.sellerAccount[k] = [];
            }
            this.props.form.resetFields(`sellerAccount[${k}]`);
        }
    }


    render() {
        const { k, index, keys, item, data } = this.props;
        const { platform, site, account, display } = this.state;
        const { getFieldDecorator } = this.props.form;
        const label = index === 0 ? (
            <label className="ant-form-item-required">禁售信息</label>
        ) : null;
        return (
            <div className="basic-add">
                <div className="ant-row ant-form-item">
                    <div className="ant-col-6 ant-form-item-label">
                        {label}
                    </div>
                    <div className="ant-col-18 ant-form-item-control-wrapper">
                        <FormItem className="platform">
                            {getFieldDecorator(`platform[${k}]`, {
                                initialValue: item ? data.platform[k] : [],
                                rules: [{
                                    required: true,
                                    message: "请选择平台.",
                                }],
                            })(
                                <Select
                                    style={{ width: 100, marginRight: 10 }}
                                    placeholder="平台"
                                    labelInValue
                                    onFocus={this.onFocusPlatForm}
                                    onSelect={(value) => this.onSelectId(value, 'platformId')}
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
                        <FormItem className="size" style={{display: display}}>
                            {getFieldDecorator(`site[${k}]`, {
                                initialValue: item ? data.site[k] : []
                            })(
                                <Select
                                    style={{ width: 100, marginRight: 10 }}
                                    placeholder="站点"
                                    labelInValue
                                    onFocus={this.onFocusSite}
                                    onSelect={(value) => this.onSelectId(value, 'siteId')}
                                    showSearch
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
                        <FormItem  className="account">
                            {getFieldDecorator(`sellerAccount[${k}]`, {
                                initialValue: item ? data.sellerAccount[k] : []
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: 200, marginRight: 10 }}
                                    placeholder="账号"
                                    labelInValue
                                    onFocus={this.onFocusAccount}
                                >
                                    {
                                        account.map((item, index) => (
                                            <Option key={index} value={item.id}>{item.name}</Option>
                                        ))
                                    }
                                </Select>
                            )}
                        </FormItem>
                        {keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;