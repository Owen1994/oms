import React from 'react';
import { Tree, Input, Form } from 'antd';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const FormItem = Form.Item;

let dataList = [];
const generateList = (data) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({ key, title: node.title });
        if (node.children) {
            generateList(node.children, node.key);
        }
    }
};


const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

const findInnerKey = (treeData) => {
    if (treeData[0].children && treeData[0].children.length !== 0) {
        return findInnerKey(treeData[0].children);
    }
    return treeData[0].key;
};

class App extends React.Component {
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        gData: [],
        selectedKeys: [],
    }

    componentDidMount() {
        const { treeData, name, isDefaultExpandFirst } = this.props;
        this.treeInit(treeData, name, isDefaultExpandFirst, true);
    }

    componentWillReceiveProps(nextProps) {
        const {
            treeData, name, isDefaultExpandFirst, isInit, preserveId,
        } = nextProps;
        if (isInit && treeData !== this.props.treeData) {
            // 状态初始化
            this.setState({
                expandedKeys: [],
                searchValue: '',
                autoExpandParent: true,
                gData: [],
                selectedKeys: [],
            });
            this.props.form.setFieldsValue({ [name]: preserveId });
            this.treeInit(treeData, name, isDefaultExpandFirst);
        } else if (!isInit && treeData !== this.props.treeData) {
            // 状态初始化
            this.setState({
                expandedKeys: [],
                searchValue: '',
                autoExpandParent: true,
                gData: [],
                selectedKeys: [],
            });
            this.treeInit(treeData, name, isDefaultExpandFirst, true);
        }
    }

    componentWillUnmount() {
        dataList = [];
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    // 搜索回调
    onSearch = (value) => {
        const expandedKeys = dataList.map((item) => {
            if (item.title.indexOf(value) > -1) {
                return getParentKey(item.key, this.state.gData);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);

        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    // 点击选择回调
    onSelect = (selectedTreeKey, e) => {
        if (selectedTreeKey.length === 0) {
            return;
        }
        this.setState({ selectedKeys: selectedTreeKey });
        const { name, handleListFetch, onSelect } = this.props;
        const { setFieldsValue } = this.props.form;
        if (name) {
            setFieldsValue({ [name]: selectedTreeKey.toString() });
        }
        if (onSelect) {
            onSelect(selectedTreeKey, e);
        }
        if (handleListFetch) {
            handleListFetch();
        }
    }

    // 列表初始化
    treeInit(treeData, name, isDefaultExpandFirst, isInit) {
        const { setFieldsValue } = this.props.form;
        const innerKey = findInnerKey(treeData);
        if (isInit && name && treeData.length > 0) {
            setFieldsValue({ [name]: innerKey });
        }
        generateList(treeData);
        let expandedKeys = [];
        if (isInit && isDefaultExpandFirst === true || isDefaultExpandFirst === undefined) {
            expandedKeys = treeData[0].children ? [treeData[0].children[0].key] : [treeData[0].key];
        }
        this.setState({ gData: treeData });
        if (isInit) {
            this.setState({
                selectedKeys: (isDefaultExpandFirst === true || isDefaultExpandFirst === undefined) ? [innerKey] : [],
                expandedKeys, // 默认展开第一项
            });
        } else {
            this.setState({
                selectedKeys: this.state.selectedKeys,
                expandedKeys: this.state.expandedKeys,
            });
        }
    }

    render() {
        const {
            searchValue, expandedKeys, autoExpandParent, gData, selectedKeys,
        } = this.state;
        const { name } = this.props;
        const { getFieldDecorator } = this.props.form;
        const loop = data => data.map((item) => {
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const unDealNum = item.unDealNum !== undefined ? (
                <span>（{item.unDealNum}）</span>
            ) : null;
            const isClosed = item.ruleState && item.ruleState === 2 ? (
                <span style={{ color: 'red' }}>（已关闭）</span>
            ) : null;
            const title = index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
                    {isClosed}
                    {unDealNum}
                </span>
            ) : <span>{item.title}</span>;
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={title}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={title} />;
        });
        return (
            <div>
                <Search className="customer-tree-search" placeholder="请输入关键词" onSearch={this.onSearch} />
                {
                    gData && gData.length
                        ? (
                            <Tree
                                className="customer-service-tree"
                                expandedKeys={expandedKeys}
                                onExpand={this.onExpand}
                                onSelect={this.onSelect}
                                autoExpandParent={autoExpandParent}
                                selectedKeys={selectedKeys}
                            >
                                {loop(gData)}
                            </Tree>
                        )
                        : '暂无数据'
                }
                {
                    name
                        ? (
                            <FormItem>
                                {getFieldDecorator(name)(
                                    <Input type="hidden" />,
                                )}
                            </FormItem>
                        )
                        : null
                }
            </div>
        );
    }
}

export default App;
