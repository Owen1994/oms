import React from 'react';
import PropTypes from 'prop-types';
import {
    Tree,
    Icon
} from 'antd';
import './organization.css';
const TreeNode = Tree.TreeNode;
/**
 * @author huangjianfeng
 * @description 公司人员组织结构图
 */
export default class OrganizationStructure extends React.Component {
        dataMap = new Map();
        state = {
            checkedKeys: []
        }

        onCheck = (checkedKeys, e) => {
            this.setState({
                checkedKeys
            });
            if (!this.props.onChange) {
                return;
            }
            const formType = this.props.formType || 0;
            // const userCheckedKeys = checkedKeys.filter(key => /^[a-zA-Z]+/g.test(key));
            const userCheckedKeys = checkedKeys;
            if (formType === 1) {
                const data = userCheckedKeys.map((key) => {
                    const item = this.dataMap.get(key);
                    item.checked = true;
                    return item;
                });
                this.props.onChange(data);
            } else if (formType === 2) {
                this.resetDatas(this.props.list);
                userCheckedKeys.forEach((key) => {
                    const item = this.dataMap.get(key);
                    item.checked = true;
                    return item;
                });
                if (e.halfCheckedKeys && e.halfCheckedKeys.length > 0) {
                    e.halfCheckedKeys.forEach((key) => {
                        const item = this.dataMap.get(key);
                        item.checked = true;
                        return item;
                    });
                }
                this.props.onChange(userCheckedKeys);
                const result = this.filterDatas(this.props.list);
                if (this.props.handleChange) {
                    this.props.handleChange(result);
                }
            } else {
                this.props.onChange(userCheckedKeys);
            }
        };

        filterDatas = (list) => {
            return list.filter(item => item.checked)
                .map((item) => {
                    const newItem = { ...item
                    };
                    delete newItem.checked;
                    if (newItem.children) {
                        newItem.children = this.filterDatas(newItem.children);
                    }
                    return newItem;
                });
        }
        resetDatas = (list) => {
            return list.map((item) => {
                item.checked = false;
                if (item.children) {
                    item.children = this.resetDatas(item.children);
                }
                return item;
            });
        }
        componentDidMount() {
            const formType = this.props.formType || 0;
            if (formType !== 0) {
                this.parseListToMap(this.props.list);
            }
            if (this.props.value) {
                this.parseCheckedKeys(this.props.value);
            }
        }

    componentWillReceiveProps(nextProps) {
        const preList = this.props.list;
        const cList   = nextProps.list;
        const formType = nextProps.formType || 0;
        if(preList !== cList && formType !== 0) {
            this.parseListToMap(cList);
        }
        const preValue = this.props.value;
        const cValue   = nextProps.value;
        if(cValue && preValue !== cValue) {
            this.parseCheckedKeys(cValue);
        }
    }

    parseCheckedKeys = (value) => {
        const code = this.props.code || 'key';
        this.setState({
            checkedKeys: value.map(item => {
                if(typeof item === 'object'){
                    return item[code];
                }
                return item;
            })
        });
    }

    parseListToMap = (list) => {
        const { code = 'key', name = 'title' } = this.props;
        list.forEach(item => {
            this.dataMap.set(item[code], item);
            if(Array.isArray(item.children) && item.children.length > 0){
                return this.parseListToMap(item.children);
            }
        })
    }

    renderTreeNodes = (data) => {
        const { code='key', name='title' } = this.props;
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode
                        icon={<Icon type="folder" theme="filled" style={{ color: "#f5b530"}}/>} // 245 181 48
                        title={item[name]}
                        key={item[code]}
                        dataRef={item}
                    >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
        if (item.isUser === 1 && /__/g.test(item[code])) {
            item.newName = `${item[name]}/${item[code].split('__')[0]}`
        }
        return (
                <TreeNode
                    icon={<Icon type="user" style={{ color: "#1890ff"}}/>}  // 24 144 25
                    title={item.newName || `${item[name]}/${item[code]}`} 
                    key={item[code]}/>
            )
        });
    };
    render() {
        const { list } = this.props;
        return (
            <div className="organization-tree">
                <div>
                    <Tree
                        showLine
                        checkable
                        showIcon
                        defaultSelectedKeys={this.state.checkedKeys}
                        checkedKeys={this.state.checkedKeys}
                        onCollapse={this.onCollapse}
                        onCheck={this.onCheck}
                        {...this.props}
                    >
                        {this.renderTreeNodes(list)}
                    </Tree>
                </div>
            </div>
        )
    }

    componentWillUnmount(){
        this.dataMap.clear();
    }
}

OrganizationStructure.propTypes = {
    list: PropTypes.array.isRequired,
    formType: PropTypes.number
};
