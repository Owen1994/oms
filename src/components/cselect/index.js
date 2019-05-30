import React from 'react';
import { Select, Spin, Icon, message } from 'antd';

import _ from 'lodash';
import { fetchPost } from '../../util/fetch';
import { escapeRegularExpressionString } from '@/util/StrUtil';
const Option = Select.Option;

/**
 * @author huangjianfeng
 * @description select组件二次封装
 */
export default class CSelect extends React.Component {
    // initListData = []
    state = {
        list: [],
        value: [],
        loading: false,
        tip: '',
        selectList: [],
        sName: '',
        sPreName: '',
    }

    componentDidMount() {
        const list = this.props.list || [];
        this.setState({ list });
        const value = this.props.value;
        const { code = 'code' } = this.props;
        this.parseValue(value, code);
        this.setState({ selectList: [...list] });
        this.loadingDataDelay = _.debounce(this.loadingData, 1000);
    }
    componentWillReceiveProps(nextProps) {
        const preList = this.props.list;
        const list = nextProps.list;
        if (list !== preList) {
            this.setState({ list, selectList: [...this.props.list] });
        }
        const preValue = this.props.value;
        const value = nextProps.value;
        const { code = 'code' } = nextProps;
        if (preValue !== value) {
            if (typeof value === 'object' && this.state.list.length === 0) {
                if (Array.isArray(value)) {
                    this.setState({ list: value })
                } else {
                    this.setState({ list: [value] });
                }
            }
            this.parseValue(value, code);
        }
    }

    parseValue = (value, code) => {
        if (Array.isArray(value)) {
            this.setState({
                value: value.map(item => {
                    if (typeof item === 'object') {
                        return item[code];
                    }
                    return item;
                })
            })
        } else {
            this.setState({ value });
        }
    }

    handleSearch = (searchValue = '') => {
        const { url } = this.props;
        searchValue = searchValue && searchValue.trim();
        if (this.props.onBeforeFocus && !this.props.onBeforeFocus()) {
            return false;
        }
        if (!url) {
            return false;
        }
        this.setState({ sName: searchValue });
        if (this.state.loading) {
            return false;
        }
        if (!searchValue) {
            this.loadingData(searchValue);
        } else {
            this.loadingDataDelay(searchValue);
        }
        
    }

    loadingData = (searchValue) => {
        const { url, apiListType, params = {}, completeCallback } = this.props;
        this.setParams(params, searchValue);
        this.setState({ loading: true, sPreName: searchValue });
        fetchPost(url, params).then(data => {
            this.setState({ loading: false });
            if (data.state === '000001') {
                let list = [];
                if (apiListType === 1) {
                    list = data.data.data || [];
                } else if (apiListType === 2) {
                    list = data.data || [];
                } else if (apiListType === 3) {
                    list = data.data.lst || [];
                } else {
                    list = data.data.list || [];
                }
                if (this.props.handleFilter) {
                    list = this.props.handleFilter(list);
                }
                this.setState({ list: list }, this.addSelectOptions);
            } else {
                this.setState({ list: [], tip: data && data.msg || '加载失败' });
            }
        });
    }

    setParams = (params, value) => {
        for (let k in params) {
            if (typeof params[k] === 'object') {
                return this.setParams(params[k], value);
            }
            if (k === 'searchColumn') {
                params[params[k]] = value;
                break;
            }
        }
    }

    addSelectOptions = () => {
        const { list, selectList } = this.state;
        const { code = 'code', isNotCache } = this.props;
        if (!list || list.length === 0) {
            this.setState({ tip: '网络请求无数据' });
            return false;
        }
        if (!selectList) {
            return false;
        }
        let listData;
        if (isNotCache === true) {
            listData = list;
        } else {
            listData = list.filter(item => {
                let flag = true;
                for (let i = 0; i < selectList.length; i++) {
                    if (item[code] === selectList[i][code]) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            });
            listData = [...selectList, ...listData];
            // .concat(selectList);
        }
        // if (this.props.handleFilter) {
        //     listData = this.props.handleFilter(listData);
        // }
        this.setState({
            list: listData
        })
    }

    filterOption = (inputValue, option) => {
        if (this.props.params && (!this.props.localSearch || this.props.localSearch !== 1)) {
            return true;
        }
        const sInputValue = escapeRegularExpressionString(inputValue);
        let regExp = new RegExp(sInputValue, 'gi');
        return regExp.test(option.props.children);
    }

    handleChange = (value, option) => {
        const maxCount = this.props.maxCount;
        const mode = this.props.mode;
        if (Array.isArray(value) && value.length > maxCount) {
            value.splice(maxCount, 1)
            message.warning(`所选项不能超过${maxCount}项`)
            return false;
        }
        if (this.props.onChange) {
            const { code = 'code', formType = 0 } = this.props;
            if (formType === 1) {
                let list = [];
                const listData = this.state.list;
                if (Array.isArray(option)) {
                    list = option.map(item => {
                        let obj;
                        for (let i = 0; i < listData.length; i++) {
                            if (listData[i][code] === item.props.value) {
                                obj = listData[i];
                                break;
                            }
                        }
                        return obj;
                    }).filter(item => item);
                } else {
                    for (let i = 0; i < listData.length; i++) {
                        if (listData[i][code] === option.props.value) {
                            list = [listData[i]];
                            break;
                        }
                    }
                }
                this.props.onChange(list, option);
                if (this.props.handleChange) {
                    setTimeout(() => {
                        this.props.handleChange(list, option);
                    }, 500);
                }
            } else {
                this.props.onChange(value, option);
                if (this.props.handleChange) {
                    setTimeout(() => {
                        this.props.handleChange(value, option);
                    }, 500);
                }
            }
        }
    }

    render() {
        const { list = [], value, tip, loading } = this.state;
        const { code = 'code', name = 'name', style } = this.props;
        return (
            <div>
                <Select
                    showSearch
                    {...this.props}
                    onFocus={this.handleSearch}
                    filterOption={this.filterOption}
                    onChange={this.handleChange}
                    value={value}
                    onSearch={this.handleSearch}
                    style={style ? style : { minWidth: 140, width: "100%" }}
                    notFoundContent={<Spin spinning={loading} size="small" indicator={<Icon type="loading" spin />} >{loading ? '加载中' : tip}</Spin>}
                >
                    {list.map(item => (<Option key={item[code]} value={item[code]}>{item[name]}</Option>))}
                </Select>
            </div>
        )
    }
}
