import React, { Component } from 'react';
import { Form, Select, Icon } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import './index.css';

import { getSite } from '../../../common/request';

class Platsite extends Component {
    state = {
        site: [],
        siteId: '',
        // isAll: false,
        isSelectPlatform: false,
        isSelectSite: false,
        currentValue: ''
    }
    componentDidMount() {
        this.getSiteOption(this.props)

    }
    componentWillReceiveProps(nextProps) {
        this.refreshSiteOption(nextProps)
    }
    refreshSiteOption = (nextProps) => {
        // 从知产代码获取或详情的
        const { _item } = nextProps;
        let key = _item.platform.key

        const values = this.props.form.getFieldsValue()
        const currentPlatFormValue = values.platform[this.props.index][this.props._index]

        // 下拉框选择,防止多次
        if (this.state.isSelectPlatform) {
            this.state.isSelectPlatform = false
            return
        }
        if (this.state.isSelectSite) {
            this.state.isSelectSite = false
            return
        }
        if (key && !currentPlatFormValue.length) {
            this.setState({ currentValue: key })
            this.getSiteRequest(key)
            return
        }
        if (key && currentPlatFormValue.length && (key + '' === currentPlatFormValue)) {
            this.setState({ currentValue: key })
            this.getSiteRequest(key)
            return
        }
        if (!key && currentPlatFormValue.length) {
            this.setState({ currentValue: currentPlatFormValue })
            this.getSiteRequest(currentPlatFormValue)
            return
        }

        if (!key && !currentPlatFormValue.length) {
            return
        }
    }
    // 从详情获取的,初始化平台站点可选值
    getSiteOption = (nextProps) => {
        const { _item } = nextProps;
        let key = _item.platform.key
        this.getSiteRequest(key)
    }
    getSiteRequest = (key) => {
        if (!key) return
        // const { manualCache } = this.props;
        let promise;
        // if(manualCache[key]){
        //     promise = Promise.resolve(manualCache[key].map(v=>({id:v.id,name:v.name})))
        // }else {
            promise = this.getRequestSit(key)
        // }
        promise.then(result=>{
            this.setState({ site: result }, () => { this.fiterDisableSite(key, result) })
            if (result) {
                if (!result.length) {
                    this.handleNoSite(key)
                }
            }
        })
    }
    // 请求获取站点
    getRequestSit = (key)=>{
        const { manualCache } = this.props;
        return getSite({
            platformId: key
        }).then((result) => {
            // eBay、Amazon、WalMart 增加 all 选项 
            // if (['22', '24', '26'].includes(key)) {
            //     result.unshift({ id: "all", name: "ALL" })
            // }
            // if (!manualCache[key]) {
            //     manualCache[key] = result
            // }
            return result
        });
    }

    getIcon = () => {
        const { index, _index, disableInfo } = this.props;
        // 当禁售信息只有一组的时候
        if (_index === 0 && disableInfo.length === 1) {
            return (
                <div className='pull-left'>
                    <Icon
                        type="plus-circle-o"
                        onClick={() => this.props.addPlatformSite(index, _index)}
                    />
                    <i className="anticon" style={{ width: '26px', height: '16px' }}></i>
                </div>
            )
        }
        // 当禁售大于1组的时候
        if (_index === 0 && disableInfo.length > 1) {
            return (
                <div className='pull-left'>
                    <Icon
                        type="plus-circle-o"
                        onClick={() => this.props.addPlatformSite(index, _index)}
                    />
                    <Icon
                        type="minus-circle-o"
                        onClick={() => this.props.remove(index, _index, 'sensitiveLayer')}
                    />
                </div>
            )
        }
        // 添加平台站点的时候
        if (_index !== 0 && disableInfo.length > 0) {
            return (
                <div className='pull-left'>
                    <i className="anticon" style={{ width: '26px', height: '16px' }}></i>
                    <Icon
                        type="minus-circle-o"
                        onClick={() => this.props.remove(index, _index, 'platformSite')}
                    />
                </div>
            )
        }
    };

