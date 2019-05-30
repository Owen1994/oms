import React, { Component } from 'react';
import { Form, Select, Icon } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import './index.css';

import { getSite } from '../../../../common/request';

class Platsite extends Component {
    state = {
        site: [],
        isSelectPlatform: false,
        isSelectSite: false
    }
    componentDidMount() {
        this.getSiteOption(this.props)
    }
    componentWillReceiveProps(nextProps) {
        this.refreshSiteOption(nextProps)
    }
    refreshSiteOption = (nextProps) => {
        // 下拉框选择,防止多次
        if (this.state.isSelectPlatform) {
            this.state.isSelectPlatform = false
            return
        }
        if (this.state.isSelectSite) {
            this.state.isSelectSite = false
            return
        }
        const values = this.props.form.getFieldsValue()
        const currentPlatFormValue = values.platform[this.props.index]
        // 新增的情况，platform为数组格式
        if (Array.isArray(currentPlatFormValue)) {
            return
        }
        if (currentPlatFormValue && nextProps.platformInfo.length != values.platform.length) {
            this.getSiteRequest(currentPlatFormValue)
        }
    }
    // 从详情获取的,初始化平台站点可选值
    getSiteOption = (nextProps) => {
        const { item } = nextProps;
        if (!item) return
        let key = item.platform
        this.getSiteRequest(key)
    }
    // 请求
    getSiteRequest = (key) => {
        if (!key || Array.isArray(key)) return
        getSite({
            platformId: key
        }).then((result) => {
            this.setState({ site: result })
        });
    }

    getIcon = () => {
        const { index } = this.props;
        // 当是第一组的时候
        if (index === 0) {
            return (
                <div className='pull-left'>
                    <Icon
                        type="plus-circle-o"
                        onClick={() => this.props.addPlatformSite(index)}
                    />
                </div>
            )
        } else {
            return (
                <div className='pull-left'>
                    <Icon
                        type="minus-circle-o"
                        onClick={() => this.props.remove(index)}
                    />
                </div>
            )
        }

    };
    onSelectId = (value) => {
        const { index } = this.props;
        const self = this
        getSite({
            platformId: value
        }).then((result) => {
            // 清空对应的站点
            this.setState({ site: [] })
            const values = this.props.form.getFieldsValue()
            values.site[index] = []
            self.props.form.setFieldsValue({ site: values.site })
            if (!result || !result.length) {
                return;
            }
            this.setState({ site: result })
        });
        this.state.isSelectPlatform = true
        this.setState({ isSelectPlatform: true })
    }
    onSiteSelectId = (value) => {
        this.state.isSelectSite = true
        this.setState({ isSelectSite: true })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { index, platformOption, item } = this.props;
        const { site } = this.state;
        return (
            <div>
                <FormItem className="platform pull-left">
                    {getFieldDecorator(`platform[${index}]`, {
                        initialValue: item.platform,
                        rules: [{
                            required: true,
                            message: "请选择平台.",
                        }],
                    })(
                        <Select
                            style={{ width: 124, marginRight: 10 }}
                            placeholder="平台"
                            onSelect={this.onSelectId}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                platformOption && platformOption.map((item, i) => (
                                    <Option key={item.id} value={item.id} disabled={item.disabled}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem className="site pull-left">
                    {getFieldDecorator(`site[${index}]`, {
                        initialValue: item.site,
                        rules: [{
                            required: !site.length ? false : true,
                            message: "请选择站点.",
                        }],
                    })(
                        <Select
                            style={{ width: 164, marginRight: 10 }}
                            placeholder={!site.length ? '平台无站点' : '站点'}
                            // showSearch
                            mode="multiple"
                            // onSelect={this.onSiteSelectId}
                            disabled={!site.length}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                site && site.map((item, i) => (
                                    <Option value={item.id + ''} value={item.id + ''} disabled={item.disabled} >{item.name}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                {this.getIcon()}
            </div>
        )
    }
}

export default Platsite;
