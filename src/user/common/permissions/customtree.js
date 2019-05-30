/**
 * 作者: 陈林
 * 描述: 功能权限列表案列
 * 时间: 2018/5/21 0021 下午 3:06
 * */
import React from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
import './css.css';

const TreeNode = Tree.TreeNode;


export default class Permissions extends React.Component {
    state = {
        allKeys: [],
        checkedKeys: [],
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    };

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        }, () => {
            setTimeout(() => {
                const elementArray = document.querySelectorAll('.ant-tree-child-tree-open');
                elementArray.forEach((element) => { // 判断叶子节点
                    const closeSubElement = element.querySelector('.ant-tree-switcher_close');
                    const openSubElement = element.querySelector('.ant-tree-switcher_open');
                    if (!closeSubElement && !openSubElement) {
                        element.classList.add('tweb-ant-tree-leaf_node');
                    } else {
                        element.classList.remove('tweb-ant-tree-leaf_node');
                    }
                });
            }, 100);
        });
    };

    onCheck = (checkedKeys) => {
        this.setState({
            checkedKeys,
        });
        this.props.onCheck(checkedKeys);
    };

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

    componentWillReceiveProps(nextProps) {
        const preData = this.props.prmissionsData;
        const cData = nextProps.prmissionsData;
        if (preData !== cData) {
            const { prmissionsData } = nextProps;
            const data = this.addChild(prmissionsData);
            this.setState({
                allKeys: data,
                checkedKeys: [...nextProps.checkedKeys],
            });
        }

        const preSearchValue = this.props.searchValue;
        const searchValue = nextProps.searchValue;
        if (searchValue !== preSearchValue) {
            this.setState({
                searchValue,
            });
        }
    }


    addChild = (data, result = []) => {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            result.push(item.key);
            if (item.children && item.children.length > 0) {
                this.addChild(item.children, result);
            }
        }
        return result;
    }


    render() {
        const { prmissionsData } = this.props;
        const { searchValue } = this.state;
        const loop = data => data.map((item) => {
            let flag = false;
            if (item.type && item.type !== '0') {
                flag = true;
            }
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title = index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
                </span>
            ) : <span>{item.title}</span>;
            if (item.children) {
                return (
                    <TreeNode
                        key={item.key}
                        title={title}
                        disabled={flag}
                    >
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return (
                <TreeNode
                    key={item.key}
                    title={title}
                    disabled={flag}
                    className="tewb-tree-node"
                />
            );
        });

        return (
            <div className="container">
                <div className="tweb-tree">
                    <Tree
                        showLine
                        checkable
                        checkedKeys={this.state.checkedKeys}
                        onCollapse={this.onCollapse}
                        onExpand={this.onExpand}
                        onCheck={this.onCheck}
                        // expandedKeys={expandedKeys}
                        // autoExpandParent={autoExpandParent}
                    >
                        {loop(prmissionsData)}
                        {/* {this.renderTreeNodes(prmissionsData)} */}
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