    onSelectId = (value) => {
        const { index, _index } = this.props;
        const self = this;
        // this.setState({ isAll: false })
        getSite({
            platformId: value
        }).then((result) => {
            // 清空对应的站点
            // if (['22', '24', '26'].includes(value)) {
            //     result.unshift({ id: "all", name: "ALL" })
            // }
            if (!result || !result.length) {
                // 过滤站点
                if (result) {
                    if (!result.length) {
                        this.handleNoSite(value)
                    }
                }
                this.setState({ site: [] }, () => { this.fiterDisableSite(value, result) })
                const values = this.props.form.getFieldsValue();
                values.site[index][_index] = [];
                self.props.form.setFieldsValue({ site: values.site })
                return;
            }
            const values = this.props.form.getFieldsValue()
            values.site[index][_index] = [];
            self.props.form.setFieldsValue({ site: values.site })
            this.setState({ site: result }, () => { this.fiterDisableSite(value, result) })
        });
        this.state.isSelectPlatform = true
        this.setState({ isSelectPlatform: true })
    }
    onSiteSelectId = (value, key) => {
        // this.state.isSelectSite = true
        let params = { isSelectSite: true};
        // , isAll: false 
        // if (value.includes("all")) {
        //     params.isAll = true
        // }
        this.setState(params, () => {
            // if (value.includes("all")) {
            //     this.props.form.setFieldsValue({
            //         [key]: ['all']
            //     })
            // }
        })
    }
    // 获取站点disable控制
    fiterDisableSite = (value, result) => {
        if (!result || !result.length) return
        const siteArray = result.map(item => {
            item['disabled'] = false
            return item
        })
        const siteIdArray = result.map(item => item.id + '')
        const values = this.props.form.getFieldsValue()
        // 遍历所有的平台
        values.platform.forEach((platformArr, valuesIndex) => {
            platformArr.forEach((platformValue, platFormIndex) => {
                if (platformValue === value && value != this.state.currentValue) {
                    // 获取到所有相同平台已有的站点id
                    const existingSiteIdArr = values.site[valuesIndex][platFormIndex]
                    existingSiteIdArr.forEach((id, index) => {
                        if (siteIdArray.indexOf(id) !== -1) {
                            const exitIdIndex = siteIdArray.indexOf(id)
                            siteArray[exitIdIndex]['disabled'] = true;
                        }
                    })
                }
            })
        })
        // // debugger;
        // const all = siteArray.find(v=>v.id ==="all")
        
        // console.log("all",all)
        // if(all && all.disabled ){
        //     siteArray.forEach(v=>{
        //         v.disabled = true
        //     })
        // }
        
        // console.log("siteArray",siteArray)
        this.setState({ site: siteArray })
    }
    handleNoSite = (value) => {
        if (this.props.handleNoSite) {
            this.props.handleNoSite(value)
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { index, _index, _item, platformOption } = this.props;
        const { site, isAll } = this.state;
        let siteArray = _item.site.map(i => {
            return i.key ? i.key + '' : ''
        })
        if (siteArray.length && siteArray.length === 1) {
            if (siteArray[0] === '' || siteArray[0] === '0') {
                siteArray = []
            }
        }
        return (
            <div>
                <FormItem className="platform pull-left">
                    {getFieldDecorator(`platform[${index}][${_index}]`, {
                        initialValue: _item.platform.key + '' ? _item.platform.key + '' : [],
                        rules: [{
                            required: true,
                            message: "请选择平台.",
                        }],
                    })(
                        <Select
                            style={{ width: 110, marginRight: 10 }}
                            placeholder="平台"
                            onSelect={this.onSelectId}
                            showSearch
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                platformOption && platformOption.map((item, i) => (
                                    <Option key={item.id + ''} value={item.id + ''} disabled={item.disabled}>{item.name}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem className="site pull-left">
                    {getFieldDecorator(`site[${index}][${_index}]`, {
                        initialValue: siteArray,
                        rules: [{
                            required: !site.length ? false : true,
                            message: "请选择站点.",
                        }],
                    })(
                        <Select
                            mode="multiple"
                            style={{ width: 220, marginRight: 10 }}
                            placeholder={!site.length ? '平台无站点' : '站点'}
                            showSearch
                            onChange={value => this.onSiteSelectId(value, `site[${index}][${_index}]`)}
                            disabled={!site.length}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                site && site.map((item, i) => {
                                    // if (item.id == "all") return <Option value={item.id + ''} disabled={item.disabled} value={item.id + ''}>{item.name}</Option>
                                    return <Option value={item.id + ''} value={item.id + ''} disabled={item.disabled} >{item.name}</Option>
                                })
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
