/**
 * 作者: 陈林
 * 描述: 功能权限列表案列
 * 时间: 2018/5/21 0021 下午 3:06
 * */
/**
 * @param prmissionsData  传入的数据，格式参考  ./data.js
 * @param isShowCheckAll  是否显示全选，默认false Boolean
 * @param defaultValue    设置默认值  Array ["key值"]
 * @param listField       菜单字段，默认 children
 * @param showField       显示字段，默认 title
 * @param keyField        唯一标识字段，默认 key ,如果传入，会自动设置 key 值
 * @param relevancyField  关联字段，关联key值数组
 * @param relevancyField  关联字段，关联key值数组
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Checkbox } from 'antd';
import './css.css';

const TreeNode = Tree.TreeNode;
let listFieldValue = 'children';
let keyValue = 'key';
let relevancyValue = 'relevancy';
let showValue = 'title';
const relevancySite = [];

export default class Permissions extends React.Component {
    /**
     * 作者: 陈林
     * 描述: 初始化数据
     * 时间: 2018/5/23 0023 下午 12:01
     * @param allKeys array 模拟的数据(后台传入数据的key)
     * @param checkedKeys array 模拟的数据(选中复选框的树节点(key))
     * @param exclude array 排除数据
     * */
    constructor(props) {
        super(props);
        this.state = {
            allKeys: [],
            checkedKeys: [],
            relevancySite: [],
            exclude: ['isShowCheckAll', 'prmissionsData', 'listField', 'keyField', 'relevancyField', 'showField'],
        };
    }

    /**
     * 作者: 陈林
     * 描述: 加背景颜色和判断叶子节点
     * 时间: 2018/5/28 0028 下午 3:32
     * */
    onExpand = (expandedKeys, next) => {
        this.props.onExpand && this.props.onExpand(expandedKeys, next);
        this.setBgc();
    };

    setBgc = () => {
        setTimeout(() => {
            const elementOpenArray = document.querySelectorAll('.tweb-tree>ul>li>.ant-tree-switcher_open');
            const elementCloseArray = document.querySelectorAll('.tweb-tree>ul>li>.ant-tree-switcher_close');
            elementOpenArray.forEach((element) => {
                const pNode = element.parentNode;
                pNode.classList.add('tweb-tree-bgc-white');
                pNode.classList.remove('tweb-tree-bgc-gray');
            });
            elementCloseArray.forEach((element) => {
                const pNodeClose = element.parentNode;
                pNodeClose.classList.add('tweb-tree-bgc-gray');
                pNodeClose.classList.remove('tweb-tree-bgc-white');
            });
        }, 100);
    }

    /**
     * 作者: 陈林
     * 描述: 单个选功能
     * 时间: 2018/5/23 0023 下午 6:19
     * @param checkedKeys array 选中复选框的树节点(key)
     * */
    onCheck = (checkedKeys) => {
        for (let j = 0; j < relevancySite.length; j++) {
            if (relevancySite.includes(relevancySite[j][keyValue])) break;
            for (let i = 0; i < checkedKeys.length; i++) {
                if (relevancySite[j][relevancyValue].includes(checkedKeys[i])
                    && !checkedKeys.includes(relevancySite[j][keyValue])) {
                    checkedKeys.push(relevancySite[j][keyValue]);
                }
            }
        }
        this.setState({
            checkedKeys,
        });
        this.props.onCheck && this.props.onCheck(checkedKeys);
    };

    /**
     * 作者: 陈林
     * 描述: 全选
     * 时间: 2018/5/24 0024 上午 10:37
     * @param allKeys array 模拟的数据(后台传入数据的key)
     * @param checkedKeys array 模拟的数据(选中复选框的树节点(key))
     * */
    onAllClick = () => {
        const { allKeys, checkedKeys } = this.state;
        if (checkedKeys.length !== allKeys.length) {
            this.setState({
                checkedKeys: allKeys,
            });
            this.props.onCheck(allKeys);
        } else {
            this.setState({
                checkedKeys: [],
            });
            this.props.onCheck([]);
        }
    };

    /**
     * 作者: 陈林
     * 描述: 设置key
     * 时间: 2018/5/24 0024 上午 10:37
     * */
    setKey = (data) => {
        for (let i = 0; i < data.length; i++) {
            data[i].key = data[i][keyValue];
            if (data[i][listFieldValue] && data[i][listFieldValue].length) {
                this.setKey(data[i][listFieldValue]);
            }
        }
    };

    /**
     * 作者: 陈林
     * 描述: 添加relevancySite 引用
     * 时间: 2018/5/24 0024 上午 10:37
     * */
    setRelevancySite = (data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i][relevancyValue] && data[i][relevancyValue].length) {
                relevancySite.push(data[i]);
            }
            if (data[i][listFieldValue] && data[i][listFieldValue].length) {
                this.setRelevancySite(data[i][listFieldValue]);
            }
        }
    };

    /**
     * 作者: 陈林
     * 描述: 初始化Tree树形数据
     * 时间: 2018/5/24 0024 上午 10:37
     * */
    init(props) {
        const {
            prmissionsData, defaultValue, listField, keyField, relevancyField, showField,
        } = props;
        listField && (listFieldValue = listField);
        if (keyField) {
            keyValue = keyField;
            this.setKey(prmissionsData);
        }
        relevancyField && (relevancyValue = relevancyField);
        showField && (showValue = showField);
        this.setRelevancySite(prmissionsData);
        const data = this.addChild(prmissionsData);
        let obj;
        if (defaultValue) {
            obj = {
                allKeys: data,
                checkedKeys: [...defaultValue],
            };
        } else {
            obj = {
                allKeys: data,
            };
        }

        this.setState(obj);
    }

    componentWillMount() {
        this.init(this.props);
    }

    componentDidMount() {
        this.setBgc();
    }

    componentWillReceiveProps(next) {
        const { exclude } = this.state;
        if (next != this.props) {
            let flag = false;
            Object.keys(next).forEach((v) => {
                if (exclude.includes(v)) {
                    if (next[v] != this.props[v]) {
                        flag = true;
                    }
                }
            });
            flag && this.init(next);
        }
    }

    /**
     * 作者: 陈林
     * 描述: 取key到数据的函数
     * 时间: 2018/5/24 0024 上午 10:38
     * @param data array 传入的数组
     * @param result array 只包含key的数组
     * */
    addChild = (data, result = []) => {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            result.push(item[keyValue]);
            if (item[listFieldValue] && item[listFieldValue].length > 0) {
                this.addChild(item[listFieldValue], result);
            }
        }
        return result;
    }

    renderTreeNodes = (data) => {
        const { checkedKeys } = this.state;
        return data.map((item, index) => {
            if (item[listFieldValue] && item[listFieldValue].length) {
                return (
                    <TreeNode
                        title={item[showValue]}
                        key={item[keyValue]}
                        dataRef={item}
                    >
                        {this.renderTreeNodes(item[listFieldValue])}
                    </TreeNode>
                );
            }
            if (item[relevancyValue] && item[relevancyValue].length) {
                for (let i = 0; i < item[relevancyValue].length; i++) {
                    if (checkedKeys.includes(item[relevancyValue][i])) {
                        return <TreeNode className="tewb-tree-node tewb-tree-disabled-node" title={item[showValue]} key={item[keyValue]} />;
                    }
                }
            }
            return <TreeNode className="tewb-tree-node" title={item[showValue]} key={item[keyValue]} />;
        });
    };

    filterProps = () => {
        const data = this.state.exclude;
        const params = {};
        for (const k in this.props) {
            if (!data.includes(k)) {
                params[k] = this.props[k];
            }
        }
        return params;
    }

    render() {
        const { prmissionsData, isShowCheckAll } = this.props;
        const params = this.filterProps();
        return (
            <div className="container">
                {
                    isShowCheckAll
                        ? <Checkbox onClick={this.onAllClick} checked={this.state.checkedKeys.length === this.state.allKeys.length}>全选</Checkbox>
                        : null
                }
                <div className="tweb-tree margin-ss-top">
                    <Tree
                        {...params}
                        defaultExpandParent={false}
                        showLine
                        checkable
                        checkedKeys={this.props.checkedKeys || this.state.checkedKeys}
                        onCollapse={this.onCollapse}
                        onExpand={this.onExpand}
                        onCheck={this.onCheck}
                    >
                        {this.renderTreeNodes(prmissionsData)}
                    </Tree>
                </div>
            </div>
        );
    }
}

Permissions.propTypes = {
    prmissionsData: PropTypes.array.isRequired,
    onCheck: PropTypes.func.isRequired,
};
