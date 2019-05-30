import React from 'react';
import { Select, message, Spin, Icon } from 'antd';
import PropTypes from 'prop-types';
import { fetchPost } from '../../../util/fetch';

const Option = Select.Option;
export default class ItemSelect extends React.Component {
    flag = 0
    state = {
        list: [],
        spinning: false,
        tip: '',
    }

    handleSearch = (value='') => {
        this.setState({spinning: true});
        if(this.props.onFocusBefore && !this.props.onFocusBefore()){
            return ;
        }
        const {
            url, 
            params={pageData: 20, pageNumber: 1}, 
            searchColumn='name',
            apiListType=0,
            filterDataHandle
        } = this.props;
        if(!url) {
            return ;
        }
        this.handleAddValue(params, searchColumn, value)
        if(this.flag === 0 && value){
            params[searchColumn] = value
        }
        fetchPost(url, params).then(data => {
            if(data.state==='000001'){
                setTimeout(()=>{
                    this.setState({
                        spinning: false,
                        tip: '无匹配结果',
                    });
                },200);
                let list;
                if(apiListType===1){
                    list =  data.data.data || []
                } else if(apiListType===2){
                    list =  data.data || []
                }else {
                    list =  data.data.list || []
                }
                if(filterDataHandle && typeof filterDataHandle === "function"){
                    list = filterDataHandle(list) || []
                }
                this.setState({
                    list
                })
            }else{
                setTimeout(()=>{
                    this.setState({
                        spinning: false,
                        tip: data.msg,
                        list: []
                    });
                },200);
            }
        });
    }

    handleAddValue = (params, searchColumn, value) => {
        for(const k in params){
            if(typeof params[k] === 'object' && !Array.isArray(params[k])) {
                return this.handleAddValue(params[k], searchColumn, value)
            }
            if (k === searchColumn) {
                this.flag = 1
                params[k] = value
                break;
            }
        }
    }

    handleChange = (value, options) => {
        const maxCount = this.props.maxCount
        if(Array.isArray(value)&&value.length>maxCount){
            value.splice(maxCount, 1)
            message.warning(`所选项不能超过${maxCount}项`)
        }
        if(this.props.onChange&&value){
            this.props.onChange(value, options.props);
        }
    }

    filterOption = (inputValue, option) => {
        let regExp = new RegExp(inputValue, 'gi');
        return regExp.test(option.props.children);
    }

    componentDidMount() {
        const { dName, dValue } = this.props
        this.initList(dName, dValue);
    }

    componentWillReceiveProps(nextProps) {
        const prevName = this.props.dName;
        const name = nextProps.dName;
        if(prevName !== name) {
            const  dValue = nextProps.dValue
            this.initList(name ,dValue);
            this.setState({
                value: this.props.dValue
            })
        }
    }

    initList = (dName, dValue)=>{
        const {
            name = 'name',
            code = 'code',
        } = this.props;
        if( dName && dValue ) {
            let dNameArray;
            let dValueArray;
            if(Array.isArray(dName)) {
                dNameArray = dName;
            }else{
                dNameArray = dName.split(',');
            }
            if(Array.isArray(dValue)){
                dValueArray = dValue;
            }else{
                dValueArray = dValue.split(',');
            }
            dNameArray = dNameArray.filter(item => item||item === 0);
            dValueArray = dValueArray.filter(item => item||item === 0);
            this.setState(prevState => {
                const list = prevState.list
                const newList = [...list];
                dValueArray.forEach((item1,index) =>{
                    let flag = false;
                    list.forEach(item2=>{
                        if(item1 == item2[code]){
                            flag =true;
                            return false
                        }
                    });
                    if(!flag){
                        newList.push({
                            [code]: item1,
                            [name]: dNameArray[index]
                        })
                    }
                });
                return {
                    list: newList
                }
            })
        }
    }

    render(){
        const list = this.state.list;
        const { spinning, tip } = this.state;
        const { 
            name = 'name', 
            code = 'code',
            getFieldDecorator,
            formName,
            mode,
            rules,
            placeholder,
            allowClear
        } = this.props;
        const elements = (
            <Select
                placeholder={ placeholder ? placeholder : ( mode ? '请选择(多选)' : '请选择')}
                {...this.props}
                mode={mode}
                showSearch
                allowClear={!!allowClear}
                onSearch={this.handleSearch}
                style={{ minWidth: 140 , width:"100%"}}
                onChange={this.handleChange}
                onFocus={() => this.handleSearch('')}
                filterOption={this.filterOption}
                notFoundContent={<Spin spinning={spinning} size="small" indicator={<Icon type="loading" spin />} >{spinning ? '加载中' : tip}</Spin>}
            >
                {
                    spinning ? null : (
                        this.props.onFilters ?
                            this.props.onFilters(list).map((item) => <Option key={item[code]} title={item[name]} value={item[code]}>{item[name]}</Option>): 
                            list.map((item) => <Option key={item[code]} value={item[code]}>{item[name]}</Option>)
                    )
                }
          </Select>
        )
        return (
                getFieldDecorator?
                <div>
                    {getFieldDecorator(formName, rules)(
                        elements                
                    )}
                </div>
                :
                elements
        )
    }
}

ItemSelect.propTypes = {
    url: PropTypes.string.isRequired,
    searchColumn: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
    // dValue: PropTypes.string,
    // dName: PropTypes.string,
    onChange: PropTypes.func,
    params: PropTypes.object,
    maxCount: PropTypes.number,
    apiListType: PropTypes.number,
    onFocusBefore: PropTypes.func,
    onFilters: PropTypes.func,
}
