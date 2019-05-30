import React from 'react';
import { Spin, Table, Button, Form, Icon } from 'antd';
import COrganizationStructure from '@/components/ctree/OrganizationStructure';
import CSelect from '@/components/cselect';
import { fetchPost } from '@/util/fetch';
import { repeatArrayWithObj } from 'util/ArrayUtil';
import { GET_ALL_USER, SEARCH_USER_PERSON } from '../constants/Api';
import '../style.css';

class OrganizationStructure extends React.Component {
    state = {
        list: [],
        selectList: [],
        loading: false,
        // expandedKeys: ['1']
    }

    columns = [{
        title: '序号',
        dataIndex: 'sno',
        render: (value, record, index) => {
            return (index+1);
        },
        width: 50,
      }, {
        title: '账号',
        dataIndex: 'fullName',
        width: 100,
      }, {
        title: '操作',
        dataIndex: 'operate',
        render: (value, record, index) => {
            return (<a onClick={() => this.handleDelete(index)}>删除</a>)
        },
        width: 50,
    }];

    componentDidMount() {
        this.setState({loading: true});
        fetchPost(GET_ALL_USER, undefined, 2).then((result) => {
            if (result.state === '000001') {
                this.setState({list: result.data || []}, () => {
                    // FIXME 
                    if (this.props.value && this.props.value.length > 0) {
                        this.setState({ selectList: this.props.value.map((item) => {
                            if (typeof item === 'string') {
                                return { userName: item, fullName: item }
                            };
                            return {
                                    userName: item.userName,
                                    fullName: item.personName ? `${item.personName}/${item.userName}` : item.userName
                                }
                            })
                        });
                    }
                    // this.setState({expandedKeys: ["1"]});
                });
            }
            this.setState({loading: false});
        });
    }

    componentWillReceiveProps(nextProps) {
        // FIXME
        const preValue = this.props.value;
        const value    = nextProps.value;
        if (value && value !== preValue) {
            this.setState({ selectList: this.props.value.map((item) => {
                if (typeof item === 'string') {
                    return { userName: item, fullName: item }
                };
                return {
                        userName: item.userName,
                        fullName: item.personName ? `${item.personName}/${item.userName}` : item.userName
                    }
                })
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            list: [],
            value: []
        });
    }

    addUser = () => {
        const { searchUsers = [], departUsers = [] } = this.props.form.getFieldsValue();
        const filterDepartUsers = departUsers.filter((item) => /^[a-zA-Z]+/g.test(item.key));
        const userCheckedKeys = this.state.selectList.map(item => item.userName);
        const newDepartUsers = filterDepartUsers.map(item => item.key);
        const newSearchUsers = searchUsers.map(item => item.userName);        
        Array.prototype.push.apply(userCheckedKeys, newDepartUsers);
        Array.prototype.push.apply(userCheckedKeys, newSearchUsers);
        this.props.onChange(Array.from(new Set(userCheckedKeys)));
        this.props.form.resetFields(['searchUsers']);

        const newSelectList = [...this.state.selectList];
        Array.prototype.push.apply(newSelectList, searchUsers);
        Array.prototype.push.apply(newSelectList, filterDepartUsers.map((item) => ({userName: item.key, fullName: item.title ? `${item.title}/${item.key}` : item.key})));

        this.setState({
            selectList: repeatArrayWithObj(newSelectList, 'userName')
        });
    }

    filterEmptyOrigin = (datas) => {
        return datas.filter((item) => {
            if (item.isUser === 1) {
                return true;
            }
            if (!item.children || item.children.length === 0) {
                return false;
            }
            return this.filterEmptyOrigin(item.children);
        });
    }

    handleFilter = (list = []) => {
        return list.filter(item => item.userName).map((item) => {
            if (item.personName) {
                item.fullName = `${item.personName}/${item.userName}`;
            }
            item.fullName = item.fullName || item.userName;
            return item;
        });
    };

    handleDelete = (index) => {
        if (this.props.onDelete && this.props.onDelete(this.state.selectList, index) === false) {
            return ;
        }
        const users = [...this.state.selectList];
        users.splice(index, 1);
        this.setState({selectList: users});
        this.props.onChange(users.map(item => item.userName));
    }

    render(){
        const {
            list,
            selectList,
            loading,
            // expandedKeys
        } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={loading}>
                <div className="user-role-select-container" style={{ height: 472 }}>
                    <div className="user-left-wrap">
                        <section className="user-role-search user-border cl-user-role-cselect">
                            <h3 className="user-role-title cl-user-role-Icon">搜索用户</h3>
                                {getFieldDecorator('searchUsers', {
                                    initialValue: [],
                                })(
                                    <CSelect
                                        url={SEARCH_USER_PERSON}
                                        apiListType={2}
                                        formType={1}                                        
                                        mode="multiple"
                                        code="userName"
                                        name="fullName"
                                        handleFilter={this.handleFilter}
                                        placeholder="搜索用户"
                                        params={{
                                            data: {
                                                pageData: 20, 
                                                pageNumber: 1, 
                                                searchColumn: 'searchContext'
                                            }
                                        }}
                                    />
                                )}
                                <Icon type="search" className="cl-user-search"/>
                        </section>
                        <section className="user-role-depart user-border">
                            {/* <h3 className="user-role-title">按部门分配</h3> */}
                            <div className="user-role-depart-tree">
                                {getFieldDecorator('departUsers', {
                                    initialValue: [],
                                })(
                                    <COrganizationStructure
                                        // defaultExpandedKeys={expandedKeys}
                                        list={list}
                                        formType={1}
                                    />
                                )}
                            </div>
                        </section>
                    </div>
                    <div className="user-option-wrap">
                        <Button onClick={this.addUser}>
                            增加 <Icon type="right" />
                        </Button>
                    </div>
                    <div className="user-right-wrap user-border cl-user-border">
                        <section>
                            <h3 className="user-role-title cl-user-role-title-already">已分配的用户</h3>
                            <Table
                                bordered
                                columns={this.columns}
                                dataSource={selectList}
                                scroll={{y: 404 }}
                                pagination={false}
                                rowKey={(record) => {
                                    return record.userName;
                                }}
                            />
                        </section>
                    </div>
                </div>
            </Spin>
        )
    }
}

export default Form.create()(OrganizationStructure);
