/* eslint-disable */
import React, { Component } from 'react';
import {
    Form, Input, Icon, Select,
} from 'antd';
import './index.css';

const FormItem = Form.Item;
const Option = Select.Option;

class App extends Component {
    state = {
        searchTypeArr: [],
    }

    componentDidMount() {
        const { data } = this.props;
        const { searchTypeArr } = this.state;
        searchTypeArr.push(data[0]);
        this.setState({ searchTypeArr });
    }

    // 添加搜索类型
    addSearchType = () => {
        const { data } = this.props;
        const { searchTypeArr } = this.state;
        const newSearchTypeArr = [];
        [...data].forEach((item) => {
            let flag = true;
            for (let i = 0; i < searchTypeArr.length; i++) {
                if (item.field === searchTypeArr[i].field) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                newSearchTypeArr.push(item);
            }
        });
        if (newSearchTypeArr.length !== 0) {
            searchTypeArr.push(newSearchTypeArr[0]);
        }
        this.setState({ searchTypeArr });
    }

    // 删除搜索类型
    deleteSearchType = (index) => {
        const { searchTypeArr } = this.state;
        searchTypeArr.splice(index, 1);
        this.setState({ searchTypeArr });
    }

    handleChange = (value, index) => {
        const { data } = this.props;
        const { searchTypeArr } = this.state;
        const target = data.find(element => element.field === value);
        searchTypeArr.splice(index, 1, target);
        this.setState({ searchTypeArr });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { searchTypeArr } = this.state;
        const { data } = this.props;
        return (
            <div className="customer-combinatorial-search">
                <div className="label">搜索类型：</div>
                <div className="items">
                    {searchTypeArr.map((item, index) => (
                        <div className="items-list" key={index}>    
                            <Select value={item.field} style={{ width: 120, marginRight: 15 }} onChange={value => this.handleChange(value, index)}>
                                {
                                    data.map((element, i) => {
                                        let isDisable = false;
                                        searchTypeArr.forEach((ele) => {
                                            if (ele.field === element.field) {
                                                isDisable = true;
                                            }
                                        });
                                        return <Option key={i} value={element.field} disabled={isDisable}>{element.name}</Option>;
                                    })
                                }
                            </Select>
                            <FormItem>
                                {getFieldDecorator(item.field)(
                                    <Input placeholder={`请输入${item.name}`} />,
                                )}
                            </FormItem>
                            {/* 删除搜索类型 */}
                            {
                                searchTypeArr.length > 1
                                    ? (
                                        <div onClick={() => this.deleteSearchType(index)} style={{ cursor: 'pointer', padding: 7 }}>
                                            <Icon type="minus-circle" style={{ fontSize: 18 }} />
                                        </div>
                                    )
                                    : null
                            }
                        </div>
                    ))}
                    {/* 新增搜索类型 */}
                    {
                        searchTypeArr.length < data.length
                            ? (
                                <div style={{ color: '#668efe', paddingTop: 15 }}>
                                    <span onClick={this.addSearchType} style={{ cursor: 'pointer' }}><Icon type="plus" /> 添加搜索类型</span>
                                </div>
                            )
                            : null
                    }
                    
                </div>
            </div>
        );
    }
}

export default App;
