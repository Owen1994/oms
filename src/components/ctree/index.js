import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Checkbox } from 'antd';
import './css.css';
const TreeNode = Tree.TreeNode;
/**
 * @author huangjianfeng
 * @description 自定义Tree控件
 */
export default class CTree extends React.Component {
    dataMap = new Map();
    allKeys =  [];
    state = {
        checkedKeys: [],
        indeterminate: false,
        checkedAll: false,
    }

    /**
     * 作者: 陈林
     * 描述: 加背景颜色和判断叶子节点
     * 时间: 2018/5/28 0028 下午 3:32
     **/
    onExpand = () => {
        setTimeout(() => {
            const elementOpenArray = document.querySelectorAll('.ant-tree-switcher_open');
            const elementCloseArray = document.querySelectorAll('.ant-tree-switcher_close');
            elementOpenArray.forEach((element) => {
                const pNode = element.parentNode;
                pNode.classList.add('tweb-background-color');
            });
            elementCloseArray.forEach((element) => {
                const pNodeClose = element.parentNode;
                pNodeClose.classList.remove('tweb-background-color');
            });
            const elementArray = document.querySelectorAll('.ant-tree-child-tree-open');
            elementArray.forEach((element) => { // 判断叶子节点
               const closeSubElement = element.querySelector('.ant-tree-switcher_close');
               const openSubElement = element.querySelector('.ant-tree-switcher_open');
               if ( !closeSubElement && !openSubElement ) {
                   element.classList.add('tweb-ant-tree-leaf_node');
               }else {
                   element.classList.remove('tweb-ant-tree-leaf_node');
               }
            });
        }, 100);
    };

    onCheck = (checkedKeys, e) => {
        return new Promise((resolve, reject) => {
            if (e) {
                this.setState({
                    checkedKeys,
                    indeterminate: !!checkedKeys.length && (checkedKeys.length < this.allKeys.length),
                    checkAll: checkedKeys.length === this.allKeys.length,
                });
            }
            if (this.props.onChange) {
                const formType = this.props.formType || 0;
                if(formType === 1) {
                    const data = checkedKeys.map((key) => {
                                    const item = this.dataMap.get(key);
                                    item.checked = true;
                                    return item;
                                });
                    this.props.onChange(data);
                } else if(formType === 2) {
                    this.resetDatas(this.props.list);
                    checkedKeys.forEach((key) => {
                        const item = this.dataMap.get(key);
                        item.checked = true;
                        return item;
                     });
                     if(e && e.halfCheckedKeys && e.halfCheckedKeys.length > 0) {
                        e.halfCheckedKeys.forEach((key) => {
                            const item = this.dataMap.get(key);
                            item.checked = true;
                            return item;
                        });
                     }
                    this.props.onChange(checkedKeys);
    
                    const result = this.filterDatas(this.props.list);
                    if(this.props.handleChange) {
                        this.props.handleChange(result);
                    }
                } else {
                    this.props.onChange(checkedKeys);
                }
            }
            resolve();
        });
    };

    filterDatas = (list) => {
        return list.filter(item => item.checked)
                   .map((item) => {
                       const newItem = {...item};
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

    componentDidMount(){
        this.parseListToMap(this.props.list);
        if (this.props.value) {
            this.parseCheckedKeys(this.props.value);
        }
    }

    componentWillReceiveProps(nextProps) {
        const preList = this.props.list;
        const cList   = nextProps.list;
        if(preList !== cList) {
            this.parseListToMap(cList);
        }
        const preValue = this.props.value;
        const cValue   = nextProps.value;
        if(cValue && preValue !== cValue) {
            if (cValue.length > 0) {
                const checkedAll = cValue.length === this.allKeys.length;
                this.setState({
                    indeterminate: checkedAll ? false : true,
                    checkedAll
                });
            }
            this.parseCheckedKeys(cValue);
        }
    }

    parseCheckedKeys = (value) => {
        return new Promise((resolve, reject) => {
            const code = this.props.code || 'key';
            this.setState({
                checkedKeys: value.map(item => {
                    if(typeof item === 'object'){
                        return item[code];
                    }
                    return item;
                })
            }, () => {
                resolve();
            });
        });
    }

    parseListToMap = (list) => {
        const { code = 'key' } = this.props;
        list.forEach(item => {
            this.dataMap.set(item[code], item);
            this.allKeys.push(item[code]);
            if(Array.isArray(item.children) && item.children.length > 0){
                return this.parseListToMap(item.children);
            }
        });
        this.allKeys = Array.from(new Set(this.allKeys));
    }

    renderTreeNodes = (data) => {
        const { code='key', name='title' } = this.props;
        return data.map((item,index) => {
            if (item.children) {
                return (
                    <TreeNode
                        title={item[name]}
                        key={item[code]}
                        dataRef={item}
                    >
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item[name]} className='tewb-tree-node' key={item[code]}/>;
        });
    };

    onCheckAllChange = (e) => {
        this.setState({
            checkedKeys: e.target.checked ? this.allKeys : [], 
            checkedAll: e.target.checked,
            indeterminate: false
        }, () => {
            this.onCheck(this.state.checkedKeys)
        });
    }

    render() {
        const { list, checkAllOption } = this.props;
        const { indeterminate, checkedAll, checkedKeys } = this.state;
        return (
            <div className="tweb-container">
                {
                    checkAllOption ?
                            <div>
                                <Checkbox
                                    indeterminate={indeterminate}
                                    onChange={this.onCheckAllChange}
                                    checked={checkedAll }
                                >
                                    全选
                                </Checkbox>
                            </div>
                            :
                            null
                }
                <div className="tweb-tree">
                    <Tree
                        showLine
                        checkable
                        defaultSelectedKeys={checkedKeys}
                        checkedKeys={checkedKeys}
                        onCollapse={this.onCollapse}
                        onExpand={this.onExpand}
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

CTree.propTypes = {
    list: PropTypes.array.isRequired,
    formType: PropTypes.number
};
